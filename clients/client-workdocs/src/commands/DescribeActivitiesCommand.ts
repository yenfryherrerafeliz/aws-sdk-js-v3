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

import {
  DescribeActivitiesRequest,
  DescribeActivitiesRequestFilterSensitiveLog,
  DescribeActivitiesResponse,
  DescribeActivitiesResponseFilterSensitiveLog,
} from "../models/models_0";
import { de_DescribeActivitiesCommand, se_DescribeActivitiesCommand } from "../protocols/Aws_restJson1";
import { ServiceInputTypes, ServiceOutputTypes, WorkDocsClientResolvedConfig } from "../WorkDocsClient";

/**
 * @public
 *
 * The input for {@link DescribeActivitiesCommand}.
 */
export interface DescribeActivitiesCommandInput extends DescribeActivitiesRequest {}
/**
 * @public
 *
 * The output of {@link DescribeActivitiesCommand}.
 */
export interface DescribeActivitiesCommandOutput extends DescribeActivitiesResponse, __MetadataBearer {}

/**
 * @public
 * <p>Describes the user activities in a specified time period.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { WorkDocsClient, DescribeActivitiesCommand } from "@aws-sdk/client-workdocs"; // ES Modules import
 * // const { WorkDocsClient, DescribeActivitiesCommand } = require("@aws-sdk/client-workdocs"); // CommonJS import
 * const client = new WorkDocsClient(config);
 * const input = { // DescribeActivitiesRequest
 *   AuthenticationToken: "STRING_VALUE",
 *   StartTime: new Date("TIMESTAMP"),
 *   EndTime: new Date("TIMESTAMP"),
 *   OrganizationId: "STRING_VALUE",
 *   ActivityTypes: "STRING_VALUE",
 *   ResourceId: "STRING_VALUE",
 *   UserId: "STRING_VALUE",
 *   IncludeIndirectActivities: true || false,
 *   Limit: Number("int"),
 *   Marker: "STRING_VALUE",
 * };
 * const command = new DescribeActivitiesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @param DescribeActivitiesCommandInput - {@link DescribeActivitiesCommandInput}
 * @returns {@link DescribeActivitiesCommandOutput}
 * @see {@link DescribeActivitiesCommandInput} for command's `input` shape.
 * @see {@link DescribeActivitiesCommandOutput} for command's `response` shape.
 * @see {@link WorkDocsClientResolvedConfig | config} for WorkDocsClient's `config` shape.
 *
 * @throws {@link FailedDependencyException} (client fault)
 *  <p>The Directory Service cannot reach an on-premises instance. Or a dependency
 *             under the control of the organization is failing, such as a connected Active
 *             Directory.</p>
 *
 * @throws {@link InvalidArgumentException} (client fault)
 *  <p>The pagination marker or limit fields are not valid.</p>
 *
 * @throws {@link ServiceUnavailableException} (server fault)
 *  <p>One or more of the dependencies is unavailable.</p>
 *
 * @throws {@link UnauthorizedOperationException} (client fault)
 *  <p>The operation is not permitted.</p>
 *
 * @throws {@link UnauthorizedResourceAccessException} (client fault)
 *  <p>The caller does not have access to perform the action on the resource.</p>
 *
 *
 */
export class DescribeActivitiesCommand extends $Command<
  DescribeActivitiesCommandInput,
  DescribeActivitiesCommandOutput,
  WorkDocsClientResolvedConfig
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
  constructor(readonly input: DescribeActivitiesCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: WorkDocsClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<DescribeActivitiesCommandInput, DescribeActivitiesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(
      getEndpointPlugin(configuration, DescribeActivitiesCommand.getEndpointParameterInstructions())
    );

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "WorkDocsClient";
    const commandName = "DescribeActivitiesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DescribeActivitiesRequestFilterSensitiveLog,
      outputFilterSensitiveLog: DescribeActivitiesResponseFilterSensitiveLog,
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
  private serialize(input: DescribeActivitiesCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return se_DescribeActivitiesCommand(input, context);
  }

  /**
   * @internal
   */
  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<DescribeActivitiesCommandOutput> {
    return de_DescribeActivitiesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
