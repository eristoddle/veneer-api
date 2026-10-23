# Type Alias: RenameParticipant

> **RenameParticipant** = (`rename`) => `unknown`

Defined in: [index.ts:192](https://github.com/eristoddle/veneer/blob/702b1c402005dd279ac22886cccb0c724c29d498/packages/api/src/index.ts#L192)

A rename participant (FR-10, AD-17): called once per rename or move, after the kernel
rewrote relative markdown links and image embeds, with the old and new API paths. A plugin
with another link syntax (wikilinks, say) rewrites its own through `api.vault.process`.

## Parameters

### rename

[`VaultRename`](../interfaces/VaultRename.md)

## Returns

`unknown`
