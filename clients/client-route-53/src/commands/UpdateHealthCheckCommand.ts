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

import { UpdateHealthCheckRequest, UpdateHealthCheckResponse } from "../models/models_0";
import { de_UpdateHealthCheckCommand, se_UpdateHealthCheckCommand } from "../protocols/Aws_restXml";
import { Route53ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../Route53Client";

/**
 * @public
 *
 * The input for {@link UpdateHealthCheckCommand}.
 */
export interface UpdateHealthCheckCommandInput extends UpdateHealthCheckRequest {}
/**
 * @public
 *
 * The output of {@link UpdateHealthCheckCommand}.
 */
export interface UpdateHealthCheckCommandOutput extends UpdateHealthCheckResponse, __MetadataBearer {}

/**
 * @public
 * <p>Updates an existing health check. Note that some values can't be updated. </p>
 *          <p>For more information about updating health checks, see <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-deleting.html">Creating,
 * 				Updating, and Deleting Health Checks</a> in the <i>Amazon Route 53
 * 				Developer Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { Route53Client, UpdateHealthCheckCommand } from "@aws-sdk/client-route-53"; // ES Modules import
 * // const { Route53Client, UpdateHealthCheckCommand } = require("@aws-sdk/client-route-53"); // CommonJS import
 * const client = new Route53Client(config);
 * const input = { // UpdateHealthCheckRequest
 *   HealthCheckId: "STRING_VALUE", // required
 *   HealthCheckVersion: Number("long"),
 *   IPAddress: "STRING_VALUE",
 *   Port: Number("int"),
 *   ResourcePath: "STRING_VALUE",
 *   FullyQualifiedDomainName: "STRING_VALUE",
 *   SearchString: "STRING_VALUE",
 *   FailureThreshold: Number("int"),
 *   Inverted: true || false,
 *   Disabled: true || false,
 *   HealthThreshold: Number("int"),
 *   ChildHealthChecks: [ // ChildHealthCheckList
 *     "STRING_VALUE",
 *   ],
 *   EnableSNI: true || false,
 *   Regions: [ // HealthCheckRegionList
 *     "us-east-1" || "us-west-1" || "us-west-2" || "eu-west-1" || "ap-southeast-1" || "ap-southeast-2" || "ap-northeast-1" || "sa-east-1",
 *   ],
 *   AlarmIdentifier: { // AlarmIdentifier
 *     Region: "us-east-1" || "us-east-2" || "us-west-1" || "us-west-2" || "ca-central-1" || "eu-central-1" || "eu-central-2" || "eu-west-1" || "eu-west-2" || "eu-west-3" || "ap-east-1" || "me-south-1" || "me-central-1" || "ap-south-1" || "ap-south-2" || "ap-southeast-1" || "ap-southeast-2" || "ap-southeast-3" || "ap-northeast-1" || "ap-northeast-2" || "ap-northeast-3" || "eu-north-1" || "sa-east-1" || "cn-northwest-1" || "cn-north-1" || "af-south-1" || "eu-south-1" || "eu-south-2" || "us-gov-west-1" || "us-gov-east-1" || "us-iso-east-1" || "us-iso-west-1" || "us-isob-east-1" || "ap-southeast-4", // required
 *     Name: "STRING_VALUE", // required
 *   },
 *   InsufficientDataHealthStatus: "Healthy" || "Unhealthy" || "LastKnownStatus",
 *   ResetElements: [ // ResettableElementNameList
 *     "FullyQualifiedDomainName" || "Regions" || "ResourcePath" || "ChildHealthChecks",
 *   ],
 * };
 * const command = new UpdateHealthCheckCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @param UpdateHealthCheckCommandInput - {@link UpdateHealthCheckCommandInput}
 * @returns {@link UpdateHealthCheckCommandOutput}
 * @see {@link UpdateHealthCheckCommandInput} for command's `input` shape.
 * @see {@link UpdateHealthCheckCommandOutput} for command's `response` shape.
 * @see {@link Route53ClientResolvedConfig | config} for Route53Client's `config` shape.
 *
 * @throws {@link HealthCheckVersionMismatch} (client fault)
 *  <p>The value of <code>HealthCheckVersion</code> in the request doesn't match the value of
 * 				<code>HealthCheckVersion</code> in the health check.</p>
 *
 * @throws {@link InvalidInput} (client fault)
 *  <p>The input is not valid.</p>
 *
 * @throws {@link NoSuchHealthCheck} (client fault)
 *  <p>No health check exists with the specified ID.</p>
 *
 *
 */
export class UpdateHealthCheckCommand extends $Command<
  UpdateHealthCheckCommandInput,
  UpdateHealthCheckCommandOutput,
  Route53ClientResolvedConfig
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
  constructor(readonly input: UpdateHealthCheckCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: Route53ClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<UpdateHealthCheckCommandInput, UpdateHealthCheckCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(
      getEndpointPlugin(configuration, UpdateHealthCheckCommand.getEndpointParameterInstructions())
    );

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "Route53Client";
    const commandName = "UpdateHealthCheckCommand";
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
  private serialize(input: UpdateHealthCheckCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return se_UpdateHealthCheckCommand(input, context);
  }

  /**
   * @internal
   */
  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<UpdateHealthCheckCommandOutput> {
    return de_UpdateHealthCheckCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
