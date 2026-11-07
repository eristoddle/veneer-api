# Type Alias: RenameParticipant

> **RenameParticipant** = (`rename`) => `unknown`

Defined in: [index.ts:193](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L193)

A rename participant (FR-10, AD-17): called once per rename or move, after the kernel
rewrote relative markdown links and image embeds, with the old and new API paths. A plugin
with another link syntax (wikilinks, say) rewrites its own through `api.vault.process`.

## Parameters

### rename

[`VaultRename`](../interfaces/VaultRename.md)

## Returns

`unknown`
