# Interface: WorkspaceOpenOptions

Defined in: [index.ts:216](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L216)

How `api.workspace.open` opens a document (Story 2.10).

## Properties

### select?

> `optional` **select?**: [`TextRange`](TextRange.md)

Defined in: [index.ts:218](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L218)

Select this range once the document shows (origin `find`), scrolled into view.

***

### newWindow?

> `optional` **newWindow?**: `boolean`

Defined in: [index.ts:224](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L224)

Open the document in a window of its own (the same as opening it from Finder into a new
window); when a window already shows it, that window comes forward instead. `select` is
ignored. Added in 0.47.0.
