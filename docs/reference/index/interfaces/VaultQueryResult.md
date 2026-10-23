# Interface: VaultQueryResult

Defined in: [index.ts:280](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L280)

`api.vault.query`'s answer.

## Properties

### results

> **results**: [`VaultQueryEntry`](VaultQueryEntry.md)[]

Defined in: [index.ts:282](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L282)

Matching documents sorted by path.

***

### truncated

> **truncated**: `boolean`

Defined in: [index.ts:284](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L284)

True when more matched than were returned.
