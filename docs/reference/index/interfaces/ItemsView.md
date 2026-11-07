# Interface: ItemsView

Defined in: [index.ts:1869](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1869)

A view the kernel draws (AD-4): rows, keyboard, filtering, and focus are the kernel's. `list`
ignores `children`. `selectedId` marks the row that stands for "here" (the open file, the
current heading); the panel opens with focus on it.

## Properties

### kind

> **kind**: `"list"` \| `"tree"`

Defined in: [index.ts:1870](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1870)

***

### items

> **items**: [`ViewItem`](ViewItem.md)[]

Defined in: [index.ts:1871](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1871)

***

### selectedId?

> `optional` **selectedId?**: `string`

Defined in: [index.ts:1872](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1872)

***

### layout?

> `optional` **layout?**: `"rows"` \| `"cards"`

Defined in: [index.ts:1878](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1878)

`cards` (Story 9.23) draws the items as a grid of cards (picture, label, one line of
`detail`) when the panel is at least 360px wide, and as rows when it is narrower. Default
`rows`. Keyboard, filtering, and row actions work the same either way.

***

### cardsWhenNarrow?

> `optional` **cardsWhenNarrow?**: `boolean`

Defined in: [index.ts:1883](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1883)

With `layout: 'cards'`, true draws cards however narrow the panel is (Story 29.3): one
column below 520px, two from there. Default false: a panel under 360px draws rows.

***

### reorderable?

> `optional` **reorderable?**: `boolean`

Defined in: [index.ts:1890](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1890)

True lets the writer rearrange the rows among their siblings (Story 9.24): drag a row, or
press Alt+Up / Alt+Down on the highlighted one. The kernel reorders nothing itself; each move
reaches `api.surfaces.onReorder`, and the view the plugin sets next is the truth. Off while
the writer's type-to-filter is active.

***

### empty?

> `optional` **empty?**: [`ViewEmptyState`](ViewEmptyState.md)

Defined in: [index.ts:1891](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1891)

***

### input?

> `optional` **input?**: [`ViewInput`](ViewInput.md)

Defined in: [index.ts:1900](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1900)

A text field the kernel draws above the rows (Story 2.10), e.g. a search box. Typing goes
to it, not to filtering the rows; each change reaches `api.surfaces.onInput`. `value` is
what the field holds: the kernel adopts it whenever a view brings a value different from
the previous view's, so a plugin clears the field by handing over `''`. Opening the panel
focuses the field; Down and Up move between it and the rows, and Enter in it opens the
highlighted row.

***

### note?

> `optional` **note?**: `string`

Defined in: [index.ts:1902](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1902)

Quiet text under the rows, shown whether or not there are rows.
