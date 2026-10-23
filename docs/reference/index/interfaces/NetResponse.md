# Interface: NetResponse

Defined in: [index.ts:2866](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2866)

What `api.net.fetch` resolves with: any status, since a 404 is an answer, not a failure.

## Properties

### status

> **status**: `number`

Defined in: [index.ts:2867](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2867)

***

### ok

> **ok**: `boolean`

Defined in: [index.ts:2868](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2868)

***

### headers

> **headers**: `Record`\<`string`, `string`\>

Defined in: [index.ts:2870](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2870)

Response headers, names in lowercase.

***

### text

> **text**: `string`

Defined in: [index.ts:2872](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2872)

The body as text, cut off at 5 MB. Empty when the request asked for `bytes`.

***

### data?

> `optional` **data?**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [index.ts:2874](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2874)

The body's bytes, when the request asked for `as: 'bytes'`.

***

### truncated

> **truncated**: `boolean`

Defined in: [index.ts:2876](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2876)

True when the body was cut off at the limit.
