# Interface: WorkspaceApi

Defined in: [index.ts:1067](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1067)

The window's project and open document (FR-10, AD-14). Plugins never touch the filesystem
(AD-6): opening goes through main, which scope-checks every path.

## Methods

### current()

> **current**(): [`WorkspaceState`](WorkspaceState.md)

Defined in: [index.ts:1079](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1079)

What is open now: the project or loose file's folder and the open document's API path.

#### Returns

[`WorkspaceState`](WorkspaceState.md)

#### Example

```ts
const { project, document } = api.workspace.current()
if (project?.kind === 'project' && document !== null) {
  console.log(`Editing ${document} in ${project.name}`)
}
```

***

### projectType()

> **projectType**(): [`ResolvedProjectType`](ResolvedProjectType.md) \| `null`

Defined in: [index.ts:1091](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1091)

The open project's type with its inheritance applied, or null (no project, no type set, or
the plugin that offers it is off). A project has one type, stored in `.veneer/project.json`
(FR-37, AD-13).

#### Returns

[`ResolvedProjectType`](ResolvedProjectType.md) \| `null`

#### Example

```ts
const type = api.workspace.projectType()
const needsPov = type?.frontmatter.some((f) => f.key === 'pov' && f.required)
```

***

### createFromTemplate()

> **createFromTemplate**(`templateId`, `options?`): `Promise`\<`string`\>

Defined in: [index.ts:1105](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1105)

Makes a document from one of the open project's type's templates, by template ID, and opens
it with the caret after the frontmatter. Resolves the project-relative path. When the
template's name uses `{{title}}` and no `title` is given, the writer is asked for one; a
cancel rejects with `workspace/cancelled`. When the file already exists it opens and nothing
is written. Rejects `workspace/no-template` for an unknown template, and `workspace/bad-date`
for a `date` that names no real day. Added in 0.49.0; `date` and `lazy` in 0.55.0.

#### Parameters

##### templateId

`string`

##### options?

[`CreateFromTemplateOptions`](CreateFromTemplateOptions.md)

#### Returns

`Promise`\<`string`\>

#### Example

```ts
const path = await api.workspace.createFromTemplate('today')
```

***

### pick()

> **pick**(`options`): `Promise`\<`string` \| `null`\>

Defined in: [index.ts:1115](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1115)

Asks the writer to pick one of a short list with the kernel's pick card. Resolves the chosen
item's `id`, or `null` when cancelled. Added in 0.49.0.

#### Parameters

##### options

[`WorkspacePickOptions`](WorkspacePickOptions.md)

#### Returns

`Promise`\<`string` \| `null`\>

#### Example

```ts
const id = await api.workspace.pick({ title: 'New…', items: [{ id: 'a', title: 'Day' }] })
```

***

### open()

> **open**(`path`, `options?`): `Promise`\<`void`\>

Defined in: [index.ts:1135](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1135)

Makes the document at `path` (an API path) the open one, the way a Finder open does: the
current document is saved first. Resolves once main has opened it. Rejects, carrying
`pluginId`, with `vault/out-of-scope` (outside the project or loose file, or not a markdown
document), `vault/read-failed` (missing, or a folder), or `plugin/unavailable`. For the two
vault codes the kernel has already shown "Couldn't open <path>: <reason>.", and a handler
that lets the rejection through is not failed for it.

With `select` (Story 2.10), the range (offsets into the document's text, `\n` line endings,
no BOM: what `vault.search` reports) is selected once the document shows, with origin
`find`, and scrolled into view. When `path` is already the open document it is not
reloaded: only the selection moves, and undo history stays. A range past the end is
clamped; a malformed one is ignored.

#### Parameters

##### path

`string`

##### options?

