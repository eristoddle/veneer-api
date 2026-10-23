# Interface: VaultSavedEvent

Defined in: [index.ts:103](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L103)

Emitted after a document save resolves (AD-8). `path` is the API path: project-relative with
`/` for a project file, absolute for a loose one. `content` is the saved text (`\n` endings).

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"vault:saved"`

Defined in: [index.ts:104](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L104)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### path

> `readonly` **path**: `string`

Defined in: [index.ts:105](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L105)

***

### content

> `readonly` **content**: `string`

Defined in: [index.ts:106](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L106)
