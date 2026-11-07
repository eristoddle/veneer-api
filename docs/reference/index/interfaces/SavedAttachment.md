# Interface: SavedAttachment

Defined in: [index.ts:3431](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3431)

What `api.vault.saveAttachment` resolves to: the pieces of `[label](link)` (Story 13.4).

## Properties

### link

> **link**: `string`

Defined in: [index.ts:3433](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3433)

Ready for `(...)`: relative to the document, wrapped in `<...>` when the path has a space.

***

### label

> **label**: `string`

Defined in: [index.ts:3435](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L3435)

The saved file's name, escaped for `[...]`.
