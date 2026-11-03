# Interface: FakeHistoryCommit

Defined in: [testing.ts:222](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L222)

One fake save point: the commit plus every file's text at that point, by API path.

## Extends

- [`HistoryCommit`](../../index/interfaces/HistoryCommit.md)

## Properties

### id

> **id**: `string`

Defined in: [index.ts:3479](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3479)

The full commit ID (40 hex characters).

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`id`](../../index/interfaces/HistoryCommit.md#id)

***

### message

> **message**: `string`

Defined in: [index.ts:3481](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3481)

The message's first line.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`message`](../../index/interfaces/HistoryCommit.md#message)

***

### body

> **body**: `string`

Defined in: [index.ts:3483](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3483)

The rest of the message after the first line and the blank line after it, or `''`.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`body`](../../index/interfaces/HistoryCommit.md#body)

***

### author

> **author**: `object`

Defined in: [index.ts:3484](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3484)

#### name

> **name**: `string`

#### email

> **email**: `string`

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`author`](../../index/interfaces/HistoryCommit.md#author)

***

### date

> **date**: `string`

Defined in: [index.ts:3486](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3486)

When it was made, as an ISO 8601 string.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`date`](../../index/interfaces/HistoryCommit.md#date)

***

### parents

> **parents**: `string`[]

Defined in: [index.ts:3488](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3488)

The commits it follows: none for the first, two for a merge.

#### Inherited from

[`HistoryCommit`](../../index/interfaces/HistoryCommit.md).[`parents`](../../index/interfaces/HistoryCommit.md#parents)

***

### files

> **files**: `Record`\<`string`, `string`\>

Defined in: [testing.ts:223](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L223)
