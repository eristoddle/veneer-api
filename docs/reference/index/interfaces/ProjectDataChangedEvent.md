# Interface: ProjectDataChangedEvent

Defined in: [index.ts:3261](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3261)

Emitted to the owning plugin only, when a pull, checkout, or merge (or any tool outside Veneer)
changes or removes one of its `api.projectData` files. Veneer's own writes do not emit it.

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"project-data:changed"`

Defined in: [index.ts:3262](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3262)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### key

> `readonly` **key**: `string`

Defined in: [index.ts:3263](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3263)
