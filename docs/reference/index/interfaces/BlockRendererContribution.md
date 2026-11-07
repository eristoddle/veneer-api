# Interface: BlockRendererContribution

Defined in: [index.ts:1363](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1363)

A fenced-block renderer contribution (Story 9.4, AD-19): a plugin that draws fenced code
blocks of some languages. `id` is the full contribution ID, `<pluginId>:<name>`. `languages`
lists info-string languages (lowercase, as written after the opening fence, e.g. `mermaid`),
or is `["*"]` for every fenced block. A block goes to the most specific declaration: a
language named by one renderer beats `"*"`; among equals the first registered wins. The plugin
attaches the handler with `api.editor.registerBlockRenderer`; declare an activation event
(such as `app:started`) so it is loaded before blocks need it.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1364](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1364)

***

### languages

> **languages**: `string`[]

Defined in: [index.ts:1365](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1365)
