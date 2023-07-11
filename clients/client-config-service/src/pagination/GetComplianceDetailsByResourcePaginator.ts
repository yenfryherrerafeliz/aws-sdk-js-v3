// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  GetComplianceDetailsByResourceCommand,
  GetComplianceDetailsByResourceCommandInput,
  GetComplianceDetailsByResourceCommandOutput,
} from "../commands/GetComplianceDetailsByResourceCommand";
import { ConfigServiceClient } from "../ConfigServiceClient";
import { ConfigServicePaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: ConfigServiceClient,
  input: GetComplianceDetailsByResourceCommandInput,
  ...args: any
): Promise<GetComplianceDetailsByResourceCommandOutput> => {
  // @ts-ignore
  return await client.send(new GetComplianceDetailsByResourceCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateGetComplianceDetailsByResource(
  config: ConfigServicePaginationConfiguration,
  input: GetComplianceDetailsByResourceCommandInput,
  ...additionalArguments: any
): Paginator<GetComplianceDetailsByResourceCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: GetComplianceDetailsByResourceCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    if (config.client instanceof ConfigServiceClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected ConfigService | ConfigServiceClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
