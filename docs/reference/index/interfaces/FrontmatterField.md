# Interface: FrontmatterField

Defined in: [index.ts:2379](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2379)

One frontmatter field a project type describes. Advisory only: nothing enforces it (AD-13).

## Properties

### key

> **key**: `string`

Defined in: [index.ts:2381](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2381)

The frontmatter key, e.g. `pov`.

***

### type

> **type**: `"number"` \| `"boolean"` \| `"text"` \| `"list"` \| `"date"` \| `"choice"`

Defined in: [index.ts:2382](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2382)

***

### label?

> `optional` **label?**: `string`

Defined in: [index.ts:2384](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2384)

Shown in advice; defaults to the key.

***

### required?

> `optional` **required?**: `boolean`

Defined in: [index.ts:2386](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2386)

A document without it is advised, never blocked.

***

### options?

> `optional` **options?**: `string`[]

Defined in: [index.ts:2388](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2388)

For `choice` (required there): the values the field offers. Epic 20.

***

### default?

> `optional` **default?**: [`FrontmatterValue`](../type-aliases/FrontmatterValue.md)

Defined in: [index.ts:2393](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2393)

The value a document made from one of the type's templates starts with. Only a template
writes it: Properties and opening a file never do. Epic 20.
