// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  DescribeSenderIdsCommand,
  DescribeSenderIdsCommandInput,
  DescribeSenderIdsCommandOutput,
} from "../commands/DescribeSenderIdsCommand";
import { PinpointSMSVoiceV2Client } from "../PinpointSMSVoiceV2Client";
import { PinpointSMSVoiceV2PaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: PinpointSMSVoiceV2Client,
  input: DescribeSenderIdsCommandInput,
  ...args: any
): Promise<DescribeSenderIdsCommandOutput> => {
  // @ts-ignore
  return await client.send(new DescribeSenderIdsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateDescribeSenderIds(
  config: PinpointSMSVoiceV2PaginationConfiguration,
  input: DescribeSenderIdsCommandInput,
  ...additionalArguments: any
): Paginator<DescribeSenderIdsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: DescribeSenderIdsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof PinpointSMSVoiceV2Client) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected PinpointSMSVoiceV2 | PinpointSMSVoiceV2Client");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
