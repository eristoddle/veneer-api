# Interface: DocumentOpenedEvent

Defined in: [index.ts:139](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L139)

Emitted when a document becomes the open one (FR-10): a Finder open, `api.workspace.open`, or
a window loading with a document open. `path` is the API path: project-relative with `/`, or
absolute for a loose file. `api.workspace.current()` already reports it when this arrives.

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"document:opened"`

Defined in: [index.ts:140](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L140)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### path

> `readonly` **path**: `string`

Defined in: [index.ts:141](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L141)
