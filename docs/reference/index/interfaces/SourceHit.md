# Interface: SourceHit

Defined in: [index.ts:4353](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4353)

One note found by `api.sources.search`.

## Properties

### path

> **path**: `string`

Defined in: [index.ts:4355](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4355)

Relative to the granted folder, with `/` separators.

***

### title

> **title**: `string`

Defined in: [index.ts:4357](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4357)

The note's first heading, or its file name without the extension.

***

### line

> **line**: `number`

Defined in: [index.ts:4359](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4359)

One-based line of the match; 1 when only the title matched.

***

### snippet

> **snippet**: `string`

Defined in: [index.ts:4361](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4361)

The matching line shortened around the hit, as `api.vault.search` does.
