# Interface: PluginManifest

Defined in: [index.ts:1943](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1943)

`manifest.json` (AD-5).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1945](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1945)

Lowercase-hyphen, e.g. `word-count`.

***

### name

> **name**: `string`

Defined in: [index.ts:1947](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1947)

Display name, used in notices ("<name> failed to load: ...").

***

### version

> **version**: `string`

Defined in: [index.ts:1948](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1948)

***

### apiVersion

> **apiVersion**: `string`

Defined in: [index.ts:1950](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1950)

The API versions this plugin accepts: `^x.y.z` or an exact `x.y.z`.

***

### main

> **main**: `string`

Defined in: [index.ts:1955](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1955)

Entry module path, relative to the plugin folder. Bundled plugins must use `index.ts`: the
composition root (`src/renderer/plugins.ts`) globs only that file.

***

### contributes

> **contributes**: [`PluginContributions`](../type-aliases/PluginContributions.md)

Defined in: [index.ts:1956](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1956)

***

### requiredProjectType?

> `optional` **requiredProjectType?**: `string`

Defined in: [index.ts:1963](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1963)

A project type (`<pluginId>/<typeId>`) the open project must have, or have a type that
`extends` it, for the plugin to be active (FR-38, AD-13). Elsewhere it stays inactive and
Settings says which type it needs. A loose file has no type, so such a plugin is inactive
there; a plugin without this field works everywhere.

***

### activationEvents?

> `optional` **activationEvents?**: `` `${string}:${string}` ``[]

Defined in: [index.ts:1965](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1965)

Events that activate the plugin before first use of a contribution.

***

### needs?

> `optional` **needs?**: `string`[]

Defined in: [index.ts:1967](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1967)

Declared capabilities. Recorded, not enforced, until Epic 6.

***

### ai?

> `optional` **ai?**: [`PluginAiLevel`](../type-aliases/PluginAiLevel.md)

Defined in: [index.ts:1974](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1974)

How much the plugin depends on an AI model. `none` has no AI contribution; `optional` has
some, which are hidden while AI features are off; `required` is useless without AI and does
not load while it is off. When absent it is derived: `optional` if any contribution sets
`usesAI`, a tool sets `needsProvider`, or the plugin bundles skills, otherwise `none`.
