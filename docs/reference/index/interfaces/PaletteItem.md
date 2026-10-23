# Interface: PaletteItem

Defined in: [index.ts:1480](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1480)

One item a palette provider lists. The kernel matches the query's words against `label` and
`detail` together, lists recent picks first, and draws `detail` beside the label in quieter
text (a file's folder).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1481](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1481)

***

### label

> **label**: `string`

Defined in: [index.ts:1482](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1482)

***

### detail?

> `optional` **detail?**: `string`

Defined in: [index.ts:1483](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1483)
