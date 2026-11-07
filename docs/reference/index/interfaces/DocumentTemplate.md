# Interface: DocumentTemplate

Defined in: [index.ts:2404](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2404)

A document a project type can make (Epic 20). `pattern` is the file name, ending in `.md`, with
`{{date:FORMAT}}` (tokens `YYYY`, `MM`, `DD`, `HH`, `mm`; anything else is literal) and
`{{title}}`. The same two variables work in `body` and in the frontmatter values.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:2406](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2406)

Unique within the type; a child type's template of the same ID replaces its parent's.

***

### name

> **name**: `string`

Defined in: [index.ts:2407](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2407)

***

### pattern

> **pattern**: `string`

Defined in: [index.ts:2408](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2408)

***

### folder?

> `optional` **folder?**: `string`

Defined in: [index.ts:2410](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2410)

A project-relative folder; created if missing. Default: the project root.

***

### frontmatter?

> `optional` **frontmatter?**: `Record`\<`string`, [`FrontmatterValue`](../type-aliases/FrontmatterValue.md)\>

Defined in: [index.ts:2411](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2411)

***

### body?

> `optional` **body?**: `string`

Defined in: [index.ts:2413](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2413)

The text after the frontmatter.
