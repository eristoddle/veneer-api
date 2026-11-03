# Interface: ImageDestinationRequest

Defined in: [index.ts:2478](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2478)

What the kernel tells a plugin that chooses where a pasted or dropped image is saved
(Story 17.2): `document` is the open document's project path, `name` the file name core would
use (a dropped file's own name, else `image-YYYYMMDD-HHMMSS.png`-style), and `siteRoot`
whether the project has a site root set (`veneer:site-root`).

## Properties

### document

> **document**: `string`

Defined in: [index.ts:2479](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2479)

***

### name

> **name**: `string`

Defined in: [index.ts:2480](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2480)

***

### siteRoot

> **siteRoot**: `boolean`

Defined in: [index.ts:2481](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2481)
