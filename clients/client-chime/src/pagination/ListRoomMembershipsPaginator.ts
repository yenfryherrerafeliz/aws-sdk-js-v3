// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import { ChimeClient } from "../ChimeClient";
import {
  ListRoomMembershipsCommand,
  ListRoomMembershipsCommandInput,
  ListRoomMembershipsCommandOutput,
} from "../commands/ListRoomMembershipsCommand";
import { ChimePaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: ChimeClient,
  input: ListRoomMembershipsCommandInput,
  ...args: any
): Promise<ListRoomMembershipsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListRoomMembershipsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListRoomMemberships(
  config: ChimePaginationConfiguration,
  input: ListRoomMembershipsCommandInput,
  ...additionalArguments: any
): Paginator<ListRoomMembershipsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListRoomMembershipsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof ChimeClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Chime | ChimeClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
