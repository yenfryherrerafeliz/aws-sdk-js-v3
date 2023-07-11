// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  ListEdgeAgentConfigurationsCommand,
  ListEdgeAgentConfigurationsCommandInput,
  ListEdgeAgentConfigurationsCommandOutput,
} from "../commands/ListEdgeAgentConfigurationsCommand";
import { KinesisVideoClient } from "../KinesisVideoClient";
import { KinesisVideoPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: KinesisVideoClient,
  input: ListEdgeAgentConfigurationsCommandInput,
  ...args: any
): Promise<ListEdgeAgentConfigurationsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListEdgeAgentConfigurationsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListEdgeAgentConfigurations(
  config: KinesisVideoPaginationConfiguration,
  input: ListEdgeAgentConfigurationsCommandInput,
  ...additionalArguments: any
): Paginator<ListEdgeAgentConfigurationsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListEdgeAgentConfigurationsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof KinesisVideoClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected KinesisVideo | KinesisVideoClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
