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

import { AuditManagerClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../AuditManagerClient";
import { UpdateControlRequest, UpdateControlResponse } from "../models/models_0";
import { de_UpdateControlCommand, se_UpdateControlCommand } from "../protocols/Aws_restJson1";

/**
 * @public
 *
 * The input for {@link UpdateControlCommand}.
 */
export interface UpdateControlCommandInput extends UpdateControlRequest {}
/**
 * @public
 *
 * The output of {@link UpdateControlCommand}.
 */
export interface UpdateControlCommandOutput extends UpdateControlResponse, __MetadataBearer {}

/**
 * @public
 * <p> Updates a custom control in Audit Manager. </p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { AuditManagerClient, UpdateControlCommand } from "@aws-sdk/client-auditmanager"; // ES Modules import
 * // const { AuditManagerClient, UpdateControlCommand } = require("@aws-sdk/client-auditmanager"); // CommonJS import
 * const client = new AuditManagerClient(config);
 * const input = { // UpdateControlRequest
 *   controlId: "STRING_VALUE", // required
 *   name: "STRING_VALUE", // required
 *   description: "STRING_VALUE",
 *   testingInformation: "STRING_VALUE",
 *   actionPlanTitle: "STRING_VALUE",
 *   actionPlanInstructions: "STRING_VALUE",
 *   controlMappingSources: [ // ControlMappingSources // required
 *     { // ControlMappingSource
 *       sourceId: "STRING_VALUE",
 *       sourceName: "STRING_VALUE",
 *       sourceDescription: "STRING_VALUE",
 *       sourceSetUpOption: "System_Controls_Mapping" || "Procedural_Controls_Mapping",
 *       sourceType: "AWS_Cloudtrail" || "AWS_Config" || "AWS_Security_Hub" || "AWS_API_Call" || "MANUAL",
 *       sourceKeyword: { // SourceKeyword
 *         keywordInputType: "SELECT_FROM_LIST",
 *         keywordValue: "STRING_VALUE",
 *       },
 *       sourceFrequency: "DAILY" || "WEEKLY" || "MONTHLY",
 *       troubleshootingText: "STRING_VALUE",
 *     },
 *   ],
 * };
 * const command = new UpdateControlCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @param UpdateControlCommandInput - {@link UpdateControlCommandInput}
 * @returns {@link UpdateControlCommandOutput}
 * @see {@link UpdateControlCommandInput} for command's `input` shape.
 * @see {@link UpdateControlCommandOutput} for command's `response` shape.
 * @see {@link AuditManagerClientResolvedConfig | config} for AuditManagerClient's `config` shape.
 *
 * @throws {@link AccessDeniedException} (client fault)
 *  <p> Your account isn't registered with Audit Manager. Check the delegated
 *          administrator setup on the Audit Manager settings page, and try again. </p>
 *
 * @throws {@link InternalServerException} (server fault)
 *  <p> An internal service error occurred during the processing of your request. Try again
 *          later. </p>
 *
 * @throws {@link ResourceNotFoundException} (client fault)
 *  <p> The resource that's specified in the request can't be found. </p>
 *
 * @throws {@link ValidationException} (client fault)
 *  <p> The request has invalid or missing parameters. </p>
 *
 *
 */
export class UpdateControlCommand extends $Command<
  UpdateControlCommandInput,
  UpdateControlCommandOutput,
  AuditManagerClientResolvedConfig
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
  constructor(readonly input: UpdateControlCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: AuditManagerClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<UpdateControlCommandInput, UpdateControlCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(getEndpointPlugin(configuration, UpdateControlCommand.getEndpointParameterInstructions()));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "AuditManagerClient";
    const commandName = "UpdateControlCommand";
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
  private serialize(input: UpdateControlCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return se_UpdateControlCommand(input, context);
  }

  /**
   * @internal
   */
  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<UpdateControlCommandOutput> {
    return de_UpdateControlCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
