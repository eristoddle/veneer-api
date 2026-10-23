# Type Alias: ToolReport

> **ToolReport** = (`options`) => `void`

Defined in: [index.ts:1879](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1879)

Shows options that have arrived so far while the handler is still running (Story 5.6). Each
call replaces the earlier one; the returned Result is the final answer. The last row is shown
as partial, so give only options that are complete.

## Parameters

### options

`string`[]

## Returns

`void`
