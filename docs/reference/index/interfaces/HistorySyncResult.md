# Interface: HistorySyncResult

Defined in: [index.ts:4987](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4987)

What a sync did (Story 9.18).

## Properties

### fetched

> **fetched**: `boolean`

Defined in: [index.ts:4989](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4989)

The remote had commits this project did not.

***

### merged

> **merged**: `"none"` \| `"fast-forward"` \| `"merge"`

Defined in: [index.ts:4991](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4991)

How they came in: not at all, by fast-forward, or by a merge commit.

***

### pushed

> **pushed**: `boolean`

Defined in: [index.ts:4993](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4993)

This project's commits went to the remote.

***

### upToDate

> **upToDate**: `boolean`

Defined in: [index.ts:4995](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4995)

Nothing moved either way.

***

### commit

> **commit**: [`HistoryCommit`](HistoryCommit.md) \| `null`

Defined in: [index.ts:4997](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4997)

The merge commit, when `merged` is `merge`; otherwise null.
