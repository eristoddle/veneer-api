# Type Alias: RowActionHandler

> **RowActionHandler** = (`actionId`, `rowId`, `value?`) => `unknown`

Defined in: [index.ts:999](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L999)

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
