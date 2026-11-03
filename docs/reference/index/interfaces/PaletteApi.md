# Interface: PaletteApi

Defined in: [index.ts:1646](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1646)

A plugin's palette providers (FR-9, UX-DR15). Every ID must be declared in this plugin's
`contributes.paletteProviders`; others throw `plugin/undeclared-contribution`. The kernel
draws, filters, and ranks the items; the plugin never learns the query or whether the palette
is open. The palette entering files mode activates the provider's plugin first.

## Methods

### setItems()

> **setItems**(`id`, `items`): `void`

Defined in: [index.ts:1657](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1657)

Replaces the provider's items. Malformed items throw `plugin/bad-items`.

#### Parameters

##### id

`string`

##### items

[`PaletteItem`](PaletteItem.md)[]

#### Returns

`void`

#### Example

```ts
api.palette.setItems('my-plugin:notes', [
  { id: 'inbox', label: 'Inbox' },
  { id: 'ideas', label: 'Ideas', detail: '12 notes' }
])
```

***

### onRun()

> **onRun**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1669](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1669)

Called with the item's ID when the writer picks it; the palette has already closed.
Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### id

`string`

##### handler

(`itemId`) => `unknown`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
api.palette.onRun('my-plugin:notes', (itemId) => {
  void api.workspace.open(`${itemId}.md`)
})
```

***

### onRefresh()

> **onRefresh**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1684](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L1684)

Called when the kernel wants fresh items, e.g. before listing them again. Nothing about
when or why: hand over new items with `setItems` if the data changed. The first activation
doesn't call it; `onload` hands over the first items.

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### id

`string`

##### handler

() => `unknown`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
api.palette.onRefresh('my-plugin:notes', async () => {
  api.palette.setItems('my-plugin:notes', await loadNotes())
})
```
