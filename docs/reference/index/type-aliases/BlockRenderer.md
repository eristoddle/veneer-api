# Type Alias: BlockRenderer

> **BlockRenderer** = (`block`, `signal`) => [`BlockResult`](BlockResult.md) \| `Promise`\<[`BlockResult`](BlockResult.md)\>

Defined in: [index.ts:1421](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1421)

A renderer's handler. It runs after the editor is idle, only for blocks in or near the
viewport, and is aborted through `signal` after `BLOCK_RENDER_TIMEOUT_MS`. A throw, a
rejection, or a timeout leaves the plain block and raises one kernel notice naming the plugin.

## Parameters

### block

[`BlockInfo`](../interfaces/BlockInfo.md)

### signal

`AbortSignal`

## Returns

[`BlockResult`](BlockResult.md) \| `Promise`\<[`BlockResult`](BlockResult.md)\>
