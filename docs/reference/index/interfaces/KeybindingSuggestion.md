# Interface: KeybindingSuggestion

Defined in: [index.ts:1542](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1542)

A key a plugin suggests for one of its commands, tools, or surfaces (FR-27, AD-5). It binds
nothing: the writer accepts it in Settings, and only then does it go in `keybindings.json`.

## Properties

### command

> **command**: `string`

Defined in: [index.ts:1544](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1544)

The ID of a command, tool, or surface this plugin declares.

***

### key

> **key**: `string`

Defined in: [index.ts:1546](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L1546)

An accelerator such as `CmdOrCtrl+Shift+K`.
