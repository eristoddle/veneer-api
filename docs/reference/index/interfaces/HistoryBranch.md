# Interface: HistoryBranch

Defined in: [index.ts:4945](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4945)

A branch in the project's history (Story 9.14).

## Properties

### name

> **name**: `string`

Defined in: [index.ts:4946](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4946)

***

### current

> **current**: `boolean`

Defined in: [index.ts:4948](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4948)

Whether the project's files are on this branch now.

***

### commit

> **commit**: `string` \| `null`

Defined in: [index.ts:4950](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4950)

Its newest commit, or null for a new repository's branch with no commit yet.
