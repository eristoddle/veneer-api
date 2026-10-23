# Interface: SplitView

Defined in: [index.ts:1154](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1154)

Two panes (Story 9.22): a list or tree on the left and any detail on the right, for a tool
that is a list plus a detail (characters and a character's form). Row opens in the list
reach `onOpen`, and the plugin sets a new view with the new detail. Keyboard focus and
filtering belong to the list. Drawn in a modal surface; a side panel draws the list only.

## Properties

### kind

> **kind**: `"split"`

Defined in: [index.ts:1155](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1155)

***

### list

> **list**: [`ItemsView`](ItemsView.md)

Defined in: [index.ts:1156](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1156)

***

### detail

> **detail**: [`ItemsView`](ItemsView.md) \| [`DomView`](DomView.md) \| [`FormView`](FormView.md) \| [`DiffView`](DiffView.md)

Defined in: [index.ts:1157](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1157)
