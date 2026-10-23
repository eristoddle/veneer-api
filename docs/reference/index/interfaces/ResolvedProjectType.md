# Interface: ResolvedProjectType

Defined in: [index.ts:1581](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1581)

A project type with everything it inherits applied, as the open project has it (FR-37).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1582](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1582)

***

### name

> **name**: `string`

Defined in: [index.ts:1583](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1583)

***

### chain

> **chain**: `string`[]

Defined in: [index.ts:1585](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1585)

This type's ID first, then each parent it extends, nearest first.

***

### frontmatter

> **frontmatter**: [`FrontmatterField`](FrontmatterField.md)[]

Defined in: [index.ts:1587](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1587)

The parent's fields first, a child's field replacing a parent's of the same key.

***

### settings

> **settings**: `Record`\<`string`, [`SettingValue`](../type-aliases/SettingValue.md)\>

Defined in: [index.ts:1589](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1589)

The parent's defaults, overridden by the child's.
