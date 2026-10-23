# Interface: PluginManifest

Defined in: [index.ts:1785](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1785)

`manifest.json` (AD-5).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1787](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1787)

Lowercase-hyphen, e.g. `word-count`.

***

### name

> **name**: `string`

Defined in: [index.ts:1789](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1789)

Display name, used in notices ("<name> failed to load: ...").

***

### version

> **version**: `string`

Defined in: [index.ts:1790](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1790)

***

### apiVersion

> **apiVersion**: `string`

Defined in: [index.ts:1792](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1792)

The API versions this plugin accepts: `^x.y.z` or an exact `x.y.z`.

***

### main

> **main**: `string`

Defined in: [index.ts:1797](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1797)

Entry module path, relative to the plugin folder. Bundled plugins must use `index.ts`: the
composition root (`src/renderer/plugins.ts`) globs only that file.

***

### contributes

> **contributes**: [`PluginContributions`](../type-aliases/PluginContributions.md)

Defined in: [index.ts:1798](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1798)

***

### requiredProjectType?

> `optional` **requiredProjectType?**: `string`

Defined in: [index.ts:1805](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1805)

A project type (`<pluginId>/<typeId>`) the open project must have, or have a type that
`extends` it, for the plugin to be active (FR-38, AD-13). Elsewhere it stays inactive and
Settings says which type it needs. A loose file has no type, so such a plugin is inactive
there; a plugin without this field works everywhere.

***

### activationEvents?

> `optional` **activationEvents?**: `` `${string}:${string}` ``[]

Defined in: [index.ts:1807](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1807)

Events that activate the plugin before first use of a contribution.

***

### needs?

> `optional` **needs?**: `string`[]

Defined in: [index.ts:1809](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1809)

Declared capabilities. Recorded, not enforced, until Epic 6.
