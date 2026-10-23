# Interface: HistoryBranch

Defined in: [index.ts:3114](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3114)

A branch in the project's history (Story 9.14).

## Properties

### name

> **name**: `string`

Defined in: [index.ts:3115](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3115)

***

### current

> **current**: `boolean`

Defined in: [index.ts:3117](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3117)

Whether the project's files are on this branch now.

***

### commit

> **commit**: `string` \| `null`

Defined in: [index.ts:3119](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3119)

Its newest commit, or null for a new repository's branch with no commit yet.
