# Interface: SplitView

Defined in: [index.ts:1299](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1299)

Two panes (Story 9.22): a list or tree on the left and any detail on the right, for a tool
that is a list plus a detail (characters and a character's form). Row opens in the list
reach `onOpen`, and the plugin sets a new view with the new detail. Keyboard focus and
filtering belong to the list. Drawn in a modal surface; a side panel draws the list only.

## Properties

### kind

> **kind**: `"split"`

Defined in: [index.ts:1300](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1300)

***

### list

> **list**: [`ItemsView`](ItemsView.md)

Defined in: [index.ts:1301](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1301)

***

### detail

> **detail**: [`ItemsView`](ItemsView.md) \| [`DomView`](DomView.md) \| [`FormView`](FormView.md) \| [`DiffView`](DiffView.md)

Defined in: [index.ts:1302](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1302)
