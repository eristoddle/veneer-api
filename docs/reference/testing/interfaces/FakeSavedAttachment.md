# Interface: FakeSavedAttachment

Defined in: [testing.ts:233](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L233)

One `api.vault.saveAttachment` call, as the fake host recorded it.

## Properties

### bytes

> **bytes**: `Uint8Array`

Defined in: [testing.ts:234](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L234)

***

### name

> **name**: `string`

Defined in: [testing.ts:235](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L235)

***

### link

> **link**: `string` \| `null`

Defined in: [testing.ts:237](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/testing.ts#L237)

The link the fake returned, or null when the call was made to fail.
