# Interface: ViewItem

Defined in: [index.ts:1018](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1018)

One row of a list or tree view. `id` is what `onOpen` handlers receive.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1019](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1019)

***

### label

> **label**: `string`

Defined in: [index.ts:1020](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1020)

***

### children?

> `optional` **children?**: `ViewItem`[]

Defined in: [index.ts:1022](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1022)

A tree row's children; the kernel indents them and collapses them with Left/Right.

***

### group?

> `optional` **group?**: `boolean`

Defined in: [index.ts:1027](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1027)

A group row, like a folder: Enter or a click expands or collapses it instead of opening it,
and the panel stays open. `onOpen` never receives a group row's ID.

***

### expanded?

> `optional` **expanded?**: `boolean`

Defined in: [index.ts:1032](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1032)

Whether a tree row with children starts expanded (default true). Read only the first time
the kernel sees the row's ID; after that, the writer's own toggles win.

***

### kind?

> `optional` **kind?**: [`RowKind`](../type-aliases/RowKind.md)

Defined in: [index.ts:1034](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1034)

What the row stands for; the surface's row actions for that kind apply to it.

***

### opens?

> `optional` **opens?**: `boolean`

Defined in: [index.ts:1039](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1039)

False when Enter or a click only selects the row: the panel stays and `onOpen` never gets
it (an image in Files). Default true.

***

### detail?

> `optional` **detail?**: `string`

Defined in: [index.ts:1044](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1044)

A second line in quieter, smaller text under the label (a search hit's snippet, Story
2.10). A row with an empty `label` shows only its detail.

***

### marks?

> `optional` **marks?**: \[`number`, `number`\][]

Defined in: [index.ts:1046](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1046)

Spans of `detail` (`[from, to]` offsets) drawn on the accent tint, e.g. matched words.

***

### depth?

> `optional` **depth?**: `number`

Defined in: [index.ts:1052](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1052)

A list row's indent level (Story 2.11): an integer 0 to `MAX_LIST_DEPTH`, each level
indenting the row 10px, like an Outline heading under H1. Others are clamped; a tree
ignores it (its rows indent by nesting). Default 0.

***

### image?

> `optional` **image?**: `string`

Defined in: [index.ts:1058](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1058)

A picture for a card (Story 9.23, `ItemsView.layout: 'cards'`): a path to an image inside
the project, such as `images/mara.png`. Remote URLs, `data:` URLs, files outside the
project, and missing files draw no picture. Rows ignore it.
