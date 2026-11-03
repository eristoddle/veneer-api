# Interface: HistoryCommit

Defined in: [index.ts:3477](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3477)

One save point in a project's history (Story 9.13).

## Extended by

- [`FakeHistoryCommit`](../../testing/interfaces/FakeHistoryCommit.md)

## Properties

### id

> **id**: `string`

Defined in: [index.ts:3479](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3479)

The full commit ID (40 hex characters).

***

### message

> **message**: `string`

Defined in: [index.ts:3481](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3481)

The message's first line.

***

### body

> **body**: `string`

Defined in: [index.ts:3483](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3483)

The rest of the message after the first line and the blank line after it, or `''`.

***

### author

> **author**: `object`

Defined in: [index.ts:3484](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3484)

#### name

> **name**: `string`

#### email

> **email**: `string`

***

### date

> **date**: `string`

Defined in: [index.ts:3486](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3486)

When it was made, as an ISO 8601 string.

***

### parents

> **parents**: `string`[]

Defined in: [index.ts:3488](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3488)

The commits it follows: none for the first, two for a merge.
