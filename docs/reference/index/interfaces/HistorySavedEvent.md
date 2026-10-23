# Interface: HistorySavedEvent

Defined in: [index.ts:3176](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3176)

Emitted after Veneer makes a commit for any plugin (`save`, `merge`, `commitOn`), to every
plugin, so a history panel can refresh whoever made it.

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"history:saved"`

Defined in: [index.ts:3177](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3177)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### commit

> `readonly` **commit**: [`HistoryCommit`](HistoryCommit.md)

Defined in: [index.ts:3178](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3178)
