# Interface: HistorySyncResult

Defined in: [index.ts:3544](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3544)

What a sync did (Story 9.18).

## Properties

### fetched

> **fetched**: `boolean`

Defined in: [index.ts:3546](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3546)

The remote had commits this project did not.

***

### merged

> **merged**: `"none"` \| `"fast-forward"` \| `"merge"`

Defined in: [index.ts:3548](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3548)

How they came in: not at all, by fast-forward, or by a merge commit.

***

### pushed

> **pushed**: `boolean`

Defined in: [index.ts:3550](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3550)

This project's commits went to the remote.

***

### upToDate

> **upToDate**: `boolean`

Defined in: [index.ts:3552](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3552)

Nothing moved either way.

***

### commit

> **commit**: [`HistoryCommit`](HistoryCommit.md) \| `null`

Defined in: [index.ts:3554](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3554)

The merge commit, when `merged` is `merge`; otherwise null.
