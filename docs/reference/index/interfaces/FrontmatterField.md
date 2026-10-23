# Interface: FrontmatterField

Defined in: [index.ts:1554](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1554)

One frontmatter field a project type describes. Advisory only: nothing enforces it (AD-13).

## Properties

### key

> **key**: `string`

Defined in: [index.ts:1556](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1556)

The frontmatter key, e.g. `pov`.

***

### type

> **type**: `"number"` \| `"boolean"` \| `"list"` \| `"text"` \| `"date"`

Defined in: [index.ts:1557](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1557)

***

### label?

> `optional` **label?**: `string`

Defined in: [index.ts:1559](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1559)

Shown in advice; defaults to the key.

***

### required?

> `optional` **required?**: `boolean`

Defined in: [index.ts:1561](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1561)

A document without it is advised, never blocked.
