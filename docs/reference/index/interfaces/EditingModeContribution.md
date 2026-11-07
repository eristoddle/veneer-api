# Interface: EditingModeContribution

Defined in: [index.ts:1340](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1340)

An editing mode contribution (FR-12, AD-7): a way of drawing the same file text, such as live
preview. `id` is the full contribution ID, `<pluginId>:<name>`; `title` is what the View menu
shows. The plugin attaches the mode's extension set with `api.editor.registerMode`.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1341](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1341)

***

### title

> **title**: `string`

Defined in: [index.ts:1342](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1342)
