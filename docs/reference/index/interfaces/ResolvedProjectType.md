# Interface: ResolvedProjectType

Defined in: [index.ts:1735](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1735)

A project type with everything it inherits applied, as the open project has it (FR-37).

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1736](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1736)

***

### name

> **name**: `string`

Defined in: [index.ts:1737](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1737)

***

### chain

> **chain**: `string`[]

Defined in: [index.ts:1739](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1739)

This type's ID first, then each parent it extends, nearest first.

***

### frontmatter

> **frontmatter**: [`FrontmatterField`](FrontmatterField.md)[]

Defined in: [index.ts:1741](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1741)

The parent's fields first, a child's field replacing a parent's of the same key.

***

### settings

> **settings**: `Record`\<`string`, [`SettingValue`](../type-aliases/SettingValue.md)\>

Defined in: [index.ts:1743](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1743)

The parent's defaults, overridden by the child's.
