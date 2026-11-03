# Interface: HistorySavedEvent

Defined in: [index.ts:3564](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3564)

Emitted after Veneer makes a commit for any plugin (`save`, `merge`, `commitOn`), to every
plugin, so a history panel can refresh whoever made it.

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"history:saved"`

Defined in: [index.ts:3565](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3565)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### commit

> `readonly` **commit**: [`HistoryCommit`](HistoryCommit.md)

Defined in: [index.ts:3566](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3566)
