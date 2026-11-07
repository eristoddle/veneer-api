# Interface: PluginManifest

Defined in: [index.ts:2788](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2788)

`manifest.json` (AD-5).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:2790](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2790)

Lowercase-hyphen, e.g. `word-count`.

***

### name

> **name**: `string`

Defined in: [index.ts:2792](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2792)

Display name, used in notices ("<name> failed to load: ...").

***

### version

> **version**: `string`

Defined in: [index.ts:2793](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2793)

***

### apiVersion

> **apiVersion**: `string`

Defined in: [index.ts:2795](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2795)

The API versions this plugin accepts: `^x.y.z` or an exact `x.y.z`.

***

### main?

> `optional` **main?**: `string`

Defined in: [index.ts:2802](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2802)

Entry module path, relative to the plugin folder. Bundled plugins must use `index.ts`: the
composition root (`src/renderer/plugins.ts`) globs only that file. Optional only for a
package that contributes nothing but `themes` and `colors` (Epic 19, 0.48.0): such a package
has no code and nothing runs.

***

### contributes

> **contributes**: [`PluginContributions`](../type-aliases/PluginContributions.md)

Defined in: [index.ts:2803](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2803)

***

### requiredProjectType?

> `optional` **requiredProjectType?**: `string`

Defined in: [index.ts:2810](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2810)

A project type (`<pluginId>/<typeId>`) the open project must have, or have a type that
`extends` it, for the plugin to be active (FR-38, AD-13). Elsewhere it stays inactive and
Settings says which type it needs. A loose file has no type, so such a plugin is inactive
there; a plugin without this field works everywhere.

***

### description?

> `optional` **description?**: `string`

Defined in: [index.ts:2819](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2819)

One line (at most 160 characters) saying what the plugin or theme does; Settings > Plugins
and Browse show it under the name. Added in 0.58.0.

#### Example

```ts
// manifest.json: { "id": "notes", "name": "Notes", "description": "Daily notes with a calendar." }
const description: string = 'Daily notes with a calendar.'
```

***

### activationEvents?

> `optional` **activationEvents?**: `` `${string}:${string}` ``[]

Defined in: [index.ts:2821](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2821)

Events that activate the plugin before first use of a contribution.

***

### needs?

> `optional` **needs?**: `string`[]

Defined in: [index.ts:2823](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2823)

Declared capabilities. Recorded, not enforced, until Epic 6.

***

### ai?

> `optional` **ai?**: [`PluginAiLevel`](../type-aliases/PluginAiLevel.md)

Defined in: [index.ts:2830](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2830)

How much the plugin depends on an AI model. `none` has no AI contribution; `optional` has
some, which are hidden while AI features are off; `required` is useless without AI and does
not load while it is off. When absent it is derived: `optional` if any contribution sets
`usesAI`, a tool sets `needsProvider`, or the plugin bundles skills, otherwise `none`.
