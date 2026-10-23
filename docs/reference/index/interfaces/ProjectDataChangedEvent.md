# Interface: ProjectDataChangedEvent

Defined in: [index.ts:2947](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2947)

Emitted to the owning plugin only, when a pull, checkout, or merge (or any tool outside Veneer)
changes or removes one of its `api.projectData` files. Veneer's own writes do not emit it.

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"project-data:changed"`

Defined in: [index.ts:2948](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2948)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### key

> `readonly` **key**: `string`

Defined in: [index.ts:2949](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L2949)
