import {
  AbsoluteLocation,
  FinalizeHandler,
  FinalizeHandlerArguments,
  FinalizeHandlerOutput,
  FinalizeRequestHandlerOptions,
  HandlerExecutionContext,
  MetadataBearer,
  Pluggable,
  Provider,
  RetryStrategy as OldRetryStrategy,
  SdkError,
} from "@aws-sdk/types";

enum RetryErrorType {
  /** This is a connection level error such as a socket timeout, socket connect error, tls negotiation timeout etc...
   * Typically these should never be applied for non-idempotent request types since in this scenario, it's impossible
   * to know whether the operation had a side effect on the server. */
  Transient,
  /** This is an error where the server explicitly told the client to back off, such as a 429 or 503 Http error. */
  Throttling,
  /** This is a server error that isn't explicitly throttling but is considered by the client
   * to be something that should be retried. */
  ServerError,
  /** Doesn't count against any budgets. This could be something like a 401 challenge in Http. */
  ClientError,
}

interface RetryStrategy {
  /** Called before any retries (for the first call to the operation). This is an asynchronous function with a timeout.
   *  It either returns a retry token or an error upon the failure to acquire a token prior to the timeout expiration.
   *
   * PartitionId is arbitrary and out of scope for this component. However, adding it here offers us a lot of future flexibility for outage detection.
   *   For example, it could be "us-east-1" on a shared retry strategy, or "us-west-2-c:dynamodb".
   */
  acquireRetryToken: (partitionId: string, timeout: number) => Promise<void>;

  /**
   * Waits (asynchronously) for the time to retry for the corresponding token. This function happens on the error handling path, so errorType gives the retry strategy the opportunity to do
   * book-keeping to inform its circuit breaker policy based on the types of errors it's encountering. A Retry can be rejected. In that case this function either immediately
   * returns an error or throws an exception. Upon success, it returns control to the program upon the appropriate wait time elapsing.
   */
  waitForRetry: (error: SdkError) => Promise<boolean>;

  /**
   * Upon successful completion of the operation, a user calls this function to record that the operation was successful.
   */
  recordSuccess: () => void;
}


export interface RetryResolvedConfig {
  maxAttempts: Provider<number>;

  retryStrategy: Provider<RetryStrategy | OldRetryStrategy>;
}

export const retryMiddleware =
  (options: RetryResolvedConfig) =>
  <Output extends MetadataBearer = MetadataBearer>(
    next: FinalizeHandler<any, Output>,
    context: HandlerExecutionContext
  ): FinalizeHandler<any, Output> =>
  async (args: FinalizeHandlerArguments<any>): Promise<FinalizeHandlerOutput<Output>> => {
    const retryStrategy = await options.retryStrategy();
    const maxAttempts = await options.maxAttempts();

    const isOldStrategy = (strategy: RetryStrategy | OldRetryStrategy): strategy is OldRetryStrategy =>
      typeof strategy["retry"] === "function";
    if (isOldStrategy(retryStrategy)) {
      // TODO: add UA string in a separate middleware.
      return retryStrategy.retry(next, args);
    } else {
      // TODO: add UA string in a separate middleware.
      await retryStrategy.acquireRetryToken(context["partition_id"], 1000);
      let canRetry = false;
      let lastError: SdkError = undefined;
      let attempts = 0;
      do {
        try {
          attempts++;
          const res = await next(args);
          retryStrategy.recordSuccess();
          canRetry = false;
          return res;
        } catch (e) {
          lastError = e;
          // QUESTION: do we need reference to request here?
          canRetry = await retryStrategy.waitForRetry(e);
        }
      } while (canRetry && attempts < maxAttempts);
      throw lastError;
    }
  };

export const retryMiddlewareOptions: FinalizeRequestHandlerOptions & AbsoluteLocation = {
  name: "retryMiddleware",
  tags: ["RETRY"],
  step: "finalizeRequest",
  priority: "high",
  override: true,
};

export const getRetryPlugin = (options: RetryResolvedConfig): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
  },
});
