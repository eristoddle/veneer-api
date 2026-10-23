# Interface: VaultEntry

Defined in: [index.ts:149](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L149)

One entry of `api.vault.list` (FR-10, AD-14). `path` is the API path (project-relative with `/`,
or absolute for a loose file); `name` is the base name with its extension (`b.md`, `notes`).
`file` is a markdown document; `image` is a PNG, JPEG, GIF, WebP, or SVG (Story 2.8).

## Properties

### path

> **path**: `string`

Defined in: [index.ts:150](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L150)

***

### name

> **name**: `string`

Defined in: [index.ts:151](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L151)

***

### kind

> **kind**: `"file"` \| `"folder"` \| `"image"`

Defined in: [index.ts:152](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L152)
