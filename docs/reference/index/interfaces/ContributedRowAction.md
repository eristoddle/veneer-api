# Interface: ContributedRowAction

Defined in: [index.ts:1132](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1132)

A row action a plugin adds to a surface another plugin owns (Story 17.1, AD-5), declared in
`contributes.rowActions` with the `surface` it targets (for the Files panel, `files:tree`). It
is a `RowActionContribution` limited to the `confirm` and `none` inputs, since the other inputs
drive the owner's tree. The kernel lists it after the owner's items, and the contributing plugin
handles it with `api.surfaces.onRowAction(surface, handler)`; the handler gets the row's ID (for
the Files panel, the project-relative path, which `api.vault` takes). Turning the plugin off
removes it.

## Extends

- [`RowActionContribution`](RowActionContribution.md)

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1109](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1109)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`id`](RowActionContribution.md#id)

***

### title

> **title**: `string`

Defined in: [index.ts:1110](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1110)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`title`](RowActionContribution.md#title)

***

### input

> **input**: [`RowActionInput`](../type-aliases/RowActionInput.md)

Defined in: [index.ts:1111](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1111)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`input`](RowActionContribution.md#input)

***

### appliesTo

> **appliesTo**: [`RowActionTarget`](../type-aliases/RowActionTarget.md)[]

Defined in: [index.ts:1112](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1112)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`appliesTo`](RowActionContribution.md#appliesto)

***

### key?

> `optional` **key?**: `string`

Defined in: [index.ts:1113](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1113)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`key`](RowActionContribution.md#key)

***

### prompt?

> `optional` **prompt?**: `string`

Defined in: [index.ts:1114](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1114)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`prompt`](RowActionContribution.md#prompt)

***

### verb?

> `optional` **verb?**: `string`

Defined in: [index.ts:1115](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1115)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`verb`](RowActionContribution.md#verb)

***

### contributedBy?

> `optional` **contributedBy?**: `string`

Defined in: [index.ts:1120](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1120)

Set by the kernel, never in a manifest: the ID of the plugin that contributed this action to
a surface it does not own (`contributes.rowActions`). Absent on the owner's own actions.

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`contributedBy`](RowActionContribution.md#contributedby)

***

### surface

> **surface**: `string`

Defined in: [index.ts:1133](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1133)
