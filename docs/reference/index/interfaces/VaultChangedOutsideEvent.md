# Interface: VaultChangedOutsideEvent

Defined in: [index.ts:115](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L115)

Emitted when a markdown file in the open project (or the open loose file) changes on disk
outside Veneer, e.g. by git, sync, or another editor (FR-55, Story 3.1). Veneer's own saves
never fire it. `path` is the API path, as in `VaultSavedEvent`. For the open document, the
page has already reloaded when this arrives, unless it held unsaved edits.

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"vault:changed-outside"`

Defined in: [index.ts:116](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L116)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### path

> `readonly` **path**: `string`

Defined in: [index.ts:117](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L117)
