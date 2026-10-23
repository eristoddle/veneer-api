# Interface: PluginApi

Defined in: [index.ts:2290](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2290)

What a plugin receives in `onload`. Every method that registers returns a `Disposable`.

## Properties

### pluginId

> `readonly` **pluginId**: `string`

Defined in: [index.ts:2291](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2291)

***

### apiVersion

> `readonly` **apiVersion**: `string`

Defined in: [index.ts:2292](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2292)

***

### commands

> `readonly` **commands**: `object`

Defined in: [index.ts:2293](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2293)

#### handle()

> **handle**(`id`, `handler`): [`Disposable`](Disposable.md)

Attaches the handler for a command declared in this plugin's manifest. An ID the
manifest doesn't declare throws `plugin/undeclared-contribution` (AD-5).

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

##### Parameters

###### id

`string`

###### handler

[`CommandHandler`](../type-aliases/CommandHandler.md)

##### Returns

[`Disposable`](Disposable.md)

##### Example

```ts
export function onload(api: PluginApi): void {
  api.commands.handle('my-plugin:hello', () => {
    console.log('Hello from my plugin')
  })
}
```

***

### tools

> `readonly` **tools**: `object`

Defined in: [index.ts:2311](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2311)

#### handle()

> **handle**(`id`, `handler`): [`Disposable`](Disposable.md)

Attaches the handler for a tool declared in this plugin's manifest
(`contributes.tools`). An ID the manifest doesn't declare throws
`plugin/undeclared-contribution` (AD-5). The handler returns a `ToolResult` and never
touches the page (AD-10).

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

##### Parameters

###### id

`string`

###### handler

[`ToolHandler`](../type-aliases/ToolHandler.md)

##### Returns

[`Disposable`](Disposable.md)

##### Example

```ts
api.tools.handle('my-plugin:shout', (input) => ({
  kind: 'replace',
  options: [(input.selection?.text ?? '').toUpperCase()]
}))
```

***

### events

> `readonly` **events**: `object`

Defined in: [index.ts:2330](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2330)

#### on()

> **on**(`name`, `listener`): [`Disposable`](Disposable.md)

Listens for a Veneer event by its `domain:past-verb` name. The listener gets the event object; the subscription is a disposable the kernel disposes with the plugin.

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

##### Parameters

###### name

`` `${string}:${string}` ``

###### listener

[`EventListener`](../type-aliases/EventListener.md)

##### Returns

[`Disposable`](Disposable.md)

##### Example

```ts
api.events.on('vault:saved', (event) => {
  const saved = event as VaultSavedEvent
  console.log(`${saved.path} saved, ${saved.content.length} characters`)
})
```

***

### editor

> `readonly` **editor**: `object`

Defined in: [index.ts:2346](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2346)

#### registerHost()

> **registerHost**(`factory`): [`Disposable`](Disposable.md)

Registers the editor host factory (AD-18). Only a plugin whose manifest declares
`contributes.editorHost: true` may call it; others get `plugin/undeclared-contribution`
(AD-5). The kernel calls the factory once it has a mount.

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

##### Parameters

###### factory

[`EditorHostFactory`](../type-aliases/EditorHostFactory.md)

##### Returns

[`Disposable`](Disposable.md)

##### Example

```ts
export function onload(api: PluginApi): void {
  api.editor.registerHost((mount) => createMyEditor(mount.parent))
}
```

#### registerMode()

> **registerMode**(`id`, `extension`): [`Disposable`](Disposable.md)

Attaches the extension set for an editing mode declared in this plugin's manifest
(`contributes.editingModes`, FR-12, AD-5, AD-7). An undeclared ID throws
`plugin/undeclared-contribution`; registering one ID twice throws
`plugin/duplicate-handler`. The kernel applies it when the writer picks the mode, which
activates the plugin first if needed. If applying it throws synchronously (see
`EditorHost.setMode`), the previous mode is restored and the plugin fails with one notice;
errors CM6 catches itself (view plugins, decoration providers) are only logged. A mode
must only draw (see `EditingModeExtension`). Disposing withdraws the mode; if it was showing,
the editor falls back to the default mode.

##### Parameters

###### id

`string`

###### extension

`unknown`

##### Returns

[`Disposable`](Disposable.md)

