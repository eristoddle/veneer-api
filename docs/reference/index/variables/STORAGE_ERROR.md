# Variable: STORAGE\_ERROR

> `const` **STORAGE\_ERROR**: `object`

Defined in: [index.ts:3005](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L3005)

Error codes for `api.secrets` and `api.export` (Story 9.8).

## Type Declaration

### keychain

> `readonly` **keychain**: `"secrets/keychain-unavailable"` = `'secrets/keychain-unavailable'`

The system keychain could not be read or written.

### badSecret

> `readonly` **badSecret**: `"secrets/invalid"` = `'secrets/invalid'`

A name or value `api.secrets` can't hold.

### tooLarge

> `readonly` **tooLarge**: `"export/too-large"` = `'export/too-large'`

The bytes to save are over `MAX_NET_BYTES`.

### writeFailed

> `readonly` **writeFailed**: `"export/write-failed"` = `'export/write-failed'`

The writer chose a place, but writing the file there failed.
