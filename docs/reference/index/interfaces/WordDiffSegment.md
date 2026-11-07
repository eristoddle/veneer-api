# Interface: WordDiffSegment

Defined in: [index.ts:520](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L520)

One piece of a `wordDiff` result. `equal` text is in both versions, `delete` text only in the
first, `insert` text only in the second.

## Extended by

- [`DiffSegment`](DiffSegment.md)

## Properties

### kind

> **kind**: `"equal"` \| `"insert"` \| `"delete"`

Defined in: [index.ts:521](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L521)

***

### text

> **text**: `string`

Defined in: [index.ts:522](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L522)
