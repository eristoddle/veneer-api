# Interface: WordDiffSegment

Defined in: [index.ts:388](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L388)

One piece of a `wordDiff` result. `equal` text is in both versions, `delete` text only in the
first, `insert` text only in the second.

## Extended by

- [`DiffSegment`](DiffSegment.md)

## Properties

### kind

> **kind**: `"equal"` \| `"insert"` \| `"delete"`

Defined in: [index.ts:389](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L389)

***

### text

> **text**: `string`

Defined in: [index.ts:390](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L390)
