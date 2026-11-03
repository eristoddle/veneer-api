# Interface: NetRequest

Defined in: [index.ts:3160](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3160)

A request for `api.net.fetch` (FR-51, AD-6).

## Properties

### url

> **url**: `string`

Defined in: [index.ts:3162](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3162)

An `http:` or `https:` address with no username or password.

***

### method?

> `optional` **method?**: `"GET"` \| `"HEAD"` \| `"POST"` \| `"PUT"` \| `"PATCH"` \| `"DELETE"`

Defined in: [index.ts:3164](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3164)

Defaults to `GET`.

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [index.ts:3166](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3166)

Request headers. `Cookie` and `Host` are not passed on.

***

### body?

> `optional` **body?**: `string` \| `Uint8Array`\<`ArrayBufferLike`\> \| [`NetForm`](NetForm.md)

Defined in: [index.ts:3171](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3171)

The body, for methods that take one: text, raw bytes (up to `MAX_NET_BYTES`), or a multipart
form (`{ form: [...] }`, files included, up to `MAX_NET_BYTES` in all).

***

### as?

> `optional` **as?**: `"text"` \| `"bytes"`

Defined in: [index.ts:3176](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3176)

How to read the answer: `text` (the default; `NetResponse.text`, cut off at 5 MB) or `bytes`
(`NetResponse.data`, up to `MAX_NET_BYTES`, for a downloaded file).
