# Interface: FakeHistory

Defined in: [testing.ts:208](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/testing.ts#L208)

The fake `api.history` (Story 9.13): one branch, `main`, held in memory.

## Properties

### repository

> **repository**: `boolean`

Defined in: [testing.ts:210](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/testing.ts#L210)

Whether `init` ran (or the test set it).

***

### commits

> `readonly` **commits**: [`FakeHistoryCommit`](FakeHistoryCommit.md)[]

Defined in: [testing.ts:212](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/testing.ts#L212)

Every commit on every branch, oldest first, each with the files as of it.

***

### branches

> `readonly` **branches**: `Map`\<`string`, `string` \| `null`\>

Defined in: [testing.ts:214](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/testing.ts#L214)

Branch names to their newest commit ID (null before the first commit); starts with `main`.

***

### current

> **current**: `string`

Defined in: [testing.ts:216](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/testing.ts#L216)

The branch the project's files are on.

***

### tags

> `readonly` **tags**: `Map`\<`string`, \{ `commit`: `string`; `message`: `string`; \}\>

Defined in: [testing.ts:218](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/testing.ts#L218)

Tag names to the commit they name and their message.

***

### remotes

> `readonly` **remotes**: `Map`\<`string`, `string`\>

Defined in: [testing.ts:220](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/testing.ts#L220)

Remote names to addresses (`setRemote`).

***

### syncs

> `readonly` **syncs**: [`HistorySyncOptions`](../../index/interfaces/HistorySyncOptions.md)[]

Defined in: [testing.ts:222](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/testing.ts#L222)

Every `sync` call, in order (the fake has no network: a sync only records).

***

### syncResult?

> `optional` **syncResult?**: [`HistorySyncResult`](../../index/interfaces/HistorySyncResult.md)

Defined in: [testing.ts:224](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/testing.ts#L224)

What the next `sync` resolves with; by default it reports a push.
