# Interface: HistoryBranch

Defined in: [index.ts:3502](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3502)

A branch in the project's history (Story 9.14).

## Properties

### name

> **name**: `string`

Defined in: [index.ts:3503](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3503)

***

### current

> **current**: `boolean`

Defined in: [index.ts:3505](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3505)

Whether the project's files are on this branch now.

***

### commit

> **commit**: `string` \| `null`

Defined in: [index.ts:3507](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3507)

Its newest commit, or null for a new repository's branch with no commit yet.
