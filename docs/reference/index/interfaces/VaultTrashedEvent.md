# Interface: VaultTrashedEvent

Defined in: [index.ts:181](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L181)

Emitted after `api.vault.trash` moved something to the OS trash (FR-10).

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"vault:trashed"`

Defined in: [index.ts:182](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L182)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### path

> `readonly` **path**: `string`

Defined in: [index.ts:183](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L183)

***

### kind

> `readonly` **kind**: `"file"` \| `"folder"`

Defined in: [index.ts:184](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L184)
