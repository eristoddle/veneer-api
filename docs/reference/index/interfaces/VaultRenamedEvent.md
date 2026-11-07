# Interface: VaultRenamedEvent

Defined in: [index.ts:177](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L177)

Emitted after a rename or move finished (FR-10): the file or folder moved, links into it were
rewritten, and every rename participant ran. `kind` is `file` for a document or an image.

## Extends

- [`VeneerEvent`](VeneerEvent.md)
- [`VaultRename`](VaultRename.md)

## Properties

### from

> **from**: `string`

Defined in: [index.ts:158](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L158)

#### Inherited from

[`VaultRename`](VaultRename.md).[`from`](VaultRename.md#from)

***

### to

> **to**: `string`

Defined in: [index.ts:159](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L159)

#### Inherited from

[`VaultRename`](VaultRename.md).[`to`](VaultRename.md#to)

***

### kind

> **kind**: `"file"` \| `"folder"`

Defined in: [index.ts:160](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L160)

#### Inherited from

[`VaultRename`](VaultRename.md).[`kind`](VaultRename.md#kind)

***

### type

> `readonly` **type**: `"vault:renamed"`

Defined in: [index.ts:178](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L178)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)
