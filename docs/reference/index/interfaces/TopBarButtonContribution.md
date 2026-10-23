# Interface: TopBarButtonContribution

Defined in: [index.ts:1009](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1009)

A top-bar button a plugin offers (FR-53, AD-15, UX-DR7). `id` is `<pluginId>:<name>`; `title`
names it in its tooltip and in the "Show in top bar" checklist; `icon` is a Lucide name drawn
like a surface's. Exactly one target, declared in the same manifest: `surface` opens that
surface's side with it selected (or closes the side when it already shows there); `command`
runs that command. The button stays hidden until the writer turns it on, and the plugin is
never told whether it is shown.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1010](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1010)

***

### title

> **title**: `string`

Defined in: [index.ts:1011](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1011)

***

### icon

> **icon**: `string`

Defined in: [index.ts:1012](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1012)

***

### surface?

> `optional` **surface?**: `string`

Defined in: [index.ts:1013](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1013)

***

### command?

> `optional` **command?**: `string`

Defined in: [index.ts:1014](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1014)
