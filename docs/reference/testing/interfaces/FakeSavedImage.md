# Interface: FakeSavedImage

Defined in: [testing.ts:241](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L241)

One `api.vault.saveImage` call, as the fake host recorded it.

## Properties

### bytes

> **bytes**: `Uint8Array`

Defined in: [testing.ts:242](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L242)

***

### name

> **name**: `string` \| `undefined`

Defined in: [testing.ts:244](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L244)

The dropped file's name; undefined for a paste.

***

### link

> **link**: `string` \| `null`

Defined in: [testing.ts:246](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L246)

The link the fake returned, or null when the call was made to fail.
