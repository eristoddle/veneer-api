# Interface: FrontmatterField

Defined in: [index.ts:1708](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1708)

One frontmatter field a project type describes. Advisory only: nothing enforces it (AD-13).

## Properties

### key

> **key**: `string`

Defined in: [index.ts:1710](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1710)

The frontmatter key, e.g. `pov`.

***

### type

> **type**: `"number"` \| `"boolean"` \| `"list"` \| `"text"` \| `"date"`

Defined in: [index.ts:1711](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1711)

***

### label?

> `optional` **label?**: `string`

Defined in: [index.ts:1713](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1713)

Shown in advice; defaults to the key.

***

### required?

> `optional` **required?**: `boolean`

Defined in: [index.ts:1715](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1715)

A document without it is advised, never blocked.
