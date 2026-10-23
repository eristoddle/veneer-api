# Interface: ItemsView

Defined in: [index.ts:1085](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1085)

A view the kernel draws (AD-4): rows, keyboard, filtering, and focus are the kernel's. `list`
ignores `children`. `selectedId` marks the row that stands for "here" (the open file, the
current heading); the panel opens with focus on it.

## Properties

### kind

> **kind**: `"list"` \| `"tree"`

Defined in: [index.ts:1086](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1086)

***

### items

> **items**: [`ViewItem`](ViewItem.md)[]

Defined in: [index.ts:1087](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1087)

***

### selectedId?

> `optional` **selectedId?**: `string`

Defined in: [index.ts:1088](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1088)

***

### layout?

> `optional` **layout?**: `"rows"` \| `"cards"`

Defined in: [index.ts:1094](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1094)

`cards` (Story 9.23) draws the items as a grid of cards (picture, label, one line of
`detail`) when the panel is at least 360px wide, and as rows when it is narrower. Default
`rows`. Keyboard, filtering, and row actions work the same either way.

***

### reorderable?

> `optional` **reorderable?**: `boolean`

Defined in: [index.ts:1101](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1101)

True lets the writer rearrange the rows among their siblings (Story 9.24): drag a row, or
press Alt+Up / Alt+Down on the highlighted one. The kernel reorders nothing itself; each move
reaches `api.surfaces.onReorder`, and the view the plugin sets next is the truth. Off while
the writer's type-to-filter is active.

***

### empty?

> `optional` **empty?**: [`ViewEmptyState`](ViewEmptyState.md)

Defined in: [index.ts:1102](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1102)

***

### input?

> `optional` **input?**: [`ViewInput`](ViewInput.md)

Defined in: [index.ts:1111](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1111)

A text field the kernel draws above the rows (Story 2.10), e.g. a search box. Typing goes
to it, not to filtering the rows; each change reaches `api.surfaces.onInput`. `value` is
what the field holds: the kernel adopts it whenever a view brings a value different from
the previous view's, so a plugin clears the field by handing over `''`. Opening the panel
focuses the field; Down and Up move between it and the rows, and Enter in it opens the
highlighted row.

***

### note?

> `optional` **note?**: `string`

Defined in: [index.ts:1113](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1113)

Quiet text under the rows, shown whether or not there are rows.
