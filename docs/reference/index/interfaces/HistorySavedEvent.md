# Interface: HistorySavedEvent

Defined in: [index.ts:5007](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L5007)

Emitted after Veneer makes a commit for any plugin (`save`, `merge`, `commitOn`), to every
plugin, so a history panel can refresh whoever made it.

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"history:saved"`

Defined in: [index.ts:5008](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L5008)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### commit

> `readonly` **commit**: [`HistoryCommit`](HistoryCommit.md)

Defined in: [index.ts:5009](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L5009)
