# Interface: ReorderEvent

Defined in: [index.ts:1910](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1910)

A row move asked for in a `reorderable` view. `beforeId` is the sibling the row now sits
before, or null for the end of its siblings; `parentId` is the parent row's ID, or null at the
top level. A row only moves among its siblings.

## Properties

### movedId

> **movedId**: `string`

Defined in: [index.ts:1911](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1911)

***

### beforeId

> **beforeId**: `string` \| `null`

Defined in: [index.ts:1912](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1912)

***

### parentId

> **parentId**: `string` \| `null`

Defined in: [index.ts:1913](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1913)
