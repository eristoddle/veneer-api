# Interface: SurfaceContribution

Defined in: [index.ts:1049](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1049)

A side-panel surface contribution (FR-7, AD-4, AD-15). `id` is the full contribution ID,
`<pluginId>:<name>`; `title` names it for assistive tech and tooltips; `icon` is a Lucide icon
name in kebab case (`"folder"`, `"list-tree"`), which the kernel draws as the surface's tab (an
unknown name gets a generic icon); `side` is the panel it opens in. The kernel draws the
panel frame, the tab, and the rows; the plugin only hands it a view (`api.surfaces.setView`).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1050](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1050)

***

### title

> **title**: `string`

Defined in: [index.ts:1051](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1051)

***

### icon

> **icon**: `string`

Defined in: [index.ts:1052](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1052)

***

### side

> **side**: [`SurfaceSide`](../type-aliases/SurfaceSide.md)

Defined in: [index.ts:1053](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1053)

***

### width?

> `optional` **width?**: [`SurfaceWidth`](../type-aliases/SurfaceWidth.md)

Defined in: [index.ts:1058](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1058)

`wide` (Story 9.23) opens the panel at twice a side's width, for cards: the writer drags
its edge to resize it, and the width is remembered for this surface alone. Default `normal`.

***

### stayOpenOnOpen?

> `optional` **stayOpenOnOpen?**: `boolean`

Defined in: [index.ts:1065](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1065)

Opening a row (Enter or a click) keeps the panel open and focus where it is (Story 17.4), so
a list of hits can be stepped through: Enter opens the highlighted row and moves the
highlight to the next one, Shift+Enter to the previous (stopping at the ends). Esc closes the
panel as usual. Default false: opening closes a floating panel and returns the caret.

***

### rowActions?

> `optional` **rowActions?**: [`RowActionContribution`](RowActionContribution.md)[]

Defined in: [index.ts:1067](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1067)

Actions on the surface's rows, drawn and run by the kernel (Story 2.8, AD-4).

***

### usesAI?

> `optional` **usesAI?**: `boolean`

Defined in: [index.ts:1069](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1069)

True when this feature needs an AI model; hidden while AI features are off.
