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

import { MediaPackageVodClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../MediaPackageVodClient";
import { DescribePackagingConfigurationRequest, DescribePackagingConfigurationResponse } from "../models/models_0";
import {
  de_DescribePackagingConfigurationCommand,
  se_DescribePackagingConfigurationCommand,
} from "../protocols/Aws_restJson1";

/**
 * @public
 *
 * The input for {@link DescribePackagingConfigurationCommand}.
 */
export interface DescribePackagingConfigurationCommandInput extends DescribePackagingConfigurationRequest {}
/**
 * @public
 *
 * The output of {@link DescribePackagingConfigurationCommand}.
 */
export interface DescribePackagingConfigurationCommandOutput
  extends DescribePackagingConfigurationResponse,
    __MetadataBearer {}

/**
 * @public
 * Returns a description of a MediaPackage VOD PackagingConfiguration resource.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { MediaPackageVodClient, DescribePackagingConfigurationCommand } from "@aws-sdk/client-mediapackage-vod"; // ES Modules import
 * // const { MediaPackageVodClient, DescribePackagingConfigurationCommand } = require("@aws-sdk/client-mediapackage-vod"); // CommonJS import
 * const client = new MediaPackageVodClient(config);
 * const input = { // DescribePackagingConfigurationRequest
 *   Id: "STRING_VALUE", // required
 * };
 * const command = new DescribePackagingConfigurationCommand(input);
 * const response = await client.send(command);
 * // { // DescribePackagingConfigurationResponse
 * //   Arn: "STRING_VALUE",
 * //   CmafPackage: { // CmafPackage
 * //     Encryption: { // CmafEncryption
 * //       ConstantInitializationVector: "STRING_VALUE",
 * //       SpekeKeyProvider: { // SpekeKeyProvider
 * //         EncryptionContractConfiguration: { // EncryptionContractConfiguration
 * //           PresetSpeke20Audio: "PRESET-AUDIO-1" || "PRESET-AUDIO-2" || "PRESET-AUDIO-3" || "SHARED" || "UNENCRYPTED", // required
 * //           PresetSpeke20Video: "PRESET-VIDEO-1" || "PRESET-VIDEO-2" || "PRESET-VIDEO-3" || "PRESET-VIDEO-4" || "PRESET-VIDEO-5" || "PRESET-VIDEO-6" || "PRESET-VIDEO-7" || "PRESET-VIDEO-8" || "SHARED" || "UNENCRYPTED", // required
 * //         },
 * //         RoleArn: "STRING_VALUE", // required
 * //         SystemIds: [ // __listOf__string // required
 * //           "STRING_VALUE",
 * //         ],
 * //         Url: "STRING_VALUE", // required
 * //       },
 * //     },
 * //     HlsManifests: [ // __listOfHlsManifest // required
 * //       { // HlsManifest
 * //         AdMarkers: "NONE" || "SCTE35_ENHANCED" || "PASSTHROUGH",
 * //         IncludeIframeOnlyStream: true || false,
 * //         ManifestName: "STRING_VALUE",
 * //         ProgramDateTimeIntervalSeconds: Number("int"),
 * //         RepeatExtXKey: true || false,
 * //         StreamSelection: { // StreamSelection
 * //           MaxVideoBitsPerSecond: Number("int"),
 * //           MinVideoBitsPerSecond: Number("int"),
 * //           StreamOrder: "ORIGINAL" || "VIDEO_BITRATE_ASCENDING" || "VIDEO_BITRATE_DESCENDING",
 * //         },
 * //       },
 * //     ],
 * //     IncludeEncoderConfigurationInSegments: true || false,
 * //     SegmentDurationSeconds: Number("int"),
 * //   },
 * //   CreatedAt: "STRING_VALUE",
 * //   DashPackage: { // DashPackage
 * //     DashManifests: [ // __listOfDashManifest // required
 * //       { // DashManifest
 * //         ManifestLayout: "FULL" || "COMPACT",
 * //         ManifestName: "STRING_VALUE",
 * //         MinBufferTimeSeconds: Number("int"),
 * //         Profile: "NONE" || "HBBTV_1_5",
 * //         ScteMarkersSource: "SEGMENTS" || "MANIFEST",
 * //         StreamSelection: {
 * //           MaxVideoBitsPerSecond: Number("int"),
 * //           MinVideoBitsPerSecond: Number("int"),
 * //           StreamOrder: "ORIGINAL" || "VIDEO_BITRATE_ASCENDING" || "VIDEO_BITRATE_DESCENDING",
 * //         },
 * //       },
 * //     ],
 * //     Encryption: { // DashEncryption
 * //       SpekeKeyProvider: {
 * //         EncryptionContractConfiguration: {
 * //           PresetSpeke20Audio: "PRESET-AUDIO-1" || "PRESET-AUDIO-2" || "PRESET-AUDIO-3" || "SHARED" || "UNENCRYPTED", // required
 * //           PresetSpeke20Video: "PRESET-VIDEO-1" || "PRESET-VIDEO-2" || "PRESET-VIDEO-3" || "PRESET-VIDEO-4" || "PRESET-VIDEO-5" || "PRESET-VIDEO-6" || "PRESET-VIDEO-7" || "PRESET-VIDEO-8" || "SHARED" || "UNENCRYPTED", // required
 * //         },
 * //         RoleArn: "STRING_VALUE", // required
 * //         SystemIds: [ // required
 * //           "STRING_VALUE",
 * //         ],
 * //         Url: "STRING_VALUE", // required
 * //       },
 * //     },
 * //     IncludeEncoderConfigurationInSegments: true || false,
 * //     IncludeIframeOnlyStream: true || false,
 * //     PeriodTriggers: [ // __listOf__PeriodTriggersElement
 * //       "ADS",
 * //     ],
 * //     SegmentDurationSeconds: Number("int"),
 * //     SegmentTemplateFormat: "NUMBER_WITH_TIMELINE" || "TIME_WITH_TIMELINE" || "NUMBER_WITH_DURATION",
 * //   },
 * //   HlsPackage: { // HlsPackage
 * //     Encryption: { // HlsEncryption
 * //       ConstantInitializationVector: "STRING_VALUE",
 * //       EncryptionMethod: "AES_128" || "SAMPLE_AES",
 * //       SpekeKeyProvider: {
 * //         EncryptionContractConfiguration: {
 * //           PresetSpeke20Audio: "PRESET-AUDIO-1" || "PRESET-AUDIO-2" || "PRESET-AUDIO-3" || "SHARED" || "UNENCRYPTED", // required
 * //           PresetSpeke20Video: "PRESET-VIDEO-1" || "PRESET-VIDEO-2" || "PRESET-VIDEO-3" || "PRESET-VIDEO-4" || "PRESET-VIDEO-5" || "PRESET-VIDEO-6" || "PRESET-VIDEO-7" || "PRESET-VIDEO-8" || "SHARED" || "UNENCRYPTED", // required
 * //         },
 * //         RoleArn: "STRING_VALUE", // required
 * //         SystemIds: [ // required
 * //           "STRING_VALUE",
 * //         ],
 * //         Url: "STRING_VALUE", // required
 * //       },
 * //     },
 * //     HlsManifests: [ // required
 * //       {
 * //         AdMarkers: "NONE" || "SCTE35_ENHANCED" || "PASSTHROUGH",
 * //         IncludeIframeOnlyStream: true || false,
 * //         ManifestName: "STRING_VALUE",
 * //         ProgramDateTimeIntervalSeconds: Number("int"),
 * //         RepeatExtXKey: true || false,
 * //         StreamSelection: {
 * //           MaxVideoBitsPerSecond: Number("int"),
 * //           MinVideoBitsPerSecond: Number("int"),
 * //           StreamOrder: "ORIGINAL" || "VIDEO_BITRATE_ASCENDING" || "VIDEO_BITRATE_DESCENDING",
 * //         },
 * //       },
 * //     ],
 * //     IncludeDvbSubtitles: true || false,
 * //     SegmentDurationSeconds: Number("int"),
 * //     UseAudioRenditionGroup: true || false,
 * //   },
 * //   Id: "STRING_VALUE",
 * //   MssPackage: { // MssPackage
 * //     Encryption: { // MssEncryption
 * //       SpekeKeyProvider: {
 * //         EncryptionContractConfiguration: {
 * //           PresetSpeke20Audio: "PRESET-AUDIO-1" || "PRESET-AUDIO-2" || "PRESET-AUDIO-3" || "SHARED" || "UNENCRYPTED", // required
 * //           PresetSpeke20Video: "PRESET-VIDEO-1" || "PRESET-VIDEO-2" || "PRESET-VIDEO-3" || "PRESET-VIDEO-4" || "PRESET-VIDEO-5" || "PRESET-VIDEO-6" || "PRESET-VIDEO-7" || "PRESET-VIDEO-8" || "SHARED" || "UNENCRYPTED", // required
 * //         },
 * //         RoleArn: "STRING_VALUE", // required
 * //         SystemIds: [ // required
 * //           "STRING_VALUE",
 * //         ],
 * //         Url: "STRING_VALUE", // required
 * //       },
 * //     },
 * //     MssManifests: [ // __listOfMssManifest // required
 * //       { // MssManifest
 * //         ManifestName: "STRING_VALUE",
 * //         StreamSelection: {
 * //           MaxVideoBitsPerSecond: Number("int"),
 * //           MinVideoBitsPerSecond: Number("int"),
 * //           StreamOrder: "ORIGINAL" || "VIDEO_BITRATE_ASCENDING" || "VIDEO_BITRATE_DESCENDING",
 * //         },
 * //       },
 * //     ],
 * //     SegmentDurationSeconds: Number("int"),
 * //   },
 * //   PackagingGroupId: "STRING_VALUE",
 * //   Tags: { // Tags
 * //     "<keys>": "STRING_VALUE",
 * //   },
 * // };
 *
 * ```
 *
 * @param DescribePackagingConfigurationCommandInput - {@link DescribePackagingConfigurationCommandInput}
 * @returns {@link DescribePackagingConfigurationCommandOutput}
 * @see {@link DescribePackagingConfigurationCommandInput} for command's `input` shape.
 * @see {@link DescribePackagingConfigurationCommandOutput} for command's `response` shape.
 * @see {@link MediaPackageVodClientResolvedConfig | config} for MediaPackageVodClient's `config` shape.
 *
 * @throws {@link ForbiddenException} (client fault)
 *  The client is not authorized to access the requested resource.
 *
 * @throws {@link InternalServerErrorException} (server fault)
 *  An unexpected error occurred.
 *
 * @throws {@link NotFoundException} (client fault)
 *  The requested resource does not exist.
 *
 * @throws {@link ServiceUnavailableException} (server fault)
 *  An unexpected error occurred.
 *
 * @throws {@link TooManyRequestsException} (client fault)
 *  The client has exceeded their resource or throttling limits.
 *
 * @throws {@link UnprocessableEntityException} (client fault)
 *  The parameters sent in the request are not valid.
 *
 * @throws {@link MediaPackageVodServiceException}
 * <p>Base exception class for all service exceptions from MediaPackageVod service.</p>
 *
 */
export class DescribePackagingConfigurationCommand extends $Command<
  DescribePackagingConfigurationCommandInput,
  DescribePackagingConfigurationCommandOutput,
  MediaPackageVodClientResolvedConfig
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
  constructor(readonly input: DescribePackagingConfigurationCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: MediaPackageVodClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<DescribePackagingConfigurationCommandInput, DescribePackagingConfigurationCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(
      getEndpointPlugin(configuration, DescribePackagingConfigurationCommand.getEndpointParameterInstructions())
    );

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "MediaPackageVodClient";
    const commandName = "DescribePackagingConfigurationCommand";
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
    input: DescribePackagingConfigurationCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return se_DescribePackagingConfigurationCommand(input, context);
  }

  /**
   * @internal
   */
  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<DescribePackagingConfigurationCommandOutput> {
    return de_DescribePackagingConfigurationCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
