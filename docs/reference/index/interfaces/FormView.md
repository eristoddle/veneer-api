# Interface: FormView

Defined in: [index.ts:1344](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1344)

A form (Story 9.25): typed fields the kernel draws, so a plugin never draws its own inputs
(AD-4). Each change reaches `api.surfaces.onFormChange`; Cmd+Enter or the submit button
(shown only with `submitLabel`) reaches `api.surfaces.onFormSubmit`. The kernel never applies
a value itself: the plugin sets the next view. The writer's in-progress text stays in a field
until a view brings a different `value` for it. Works in a panel, the modal, and a split's detail.

## Properties

### kind

> **kind**: `"form"`

Defined in: [index.ts:1345](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1345)

***

### fields

> **fields**: [`FormField`](FormField.md)[]

Defined in: [index.ts:1346](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1346)

***

### submitLabel?

> `optional` **submitLabel?**: `string`

Defined in: [index.ts:1347](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1347)

***

### note?

> `optional` **note?**: `string`

Defined in: [index.ts:1349](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1349)

A line above the fields.
