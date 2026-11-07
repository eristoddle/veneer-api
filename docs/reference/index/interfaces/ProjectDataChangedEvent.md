# Interface: ProjectDataChangedEvent

Defined in: [index.ts:4635](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4635)

Emitted to the owning plugin only, when a pull, checkout, or merge (or any tool outside Veneer)
changes or removes one of its `api.projectData` files. Veneer's own writes do not emit it.

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"project-data:changed"`

Defined in: [index.ts:4636](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4636)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### key

> `readonly` **key**: `string`

Defined in: [index.ts:4637](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4637)
