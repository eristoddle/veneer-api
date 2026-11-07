# Interface: SurfaceContribution

Defined in: [index.ts:1629](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1629)

A side-panel surface contribution (FR-7, AD-4, AD-15). `id` is the full contribution ID,
`<pluginId>:<name>`; `title` names it for assistive tech and tooltips; `icon` is a Lucide icon
name in kebab case (`"folder"`, `"list-tree"`), which the kernel draws as the surface's tab (an
unknown name gets a generic icon); `side` is the panel it opens in. The kernel draws the
panel frame, the tab, and the rows; the plugin only hands it a view (`api.surfaces.setView`).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1630](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1630)

***

### title

> **title**: `string`

Defined in: [index.ts:1631](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1631)

***

### icon

> **icon**: `string`

Defined in: [index.ts:1632](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1632)

***

### side?

> `optional` **side?**: [`SurfaceSide`](../type-aliases/SurfaceSide.md)

Defined in: [index.ts:1638](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1638)

The panel it opens in. Optional since 0.49.0 (Story 20.1): leave it out and `scope` picks the
default (`project` is left, `file` is right). A surface with neither is refused. When both
are given, `side` wins. The writer can still move a panel, and the move is remembered.

***

### scope?

> `optional` **scope?**: [`SurfaceScope`](../type-aliases/SurfaceScope.md)

Defined in: [index.ts:1648](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1648)

Whether the panel is about the whole project (`project`: left, like Files and Search) or the
file being written (`file`: right, like Outline and Properties). With no `side`, this sets
where the panel first opens; with a `side`, it only describes the panel. Added in 0.49.0.

#### Example

```ts
// manifest.json: { "id": "notes:days", "title": "Days", "icon": "calendar", "scope": "project" }
const scope: SurfaceScope = 'project'
```

***

### width?

> `optional` **width?**: [`SurfaceWidth`](../type-aliases/SurfaceWidth.md)

Defined in: [index.ts:1653](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1653)

`wide` (Story 9.23) opens the panel at twice a side's width, for cards: the writer drags
its edge to resize it, and the width is remembered for this surface alone. Default `normal`.

***

### stayOpenOnOpen?

> `optional` **stayOpenOnOpen?**: `boolean`

Defined in: [index.ts:1660](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1660)

Opening a row (Enter or a click) keeps the panel open and focus where it is (Story 17.4), so
a list of hits can be stepped through: Enter opens the highlighted row and moves the
highlight to the next one, Shift+Enter to the previous (stopping at the ends). Esc closes the
panel as usual. Default false: opening closes a floating panel and returns the caret.

***

### rowActions?

> `optional` **rowActions?**: [`RowActionContribution`](RowActionContribution.md)[]

Defined in: [index.ts:1662](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1662)

Actions on the surface's rows, drawn and run by the kernel (Story 2.8, AD-4).

***

### projectType?

> `optional` **projectType?**: `string`

Defined in: [index.ts:1672](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1672)

Show this panel only in a project of this type (a full id, `<pluginId>/<type>`) or a type
that `extends` it. In a project with another type, or none, its tab is not drawn. Commands
are not gated. Added in 0.58.0.

#### Example

```ts
// manifest.json: { "id": "notes:board", "title": "Board", "icon": "kanban", "scope": "project", "projectType": "notes/notes-project" }
const type: string = 'notes/notes-project'
```

***

### usesAI?

> `optional` **usesAI?**: `boolean`

Defined in: [index.ts:1674](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1674)

True when this feature needs an AI model; hidden while AI features are off.