##### Example

```ts
api.editor.registerMode('my-plugin:typewriter', typewriterExtensions)
```

#### registerBlockRenderer()

> **registerBlockRenderer**(`id`, `render`): [`Disposable`](Disposable.md)

Attaches the handler for a fenced-block renderer declared in this plugin's manifest
(`contributes.blockRenderers`, Story 9.4, AD-5, AD-19). An undeclared ID throws
`plugin/undeclared-contribution`; registering one ID twice throws `plugin/duplicate-handler`.
The editor then asks it to draw matching blocks (see `BlockRenderer`). Disposing withdraws it.

##### Parameters

###### id

`string`

###### render

[`BlockRenderer`](../type-aliases/BlockRenderer.md)

##### Returns

[`Disposable`](Disposable.md)

##### Example

```ts
api.editor.registerBlockRenderer('my-plugin:shout', (block) => ({
  kind: 'html',
  html: `<p><strong>${block.text.toUpperCase().replace(/[<&]/g, '')}</strong></p>`
}))
```

#### getText()

> **getText**(): `string` \| `null`

The open document's text (`\n` line endings), or null when there is no editor or the
page is the untitled page before its first save created a file.

##### Returns

`string` \| `null`

##### Example

```ts
const text = api.editor.getText()
if (text !== null) console.log(`${text.split(/\s+/).length} words`)
```

#### getSelection()

> **getSelection**(): [`EditorSelection`](EditorSelection.md) \| `null`

The main selection, or null when `getText` would return null.

##### Returns

[`EditorSelection`](EditorSelection.md) \| `null`

##### Example

```ts
const selection = api.editor.getSelection()
if (selection !== null && selection.from !== selection.to) {
  console.log('Something is selected')
}
```

#### onChanged()

> **onChanged**(`listener`): [`Disposable`](Disposable.md)

Fires after any change to the open document's text (typing, undo, paste, a plugin's
edit), and when another document shows or none does, including the untitled page getting
its file (Story 2.11). It carries nothing: read `getText`, which may now be null. It
fires on every keystroke, so debounce heavy work. Disposed with the plugin; a throw fails
only this plugin.

##### Parameters

###### listener

() => `void`

##### Returns

[`Disposable`](Disposable.md)

##### Example

```ts
const subscription = api.editor.onChanged(() => scheduleRecount())
// api.editor.onChanged returns a Disposable; the kernel disposes it when the plugin unloads.
```

#### onSelectionChanged()

> **onSelectionChanged**(`listener`): [`Disposable`](Disposable.md)

Fires when the open document's main selection or caret moves, from any origin, while
`getSelection` would return non-null (Story 2.11). Disposed with the plugin; a throw fails
only this plugin.

##### Parameters

###### listener

(`selection`) => `void`

##### Returns

[`Disposable`](Disposable.md)

##### Example

```ts
api.editor.onSelectionChanged((selection) => {
  highlightHeadingAt(selection.from)
})
```

#### edit()

> **edit**(`changes`): `void`

Changes the open document: one transaction and one undo step, tagged `plugin:<id>`,
autosaved like typing (AD-8). Offsets are into `getText()`; several changes must be
sorted and not overlap. Throws `editor/unavailable` (no document), `vault/read-only`, or
`editor/bad-change`, each carrying `pluginId`.

##### Parameters

###### changes

[`TextChange`](TextChange.md) \| [`TextChange`](TextChange.md)[]

##### Returns

`void`

##### Example

```ts
api.editor.edit({ from: 0, to: 0, text: '# Title\n\n' })
```

#### setMarks()

> **setMarks**(`setId`, `marks`): `void`

Marks ranges of the open document (Story 9.17): annotations that show in the writing
itself. Each mark has an `id` (unique in the set), a `from` and `to` offset into the
text `getText` returns, a `kind` (`note`, `flag`, or `change`; the kernel picks the tint),
and an optional `label`. Setting a set replaces its marks; `[]` clears it. The kernel
draws them over the real text, never changing the text or the undo history, and the marks
follow the writer's edits. They go when the document is closed or switched and when the
plugin is turned off. A malformed set, or more than 3000 marks in all, throws
`plugin/bad-marks` with a plain sentence.

##### Parameters

