# Function: veneerError()

> **veneerError**(`code`, `message`, `pluginId?`): [`VeneerError`](../interfaces/VeneerError.md)

Defined in: [index.ts:65](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L65)

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
