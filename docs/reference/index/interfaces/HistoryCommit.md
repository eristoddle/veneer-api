# Interface: HistoryCommit

Defined in: [index.ts:3089](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3089)

One save point in a project's history (Story 9.13).

## Extended by

- [`FakeHistoryCommit`](../../testing/interfaces/FakeHistoryCommit.md)

## Properties

### id

> **id**: `string`

Defined in: [index.ts:3091](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3091)

The full commit ID (40 hex characters).

***

### message

> **message**: `string`

Defined in: [index.ts:3093](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3093)

The message's first line.

***

### body

> **body**: `string`

Defined in: [index.ts:3095](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3095)

The rest of the message after the first line and the blank line after it, or `''`.

***

### author

> **author**: `object`

Defined in: [index.ts:3096](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3096)

#### name

> **name**: `string`

#### email

> **email**: `string`

***

### date

> **date**: `string`

Defined in: [index.ts:3098](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3098)

When it was made, as an ISO 8601 string.

***

### parents

> **parents**: `string`[]

Defined in: [index.ts:3100](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3100)

The commits it follows: none for the first, two for a merge.
