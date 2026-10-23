# Interface: WorkspaceState

Defined in: [index.ts:201](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L201)

What is open now (FR-10, AD-14).

## Properties

### project

> **project**: [`WorkspaceProject`](WorkspaceProject.md) \| `null`

Defined in: [index.ts:203](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L203)

The open project or loose file's folder, or null before anything opened.

***

### document

> **document**: `string` \| `null`

Defined in: [index.ts:205](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L205)

The open document's API path, or null (none, or the untitled page before its first save).
