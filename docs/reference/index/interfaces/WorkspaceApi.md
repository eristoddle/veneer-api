# Interface: WorkspaceApi

Defined in: [index.ts:676](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L676)

The window's project and open document (FR-10, AD-14). Plugins never touch the filesystem
(AD-6): opening goes through main, which scope-checks every path.

## Methods

### current()

> **current**(): [`WorkspaceState`](WorkspaceState.md)

Defined in: [index.ts:688](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L688)

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

Defined in: [index.ts:700](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L700)

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

### open()

> **open**(`path`, `options?`): `Promise`\<`void`\>

Defined in: [index.ts:720](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L720)

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

### revealImage()

> **revealImage**(`path`): `Promise`\<`void`\>

Defined in: [index.ts:731](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L731)

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

Defined in: [index.ts:743](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L743)

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

Defined in: [index.ts:756](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L756)

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

Defined in: [index.ts:770](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L770)

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

Defined in: [index.ts:786](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L786)

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

### textReplacements()

> **textReplacements**(): `Promise`\<[`TextReplacement`](TextReplacement.md)[]\>

Defined in: [index.ts:800](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L800)

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
