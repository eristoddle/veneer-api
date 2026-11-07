# Interface: HistoryCommit

Defined in: [index.ts:4920](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4920)

One save point in a project's history (Story 9.13).

## Extended by

- [`FakeHistoryCommit`](../../testing/interfaces/FakeHistoryCommit.md)

## Properties

### id

> **id**: `string`

Defined in: [index.ts:4922](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4922)

The full commit ID (40 hex characters).

***

### message

> **message**: `string`

Defined in: [index.ts:4924](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4924)

The message's first line.

***

### body

> **body**: `string`

Defined in: [index.ts:4926](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4926)

The rest of the message after the first line and the blank line after it, or `''`.

***

### author

> **author**: `object`

Defined in: [index.ts:4927](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4927)

#### name

> **name**: `string`

#### email

> **email**: `string`

***

### date

> **date**: `string`

Defined in: [index.ts:4929](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4929)

When it was made, as an ISO 8601 string.

***

### parents

> **parents**: `string`[]

Defined in: [index.ts:4931](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4931)

The commits it follows: none for the first, two for a merge.
