# Interface: ProjectTypeContribution

Defined in: [index.ts:1724](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1724)

A kind of project a plugin offers (FR-36, AD-13). The ID is `<pluginId>/<typeId>`. A project has
exactly one type; the schema covers frontmatter fields and default settings only, and only
advises. `extends` names another type (of this or any plugin): the child inherits its
frontmatter fields and default settings, and satisfies a `requiredProjectType` of the parent.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1725](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1725)

***

### name

> **name**: `string`

Defined in: [index.ts:1726](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1726)

***

### description?

> `optional` **description?**: `string`

Defined in: [index.ts:1727](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1727)

***

### extends?

> `optional` **extends?**: `string`

Defined in: [index.ts:1728](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1728)

***

### frontmatter?

> `optional` **frontmatter?**: [`FrontmatterField`](FrontmatterField.md)[]

Defined in: [index.ts:1729](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1729)

***

### settings?

> `optional` **settings?**: `Record`\<`string`, [`SettingValue`](../type-aliases/SettingValue.md)\>

Defined in: [index.ts:1731](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1731)

Default values for declared settings, by setting ID, while a project has this type.
