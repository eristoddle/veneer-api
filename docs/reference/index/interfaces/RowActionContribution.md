# Interface: RowActionContribution

Defined in: [index.ts:1108](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1108)

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

Defined in: [index.ts:1109](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1109)

***

### title

> **title**: `string`

Defined in: [index.ts:1110](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1110)

***

### input

> **input**: [`RowActionInput`](../type-aliases/RowActionInput.md)

Defined in: [index.ts:1111](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1111)

***

### appliesTo

> **appliesTo**: [`RowActionTarget`](../type-aliases/RowActionTarget.md)[]

Defined in: [index.ts:1112](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1112)

***

### key?

> `optional` **key?**: `string`

Defined in: [index.ts:1113](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1113)

***

### prompt?

> `optional` **prompt?**: `string`

Defined in: [index.ts:1114](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1114)

***

### verb?

> `optional` **verb?**: `string`

Defined in: [index.ts:1115](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1115)

***

### contributedBy?

> `optional` **contributedBy?**: `string`

Defined in: [index.ts:1120](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1120)

Set by the kernel, never in a manifest: the ID of the plugin that contributed this action to
a surface it does not own (`contributes.rowActions`). Absent on the owner's own actions.