###### setId

`string`

###### marks

[`Mark`](Mark.md)[]

##### Returns

`void`

##### Example

```ts
const text = api.editor.getText() ?? ''
const at = text.indexOf('lighthouse')
if (at >= 0) {
  api.editor.setMarks('my-plugin:notes', [
    { id: 'n1', from: at, to: at + 'lighthouse'.length, kind: 'note', label: 'Check the name' }
  ])
}
```

#### onMarkClick()

> **onMarkClick**(`setId`, `handler`): [`Disposable`](Disposable.md)

Called with a mark's `id` when the writer clicks one of this plugin's marks in set
`setId`; the caret still moves. The plugin decides what to show.

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

##### Parameters

###### setId

`string`

###### handler

(`markId`) => `unknown`

##### Returns

[`Disposable`](Disposable.md)

##### Example

```ts
api.editor.onMarkClick('my-plugin:notes', (markId) => {
  api.surfaces.show('my-plugin:notes-panel')
  console.log(`Clicked ${markId}`)
})
```

***

### vault

> `readonly` **vault**: `object`

Defined in: [index.ts:2493](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2493)

#### process()

> **process**(`path`, `fn`): `Promise`\<`string`\>

Read-modify-write of the document at `path` (an API path: project-relative, or absolute
for a loose file) (AD-8). `fn` gets the current text (`\n` endings) and returns the new
text; the promise resolves to it. The open document changes through the editor as one
undo step; a closed one is written atomically by main, changing only the edited bytes and
keeping line endings, BOM, and encoding, then `vault:saved` is emitted. If the file
changes between the read and the write, `fn` runs again (up to three tries). Returning
the same text writes nothing; line endings in the returned text are normalized to `\n`.
Only markdown documents (`.md`, `.markdown`) can be processed. Rejects, carrying
`pluginId`, with:
- `vault/out-of-scope`: outside the project or loose folder, or not a markdown document;
- `vault/read-failed`: the file is missing or can't be read; `vault/write-failed`;
- `vault/read-only`: not UTF-8 (or UTF-16 with a BOM);
- `vault/changed`: still changing after three tries;
- `vault/document-open`: open in the editor but not the active document;
- `editor/bad-change`: `fn` returned something other than a string;
- `editor/unavailable`: no document handle; `plugin/unavailable`: the plugin is disabled
  or failed.
If `fn` throws, rejects with that error and nothing changes.

##### Parameters

###### path

`string`

###### fn

(`text`) => `string`

##### Returns

`Promise`\<`string`\>

##### Example

```ts
const next = await api.vault.process('notes/todo.md', (text) => text.replace('- [ ] ship', '- [x] ship'))
```

#### read()

> **read**(`path`): `Promise`\<`string`\>

The text of the document at `path` as of its last save: what is on disk, with `\n`
endings, the same text a `vault:saved` event for that save carried (FR-55, AD-8). An open
document's unsaved edits are not in it. The Story 7.6 foundation for a history plugin
that reads what each save wrote. Only markdown documents; rejects, carrying `pluginId`,
with `vault/out-of-scope`, `vault/read-failed`, `vault/read-only` (not UTF-8, or UTF-16
without a BOM), or `plugin/unavailable`.

##### Parameters

###### path

`string`

##### Returns

`Promise`\<`string`\>

##### Example

```ts
const savedText = await api.vault.read('chapters/one.md')
console.log(`${savedText.length} characters on disk`)
```

#### saveNow()

> **saveNow**(): `Promise`\<`void`\>

Saves the open document now, if it has unsaved typing, and resolves once it is on disk,
so a following `vault.read` returns what the page shows (Story 9.19). With nothing open
or nothing unsaved it resolves at once. Rejects `vault/write-failed` when the save fails.

##### Returns

`Promise`\<`void`\>

##### Example

```ts
await api.vault.saveNow()
const chapter = await api.vault.read('chapters/one.md')
```

#### readFile()

> **readFile**(`path`): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

An image file's bytes, for an export that sends a chapter's pictures or a cover (Story
9.19). `path` is an API path inside the open project, or inside a loose file's own folder:
stricter than the page, which may show `../images/x.png` from outside it. Only the image
types the editor draws (PNG, JPEG, GIF, WebP, SVG), whose bytes must really be an image,
up to 100 MB. Anything else rejects `vault/out-of-scope` (or `vault/too-large`).

