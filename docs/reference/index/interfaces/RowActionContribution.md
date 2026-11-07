# Interface: RowActionContribution

Defined in: [index.ts:1713](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1713)

A row action contribution (FR-10, AD-4, AD-5), declared in a surface's `rowActions`. `id` is
`<pluginId>:<name>`; `title` labels it in the row's native right-click menu; `appliesTo`
says which rows offer it; `key` (optional, an accelerator such as `F2`, `Cmd+Backspace`, or
`Shift+Cmd+M`) starts it on the focused row while the panel has focus, and needs a modifier
unless it is a function key, so letters still filter. `prompt` is the confirmation's or the
folder card's text, with `{name}` standing for the row's label (default: the title); `verb`
is the confirmation hint's word (default `confirm`).

## Extended by

- [`ContributedRowAction`](ContributedRowAction.md)

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1714](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1714)

***

### title

> **title**: `string`

Defined in: [index.ts:1715](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1715)

***

### input

> **input**: [`RowActionInput`](../type-aliases/RowActionInput.md)

Defined in: [index.ts:1716](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1716)

***

### appliesTo

> **appliesTo**: [`RowActionTarget`](../type-aliases/RowActionTarget.md)[]

Defined in: [index.ts:1717](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1717)

***

### key?

> `optional` **key?**: `string`

Defined in: [index.ts:1718](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1718)

***

### prompt?

> `optional` **prompt?**: `string`

Defined in: [index.ts:1719](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1719)

***

### verb?

> `optional` **verb?**: `string`

Defined in: [index.ts:1720](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1720)

***

### contributedBy?

> `optional` **contributedBy?**: `string`

Defined in: [index.ts:1725](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1725)

Set by the kernel, never in a manifest: the ID of the plugin that contributed this action to
a surface it does not own (`contributes.rowActions`). Absent on the owner's own actions.
