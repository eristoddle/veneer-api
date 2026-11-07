# Variable: SOURCES\_ERROR

> `const` **SOURCES\_ERROR**: `object`

Defined in: [index.ts:4313](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4313)

Error codes for `api.sources` (Story 27.1).

## Type Declaration

### undeclared

> `readonly` **undeclared**: `"sources/undeclared"` = `'sources/undeclared'`

The manifest does not say `needs: ["sourceFolders"]`.

### unknownFolder

> `readonly` **unknownFolder**: `"sources/unknown-folder"` = `'sources/unknown-folder'`

A folder ID this plugin was not granted.

### outOfScope

> `readonly` **outOfScope**: `"sources/out-of-scope"` = `'sources/out-of-scope'`

A path that is absolute, has `..`, or leaves the granted folder.

### notFound

> `readonly` **notFound**: `"sources/not-found"` = `'sources/not-found'`

The file or folder is not there.

### unreadable

> `readonly` **unreadable**: `"sources/unreadable"` = `'sources/unreadable'`

The file is not markdown or plain text, or is over the size cap.
