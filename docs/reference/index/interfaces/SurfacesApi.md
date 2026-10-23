# Interface: SurfacesApi

Defined in: [index.ts:1241](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1241)

A plugin's side-panel surfaces (FR-7, AD-4, AD-15). Every ID must be declared in this
plugin's `contributes.surfaces`; others throw `plugin/undeclared-contribution`. The kernel
decides when a panel opens and closes; showing a surface activates its plugin first.

## Methods

### setView()

> **setView**(`id`, `view`): `void`

Defined in: [index.ts:1254](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1254)

Hands the kernel what the surface shows, replacing the previous view. Call it again with a
new view whenever the data changes. A malformed view throws `plugin/bad-view`.

#### Parameters

##### id

`string`

##### view

[`SurfaceView`](../type-aliases/SurfaceView.md)

#### Returns

`void`

#### Example

```ts
api.surfaces.setView('my-plugin:list', {
  kind: 'list',
  items: [{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta' }]
})
```

***

### onOpen()

> **onOpen**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1268](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1268)

Called when the writer opens a row; the floating panel has already closed. Group rows never
reach it: they expand and collapse.

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### id

`string`

##### handler

[`SurfaceOpenHandler`](../type-aliases/SurfaceOpenHandler.md)

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
api.surfaces.onOpen('my-plugin:list', (id) => {
  console.log(`Opened row ${id}`)
})
```

***

### onAction()

> **onAction**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1280](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1280)

Called with the action's ID when the writer presses the view's `empty.action` button.
Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### id

`string`

##### handler

(`actionId`) => `unknown`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
api.surfaces.onAction('my-plugin:list', (actionId) => {
  if (actionId === 'my-plugin:refresh') reload()
})
```

***

### onRefresh()

> **onRefresh**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1295](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1295)

Called when the kernel wants a fresh view of the surface, e.g. before it draws it again.
Nothing about when or why: hand over a new view with `setView` if the data changed. The
first activation doesn't call it; `onload` hands over the first view.

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
api.surfaces.onRefresh('my-plugin:list', async () => {
  api.surfaces.setView('my-plugin:list', { kind: 'list', items: await loadItems() })
})
```

***

### onRowAction()

> **onRowAction**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1309](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1309)

Called when the writer finishes one of the surface's row actions (Story 2.8): from the
row's right-click menu, its key, or `beginRowAction`. See `RowActionHandler`.

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### id

`string`

##### handler

[`RowActionHandler`](../type-aliases/RowActionHandler.md)

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
api.surfaces.onRowAction('my-plugin:list', async (actionId, rowId, value) => {
  if (actionId === 'my-plugin:new' && value) await api.vault.create(`${value}.md`)
})
```

***

### beginRowAction()

> **beginRowAction**(`id`, `actionId`, `rowId`): `void`

Defined in: [index.ts:1325](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1325)

Starts a declared row action as if the writer had picked it on `rowId` (`''` for the
root): the kernel opens the surface's panel on that row and asks for the value. For
palette commands that act on the open document. An undeclared action throws
`plugin/undeclared-contribution`; a row that isn't in the view, or that the action doesn't
apply to, starts nothing.

#### Parameters

##### id

`string`

##### actionId

`string`

##### rowId

`string`

#### Returns

`void`

#### Example

```ts
api.commands.handle('my-plugin:rename-open', () => {
  const { document } = api.workspace.current()
  if (document) api.surfaces.beginRowAction('my-plugin:list', 'my-plugin:rename', document)
})
```

***

### onInput()

> **onInput**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1343](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1343)

Called with the whole text of the view's input field (`ItemsView.input`) each time the
writer changes it (Story 2.10).

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### id

`string`

##### handler

