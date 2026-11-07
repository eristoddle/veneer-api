# Interface: TopBarButtonContribution

Defined in: [index.ts:1757](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1757)

A top-bar button a plugin offers (FR-53, AD-15, UX-DR7). `id` is `<pluginId>:<name>`; `title`
names it in its tooltip and in the "Show in top bar" checklist; `icon` is a Lucide name drawn
like a surface's. Exactly one target, declared in the same manifest: `surface` opens that
surface's side with it selected (or closes the side when it already shows there); `command`
runs that command. The button stays hidden until the writer turns it on, and the plugin is
never told whether it is shown.

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1758](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1758)

***

### title

> **title**: `string`

Defined in: [index.ts:1759](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1759)

***

### icon

> **icon**: `string`

Defined in: [index.ts:1760](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1760)

***

### surface?

> `optional` **surface?**: `string`

Defined in: [index.ts:1761](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1761)

***

### command?

> `optional` **command?**: `string`

Defined in: [index.ts:1762](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1762)

***

### usesAI?

> `optional` **usesAI?**: `boolean`

Defined in: [index.ts:1764](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1764)

True when this feature needs an AI model; hidden while AI features are off.
