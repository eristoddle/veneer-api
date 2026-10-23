# Interface: ReorderEvent

Defined in: [index.ts:1121](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1121)

A row move asked for in a `reorderable` view. `beforeId` is the sibling the row now sits
before, or null for the end of its siblings; `parentId` is the parent row's ID, or null at the
top level. A row only moves among its siblings.

## Properties

### movedId

> **movedId**: `string`

Defined in: [index.ts:1122](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1122)

***

### beforeId

> **beforeId**: `string` \| `null`

Defined in: [index.ts:1123](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1123)

***

### parentId

> **parentId**: `string` \| `null`

Defined in: [index.ts:1124](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1124)
