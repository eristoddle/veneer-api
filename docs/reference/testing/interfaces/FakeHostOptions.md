# Interface: FakeHostOptions

Defined in: [testing.ts:142](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L142)

## Properties

### text?

> `optional` **text?**: `string` \| `null`

Defined in: [testing.ts:144](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L144)

The open document's text; null (the default) means no document.

***

### openPath?

> `optional` **openPath?**: `string`

Defined in: [testing.ts:146](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L146)

The API path of the open document, for `vault.process`.

***

### files?

> `optional` **files?**: `Record`\<`string`, `string`\>

Defined in: [testing.ts:148](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L148)

Closed files by API path, for `vault.process`.

***

### binaryFiles?

> `optional` **binaryFiles?**: `Record`\<`string`, `Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [testing.ts:150](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L150)

Image files' bytes by API path, for `vault.readFile` (Story 9.19).

***

### remoteAllowed?

> `optional` **remoteAllowed?**: `boolean`

Defined in: [testing.ts:152](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L152)

Whether `resources.imageSource` lets remote images through (default false).

***

### imageFailure?

> `optional` **imageFailure?**: `string` \| `null`

Defined in: [testing.ts:157](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L157)

Makes `vault.saveImage` reject with this code (e.g. `vault/not-image`) instead of saving.
`setImageFailure` changes it later.

***

### settings?

> `optional` **settings?**: `Record`\<`string`, [`SettingValue`](../../index/type-aliases/SettingValue.md)\>

Defined in: [testing.ts:159](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L159)

Setting values by ID, standing in for what the writer set (FR-44).

***

### project?

> `optional` **project?**: [`WorkspaceProject`](../../index/interfaces/WorkspaceProject.md) \| `null`

Defined in: [testing.ts:161](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L161)

The open project for `workspace.current()`; null (the default) means nothing is open.

***

### projectType?

> `optional` **projectType?**: [`ResolvedProjectType`](../../index/interfaces/ResolvedProjectType.md) \| `null`

Defined in: [testing.ts:163](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L163)

What `workspace.projectType()` answers (Story 7.4); null (the default) means no type.

***

### replies?

> `optional` **replies?**: (`string` \| `string`[])[]

Defined in: [testing.ts:169](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L169)

What `api.providers` answers, one entry per call in order (the last repeats). A string is the
whole reply, an array its pieces. An empty list (the default) has no provider: each call
rejects `provider/none`.

***

### aiFeatures?

> `optional` **aiFeatures?**: `boolean`

Defined in: [testing.ts:171](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L171)

Whether AI features are on (default true). Off, `api.providers` rejects `ai/off` and `api.ai.enabled()` is false.

***

### providerFailure?

> `optional` **providerFailure?**: \{ `code`: `string`; `message`: `string`; \} \| `null`

Defined in: [testing.ts:173](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L173)

Makes `api.providers` calls reject with this code and sentence instead of answering.

***

### netReplies?

> `optional` **netReplies?**: (`string` \| `Partial`\<[`NetResponse`](../../index/interfaces/NetResponse.md)\>)[]

Defined in: [testing.ts:179](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L179)

What `api.net.fetch` answers, one entry per call in order (the last repeats). A string is the
body of a 200 answer. An empty list (the default) has no network: each call rejects `offline`.
The fake does not gate by tool: the real host refuses read-only tools and asks the writer.
