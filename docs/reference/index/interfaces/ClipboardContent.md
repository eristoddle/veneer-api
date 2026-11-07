# Interface: ClipboardContent

Defined in: [index.ts:4790](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4790)

What `api.clipboard.write` puts on the clipboard.

## Properties

### text

> **text**: `string`

Defined in: [index.ts:4792](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4792)

Plain text; always written, and what a paste into a plain editor gets.

***

### html?

> `optional` **html?**: `string`

Defined in: [index.ts:4794](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4794)

Optional HTML for rich targets; `text` is the fallback for everything else.