[`WorkspaceOpenOptions`](WorkspaceOpenOptions.md)

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.workspace.open('chapters/one.md', { select: { from: 0, to: 5 } })
```

***

### openFolder()

> **openFolder**(`path`, `options?`): `Promise`\<`void`\>

Defined in: [index.ts:1148](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1148)

Opens a folder of the open project (an API path) as a project of its own, the same as File >
Open Folder…: with `newWindow` in a new window (a window that already has that project
comes forward instead), otherwise in this window. Rejects, carrying `pluginId`, with
`vault/out-of-scope` for a path outside the project and `vault/read-failed` when it is not
a folder. Added in 0.47.0.

#### Parameters

##### path

`string`

##### options?

[`WorkspaceOpenFolderOptions`](WorkspaceOpenFolderOptions.md)

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.workspace.openFolder('drafts', { newWindow: true })
```

***

### reveal()

> **reveal**(`path`): `Promise`\<`void`\>

Defined in: [index.ts:1160](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1160)

Shows a file, image, or folder of the open project in the system file manager (Finder), by
API path; `''` is the project root. Rejects, carrying `pluginId`, with `vault/out-of-scope`
for a path outside the project and `vault/read-failed` when it does not exist. Added in
0.47.0.

#### Parameters

##### path

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.workspace.reveal('chapters/one.md')
```

***

### revealImage()

> **revealImage**(`path`): `Promise`\<`void`\>

Defined in: [index.ts:1171](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1171)

Shows an image from the open project in the system file manager (Finder), by API path
(`images/cover.png`). Rejects `clipboard/bad-image` for anything that is not an image inside
the project.

#### Parameters

##### path

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.workspace.revealImage('images/cover.png')
```

***

### openFolderAsProject()

> **openFolderAsProject**(): `Promise`\<`void`\>

Defined in: [index.ts:1183](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1183)

Opens the loose file's folder as a project, the same flow as File > Open Folder…: the
document stays open with the same key, so its snapshots and session survive (AD-14).
Rejects, carrying `pluginId`, with `vault/out-of-scope` when the open document isn't a
loose file, `vault/unknown-document` with none open, or `plugin/unavailable`.

#### Returns

`Promise`\<`void`\>

#### Example

```ts
api.commands.handle('my-plugin:promote', () => api.workspace.openFolderAsProject())
```

***

### pickGrid()

> **pickGrid**(`options?`): `Promise`\<[`GridChoice`](GridChoice.md) \| `null`\>

Defined in: [index.ts:1196](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1196)

Asks the writer for a grid size with the kernel's grid picker (Story 11.8, AD-4): a small
popover of cells, "3 × 4" while the pointer moves across it, a click or Enter to choose, Esc
to cancel. Resolves the chosen `{ rows, cols }`, or `null` when the writer cancelled (or the
picker is not available). A second call while one is open cancels the first.

#### Parameters

##### options?

[`GridPickOptions`](GridPickOptions.md)

#### Returns

`Promise`\<[`GridChoice`](GridChoice.md) \| `null`\>

#### Example

```ts
const size = await api.workspace.pickGrid({ anchor: { x: 200, y: 120 } })
if (size !== null) console.log(`${size.rows} rows by ${size.cols} columns`)
```

***

### ask()

> **ask**(`options`): `Promise`\<`string` \| `null`\>

Defined in: [index.ts:1210](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1210)

Asks the writer one question with the kernel's text field (Story 13.5, AD-4): a title, a
line to type in (starting with `value`, selected), Enter to answer, Esc or a click outside
to cancel. Resolves the text as typed (not trimmed), or `null` when the writer cancelled (or
no card is available). A second call while one is open cancels the first. A plugin never
draws its own input. Rejects with `plugin/failed` when `title` is empty.

#### Parameters

##### options

[`AskOptions`](AskOptions.md)

#### Returns

`Promise`\<`string` \| `null`\>

#### Example

```ts
const name = await api.workspace.ask({ title: 'Rename image', value: 'cover.png' })
if (name !== null) await api.vault.rename('images/cover.png', `images/${name}`)
```

