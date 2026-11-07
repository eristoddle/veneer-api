# Interface: DiffSegment

Defined in: [index.ts:2001](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2001)

One piece of a `DiffView`: a `wordDiff` segment, with an optional `id` on the insert and
delete segments that make up one change. Neighbouring segments with the same `id` are one
change, so a replaced word (a delete then an insert) is accepted or rejected as one.

## Extends

- [`WordDiffSegment`](WordDiffSegment.md)

## Properties

### kind

> **kind**: `"equal"` \| `"insert"` \| `"delete"`

Defined in: [index.ts:521](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L521)

#### Inherited from

[`WordDiffSegment`](WordDiffSegment.md).[`kind`](WordDiffSegment.md#kind)

***

### text

> **text**: `string`

Defined in: [index.ts:522](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L522)

#### Inherited from

[`WordDiffSegment`](WordDiffSegment.md).[`text`](WordDiffSegment.md#text)

***

### id?

> `optional` **id?**: `string`

Defined in: [index.ts:2003](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2003)

Names the change this segment belongs to; ignored on `equal` segments.
