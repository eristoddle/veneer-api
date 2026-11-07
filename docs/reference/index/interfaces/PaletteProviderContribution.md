# Interface: PaletteProviderContribution

Defined in: [index.ts:2286](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2286)

A palette provider contribution (FR-9, UX-DR15, AD-5): items listed when the writer deletes
the `>` (files mode). `id` is `<pluginId>:<name>`; `title` names it.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:2287](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2287)

***

### title

> **title**: `string`

Defined in: [index.ts:2288](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2288)

***

### usesAI?

> `optional` **usesAI?**: `boolean`

Defined in: [index.ts:2290](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2290)

True when this feature needs an AI model; hidden while AI features are off.
