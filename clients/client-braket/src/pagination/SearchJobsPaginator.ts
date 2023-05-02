// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import { BraketClient } from "../BraketClient";
import { SearchJobsCommand, SearchJobsCommandInput, SearchJobsCommandOutput } from "../commands/SearchJobsCommand";
import { BraketPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: BraketClient,
  input: SearchJobsCommandInput,
  ...args: any
): Promise<SearchJobsCommandOutput> => {
  // @ts-ignore
  return await client.send(new SearchJobsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateSearchJobs(
  config: BraketPaginationConfiguration,
  input: SearchJobsCommandInput,
  ...additionalArguments: any
): Paginator<SearchJobsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: SearchJobsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof BraketClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Braket | BraketClient");
    }
    yield page;
    const prevToken = token;
    token = page.nextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
