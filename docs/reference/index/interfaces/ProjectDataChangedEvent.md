# Interface: ProjectDataChangedEvent

Defined in: [index.ts:2947](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2947)

Emitted to the owning plugin only, when a pull, checkout, or merge (or any tool outside Veneer)
changes or removes one of its `api.projectData` files. Veneer's own writes do not emit it.

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"projectData:changed"`

Defined in: [index.ts:2948](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2948)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### key

> `readonly` **key**: `string`

Defined in: [index.ts:2949](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L2949)
