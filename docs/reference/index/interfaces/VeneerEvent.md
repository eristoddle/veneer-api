# Interface: VeneerEvent

Defined in: [index.ts:95](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L95)

Every event carries its name in `type`; payload fields sit beside it.

## Extended by

- [`VaultSavedEvent`](VaultSavedEvent.md)
- [`VaultChangedOutsideEvent`](VaultChangedOutsideEvent.md)
- [`ProjectSwitchedEvent`](ProjectSwitchedEvent.md)
- [`DocumentOpenedEvent`](DocumentOpenedEvent.md)
- [`VaultCreatedEvent`](VaultCreatedEvent.md)
- [`VaultRenamedEvent`](VaultRenamedEvent.md)
- [`VaultTrashedEvent`](VaultTrashedEvent.md)
- [`ProjectDataChangedEvent`](ProjectDataChangedEvent.md)
- [`HistorySwitchedEvent`](HistorySwitchedEvent.md)
- [`HistorySavedEvent`](HistorySavedEvent.md)

## Properties

### type

> `readonly` **type**: `` `${string}:${string}` ``

Defined in: [index.ts:96](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L96)
