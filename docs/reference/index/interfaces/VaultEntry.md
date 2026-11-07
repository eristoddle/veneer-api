# Interface: VaultEntry

Defined in: [index.ts:149](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L149)

One entry of `api.vault.list` (FR-10, AD-14). `path` is the API path (project-relative with `/`,
or absolute for a loose file); `name` is the base name with its extension (`b.md`, `notes`).
`file` is a markdown document; `image` is a PNG, JPEG, GIF, WebP, or SVG (Story 2.8).

## Properties

### path

> **path**: `string`

Defined in: [index.ts:150](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L150)

***

### name

> **name**: `string`

Defined in: [index.ts:151](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L151)

***

### kind

> **kind**: `"file"` \| `"folder"` \| `"image"`

Defined in: [index.ts:153](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L153)

`image` also covers `.docx` files (since 0.58.0): listed so they can be renamed and moved.
