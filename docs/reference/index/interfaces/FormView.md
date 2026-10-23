# Interface: FormView

Defined in: [index.ts:1194](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1194)

A form (Story 9.25): typed fields the kernel draws, so a plugin never draws its own inputs
(AD-4). Each change reaches `api.surfaces.onFormChange`; Cmd+Enter or the submit button
(shown only with `submitLabel`) reaches `api.surfaces.onFormSubmit`. The kernel never applies
a value itself: the plugin sets the next view. The writer's in-progress text stays in a field
until a view brings a different `value` for it. Works in a panel, the modal, and a split's detail.

## Properties

### kind

> **kind**: `"form"`

Defined in: [index.ts:1195](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1195)

***

### fields

> **fields**: [`FormField`](FormField.md)[]

Defined in: [index.ts:1196](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1196)

***

### submitLabel?

> `optional` **submitLabel?**: `string`

Defined in: [index.ts:1197](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1197)

***

### note?

> `optional` **note?**: `string`

Defined in: [index.ts:1199](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1199)

A line above the fields.
