# Variable: CLIPBOARD\_ERROR

> `const` **CLIPBOARD\_ERROR**: `object`

Defined in: [index.ts:4777](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4777)

Why an `api.clipboard` call was refused.

## Type Declaration

### invalid

> `readonly` **invalid**: `"clipboard/invalid"` = `'clipboard/invalid'`

The text or HTML is not a string, or is over `MAX_CLIPBOARD_BYTES`.

### badImage

> `readonly` **badImage**: `"clipboard/bad-image"` = `'clipboard/bad-image'`

`writeImage` was given a path that is not an image inside the open project.

### failed

> `readonly` **failed**: `"clipboard/failed"` = `'clipboard/failed'`

The system clipboard could not be read or written.
