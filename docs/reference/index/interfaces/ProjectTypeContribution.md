# Interface: ProjectTypeContribution

Defined in: [index.ts:1570](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1570)

A kind of project a plugin offers (FR-36, AD-13). The ID is `<pluginId>/<typeId>`. A project has
exactly one type; the schema covers frontmatter fields and default settings only, and only
advises. `extends` names another type (of this or any plugin): the child inherits its
frontmatter fields and default settings, and satisfies a `requiredProjectType` of the parent.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1571](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1571)

***

### name

> **name**: `string`

Defined in: [index.ts:1572](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1572)

***

### description?

> `optional` **description?**: `string`

Defined in: [index.ts:1573](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1573)

***

### extends?

> `optional` **extends?**: `string`

Defined in: [index.ts:1574](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1574)

***

### frontmatter?

> `optional` **frontmatter?**: [`FrontmatterField`](FrontmatterField.md)[]

Defined in: [index.ts:1575](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1575)

***

### settings?

> `optional` **settings?**: `Record`\<`string`, [`SettingValue`](../type-aliases/SettingValue.md)\>

Defined in: [index.ts:1577](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1577)

Default values for declared settings, by setting ID, while a project has this type.
