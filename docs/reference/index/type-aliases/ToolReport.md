# Type Alias: ToolReport

> **ToolReport** = (`options`) => `void`

Defined in: [index.ts:2055](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2055)

Shows options that have arrived so far while the handler is still running (Story 5.6). Each
call replaces the earlier one; the returned Result is the final answer. The last row is shown
as partial, so give only options that are complete.

## Parameters

### options

`string`[]

## Returns

`void`
