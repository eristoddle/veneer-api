# Interface: ViewItem

Defined in: [index.ts:1163](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1163)

One row of a list or tree view. `id` is what `onOpen` handlers receive.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1164](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1164)

***

### label

> **label**: `string`

Defined in: [index.ts:1165](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1165)

***

### children?

> `optional` **children?**: `ViewItem`[]

Defined in: [index.ts:1167](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1167)

A tree row's children; the kernel indents them and collapses them with Left/Right.

***

### group?

> `optional` **group?**: `boolean`

Defined in: [index.ts:1172](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1172)

A group row, like a folder: Enter or a click expands or collapses it instead of opening it,
and the panel stays open. `onOpen` never receives a group row's ID.

***

### expanded?

> `optional` **expanded?**: `boolean`

Defined in: [index.ts:1177](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1177)

Whether a tree row with children starts expanded (default true). Read only the first time
the kernel sees the row's ID; after that, the writer's own toggles win.

***

### kind?

> `optional` **kind?**: [`RowKind`](../type-aliases/RowKind.md)

Defined in: [index.ts:1179](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1179)

What the row stands for; the surface's row actions for that kind apply to it.

***

### opens?

> `optional` **opens?**: `boolean`

Defined in: [index.ts:1184](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1184)

False when Enter or a click only selects the row: the panel stays and `onOpen` never gets
it (an image in Files). Default true.

***

### detail?

> `optional` **detail?**: `string`

Defined in: [index.ts:1189](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1189)

A second line in quieter, smaller text under the label (a search hit's snippet, Story
2.10). A row with an empty `label` shows only its detail.

***

### marks?

> `optional` **marks?**: \[`number`, `number`\][]

Defined in: [index.ts:1191](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1191)

Spans of `detail` (`[from, to]` offsets) drawn on the accent tint, e.g. matched words.

***

### depth?

> `optional` **depth?**: `number`

Defined in: [index.ts:1197](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1197)

A list row's indent level (Story 2.11): an integer 0 to `MAX_LIST_DEPTH`, each level
indenting the row 10px, like an Outline heading under H1. Others are clamped; a tree
ignores it (its rows indent by nesting). Default 0.

***

### image?

> `optional` **image?**: `string`

Defined in: [index.ts:1203](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1203)

A picture for a card (Story 9.23, `ItemsView.layout: 'cards'`): a path to an image inside
the project, such as `images/mara.png`. Remote URLs, `data:` URLs, files outside the
project, and missing files draw no picture. Rows ignore it.
