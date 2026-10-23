# Interface: RowActionContribution

Defined in: [index.ts:983](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L983)

A row action contribution (FR-10, AD-4, AD-5), declared in a surface's `rowActions`. `id` is
`<pluginId>:<name>`; `title` labels it in the row's native right-click menu; `appliesTo`
says which rows offer it; `key` (optional, an accelerator such as `F2`, `Cmd+Backspace`, or
`Shift+Cmd+M`) starts it on the focused row while the panel has focus, and needs a modifier
unless it is a function key, so letters still filter. `prompt` is the confirmation's or the
folder card's text, with `{name}` standing for the row's label (default: the title); `verb`
is the confirmation hint's word (default `confirm`).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:984](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L984)

***

### title

> **title**: `string`

Defined in: [index.ts:985](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L985)

***

### input

> **input**: [`RowActionInput`](../type-aliases/RowActionInput.md)

Defined in: [index.ts:986](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L986)

***

### appliesTo

> **appliesTo**: [`RowActionTarget`](../type-aliases/RowActionTarget.md)[]

Defined in: [index.ts:987](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L987)

***

### key?

> `optional` **key?**: `string`

Defined in: [index.ts:988](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L988)

***

### prompt?

> `optional` **prompt?**: `string`

Defined in: [index.ts:989](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L989)

***

### verb?

> `optional` **verb?**: `string`

Defined in: [index.ts:990](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L990)
