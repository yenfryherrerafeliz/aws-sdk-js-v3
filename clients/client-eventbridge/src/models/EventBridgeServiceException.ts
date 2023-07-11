// smithy-typescript generated code
import {
  ServiceException as __ServiceException,
  ServiceExceptionOptions as __ServiceExceptionOptions,
} from "@smithy/smithy-client";

export { __ServiceException, __ServiceExceptionOptions };

/**
 * @public
 *
 * Base exception class for all service exceptions from EventBridge service.
 */
export class EventBridgeServiceException extends __ServiceException {
  /**
   * @internal
   */
  constructor(options: __ServiceExceptionOptions) {
    super(options);
    Object.setPrototypeOf(this, EventBridgeServiceException.prototype);
  }
}
