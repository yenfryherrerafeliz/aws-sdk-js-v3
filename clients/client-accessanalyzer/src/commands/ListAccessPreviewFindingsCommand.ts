// smithy-typescript generated code
import { EndpointParameterInstructions, getEndpointPlugin } from "@aws-sdk/middleware-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  MiddlewareStack,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

import { AccessAnalyzerClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../AccessAnalyzerClient";
import { ListAccessPreviewFindingsRequest, ListAccessPreviewFindingsResponse } from "../models/models_0";
import { de_ListAccessPreviewFindingsCommand, se_ListAccessPreviewFindingsCommand } from "../protocols/Aws_restJson1";

/**
 * @public
 *
 * The input for {@link ListAccessPreviewFindingsCommand}.
 */
export interface ListAccessPreviewFindingsCommandInput extends ListAccessPreviewFindingsRequest {}
/**
 * @public
 *
 * The output of {@link ListAccessPreviewFindingsCommand}.
 */
export interface ListAccessPreviewFindingsCommandOutput extends ListAccessPreviewFindingsResponse, __MetadataBearer {}

/**
 * @public
 * <p>Retrieves a list of access preview findings generated by the specified access
 *          preview.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { AccessAnalyzerClient, ListAccessPreviewFindingsCommand } from "@aws-sdk/client-accessanalyzer"; // ES Modules import
 * // const { AccessAnalyzerClient, ListAccessPreviewFindingsCommand } = require("@aws-sdk/client-accessanalyzer"); // CommonJS import
 * const client = new AccessAnalyzerClient(config);
 * const input = { // ListAccessPreviewFindingsRequest
 *   accessPreviewId: "STRING_VALUE", // required
 *   analyzerArn: "STRING_VALUE", // required
 *   filter: { // FilterCriteriaMap
 *     "<keys>": { // Criterion
 *       eq: [ // ValueList
 *         "STRING_VALUE",
 *       ],
 *       neq: [
 *         "STRING_VALUE",
 *       ],
 *       contains: [
 *         "STRING_VALUE",
 *       ],
 *       exists: true || false,
 *     },
 *   },
 *   nextToken: "STRING_VALUE",
 *   maxResults: Number("int"),
 * };
 * const command = new ListAccessPreviewFindingsCommand(input);
 * const response = await client.send(command);
 * // { // ListAccessPreviewFindingsResponse
 * //   findings: [ // AccessPreviewFindingsList // required
 * //     { // AccessPreviewFinding
 * //       id: "STRING_VALUE", // required
 * //       existingFindingId: "STRING_VALUE",
 * //       existingFindingStatus: "STRING_VALUE",
 * //       principal: { // PrincipalMap
 * //         "<keys>": "STRING_VALUE",
 * //       },
 * //       action: [ // ActionList
 * //         "STRING_VALUE",
 * //       ],
 * //       condition: { // ConditionKeyMap
 * //         "<keys>": "STRING_VALUE",
 * //       },
 * //       resource: "STRING_VALUE",
 * //       isPublic: true || false,
 * //       resourceType: "STRING_VALUE", // required
 * //       createdAt: new Date("TIMESTAMP"), // required
 * //       changeType: "STRING_VALUE", // required
 * //       status: "STRING_VALUE", // required
 * //       resourceOwnerAccount: "STRING_VALUE", // required
 * //       error: "STRING_VALUE",
 * //       sources: [ // FindingSourceList
 * //         { // FindingSource
 * //           type: "STRING_VALUE", // required
 * //           detail: { // FindingSourceDetail
 * //             accessPointArn: "STRING_VALUE",
 * //             accessPointAccount: "STRING_VALUE",
 * //           },
 * //         },
 * //       ],
 * //     },
 * //   ],
 * //   nextToken: "STRING_VALUE",
 * // };
 *
 * ```
 *
 * @param ListAccessPreviewFindingsCommandInput - {@link ListAccessPreviewFindingsCommandInput}
 * @returns {@link ListAccessPreviewFindingsCommandOutput}
 * @see {@link ListAccessPreviewFindingsCommandInput} for command's `input` shape.
 * @see {@link ListAccessPreviewFindingsCommandOutput} for command's `response` shape.
 * @see {@link AccessAnalyzerClientResolvedConfig | config} for AccessAnalyzerClient's `config` shape.
 *
 * @throws {@link AccessDeniedException} (client fault)
 *  <p>You do not have sufficient access to perform this action.</p>
 *
 * @throws {@link ConflictException} (client fault)
 *  <p>A conflict exception error.</p>
 *
 * @throws {@link InternalServerException} (server fault)
 *  <p>Internal server error.</p>
 *
 * @throws {@link ResourceNotFoundException} (client fault)
 *  <p>The specified resource could not be found.</p>
 *
 * @throws {@link ThrottlingException} (client fault)
 *  <p>Throttling limit exceeded error.</p>
 *
 * @throws {@link ValidationException} (client fault)
 *  <p>Validation exception error.</p>
 *
 * @throws {@link AccessAnalyzerServiceException}
 * <p>Base exception class for all service exceptions from AccessAnalyzer service.</p>
 *
 */
export class ListAccessPreviewFindingsCommand extends $Command<
  ListAccessPreviewFindingsCommandInput,
  ListAccessPreviewFindingsCommandOutput,
  AccessAnalyzerClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  public static getEndpointParameterInstructions(): EndpointParameterInstructions {
    return {
      UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
      Endpoint: { type: "builtInParams", name: "endpoint" },
      Region: { type: "builtInParams", name: "region" },
      UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
    };
  }

  /**
   * @public
   */
  constructor(readonly input: ListAccessPreviewFindingsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: AccessAnalyzerClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListAccessPreviewFindingsCommandInput, ListAccessPreviewFindingsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(
      getEndpointPlugin(configuration, ListAccessPreviewFindingsCommand.getEndpointParameterInstructions())
    );

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "AccessAnalyzerClient";
    const commandName = "ListAccessPreviewFindingsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: (_: any) => _,
      outputFilterSensitiveLog: (_: any) => _,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  /**
   * @internal
   */
  private serialize(input: ListAccessPreviewFindingsCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return se_ListAccessPreviewFindingsCommand(input, context);
  }

  /**
   * @internal
   */
  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ListAccessPreviewFindingsCommandOutput> {
    return de_ListAccessPreviewFindingsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
