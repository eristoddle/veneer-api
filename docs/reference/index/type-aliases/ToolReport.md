# Type Alias: ToolReport

> **ToolReport** = (`options`) => `void`

Defined in: [index.ts:2947](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2947)

Shows options that have arrived so far while the handler is still running (Story 5.6). Each
call replaces the earlier one; the returned Result is the final answer. The last row is shown
as partial, so give only options that are complete.

## Parameters

### options

`string`[]

## Returns

`void`
