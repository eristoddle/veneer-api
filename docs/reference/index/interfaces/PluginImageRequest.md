# Interface: PluginImageRequest

Defined in: [index.ts:4445](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4445)

What a plugin asks the writer's image provider for (Epic 26).

## Properties

### prompt

> **prompt**: `string`

Defined in: [index.ts:4447](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4447)

What the image shows.

***

### count?

> `optional` **count?**: `2` \| `4` \| `1` \| `3`

Defined in: [index.ts:4449](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4449)

How many to make, 1 to 4; 1 when left out.

***

### shape?

> `optional` **shape?**: `"landscape"` \| `"square"` \| `"portrait"`

Defined in: [index.ts:4451](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4451)

The picture's shape; `landscape` when left out.
