# Interface: VaultQueryResult

Defined in: [index.ts:302](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L302)

`api.vault.query`'s answer.

## Properties

### results

> **results**: [`VaultQueryEntry`](VaultQueryEntry.md)[]

Defined in: [index.ts:304](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L304)

Matching documents sorted by path.

***

### truncated

> **truncated**: `boolean`

Defined in: [index.ts:306](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L306)

True when more matched than were returned.
