# Interface: NetResponse

Defined in: [index.ts:3180](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3180)

What `api.net.fetch` resolves with: any status, since a 404 is an answer, not a failure.

## Properties

### status

> **status**: `number`

Defined in: [index.ts:3181](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3181)

***

### ok

> **ok**: `boolean`

Defined in: [index.ts:3182](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3182)

***

### headers

> **headers**: `Record`\<`string`, `string`\>

Defined in: [index.ts:3184](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3184)

Response headers, names in lowercase.

***

### text

> **text**: `string`

Defined in: [index.ts:3186](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3186)

The body as text, cut off at 5 MB. Empty when the request asked for `bytes`.

***

### data?

> `optional` **data?**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [index.ts:3188](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3188)

The body's bytes, when the request asked for `as: 'bytes'`.

***

### truncated

> **truncated**: `boolean`

Defined in: [index.ts:3190](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3190)

True when the body was cut off at the limit.
