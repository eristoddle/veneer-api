# Interface: ViewItem

Defined in: [index.ts:1768](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1768)

One row of a list or tree view. `id` is what `onOpen` handlers receive.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1769](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1769)

***

### label

> **label**: `string`

Defined in: [index.ts:1770](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1770)

***

### children?

> `optional` **children?**: `ViewItem`[]

Defined in: [index.ts:1772](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1772)

A tree row's children; the kernel indents them and collapses them with Left/Right.

***

### group?

> `optional` **group?**: `boolean`

Defined in: [index.ts:1777](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1777)

A group row, like a folder: Enter or a click expands or collapses it instead of opening it,
and the panel stays open. `onOpen` never receives a group row's ID.

***

### expanded?

> `optional` **expanded?**: `boolean`

Defined in: [index.ts:1782](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1782)

Whether a tree row with children starts expanded (default true). Read only the first time
the kernel sees the row's ID; after that, the writer's own toggles win.

***

### kind?

> `optional` **kind?**: [`RowKind`](../type-aliases/RowKind.md)

Defined in: [index.ts:1784](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1784)

What the row stands for; the surface's row actions for that kind apply to it.

***

### opens?

> `optional` **opens?**: `boolean`

Defined in: [index.ts:1789](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1789)

False when Enter or a click only selects the row: the panel stays and `onOpen` never gets
it (an image in Files). Default true.

***

### keepsPanel?

> `optional` **keepsPanel?**: `boolean`

Defined in: [index.ts:1795](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1795)

True keeps the panel open when the row is opened (Story 29.3): `onOpen` still gets it, and
the plugin shows what it likes, e.g. a folder that turns the panel into its own cards.
Default false: a floating panel closes after the row opens.

***

### detail?

> `optional` **detail?**: `string`

Defined in: [index.ts:1800](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1800)

A second line in quieter, smaller text under the label (a search hit's snippet, Story
2.10). A row with an empty `label` shows only its detail.

***

### marks?

> `optional` **marks?**: \[`number`, `number`\][]

Defined in: [index.ts:1802](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1802)

Spans of `detail` (`[from, to]` offsets) drawn on the accent tint, e.g. matched words.

***

### depth?

> `optional` **depth?**: `number`

Defined in: [index.ts:1808](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1808)

A list row's indent level (Story 2.11): an integer 0 to `MAX_LIST_DEPTH`, each level
indenting the row 10px, like an Outline heading under H1. Others are clamped; a tree
ignores it (its rows indent by nesting). Default 0.

***

### image?

> `optional` **image?**: `string`

Defined in: [index.ts:1814](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1814)

A picture for a card (Story 9.23, `ItemsView.layout: 'cards'`): a path to an image inside
the project, such as `images/mara.png`. Remote URLs, `data:` URLs, files outside the
project, and missing files draw no picture. Rows ignore it.

***

### synopsis?

> `optional` **synopsis?**: `string`

Defined in: [index.ts:1819](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1819)

A card's synopsis (Story 29.1): a few sentences drawn under the title, clamped to four
lines. Rows ignore it.

***

### cardLabel?

> `optional` **cardLabel?**: [`CardLabel`](CardLabel.md)

Defined in: [index.ts:1825](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1825)

A card's label, such as a status: a color bar on the card's leading edge and the text first
in the tag row. `color` is a number 1 to 6 (the `--vn-label-*` tokens); without one the
host picks a color from the text, the same each time. Rows ignore it.

***

### tags?

> `optional` **tags?**: `string`[]

Defined in: [index.ts:1827](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1827)

A card's tags, small chips under the synopsis. The first three show. Rows ignore them.

***

### editable?

> `optional` **editable?**: `object`

Defined in: [index.ts:1833](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1833)

What the writer may edit on the card. `synopsis: true` lets a double-click on the synopsis
(or Enter on a focused card) open a text field; the new text reaches
`api.surfaces.onItemEdit`.

#### synopsis?

> `optional` **synopsis?**: `boolean`
