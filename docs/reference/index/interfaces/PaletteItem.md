# Interface: PaletteItem

Defined in: [index.ts:1634](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1634)

One item a palette provider lists. The kernel matches the query's words against `label` and
`detail` together, lists recent picks first, and draws `detail` beside the label in quieter
text (a file's folder).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1635](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1635)

***

### label

> **label**: `string`

Defined in: [index.ts:1636](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1636)

***

### detail?

> `optional` **detail?**: `string`

Defined in: [index.ts:1637](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1637)
