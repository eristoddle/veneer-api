# Interface: ProjectTypeCards

Defined in: [index.ts:2501](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2501)

How a project type wants Files cards filled (Story 29.4).

## Properties

### slots?

> `optional` **slots?**: [`CardSlots`](CardSlots.md)

Defined in: [index.ts:2503](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2503)

Which field fills each slot; a slot left out keeps the default (`title`, `description`, `image`, `status`, `tags`).

***

### folders?

> `optional` **folders?**: `string`[]

Defined in: [index.ts:2505](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2505)

Project-relative folders that start in Cards mode, until the writer switches them.

***

### labelColors?

> `optional` **labelColors?**: `Record`\<`string`, `1` \| `2` \| `3` \| `4` \| `5` \| `6`\>

Defined in: [index.ts:2507](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2507)

Label text (as written in the front matter) to label color number, 1 to 6.
