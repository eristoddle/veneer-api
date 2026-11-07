# Interface: SourceFolder

Defined in: [index.ts:4332](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4332)

A folder the writer granted a plugin. The plugin never sees its real path.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:4334](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4334)

Opaque; pass it to the other `api.sources` calls.

***

### name

> **name**: `string`

Defined in: [index.ts:4336](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4336)

The folder's own name, e.g. `Notes vault`.

***

### markers

> **markers**: `string`[]

Defined in: [index.ts:4341](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4341)

The hidden folders directly inside it, such as `.obsidian` or `.git` (at most 10, sorted).
A plugin can tell an Obsidian vault by `.obsidian` without being able to list hidden folders.
