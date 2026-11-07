# Interface: FakeHistory

Defined in: [testing.ts:261](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L261)

The fake `api.history` (Story 9.13): one branch, `main`, held in memory.

## Properties

### repository

> **repository**: `boolean`

Defined in: [testing.ts:263](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L263)

Whether `init` ran (or the test set it).

***

### commits

> `readonly` **commits**: [`FakeHistoryCommit`](FakeHistoryCommit.md)[]

Defined in: [testing.ts:265](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L265)

Every commit on every branch, oldest first, each with the files as of it.

***

### branches

> `readonly` **branches**: `Map`\<`string`, `string` \| `null`\>

Defined in: [testing.ts:267](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L267)

Branch names to their newest commit ID (null before the first commit); starts with `main`.

***

### current

> **current**: `string`

Defined in: [testing.ts:269](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L269)

The branch the project's files are on.

***

### tags

> `readonly` **tags**: `Map`\<`string`, \{ `commit`: `string`; `message`: `string`; \}\>

Defined in: [testing.ts:271](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L271)

Tag names to the commit they name and their message.

***

### remotes

> `readonly` **remotes**: `Map`\<`string`, `string`\>

Defined in: [testing.ts:273](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L273)

Remote names to addresses (`setRemote`).

***

### syncs

> `readonly` **syncs**: [`HistorySyncOptions`](../../index/interfaces/HistorySyncOptions.md)[]

Defined in: [testing.ts:275](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L275)

Every `sync` call, in order (the fake has no network: a sync only records).

***

### syncResult?

> `optional` **syncResult?**: [`HistorySyncResult`](../../index/interfaces/HistorySyncResult.md)

Defined in: [testing.ts:277](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L277)

What the next `sync` resolves with; by default it reports a push.
