# Interface: FakeHostOptions

Defined in: [testing.ts:133](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L133)

## Properties

### text?

> `optional` **text?**: `string` \| `null`

Defined in: [testing.ts:135](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L135)

The open document's text; null (the default) means no document.

***

### openPath?

> `optional` **openPath?**: `string`

Defined in: [testing.ts:137](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L137)

The API path of the open document, for `vault.process`.

***

### files?

> `optional` **files?**: `Record`\<`string`, `string`\>

Defined in: [testing.ts:139](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L139)

Closed files by API path, for `vault.process`.

***

### binaryFiles?

> `optional` **binaryFiles?**: `Record`\<`string`, `Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [testing.ts:141](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L141)

Image files' bytes by API path, for `vault.readFile` (Story 9.19).

***

### remoteAllowed?

> `optional` **remoteAllowed?**: `boolean`

Defined in: [testing.ts:143](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L143)

Whether `resources.imageSource` lets remote images through (default false).

***

### imageFailure?

> `optional` **imageFailure?**: `string` \| `null`

Defined in: [testing.ts:148](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L148)

Makes `vault.saveImage` reject with this code (e.g. `vault/not-image`) instead of saving.
`setImageFailure` changes it later.

***

### settings?

> `optional` **settings?**: `Record`\<`string`, [`SettingValue`](../../index/type-aliases/SettingValue.md)\>

Defined in: [testing.ts:150](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L150)

Setting values by ID, standing in for what the writer set (FR-44).

***

### project?

> `optional` **project?**: [`WorkspaceProject`](../../index/interfaces/WorkspaceProject.md) \| `null`

Defined in: [testing.ts:152](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L152)

The open project for `workspace.current()`; null (the default) means nothing is open.

***

### projectType?

> `optional` **projectType?**: [`ResolvedProjectType`](../../index/interfaces/ResolvedProjectType.md) \| `null`

Defined in: [testing.ts:154](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L154)

What `workspace.projectType()` answers (Story 7.4); null (the default) means no type.

***

### replies?

> `optional` **replies?**: (`string` \| `string`[])[]

Defined in: [testing.ts:160](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L160)

What `api.providers` answers, one entry per call in order (the last repeats). A string is the
whole reply, an array its pieces. An empty list (the default) has no provider: each call
rejects `provider/none`.

***

### providerFailure?

> `optional` **providerFailure?**: \{ `code`: `string`; `message`: `string`; \} \| `null`

Defined in: [testing.ts:162](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L162)

Makes `api.providers` calls reject with this code and sentence instead of answering.

***

### netReplies?

> `optional` **netReplies?**: (`string` \| `Partial`\<[`NetResponse`](../../index/interfaces/NetResponse.md)\>)[]

Defined in: [testing.ts:168](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L168)

What `api.net.fetch` answers, one entry per call in order (the last repeats). A string is the
body of a 200 answer. An empty list (the default) has no network: each call rejects `offline`.
The fake does not gate by tool: the real host refuses read-only tools and asks the writer.
