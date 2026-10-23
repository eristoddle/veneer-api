# Host-drawn views

You never draw UI. You hand the kernel **data**, and it draws it with Veneer's look: frame, tabs, focus, Esc, filter, arrow keys, and every border-free detail. You never import Veneer's React, Tailwind, or Motion.

## Surfaces (side panels)

Declare a surface in the manifest, then give it a view:

```ts
api.surfaces.setView('my-plugin:list', {
  kind: 'list',
  items: [
    { id: 'a', label: 'Alpha', detail: '3 notes' },
    { id: 'b', label: 'Beta' }
  ],
  selectedId: 'a',
  empty: { text: 'Nothing here yet.' }
})
api.surfaces.onOpen('my-plugin:list', (id) => {
  // The writer activated row `id`.
})
```

- A view is `{ kind: 'list' | 'tree', items, selectedId?, empty?, input? }`. A tree row has `children`; a row may have `detail`, `marks` (highlight ranges in the label), `depth` (indent), `kind` (file, folder, and so on), and `opens`.
- `input: { placeholder, value }` adds a text field above the rows. Typing reaches `api.surfaces.onInput`; the kernel adopts the `value` you hand back, so you clear the field with `''`.
- `onRefresh` fires when the kernel wants fresh data (each time the panel shows). Re-read and `setView` again.
- `api.surfaces.show(id)` opens the panel with focus in it.

A panel is **hidden until the writer summons it**: from the palette ("Show <title>" exists for every surface), a key, or a top-bar button they turned on.

## Row actions

Declare `rowActions` on a surface (`{ id, title, input, appliesTo, key?, prompt?, verb? }`) and the kernel draws the menu, the inline name field, or the confirmation. You get one value in `api.surfaces.onRowAction(id, (actionId, rowId, value) => ...)` and turn it into `api.vault` calls. `beginRowAction` starts the same action from a command.

## Palette providers

A provider feeds items into the palette's files mode:

```ts
api.palette.setItems('my-plugin:notes', [{ id: 'inbox', label: 'Inbox' }])
api.palette.onRun('my-plugin:notes', (itemId) => void api.workspace.open(`${itemId}.md`))
api.palette.onRefresh('my-plugin:notes', async () => {
  api.palette.setItems('my-plugin:notes', await loadNotes())
})
```

## Document files, images, HTML

`api.vault` reads and writes documents (see its reference). `api.resources.imageSource(src)` returns a safe source for an image, or `null` when it is remote and remote images are off; remote sources never load directly. `api.resources.sanitizeHtml(html)` returns a safe `DocumentFragment`.

## The raw-DOM escape hatch

If a list or tree can't express your view, a surface may hand over `{ kind: 'dom', mount }` and fill an element itself. This is **unstable** (see [unstable](unstable.md)): style it only with `--vn-*` variables, and expect it to change.