***

### pickImages()

> **pickImages**(): `Promise`\<[`PickedImage`](PickedImage.md)[]\>

Defined in: [index.ts:1226](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1226)

Asks the writer for image files with the system file dialog (Story 11.13, AD-6): it starts
where Open Folder starts and allows several files. Resolves each chosen file's name and bytes
(a file over `MAX_IMAGE_BYTES` comes back one byte past it, so `vault.saveImage` refuses it
as too large), or an empty list when the writer cancelled. The plugin saves them with
`vault.saveImage`, which applies the paste rules.

#### Returns

`Promise`\<[`PickedImage`](PickedImage.md)[]\>

#### Example

```ts
for (const image of await api.workspace.pickImages()) {
  const saved = await api.vault.saveImage(image.bytes, image.name)
  console.log(`![${saved.alt}](${saved.link})`)
}
```

***

### openExternal()

> **openExternal**(`url`): `Promise`\<`void`\>

Defined in: [index.ts:1238](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1238)

Opens an address outside Veneer (Story 27.3): a web address (`http` or `https`) in the
browser, or an `obsidian://` or `joplin://` link in that app. The app links open only for a
plugin that has a matching source: `obsidian` after the writer granted it a folder with
`api.sources`, `joplin` after the writer allowed it a local address. Rejects
`workspace/refused` for anything else.

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await api.workspace.openExternal('https://example.com/docs')
```

***

### textReplacements()

> **textReplacements**(): `Promise`\<[`TextReplacement`](TextReplacement.md)[]\>

Defined in: [index.ts:1252](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1252)

The writer's macOS text replacements (System Settings > Keyboard > Text Replacements), as
`{ shortcut, phrase }` pairs (Story 17.8). Main reads them; a plugin never touches the
system. Resolves an empty list unless the writer turned on Text replacements in Settings,
and always off macOS, so a plugin sees the list only when the writer asked for it. The
pairs are the writer's own text: never log them.

#### Returns

`Promise`\<[`TextReplacement`](TextReplacement.md)[]\>

#### Example

```ts
const pairs = await api.workspace.textReplacements()
console.log(`${pairs.length} text replacements`)
```

***

### setPageLook()

> **setPageLook**(`look`): `void`

Defined in: [index.ts:1266](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1266)

Sets this plugin's look for the page, or clears it with `null` (Story 28.3). `font` must be
a family the plugin declares in `contributes.fonts` and applies to the body text only,
winning over the writer's page font while set. `tint` is blended over the page at 12%,
moving there over `transitionMs` (no motion under Reduce Motion). One look per plugin; the
last plugin to set one wins; it clears when the plugin is disabled or unloaded. Rejects
`workspace/bad-look` for an undeclared font or a bad color.

#### Parameters

##### look

[`PageLook`](PageLook.md) \| `null`

#### Returns

`void`

#### Example

```ts
api.workspace.setPageLook({ font: 'Special Elite', tint: '#c9b79c', transitionMs: 2000 })
```

***

### obsidianDailyNotes()

> **obsidianDailyNotes**(): `Promise`\<[`ObsidianDailyNotes`](ObsidianDailyNotes.md) \| `null`\>

Defined in: [index.ts:1279](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1279)

Obsidian's daily-notes settings for the open project: the one file
`.obsidian/daily-notes.json`, read-only and nothing else under `.obsidian`. Resolves `null`
when the project has none (or it is unreadable), so a diary can follow the layout a vault
already uses (Story 28.4). Added in 0.55.0.

#### Returns

`Promise`\<[`ObsidianDailyNotes`](ObsidianDailyNotes.md) \| `null`\>

#### Example

```ts
const notes = await api.workspace.obsidianDailyNotes()
const pattern = notes === null ? 'Diary/{{date:YYYY-MM-DD}}.md' : `${notes.folder}/{{date:${notes.format}}}.md`
```
