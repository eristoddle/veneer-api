# Type Alias: RowActionHandler

> **RowActionHandler** = (`actionId`, `rowId`, `value?`) => `unknown`

Defined in: [index.ts:1747](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1747)

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
