# Interface: FakeHostOptions

Defined in: [testing.ts:160](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L160)

## Properties

### installedPlugins?

> `optional` **installedPlugins?**: [`PluginManifest`](../../index/interfaces/PluginManifest.md)[]

Defined in: [testing.ts:162](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L162)

Other plugins `api.plugins` reports besides this one (Epic 35), as installed and on.

***

### obsidianDailyNotes?

> `optional` **obsidianDailyNotes?**: [`ObsidianDailyNotes`](../../index/interfaces/ObsidianDailyNotes.md) \| `null`

Defined in: [testing.ts:164](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L164)

What `api.workspace.obsidianDailyNotes` resolves; null (the default) means the project has none.

***

### text?

> `optional` **text?**: `string` \| `null`

Defined in: [testing.ts:166](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L166)

The open document's text; null (the default) means no document.

***

### openPath?

> `optional` **openPath?**: `string`

Defined in: [testing.ts:168](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L168)

The API path of the open document, for `vault.process`.

***

### files?

> `optional` **files?**: `Record`\<`string`, `string`\>

Defined in: [testing.ts:170](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L170)

Closed files by API path, for `vault.process`.

***

### binaryFiles?

> `optional` **binaryFiles?**: `Record`\<`string`, `Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [testing.ts:172](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L172)

Image files' bytes by API path, for `vault.readFile` (Story 9.19).

***

### remoteAllowed?

> `optional` **remoteAllowed?**: `boolean`

Defined in: [testing.ts:174](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L174)

Whether `resources.imageSource` lets remote images through (default false).

***

### imageFailure?

> `optional` **imageFailure?**: `string` \| `null`

Defined in: [testing.ts:179](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L179)

Makes `vault.saveImage` reject with this code (e.g. `vault/not-image`) instead of saving.
`setImageFailure` changes it later.

***

### settings?

> `optional` **settings?**: `Record`\<`string`, [`SettingValue`](../../index/type-aliases/SettingValue.md)\>

Defined in: [testing.ts:181](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L181)

Setting values by ID, standing in for what the writer set (FR-44).

***

### project?

> `optional` **project?**: [`WorkspaceProject`](../../index/interfaces/WorkspaceProject.md) \| `null`

Defined in: [testing.ts:183](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L183)

The open project for `workspace.current()`; null (the default) means nothing is open.

***

### projectType?

> `optional` **projectType?**: [`ResolvedProjectType`](../../index/interfaces/ResolvedProjectType.md) \| `null`

Defined in: [testing.ts:185](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L185)

What `workspace.projectType()` answers (Story 7.4); null (the default) means no type.

***

### replies?

> `optional` **replies?**: (`string` \| `string`[])[]

Defined in: [testing.ts:191](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L191)

What `api.providers` answers, one entry per call in order (the last repeats). A string is the
whole reply, an array its pieces. An empty list (the default) has no provider: each call
rejects `provider/none`.

***

### imageReplies?

> `optional` **imageReplies?**: (`"ok"` \| \{ `code`: `string`; `message`: `string`; \})[]

Defined in: [testing.ts:197](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L197)

What `api.providers.image` answers, one entry per call in order (the last repeats): the
number of pictures is the request's `count`, each a tiny PNG whose first byte after the
signature is the entry's index. An empty list (the default) has no image provider.

***

### sourceFolders?

> `optional` **sourceFolders?**: `object`[]

Defined in: [testing.ts:203](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L203)

The folders the writer would pick for `api.sources.pickFolder`, in order: a name and its
files (text by relative path). Once they are used up the pick is canceled. `api.sources`
needs the manifest's `needs` to include `sourceFolders`, as the kernel does (Story 27.1).

#### name

> **name**: `string`

#### files

> **files**: `Record`\<`string`, `string`\>

#### markers?

> `optional` **markers?**: `string`[]

***

### aiFeatures?

> `optional` **aiFeatures?**: `boolean`

Defined in: [testing.ts:205](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L205)

Whether AI features are on (default true). Off, `api.providers` rejects `ai/off` and `api.ai.enabled()` is false.

***

### providerFailure?

> `optional` **providerFailure?**: \{ `code`: `string`; `message`: `string`; \} \| `null`

Defined in: [testing.ts:207](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L207)

Makes `api.providers` calls reject with this code and sentence instead of answering.

***

### netReplies?

> `optional` **netReplies?**: (`string` \| `Partial`\<[`NetResponse`](../../index/interfaces/NetResponse.md)\>)[]

Defined in: [testing.ts:213](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L213)

What `api.net.fetch` answers, one entry per call in order (the last repeats). A string is the
body of a 200 answer. An empty list (the default) has no network: each call rejects `offline`.
The fake does not gate by tool: the real host refuses read-only tools and asks the writer.
