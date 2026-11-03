# Interface: SavedAttachment

Defined in: [index.ts:2513](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2513)

What `api.vault.saveAttachment` resolves to: the pieces of `[label](link)` (Story 13.4).

## Properties

### link

> **link**: `string`

Defined in: [index.ts:2515](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2515)

Ready for `(...)`: relative to the document, wrapped in `<...>` when the path has a space.

***

### label

> **label**: `string`

Defined in: [index.ts:2517](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L2517)

The saved file's name, escaped for `[...]`.
