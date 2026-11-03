# Interface: DiffSegment

Defined in: [index.ts:1357](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1357)

One piece of a `DiffView`: a `wordDiff` segment, with an optional `id` on the insert and
delete segments that make up one change. Neighbouring segments with the same `id` are one
change, so a replaced word (a delete then an insert) is accepted or rejected as one.

## Extends

- [`WordDiffSegment`](WordDiffSegment.md)

## Properties

### kind

> **kind**: `"equal"` \| `"insert"` \| `"delete"`

Defined in: [index.ts:389](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L389)

#### Inherited from

[`WordDiffSegment`](WordDiffSegment.md).[`kind`](WordDiffSegment.md#kind)

***

### text

> **text**: `string`

Defined in: [index.ts:390](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L390)

#### Inherited from

[`WordDiffSegment`](WordDiffSegment.md).[`text`](WordDiffSegment.md#text)

***

### id?

> `optional` **id?**: `string`

Defined in: [index.ts:1359](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1359)

Names the change this segment belongs to; ignored on `equal` segments.
