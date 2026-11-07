# Interface: SplitView

Defined in: [index.ts:1943](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1943)

Two panes (Story 9.22): a list or tree on the left and any detail on the right, for a tool
that is a list plus a detail (characters and a character's form). Row opens in the list
reach `onOpen`, and the plugin sets a new view with the new detail. Keyboard focus and
filtering belong to the list. Drawn in a modal surface; a side panel draws the list only.

## Properties

### kind

> **kind**: `"split"`

Defined in: [index.ts:1944](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1944)

***

### list

> **list**: [`ItemsView`](ItemsView.md)

Defined in: [index.ts:1945](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1945)

***

### detail

> **detail**: [`ItemsView`](ItemsView.md) \| [`DomView`](DomView.md) \| [`FormView`](FormView.md) \| [`DiffView`](DiffView.md)

Defined in: [index.ts:1946](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1946)
