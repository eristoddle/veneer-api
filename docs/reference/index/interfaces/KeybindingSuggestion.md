# Interface: KeybindingSuggestion

Defined in: [index.ts:1696](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1696)

A key a plugin suggests for one of its commands, tools, or surfaces (FR-27, AD-5). It binds
nothing: the writer accepts it in Settings, and only then does it go in `keybindings.json`.

## Properties

### command

> **command**: `string`

Defined in: [index.ts:1698](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1698)

The ID of a command, tool, or surface this plugin declares.

***

### key

> **key**: `string`

Defined in: [index.ts:1700](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1700)

An accelerator such as `CmdOrCtrl+Shift+K`.
