# Interface: NetRequest

Defined in: [index.ts:4534](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4534)

A request for `api.net.fetch` (FR-51, AD-6).

## Properties

### url

> **url**: `string`

Defined in: [index.ts:4536](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4536)

An `http:` or `https:` address with no username or password.

***

### method?

> `optional` **method?**: `"GET"` \| `"HEAD"` \| `"POST"` \| `"PUT"` \| `"PATCH"` \| `"DELETE"`

Defined in: [index.ts:4538](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4538)

Defaults to `GET`.

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [index.ts:4540](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4540)

Request headers. `Cookie` and `Host` are not passed on.

***

### body?

> `optional` **body?**: `string` \| `Uint8Array`\<`ArrayBufferLike`\> \| [`NetForm`](NetForm.md)

Defined in: [index.ts:4545](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4545)

The body, for methods that take one: text, raw bytes (up to `MAX_NET_BYTES`), or a multipart
form (`{ form: [...] }`, files included, up to `MAX_NET_BYTES` in all).

***

### as?

> `optional` **as?**: `"text"` \| `"bytes"`

Defined in: [index.ts:4550](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4550)

How to read the answer: `text` (the default; `NetResponse.text`, cut off at 5 MB) or `bytes`
(`NetResponse.data`, up to `MAX_NET_BYTES`, for a downloaded file).
