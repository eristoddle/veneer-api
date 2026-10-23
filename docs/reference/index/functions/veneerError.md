# Function: veneerError()

> **veneerError**(`code`, `message`, `pluginId?`): [`VeneerError`](../interfaces/VeneerError.md)

Defined in: [index.ts:65](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L65)

Makes the error every part of Veneer rejects with: a `code` such as `my-plugin/no-notes`, a plain message, and optionally the plugin it concerns.

## Parameters

### code

`string`

### message

`string`

### pluginId?

`string`

## Returns

[`VeneerError`](../interfaces/VeneerError.md)

## Example

```ts
throw veneerError('my-plugin/no-notes', 'There are no notes to export.', 'my-plugin')
```
