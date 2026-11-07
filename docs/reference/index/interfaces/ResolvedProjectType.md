# Interface: ResolvedProjectType

Defined in: [index.ts:2511](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2511)

A project type with everything it inherits applied, as the open project has it (FR-37).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:2512](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2512)

***

### name

> **name**: `string`

Defined in: [index.ts:2513](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2513)

***

### chain

> **chain**: `string`[]

Defined in: [index.ts:2515](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2515)

This type's ID first, then each parent it extends, nearest first.

***

### frontmatter

> **frontmatter**: [`FrontmatterField`](FrontmatterField.md)[]

Defined in: [index.ts:2517](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2517)

The parent's fields first, a child's field replacing a parent's of the same key.

***

### settings

> **settings**: `Record`\<`string`, [`SettingValue`](../type-aliases/SettingValue.md)\>

Defined in: [index.ts:2519](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2519)

The parent's defaults, overridden by the child's.

***

### homePanel?

> `optional` **homePanel?**: `string` \| `null`

Defined in: [index.ts:2524](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2524)

The home panel's surface ID, from the nearest type in the chain that names one, else null.
The host always sets it; it is optional only so a test double need not.

***

### templates?

> `optional` **templates?**: [`DocumentTemplate`](DocumentTemplate.md)[]

Defined in: [index.ts:2526](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2526)

The parent's templates, a child's of the same ID replacing them. Set by the host.

***

### folders?

> `optional` **folders?**: `string`[]

Defined in: [index.ts:2528](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2528)

Expected folders, the parent's merged with the child's. Set by the host.

***

### detect?

> `optional` **detect?**: [`ProjectTypeDetect`](ProjectTypeDetect.md) \| `null`

Defined in: [index.ts:2530](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2530)

The nearest detect rule in the chain (a child's replaces its parent's), else null.

***

### cards?

> `optional` **cards?**: [`ProjectTypeCards`](ProjectTypeCards.md)

Defined in: [index.ts:2532](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2532)

The card slots, folders, and label colors, merged per key down the chain. Set by the host.

***

### chatTranscripts?

> `optional` **chatTranscripts?**: [`ProjectTypeChatTranscripts`](ProjectTypeChatTranscripts.md) \| `null`

Defined in: [index.ts:2540](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2540)

How a saved chat becomes a document of this type, from the nearest type in the chain that
declares it, else null. Set by the host. Added in 0.59.0.

#### Example

```ts
const takesChats = api.workspace.projectType()?.chatTranscripts != null
```
