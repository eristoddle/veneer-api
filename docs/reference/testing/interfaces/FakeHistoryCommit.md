# Interface: FakeHistoryCommit

Defined in: [testing.ts:203](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L203)

One fake save point: the commit plus every file's text at that point, by API path.

## Extends

- [`HistoryCommit`](../../index/interfaces/HistoryCommit.md)

## Properties

### id

> **id**: `string`

Defined in: [index.ts:3091](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3091)

The full commit ID (40 hex characters).

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`id`](../../index/interfaces/HistoryCommit.md#id)

***

### message

> **message**: `string`

Defined in: [index.ts:3093](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3093)

The message's first line.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`message`](../../index/interfaces/HistoryCommit.md#message)

***

### body

> **body**: `string`

Defined in: [index.ts:3095](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3095)

The rest of the message after the first line and the blank line after it, or `''`.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`body`](../../index/interfaces/HistoryCommit.md#body)

***

### author

> **author**: `object`

Defined in: [index.ts:3096](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3096)

#### name

> **name**: `string`

#### email

> **email**: `string`

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`author`](../../index/interfaces/HistoryCommit.md#author)

***

### date

> **date**: `string`

Defined in: [index.ts:3098](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3098)

When it was made, as an ISO 8601 string.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`date`](../../index/interfaces/HistoryCommit.md#date)

***

### parents

> **parents**: `string`[]

Defined in: [index.ts:3100](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3100)

The commits it follows: none for the first, two for a merge.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`parents`](../../index/interfaces/HistoryCommit.md#parents)

***

### files

> **files**: `Record`\<`string`, `string`\>

Defined in: [testing.ts:204](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L204)
