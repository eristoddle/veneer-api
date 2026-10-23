# Interface: FakeSavedImage

Defined in: [testing.ts:188](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L188)

One `api.vault.saveImage` call, as the fake host recorded it.

## Properties

### bytes

> **bytes**: `Uint8Array`

Defined in: [testing.ts:189](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L189)

***

### name

> **name**: `string` \| `undefined`

Defined in: [testing.ts:191](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L191)

The dropped file's name; undefined for a paste.

***

### link

> **link**: `string` \| `null`

Defined in: [testing.ts:193](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/testing.ts#L193)

The link the fake returned, or null when the call was made to fail.
