# Interface: FakeHistory

Defined in: [testing.ts:227](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L227)

The fake `api.history` (Story 9.13): one branch, `main`, held in memory.

## Properties

### repository

> **repository**: `boolean`

Defined in: [testing.ts:229](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L229)

Whether `init` ran (or the test set it).

***

### commits

> `readonly` **commits**: [`FakeHistoryCommit`](FakeHistoryCommit.md)[]

Defined in: [testing.ts:231](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L231)

Every commit on every branch, oldest first, each with the files as of it.

***

### branches

> `readonly` **branches**: `Map`\<`string`, `string` \| `null`\>

Defined in: [testing.ts:233](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L233)

Branch names to their newest commit ID (null before the first commit); starts with `main`.

***

### current

> **current**: `string`

Defined in: [testing.ts:235](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L235)

The branch the project's files are on.

***

### tags

> `readonly` **tags**: `Map`\<`string`, \{ `commit`: `string`; `message`: `string`; \}\>

Defined in: [testing.ts:237](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L237)

Tag names to the commit they name and their message.

***

### remotes

> `readonly` **remotes**: `Map`\<`string`, `string`\>

Defined in: [testing.ts:239](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L239)

Remote names to addresses (`setRemote`).

***

### syncs

> `readonly` **syncs**: [`HistorySyncOptions`](../../index/interfaces/HistorySyncOptions.md)[]

Defined in: [testing.ts:241](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L241)

Every `sync` call, in order (the fake has no network: a sync only records).

***

### syncResult?

> `optional` **syncResult?**: [`HistorySyncResult`](../../index/interfaces/HistorySyncResult.md)

Defined in: [testing.ts:243](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L243)

What the next `sync` resolves with; by default it reports a push.
