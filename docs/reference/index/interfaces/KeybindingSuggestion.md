# Interface: KeybindingSuggestion

Defined in: [index.ts:2360](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2360)

A key a plugin suggests for one of its commands, tools, or surfaces (FR-27, AD-5). It binds
nothing: the writer accepts it in Settings, and only then does it go in `keybindings.json`.

## Properties

### command

> **command**: `string`

Defined in: [index.ts:2362](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2362)

The ID of a command, tool, or surface this plugin declares.

***

### key

> **key**: `string`

Defined in: [index.ts:2364](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2364)

An accelerator such as `CmdOrCtrl+Shift+K`.
