# Interface: NetRequest

Defined in: [index.ts:2846](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2846)

A request for `api.net.fetch` (FR-51, AD-6).

## Properties

### url

> **url**: `string`

Defined in: [index.ts:2848](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2848)

An `http:` or `https:` address with no username or password.

***

### method?

> `optional` **method?**: `"GET"` \| `"HEAD"` \| `"POST"` \| `"PUT"` \| `"PATCH"` \| `"DELETE"`

Defined in: [index.ts:2850](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2850)

Defaults to `GET`.

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [index.ts:2852](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2852)

Request headers. `Cookie` and `Host` are not passed on.

***

### body?

> `optional` **body?**: `string` \| `Uint8Array`\<`ArrayBufferLike`\> \| [`NetForm`](NetForm.md)

Defined in: [index.ts:2857](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2857)

The body, for methods that take one: text, raw bytes (up to `MAX_NET_BYTES`), or a multipart
form (`{ form: [...] }`, files included, up to `MAX_NET_BYTES` in all).

***

### as?

> `optional` **as?**: `"text"` \| `"bytes"`

Defined in: [index.ts:2862](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2862)

How to read the answer: `text` (the default; `NetResponse.text`, cut off at 5 MB) or `bytes`
(`NetResponse.data`, up to `MAX_NET_BYTES`, for a downloaded file).
