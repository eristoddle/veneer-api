# Interface: WorkspaceApi

Defined in: [index.ts:676](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L676)

The window's project and open document (FR-10, AD-14). Plugins never touch the filesystem
(AD-6): opening goes through main, which scope-checks every path.

## Methods

### current()

> **current**(): [`WorkspaceState`](WorkspaceState.md)

Defined in: [index.ts:688](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L688)

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

Defined in: [index.ts:700](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L700)

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

Defined in: [index.ts:720](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L720)

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

### openFolderAsProject()

> **openFolderAsProject**(): `Promise`\<`void`\>

Defined in: [index.ts:732](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L732)

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
