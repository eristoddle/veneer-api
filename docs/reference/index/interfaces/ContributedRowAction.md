# Interface: ContributedRowAction

Defined in: [index.ts:1737](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1737)

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

Defined in: [index.ts:1714](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1714)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`id`](RowActionContribution.md#id)

***

### title

> **title**: `string`

Defined in: [index.ts:1715](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1715)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`title`](RowActionContribution.md#title)

***

### input

> **input**: [`RowActionInput`](../type-aliases/RowActionInput.md)

Defined in: [index.ts:1716](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1716)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`input`](RowActionContribution.md#input)

***

### appliesTo

> **appliesTo**: [`RowActionTarget`](../type-aliases/RowActionTarget.md)[]

Defined in: [index.ts:1717](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1717)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`appliesTo`](RowActionContribution.md#appliesto)

***

### key?

> `optional` **key?**: `string`

Defined in: [index.ts:1718](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1718)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`key`](RowActionContribution.md#key)

***

### prompt?

> `optional` **prompt?**: `string`

Defined in: [index.ts:1719](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1719)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`prompt`](RowActionContribution.md#prompt)

***

### verb?

> `optional` **verb?**: `string`

Defined in: [index.ts:1720](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1720)

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`verb`](RowActionContribution.md#verb)

***

### contributedBy?

> `optional` **contributedBy?**: `string`

Defined in: [index.ts:1725](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1725)

Set by the kernel, never in a manifest: the ID of the plugin that contributed this action to
a surface it does not own (`contributes.rowActions`). Absent on the owner's own actions.

#### Inherited from

[`RowActionContribution`](RowActionContribution.md).[`contributedBy`](RowActionContribution.md#contributedby)

***

### surface

> **surface**: `string`

Defined in: [index.ts:1738](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1738)
