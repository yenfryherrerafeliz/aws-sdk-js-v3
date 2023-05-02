import { EventStreamCodec } from "@aws-sdk/eventstream-codec";
import { Decoder, Encoder, EventStreamMarshaller as IEventStreamMarshaller, Message } from "@aws-sdk/types";

import { getChunkedStream } from "./getChunkedStream";
import { getUnmarshalledStream } from "./getUnmarshalledStream";

/**
 * @internal
 */
export interface EventStreamMarshaller extends IEventStreamMarshaller {}

/**
 * @internal
 */
export interface EventStreamMarshallerOptions {
  utf8Encoder: Encoder;
  utf8Decoder: Decoder;
}

/**
 * @internal
 */
export class EventStreamMarshaller {
  private readonly eventStreamCodec: EventStreamCodec;
  private readonly utfEncoder: Encoder;

  constructor({ utf8Encoder, utf8Decoder }: EventStreamMarshallerOptions) {
    this.eventStreamCodec = new EventStreamCodec(utf8Encoder, utf8Decoder);
    this.utfEncoder = utf8Encoder;
  }

  deserialize<T>(
    body: AsyncIterable<Uint8Array>,
    deserializer: (input: Record<string, Message>) => Promise<T>
  ): AsyncIterable<T> {
    const chunkedStream = getChunkedStream(body);
    const unmarshalledStream = getUnmarshalledStream(chunkedStream, {
      eventStreamCodec: this.eventStreamCodec,
      // @ts-expect-error Type 'T' is not assignable to type 'Record<string, any>'
      deserializer,
      toUtf8: this.utfEncoder,
    });
    // @ts-expect-error 'T' could be instantiated with an arbitrary type which could be unrelated to 'Record<string, any>'.
    return unmarshalledStream;
  }

  serialize<T>(input: AsyncIterable<T>, serializer: (event: T) => Message): AsyncIterable<Uint8Array> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const serializedIterator = async function* () {
      for await (const chunk of input) {
        const payloadBuf = self.eventStreamCodec.encode(serializer(chunk));
        yield payloadBuf;
      }
      // Ending frame
      yield new Uint8Array(0);
    };
    return {
      [Symbol.asyncIterator]: serializedIterator,
    };
  }
}
