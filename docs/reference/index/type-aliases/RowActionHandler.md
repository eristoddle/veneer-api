# Type Alias: RowActionHandler

> **RowActionHandler** = (`actionId`, `rowId`, `value?`) => `unknown`

Defined in: [index.ts:1142](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1142)

A row action's handler: `rowId` is the row it was started on (`''` for the root); `value` is
what the kernel asked for (see `RowActionInput`). It may resolve to the ID of a row to focus
afterwards, e.g. the renamed row's new ID. A rejection keeps a name field open; a vault
refusal from `api.vault` already raised the kernel's notice.

## Parameters

### actionId

`string`

### rowId

`string`

### value?

`string`

## Returns

`unknown`
