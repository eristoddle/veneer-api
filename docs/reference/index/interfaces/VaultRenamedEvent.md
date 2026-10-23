# Interface: VaultRenamedEvent

Defined in: [index.ts:176](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L176)

Emitted after a rename or move finished (FR-10): the file or folder moved, links into it were
rewritten, and every rename participant ran. `kind` is `file` for a document or an image.

## Extends

- [`VeneerEvent`](VeneerEvent.md)
- [`VaultRename`](VaultRename.md)

## Properties

### from

> **from**: `string`

Defined in: [index.ts:157](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L157)

#### Inherited from

[`VaultRename`](VaultRename.md).[`from`](VaultRename.md#from)

***

### to

> **to**: `string`

Defined in: [index.ts:158](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L158)

#### Inherited from

[`VaultRename`](VaultRename.md).[`to`](VaultRename.md#to)

***

### kind

> **kind**: `"file"` \| `"folder"`

Defined in: [index.ts:159](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L159)

#### Inherited from

[`VaultRename`](VaultRename.md).[`kind`](VaultRename.md#kind)

***

### type

> `readonly` **type**: `"vault:renamed"`

Defined in: [index.ts:177](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L177)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)
