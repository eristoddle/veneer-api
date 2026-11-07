# Interface: CommandContribution

Defined in: [index.ts:1323](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1323)

A command contribution. `id` is the full contribution ID, `<pluginId>:<name>`.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1324](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1324)

***

### title

> **title**: `string`

Defined in: [index.ts:1325](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1325)

***

### keywords?

> `optional` **keywords?**: `string`[]

Defined in: [index.ts:1330](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1330)

Extra words the command palette matches as if they were in the title (Story 18.4): at most
`MAX_KEYWORDS` (10), each 1 to `MAX_KEYWORD_LENGTH` (40) characters. Added in 0.47.0.

***

### usesAI?

> `optional` **usesAI?**: `boolean`

Defined in: [index.ts:1332](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1332)

True when this feature needs an AI model; hidden while AI features are off.