##### Parameters

###### path

`string`

##### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

##### Example

```ts
const cover = await api.vault.readFile('images/cover.png')
console.log(`${cover.byteLength} bytes`)
```

#### saveImage()

> **saveImage**(`bytes`, `name?`): `Promise`\<[`SavedImage`](SavedImage.md)\>

Saves image bytes for the open document (FR-62, AD-14) and resolves to the markdown to
insert: `![alt](link)`. Main writes the file into the document's own folder, or the
project's `imageFolder` from `.veneer/config.json`, and never overwrites (a clash gets
`-2`, `-3`). The type is sniffed from the bytes: PNG, JPEG, GIF, WebP, or SVG, at most
`MAX_IMAGE_BYTES`. `name` is a dropped file's own name, made filesystem-safe; without it
the image was pasted and is named `image-YYYYMMDD-HHMMSS.<ext>`. `link` is relative to the
document, with `/` separators and unsafe characters percent-encoded; `alt` is the file's
stem, with `\`, `[`, and `]` escaped. On the untitled page the kernel first creates its
file. On failure the kernel raises one notice; the promise rejects, carrying `pluginId`,
with `vault/not-image`, `vault/too-large`, `vault/bad-image-folder`, `vault/write-failed`,
`vault/read-only`, `vault/unknown-document` (the document was switched or closed while
saving), `editor/unavailable` (no document), or `plugin/unavailable`.

##### Parameters

###### bytes

`Uint8Array`

###### name?

`string`

##### Returns

`Promise`\<[`SavedImage`](SavedImage.md)\>

##### Example

```ts
const { link, alt } = await api.vault.saveImage(pngBytes, 'cover.png')
api.editor.edit({ from: 0, to: 0, text: `![${alt}](${link})` })
```

#### list()

> **list**(): `Promise`\<[`VaultEntry`](VaultEntry.md)[]\>

The open scope's documents and folders (FR-10, AD-14), read fresh from disk: every
markdown file (`.md`, `.markdown`) and every folder holding one, dot-entries and
symlinks skipped, at most `MAX_VIEW_ITEMS` entries. A loose file's scope lists only that
file; with nothing open the list is empty. File contents are never read. Rejects, carrying
`pluginId`, with `vault/read-failed` or `plugin/unavailable`.

##### Returns

`Promise`\<[`VaultEntry`](VaultEntry.md)[]\>

##### Example

```ts
const files = (await api.vault.list()).filter((e) => e.kind === 'file')
console.log(files.map((f) => f.path))
```

#### create()

> **create**(`path`, `text?`): `Promise`\<`void`\>

Creates a markdown document at `path` (an API path in the open project) holding `text`
(default empty) and emits `vault:created` (FR-10). Never replaces a file. Rejects,
carrying `pluginId`, with `vault/exists` (the name is taken), `vault/out-of-scope` (not
in a project, outside it, not `.md`/`.markdown`, or a name starting with a dot),
`vault/write-failed` (say, the folder is missing), or `plugin/unavailable`. For the vault
codes the kernel has already shown "Couldn't create <name>: <reason>.", and a handler
that lets the rejection through is not failed for it.

##### Parameters

###### path

`string`

###### text?

`string`

##### Returns

`Promise`\<`void`\>

##### Example

```ts
await api.vault.create('notes/ideas.md', '# Ideas\n')
```

#### createFolder()

> **createFolder**(`path`): `Promise`\<`void`\>

Creates one folder (its parent must exist); same rules and errors as `create`.

##### Parameters

###### path

`string`

##### Returns

`Promise`\<`void`\>

##### Example

```ts
await api.vault.createFolder('notes/archive')
```

#### rename()

> **rename**(`from`, `to`): `Promise`\<`void`\>

Renames or moves a document, an image, or a folder (a move is a rename into another
folder) and resolves once everything that follows is done (FR-10, AD-8, AD-17): the open
document, if moved, stays on the page with its undo and caret; every document whose
relative markdown links, image embeds, or reference definitions point into the old path
is rewritten through `vault.process` (only the destination's path changes, one undo
step in an open one), and a moved document's own relative links are re-pointed; then
every rename participant runs;
then "Updated links in N documents." shows when N > 0, and `vault:renamed` is emitted. A
document that fails to update gets its own notice; the move stands. Rejects, carrying
`pluginId`, with `vault/exists`, `vault/out-of-scope` (outside the project, the root, a
folder into itself, or a file changing kind), `vault/read-failed`, `vault/rename-failed`,
or `plugin/unavailable`; on a rejection nothing moved, and for the vault codes the
kernel has already shown its notice.

##### Parameters

###### from

`string`

###### to

`string`

##### Returns

`Promise`\<`void`\>

##### Example

```ts
await api.vault.rename('notes/ideas.md', 'notes/archive/ideas.md')
```

#### trash()

> **trash**(`path`): `Promise`\<`void`\>

Moves a document, an image, or a folder (whole) to the OS trash; never a permanent delete
(FR-10). The open document's pending edits are saved first; if it was trashed, or sat in
a trashed folder, the page becomes the untitled page. Emits `vault:trashed`. Rejects,
carrying `pluginId`, with `vault/read-failed`, `vault/write-failed` (the trash refused it),
`vault/out-of-scope`, or `plugin/unavailable`; for the vault codes the kernel has already
shown its notice.

##### Parameters

###### path

`string`

##### Returns

`Promise`\<`void`\>

##### Example

```ts
await api.vault.trash('notes/old-draft.md')
```

#### onRename()

> **onRename**(`participant`): [`Disposable`](Disposable.md)

Registers a rename participant (see `RenameParticipant`): called once per rename or move,
after the kernel's own link rewrite, before `vault:renamed`. A throw fails the plugin the
usual way; the rename stands.

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

##### Parameters

###### participant

[`RenameParticipant`](../type-aliases/RenameParticipant.md)

##### Returns

[`Disposable`](Disposable.md)

##### Example

```ts
api.vault.onRename(async (rename) => {
  await rewriteMyLinks(rename.from, rename.to)
})
```

#### search()

> **search**(`query`): `Promise`\<[`SearchFileResult`](SearchFileResult.md)[]\>

Searches the open scope's markdown documents for `query` (FR-59, Story 2.10), the way find
matches (see `findInText`): a project's documents by `vault.list`'s walk rules, a loose
file only itself, nothing with nothing open. The open document's pending edits are saved
first, so its offsets match the editor. Files are read fresh off main's thread; nothing is
indexed or kept. Files that aren't UTF-8 (or UTF-16 with a BOM) or are over 8 MB are
skipped. Resolves to the documents with hits, in path order, at most
`MAX_SEARCH_MATCHES` hits in all; an empty query resolves to none without searching.
Rejects, carrying `pluginId`, with `vault/superseded` when a newer search started before
this one finished (drop it), `vault/out-of-scope` for a query over `MAX_SEARCH_QUERY`
characters, or `plugin/unavailable`.

##### Parameters

###### query

`string`

##### Returns

`Promise`\<[`SearchFileResult`](SearchFileResult.md)[]\>

##### Example

```ts
const results = await api.vault.search('stormy night')
for (const file of results) console.log(file.path, file.matches.length)
```

#### query()

> **query**(`query`): `Promise`\<[`VaultQueryResult`](VaultQueryResult.md)\>

Asks the project index which documents match, by frontmatter, tag, or links (Story 9.27,
AD-17), without reading any file: a compendium listing every character costs the same in a
series as in a short book. Every given condition must hold; see `VaultQuery`. `linksTo` matches one exact path, while `backlinks` also accepts a folder. Resolves to
the documents sorted by path, at most `limit` (default 200, never more than
`MAX_QUERY_RESULTS`), with `truncated` set when more matched. The open document's pending
edits are not in the index until they are saved (call `saveNow` first); a document saved
just before the query is already included. In a loose file, only the open file can match.
Only relative markdown links and images are tracked; wikilinks and other link styles are
not (yet). Frontmatter is cut by `splitFrontmatter`, so a block over
`FRONTMATTER_MAX_LINES` lines is body text. Rejects, carrying `pluginId`, with
`vault/out-of-scope` for a malformed or oversized query, or `plugin/unavailable`.

##### Parameters

###### query

[`VaultQuery`](VaultQuery.md)

##### Returns

`Promise`\<[`VaultQueryResult`](VaultQueryResult.md)\>

##### Example

```ts
const { results } = await api.vault.query({ frontmatter: { type: 'character' }, tag: 'lead' })
for (const character of results) console.log(character.path, character.frontmatter.name)
```

#### backlinks()

> **backlinks**(`path`): `Promise`\<`string`[]\>

The documents whose relative links point at `path`, sorted by path (Story 9.27): what
links to this chapter, this character. A folder path matches links into it. Only relative
markdown links and images are tracked; wikilinks and other link styles are not (yet).
Resolves to `[]` in a loose file. Rejects `vault/out-of-scope` for a bad path, or
`plugin/unavailable`.

##### Parameters

###### path

`string`

##### Returns

`Promise`\<`string`[]\>

##### Example

```ts
const linkers = await api.vault.backlinks('chapters/one.md')
console.log(`${linkers.length} documents link to chapter one`)
```

***

### workspace

> `readonly` **workspace**: [`WorkspaceApi`](WorkspaceApi.md)

Defined in: [index.ts:2724](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2724)

The project and open document, and opening another (FR-10, AD-14).

***

### palette

> `readonly` **palette**: [`PaletteApi`](PaletteApi.md)

Defined in: [index.ts:2726](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2726)

This plugin's declared palette providers (`contributes.paletteProviders`, FR-9).

***

### resources

> `readonly` **resources**: [`ResourcesApi`](ResourcesApi.md)

Defined in: [index.ts:2727](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2727)

***

### settings

> `readonly` **settings**: [`SettingsApi`](SettingsApi.md)

Defined in: [index.ts:2729](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2729)

This plugin's declared settings (`contributes.settings`, FR-44).

***

### surfaces

> `readonly` **surfaces**: [`SurfacesApi`](SurfacesApi.md)

Defined in: [index.ts:2731](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2731)

This plugin's declared side-panel surfaces (`contributes.surfaces`, FR-7).

***

### providers

> `readonly` **providers**: [`ProvidersApi`](ProvidersApi.md)

Defined in: [index.ts:2733](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2733)

The writer's models, for plugins that declare a provider tool (FR-34, AD-11).

***

### net

> `readonly` **net**: [`NetApi`](NetApi.md)

Defined in: [index.ts:2735](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2735)

The network, behind the writer's first-time consent (FR-51, AD-6).

***

### secrets

> `readonly` **secrets**: [`SecretsApi`](SecretsApi.md)

Defined in: [index.ts:2737](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2737)

Secret storage scoped to this plugin (Story 9.8, AD-11).

***

### export

> `readonly` **export**: [`ExportApi`](ExportApi.md)

Defined in: [index.ts:2739](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2739)

Saving a produced file where the writer chooses (Story 9.8).

***

### history

> `readonly` **history**: [`HistoryApi`](HistoryApi.md)

Defined in: [index.ts:2741](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2741)

Save points and history for the open project, kept as plain git (Story 9.13, AD-20).

***

### projectData

> `readonly` **projectData**: [`ProjectDataApi`](ProjectDataApi.md)

Defined in: [index.ts:2743](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2743)

Structured data kept in the open project, per plugin (Story 9.26).

## Methods

### notify()

> **notify**(`notice`): `void`

Defined in: [index.ts:2762](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2762)

Tells the writer that a long job finished or failed, in a notice the kernel draws and
names after this plugin (Story 9.20, AD-21). One plain sentence, no modal, no focus taken,
and at most `NOTICE_LIMIT_PER_MINUTE` a minute: the rest are dropped. It needs no
permission beyond the plugin being on, and does nothing while it is off.

`action` adds one button that opens one of this plugin's declared surfaces. An empty or
longer-than-`MAX_NOTICE_MESSAGE` message, a multi-line one, or a bad action throws
`plugin/bad-notice`; an undeclared surface throws `plugin/undeclared-contribution`.

#### Parameters

##### notice

[`PluginNoticeRequest`](PluginNoticeRequest.md)

#### Returns

`void`

#### Example

```ts
api.notify({
  message: 'The manuscript export finished.',
  action: { label: 'Show', surface: 'my-plugin:exports' }
})
```
