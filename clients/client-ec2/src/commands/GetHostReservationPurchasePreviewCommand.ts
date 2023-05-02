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

import { EC2ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../EC2Client";
import { GetHostReservationPurchasePreviewRequest, GetHostReservationPurchasePreviewResult } from "../models/models_5";
import {
  de_GetHostReservationPurchasePreviewCommand,
  se_GetHostReservationPurchasePreviewCommand,
} from "../protocols/Aws_ec2";

/**
 * @public
 *
 * The input for {@link GetHostReservationPurchasePreviewCommand}.
 */
export interface GetHostReservationPurchasePreviewCommandInput extends GetHostReservationPurchasePreviewRequest {}
/**
 * @public
 *
 * The output of {@link GetHostReservationPurchasePreviewCommand}.
 */
export interface GetHostReservationPurchasePreviewCommandOutput
  extends GetHostReservationPurchasePreviewResult,
    __MetadataBearer {}

/**
 * @public
 * <p>Preview a reservation purchase with configurations that match those of your Dedicated
 *             Host. You must have active Dedicated Hosts in your account before you purchase a
 *             reservation.</p>
 *          <p>This is a preview of the <a>PurchaseHostReservation</a> action and does not
 *             result in the offering being purchased.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { EC2Client, GetHostReservationPurchasePreviewCommand } from "@aws-sdk/client-ec2"; // ES Modules import
 * // const { EC2Client, GetHostReservationPurchasePreviewCommand } = require("@aws-sdk/client-ec2"); // CommonJS import
 * const client = new EC2Client(config);
 * const input = { // GetHostReservationPurchasePreviewRequest
 *   HostIdSet: [ // RequestHostIdSet // required
 *     "STRING_VALUE",
 *   ],
 *   OfferingId: "STRING_VALUE", // required
 * };
 * const command = new GetHostReservationPurchasePreviewCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @param GetHostReservationPurchasePreviewCommandInput - {@link GetHostReservationPurchasePreviewCommandInput}
 * @returns {@link GetHostReservationPurchasePreviewCommandOutput}
 * @see {@link GetHostReservationPurchasePreviewCommandInput} for command's `input` shape.
 * @see {@link GetHostReservationPurchasePreviewCommandOutput} for command's `response` shape.
 * @see {@link EC2ClientResolvedConfig | config} for EC2Client's `config` shape.
 *
 *
 */
export class GetHostReservationPurchasePreviewCommand extends $Command<
  GetHostReservationPurchasePreviewCommandInput,
  GetHostReservationPurchasePreviewCommandOutput,
  EC2ClientResolvedConfig
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
  constructor(readonly input: GetHostReservationPurchasePreviewCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: EC2ClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<GetHostReservationPurchasePreviewCommandInput, GetHostReservationPurchasePreviewCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(
      getEndpointPlugin(configuration, GetHostReservationPurchasePreviewCommand.getEndpointParameterInstructions())
    );

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "EC2Client";
    const commandName = "GetHostReservationPurchasePreviewCommand";
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
  private serialize(
    input: GetHostReservationPurchasePreviewCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return se_GetHostReservationPurchasePreviewCommand(input, context);
  }

  /**
   * @internal
   */
  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetHostReservationPurchasePreviewCommandOutput> {
    return de_GetHostReservationPurchasePreviewCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
