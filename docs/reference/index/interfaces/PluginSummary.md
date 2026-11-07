# Interface: PluginSummary

Defined in: [index.ts:4145](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4145)

A read-only summary of one plugin or theme the app knows about (Epic 35). Added in 0.60.0.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:4147](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4147)

Lowercase-hyphen ID.

***

### name

> **name**: `string`

Defined in: [index.ts:4148](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4148)

***

### version

> **version**: `string`

Defined in: [index.ts:4149](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4149)

***

### description

> **description**: `string`

Defined in: [index.ts:4151](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4151)

The manifest's one-line description, or an empty string.

***

### kind

> **kind**: [`PluginKind`](../type-aliases/PluginKind.md)

Defined in: [index.ts:4153](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4153)

`theme` for a package that contributes only themes and colors, else `plugin`.

***

### tier

> **tier**: [`PluginTier`](../type-aliases/PluginTier.md)

Defined in: [index.ts:4154](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4154)

***

### enabled

> **enabled**: `boolean`

Defined in: [index.ts:4156](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4156)

False while the writer has switched it off or it failed to load.

***

### contributions

> **contributions**: `Record`\<`string`, `number`\>

Defined in: [index.ts:4158](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4158)

How many of each contribution kind it declares (`commands: 3`); kinds with none are left out.
