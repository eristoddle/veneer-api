# Interface: ReorderEvent

Defined in: [index.ts:1266](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1266)

A row move asked for in a `reorderable` view. `beforeId` is the sibling the row now sits
before, or null for the end of its siblings; `parentId` is the parent row's ID, or null at the
top level. A row only moves among its siblings.

## Properties

### movedId

> **movedId**: `string`

Defined in: [index.ts:1267](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1267)

***

### beforeId

> **beforeId**: `string` \| `null`

Defined in: [index.ts:1268](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1268)

***

### parentId

> **parentId**: `string` \| `null`

Defined in: [index.ts:1269](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1269)
