# Variable: VAULT\_ERROR

> `const` **VAULT\_ERROR**: `object`

Defined in: [index.ts:3680](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L3680)

Vault error codes a plugin can see from `api.vault` (AD-6, AD-8).

## Type Declaration

### outOfScope

> `readonly` **outOfScope**: `"vault/out-of-scope"` = `'vault/out-of-scope'`

### readFailed

> `readonly` **readFailed**: `"vault/read-failed"` = `'vault/read-failed'`

### writeFailed

> `readonly` **writeFailed**: `"vault/write-failed"` = `'vault/write-failed'`

### unknownDocument

> `readonly` **unknownDocument**: `"vault/unknown-document"` = `'vault/unknown-document'`

### badSnapshot

> `readonly` **badSnapshot**: `"vault/bad-snapshot"` = `'vault/bad-snapshot'`

The snapshot id is not a snapshot of that document (Story 3.4).

### readOnly

> `readonly` **readOnly**: `"vault/read-only"` = `'vault/read-only'`

### renameFailed

> `readonly` **renameFailed**: `"vault/rename-failed"` = `'vault/rename-failed'`

### exists

> `readonly` **exists**: `"vault/exists"` = `'vault/exists'`

`create`, `createFolder`, `rename`: something already has that name (Story 2.8).

### changed

> `readonly` **changed**: `"vault/changed"` = `'vault/changed'`

The file changed between the read and the write.

### documentOpen

> `readonly` **documentOpen**: `"vault/document-open"` = `'vault/document-open'`

The file is open in the editor, which owns it (AD-8).

### notImage

> `readonly` **notImage**: `"vault/not-image"` = `'vault/not-image'`

`saveImage`: the bytes aren't a PNG, JPEG, GIF, WebP, or SVG (FR-62).

### tooLarge

> `readonly` **tooLarge**: `"vault/too-large"` = `'vault/too-large'`

`saveImage`: more than `MAX_IMAGE_BYTES`.

### badImageFolder

> `readonly` **badImageFolder**: `"vault/bad-image-folder"` = `'vault/bad-image-folder'`

`saveImage`: the project's `imageFolder` is absolute or leads outside the project.

### superseded

> `readonly` **superseded**: `"vault/superseded"` = `'vault/superseded'`

`search`: a newer search started before this one finished (Story 2.10).
