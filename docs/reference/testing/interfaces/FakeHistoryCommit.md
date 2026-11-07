# Interface: FakeHistoryCommit

Defined in: [testing.ts:256](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L256)

One fake save point: the commit plus every file's text at that point, by API path.

## Extends

- [`HistoryCommit`](../../index/interfaces/HistoryCommit.md)

## Properties

### id

> **id**: `string`

Defined in: [index.ts:4922](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4922)

The full commit ID (40 hex characters).

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`id`](../../index/interfaces/HistoryCommit.md#id)

***

### message

> **message**: `string`

Defined in: [index.ts:4924](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4924)

The message's first line.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`message`](../../index/interfaces/HistoryCommit.md#message)

***

### body

> **body**: `string`

Defined in: [index.ts:4926](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4926)

The rest of the message after the first line and the blank line after it, or `''`.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`body`](../../index/interfaces/HistoryCommit.md#body)

***

### author

> **author**: `object`

Defined in: [index.ts:4927](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4927)

#### name

> **name**: `string`

#### email

> **email**: `string`

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`author`](../../index/interfaces/HistoryCommit.md#author)

***

### date

> **date**: `string`

Defined in: [index.ts:4929](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4929)

When it was made, as an ISO 8601 string.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`date`](../../index/interfaces/HistoryCommit.md#date)

***

### parents

> **parents**: `string`[]

Defined in: [index.ts:4931](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4931)

The commits it follows: none for the first, two for a merge.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`parents`](../../index/interfaces/HistoryCommit.md#parents)

***

### files

> **files**: `Record`\<`string`, `string`\>

Defined in: [testing.ts:257](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L257)
