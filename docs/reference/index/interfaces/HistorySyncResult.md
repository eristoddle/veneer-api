# Interface: HistorySyncResult

Defined in: [index.ts:3156](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3156)

What a sync did (Story 9.18).

## Properties

### fetched

> **fetched**: `boolean`

Defined in: [index.ts:3158](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3158)

The remote had commits this project did not.

***

### merged

> **merged**: `"none"` \| `"fast-forward"` \| `"merge"`

Defined in: [index.ts:3160](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3160)

How they came in: not at all, by fast-forward, or by a merge commit.

***

### pushed

> **pushed**: `boolean`

Defined in: [index.ts:3162](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3162)

This project's commits went to the remote.

***

### upToDate

> **upToDate**: `boolean`

Defined in: [index.ts:3164](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3164)

Nothing moved either way.

***

### commit

> **commit**: [`HistoryCommit`](HistoryCommit.md) \| `null`

Defined in: [index.ts:3166](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3166)

The merge commit, when `merged` is `merge`; otherwise null.
