# Interface: WorkspaceState

Defined in: [index.ts:202](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L202)

What is open now (FR-10, AD-14).

## Properties

### project

> **project**: [`WorkspaceProject`](WorkspaceProject.md) \| `null`

Defined in: [index.ts:204](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L204)

The open project or loose file's folder, or null before anything opened.

***

### document

> **document**: `string` \| `null`

Defined in: [index.ts:206](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L206)

The open document's API path, or null (none, or the untitled page before its first save).
