# Variable: CLIPBOARD\_ERROR

> `const` **CLIPBOARD\_ERROR**: `object`

Defined in: [index.ts:3403](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3403)

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
