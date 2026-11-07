# Interface: FormView

Defined in: [index.ts:1988](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1988)

A form (Story 9.25): typed fields the kernel draws, so a plugin never draws its own inputs
(AD-4). Each change reaches `api.surfaces.onFormChange`; Cmd+Enter or the submit button
(shown only with `submitLabel`) reaches `api.surfaces.onFormSubmit`. The kernel never applies
a value itself: the plugin sets the next view. The writer's in-progress text stays in a field
until a view brings a different `value` for it. Works in a panel, the modal, and a split's detail.

## Properties

### kind

> **kind**: `"form"`

Defined in: [index.ts:1989](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1989)

***

### fields

> **fields**: [`FormField`](FormField.md)[]

Defined in: [index.ts:1990](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1990)

***

### submitLabel?

> `optional` **submitLabel?**: `string`

Defined in: [index.ts:1991](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1991)

***

### note?

> `optional` **note?**: `string`

Defined in: [index.ts:1993](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1993)

A line above the fields.
