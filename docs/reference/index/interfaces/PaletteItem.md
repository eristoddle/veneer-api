# Interface: PaletteItem

Defined in: [index.ts:1480](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1480)

One item a palette provider lists. The kernel matches the query's words against `label` and
`detail` together, lists recent picks first, and draws `detail` beside the label in quieter
text (a file's folder).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1481](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1481)

***

### label

> **label**: `string`

Defined in: [index.ts:1482](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1482)

***

### detail?

> `optional` **detail?**: `string`

Defined in: [index.ts:1483](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1483)
