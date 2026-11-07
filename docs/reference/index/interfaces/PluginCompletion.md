# Interface: PluginCompletion

Defined in: [index.ts:4087](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4087)

What a plugin asks the writer's model (FR-34). The provider is the writer's default, or the one
the writer set for the request's `role` in Settings (Epic 21); a plugin never names a provider.

## Properties

### messages

> **messages**: [`PluginMessage`](PluginMessage.md)[]

Defined in: [index.ts:4088](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4088)

***

### role?

> `optional` **role?**: [`ProviderRole`](../type-aliases/ProviderRole.md)

Defined in: [index.ts:4093](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4093)

What the request is for. The writer may give each role its own model, so a quick job can use
a cheap one; a role the writer left alone uses the default. Leave it out for the default.
