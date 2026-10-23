# Function: isVeneerError()

> **isVeneerError**(`value`): `value is VeneerError`

Defined in: [index.ts:81](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L81)

Tells whether a caught value is a `VeneerError`, so its `code` can be read safely.

## Parameters

### value

`unknown`

## Returns

`value is VeneerError`

## Example

```ts
try {
  await api.vault.read('missing.md')
} catch (err) {
  if (isVeneerError(err) && err.code === 'vault/read-failed') console.log('No such file')
}
```