(`value`) => `unknown`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
api.surfaces.onInput('my-plugin:search', async (value) => {
  api.surfaces.setView('my-plugin:search', {
    kind: 'list',
    items: await find(value),
    input: { placeholder: 'Search notes', value }
  })
})
```

***

### onReorder()

> **onReorder**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1365](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1365)

Called when the writer moves a row in a `reorderable` view (Story 9.24), by dragging it or
with Alt+Up / Alt+Down. Set the next view to show the new order; a handler that sets none
leaves the list as it was.

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### id

`string`

##### handler

(`event`) => `unknown`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
const chapters = ['One', 'Two', 'Three']
api.surfaces.onReorder('my-plugin:chapters', ({ movedId, beforeId }) => {
  chapters.splice(chapters.indexOf(movedId), 1)
  chapters.splice(beforeId === null ? chapters.length : chapters.indexOf(beforeId), 0, movedId)
  api.surfaces.setView('my-plugin:chapters', {
    kind: 'list',
    reorderable: true,
    items: chapters.map((c) => ({ id: c, label: c }))
  })
})
```

***

### onFormChange()

> **onFormChange**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1390](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1390)

Called when the writer changes a field of a `form` view (Story 9.25): text fields as they
type (debounced), the others at once. Set the next view to change the form; a handler that
sets none leaves it as it was.

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### id

`string`

##### handler

(`fieldId`, `value`) => `unknown`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
const character = { name: 'Mara', age: 34, hair: 'dark', tags: ['pilot'], alive: true }
api.surfaces.onFormChange('my-plugin:character', (fieldId, value) => {
  Object.assign(character, { [fieldId]: value })
  api.surfaces.setView('my-plugin:character', {
    kind: 'form',
    fields: [
      { id: 'name', type: 'text', label: 'Name', value: character.name },
      { id: 'age', type: 'number', label: 'Age', value: character.age },
      { id: 'tags', type: 'tags', label: 'Tags', value: character.tags },
      { id: 'alive', type: 'toggle', label: 'Alive', value: character.alive }
    ]
  })
})
```

***

### onFormSubmit()

> **onFormSubmit**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1417](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1417)

Called with every field's value, by field ID, when the writer submits a `form` view with
Cmd+Enter or the submit button (Story 9.25).

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### id

`string`

##### handler

(`values`) => `unknown`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
api.surfaces.onFormSubmit('my-plugin:character', (values) => {
  const name = values.name
  api.surfaces.setView('my-plugin:character', {
    kind: 'form',
    submitLabel: 'Save',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        value: name,
        error: name === '' ? 'A character needs a name.' : undefined
      }
    ]
  })
})
```

***

### onDiffAction()

> **onDiffAction**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:1438](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1438)

Called when the writer chooses Accept or Reject on a change of a `diff` view (Story 9.16),
with the action and the change's `id`. The kernel changes nothing; set the next view to
show what is left to decide.

Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.

#### Parameters

##### id

`string`

##### handler

(`action`, `changeId`) => `unknown`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
const before = 'The quick brown fox'
let after = 'The fast brown fox'
api.surfaces.onDiffAction('my-plugin:compare', (action, changeId) => {
  if (action === 'accept') after = after.replace('fast', 'quick')
  const segments = wordDiff(before, after).map((s, i) =>
    s.kind === 'equal' ? s : { ...s, id: `c${i}` }
  )
  api.surfaces.setView('my-plugin:compare', { kind: 'diff', segments })
})
```

***

### show()

> **show**(`id`, `options?`): `void`

Defined in: [index.ts:1452](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1452)

Opens the surface's panel with the surface selected and focus in it: on its input field
when the view has one, else on the highlighted row (Story 2.10). For a palette command
like "Search in Project". Already showing, it only takes focus.

#### Parameters

##### id

`string`

##### options?

###### focus?

`string`

#### Returns

`void`

#### Example

```ts
api.commands.handle('my-plugin:open-panel', () => api.surfaces.show('my-plugin:list', { focus: 'mara' }))
```

`options.focus` is a row ID: the panel opens with that row highlighted and scrolled into
view (a tree expands its ancestors). An unknown ID changes nothing.

***

### close()

> **close**(`id`): `void`

Defined in: [index.ts:1463](https://github.com/eristoddle/veneer/blob/ecb42c05a6d6e43c966a918018a8945b8e9c725c/packages/api/src/index.ts#L1463)

Closes the surface if it is showing, and focus returns to the caret: a modal surface after
its job is done (Story 9.22), or a side panel that isn't pinned. Not showing, it does
nothing.

#### Parameters

##### id

`string`

#### Returns

`void`

#### Example

```ts
api.surfaces.onOpen('my-plugin:browser', () => api.surfaces.close('my-plugin:browser'))
```
