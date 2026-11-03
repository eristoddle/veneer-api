# Interface: ClipboardContent

Defined in: [index.ts:3416](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3416)

What `api.clipboard.write` puts on the clipboard.

## Properties

### text

> **text**: `string`

Defined in: [index.ts:3418](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3418)

Plain text; always written, and what a paste into a plain editor gets.

***

### html?

> `optional` **html?**: `string`

Defined in: [index.ts:3420](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3420)

Optional HTML for rich targets; `text` is the fallback for everything else.
