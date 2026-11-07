# Interface: SourcesApi

Defined in: [index.ts:4378](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4378)

Read-only folders the writer grants a plugin (Story 27.1, AD-6): a notes vault, a research
folder. The manifest must say `needs: ["sourceFolders"]` (the install warning shows it as
"Read folders you choose, outside your project"). The writer picks each folder in a native
dialog; main keeps the real path and checks every call stays inside it, refusing `..`,
absolute paths, and links that leave the folder. There is no write, rename, or delete here.
Removing the plugin removes its grants.

## Methods

### pickFolder()

> **pickFolder**(`label?`): `Promise`\<[`SourceFolder`](SourceFolder.md) \| `null`\>

Defined in: [index.ts:4388](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4388)

Opens the folder dialog; resolves with the granted folder, or null when the writer cancels.
Choosing a folder the plugin already has returns the existing grant.

#### Parameters

##### label?

`string`

#### Returns

`Promise`\<[`SourceFolder`](SourceFolder.md) \| `null`\>

#### Example

```ts
const vault = await api.sources.pickFolder('Choose your notes folder')
if (vault) console.log(`Granted ${vault.name}`)
```

***

### folders()

> **folders**(): `Promise`\<[`SourceFolder`](SourceFolder.md)[]\>

Defined in: [index.ts:4396](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4396)

The folders this plugin was granted.

#### Returns

`Promise`\<[`SourceFolder`](SourceFolder.md)[]\>

#### Example

```ts
for (const folder of await api.sources.folders()) console.log(folder.name)
```

***

### remove()

> **remove**(`id`): `Promise`\<`void`\>

Defined in: [index.ts:4405](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4405)

Forgets a grant; the folder itself is untouched. An unknown ID is ignored.

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
const [{ id: folderId }] = await api.sources.folders()
await api.sources.remove(folderId)
```

***

### list()

> **list**(`id`, `dir?`): `Promise`\<[`SourceEntry`](SourceEntry.md)[]\>

Defined in: [index.ts:4417](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4417)

The folders and markdown or text files directly inside `dir` (the granted folder's top when
left out), folders first, skipping `.obsidian`, `.git`, `.trash`, `node_modules`, and hidden
files. Rejects `sources/out-of-scope` for a path that leaves the folder.

#### Parameters

##### id

`string`

##### dir?

`string`

#### Returns

`Promise`\<[`SourceEntry`](SourceEntry.md)[]\>

#### Example

```ts
const [{ id: folderId }] = await api.sources.folders()
const entries = await api.sources.list(folderId, 'Projects')
console.log(entries.map((e) => e.name))
```

***

### read()

> **read**(`id`, `path`): `Promise`\<`string`\>

Defined in: [index.ts:4428](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4428)

One markdown or plain-text file's text, up to `MAX_SOURCE_READ_BYTES`. Rejects
`sources/out-of-scope`, `sources/not-found`, or `sources/unreadable`.

#### Parameters

##### id

`string`

##### path

`string`

#### Returns

`Promise`\<`string`\>

#### Example

```ts
const [{ id: folderId }] = await api.sources.folders()
const text = await api.sources.read(folderId, 'Ideas/Island.md')
console.log(text.length)
```

***

### search()

> **search**(`id`, `query`, `options?`): `Promise`\<[`SourceHit`](SourceHit.md)[]\>

Defined in: [index.ts:4441](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4441)

Searches the folder's `.md` files for `query` (case-insensitive, literal) in their text and
titles, skipping the folders `list` skips. It gives up after about two seconds per folder
and returns what it found, at most `limit` hits (`MAX_SOURCE_HITS` at most), notes whose
title matches first.

#### Parameters

##### id

`string`

##### query

`string`

##### options?

[`SourceSearchOptions`](SourceSearchOptions.md)

#### Returns

`Promise`\<[`SourceHit`](SourceHit.md)[]\>

#### Example

```ts
const [{ id: folderId }] = await api.sources.folders()
const hits = await api.sources.search(folderId, 'lighthouse', { limit: 10 })
console.log(hits.map((h) => h.title))
```
