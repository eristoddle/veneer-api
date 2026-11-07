# Interface: SavedImage

Defined in: [index.ts:3420](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3420)

What `api.vault.saveImage` resolves to: the pieces of `![alt](link)`.

## Properties

### link

> **link**: `string`

Defined in: [index.ts:3422](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3422)

Relative to the document, `/` separators, percent-encoded: ready for `(...)`.

***

### alt

> **alt**: `string`

Defined in: [index.ts:3424](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3424)

The file's stem, escaped for `[...]`.
