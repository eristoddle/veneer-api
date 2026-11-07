# Interface: ImageDestinationRequest

Defined in: [index.ts:3396](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3396)

What the kernel tells a plugin that chooses where a pasted or dropped image is saved
(Story 17.2): `document` is the open document's project path, `name` the file name core would
use (a dropped file's own name, else `image-YYYYMMDD-HHMMSS.png`-style), and `siteRoot`
whether the project has a site root set (`veneer:site-root`).

## Properties

### document

> **document**: `string`

Defined in: [index.ts:3397](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3397)

***

### name

> **name**: `string`

Defined in: [index.ts:3398](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3398)

***

### siteRoot

> **siteRoot**: `boolean`

Defined in: [index.ts:3399](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3399)
