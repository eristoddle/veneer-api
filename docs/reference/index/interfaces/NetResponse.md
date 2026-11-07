# Interface: NetResponse

Defined in: [index.ts:4554](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4554)

What `api.net.fetch` resolves with: any status, since a 404 is an answer, not a failure.

## Properties

### status

> **status**: `number`

Defined in: [index.ts:4555](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4555)

***

### ok

> **ok**: `boolean`

Defined in: [index.ts:4556](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4556)

***

### headers

> **headers**: `Record`\<`string`, `string`\>

Defined in: [index.ts:4558](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4558)

Response headers, names in lowercase.

***

### text

> **text**: `string`

Defined in: [index.ts:4560](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4560)

The body as text, cut off at 5 MB. Empty when the request asked for `bytes`.

***

### data?

> `optional` **data?**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [index.ts:4562](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4562)

The body's bytes, when the request asked for `as: 'bytes'`.

***

### truncated

> **truncated**: `boolean`

Defined in: [index.ts:4564](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4564)

True when the body was cut off at the limit.
