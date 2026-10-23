# Interface: SurfaceContribution

Defined in: [index.ts:935](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L935)

A side-panel surface contribution (FR-7, AD-4, AD-15). `id` is the full contribution ID,
`<pluginId>:<name>`; `title` names it for assistive tech and tooltips; `icon` is a Lucide icon
name in kebab case (`"folder"`, `"list-tree"`), which the kernel draws as the surface's tab (an
unknown name gets a generic icon); `side` is the panel it opens in. The kernel draws the
panel frame, the tab, and the rows; the plugin only hands it a view (`api.surfaces.setView`).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:936](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L936)

***

### title

> **title**: `string`

Defined in: [index.ts:937](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L937)

***

### icon

> **icon**: `string`

Defined in: [index.ts:938](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L938)

***

### side

> **side**: [`SurfaceSide`](../type-aliases/SurfaceSide.md)

Defined in: [index.ts:939](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L939)

***

### width?

> `optional` **width?**: [`SurfaceWidth`](../type-aliases/SurfaceWidth.md)

Defined in: [index.ts:944](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L944)

`wide` (Story 9.23) opens the panel at twice a side's width, for cards: the writer drags
its edge to resize it, and the width is remembered for this surface alone. Default `normal`.

***

### rowActions?

> `optional` **rowActions?**: [`RowActionContribution`](RowActionContribution.md)[]

Defined in: [index.ts:946](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L946)

Actions on the surface's rows, drawn and run by the kernel (Story 2.8, AD-4).
