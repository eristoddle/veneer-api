# Interface: ProjectSwitchedEvent

Defined in: [index.ts:128](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L128)

Emitted when the project changes (FR-2, AD-14): File > Open Folder…, or opening a file that
belongs to another project or folder. Once per change of scope root or kind (a loose folder
opened as a project counts), and once more when a window loads, so a fresh renderer's
plugins learn the current project. `name` is the folder's base name, never a path; `kind` is
`project` for a project root, `loose` for a loose file's folder. Every API path after it
(`vault.process`, `vault:saved`) is relative to the new root, or absolute for a loose file.

## Extends

- [`VeneerEvent`](VeneerEvent.md)

## Properties

### type

> `readonly` **type**: `"project:switched"`

Defined in: [index.ts:129](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L129)

#### Overrides

[`VeneerEvent`](VeneerEvent.md).[`type`](VeneerEvent.md#type)

***

### name

> `readonly` **name**: `string`

Defined in: [index.ts:130](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L130)

***

### kind

> `readonly` **kind**: `"project"` \| `"loose"`

Defined in: [index.ts:131](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L131)
