# Interface: PaletteItem

Defined in: [index.ts:2298](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2298)

One item a palette provider lists. The kernel matches the query's words against `label` and
`detail` together, lists recent picks first, and draws `detail` beside the label in quieter
text (a file's folder).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:2299](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2299)

***

### label

> **label**: `string`

Defined in: [index.ts:2300](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2300)

***

### detail?

> `optional` **detail?**: `string`

Defined in: [index.ts:2301](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2301)
