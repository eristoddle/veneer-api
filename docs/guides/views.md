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

### Which side

Left is the whole project (Files, Search); right is the current file (Outline, Properties, Word Count). Say which your panel is with `scope` in its manifest entry, and leave out `side`: `"scope": "project"` opens on the left by default, `"scope": "file"` on the right. A surface with neither `side` nor `scope` is refused. If you give both, `side` wins and `scope` only describes the panel. The writer can still move any panel to the other side, and the move is remembered, so it beats both. A surface with no `scope` stays where its `side` says.

```json
{ "id": "my-plugin:days", "title": "Days", "icon": "calendar", "scope": "project" }
```

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

## Cards (API 0.56.0)

An items view with `layout: 'cards'` draws each item as a card. Besides the title and `image`, an item can carry `synopsis` (up to four lines), `cardLabel: { text, color? }` (a color bar and the first chip; `color` is 1 to 6, else the host picks one from the text), `tags` (the first three show), and `editable: { synopsis: true }`. A double-click on an editable synopsis opens a text field; Enter saves, Shift+Enter is a new line, Escape cancels, and leaving the field saves. The new text reaches `api.surfaces.onItemEdit(surfaceId, (itemId, field, value) => ...)`, and the view you set next is the truth. `reorderable` works on cards: drag a card, or Alt+Left and Alt+Right on the focused one. `cardsWhenNarrow: true` draws cards even in a narrow panel (one column under 520px, two from there), and `keepsPanel: true` on an item keeps a floating panel open when it is opened, for an item that turns the panel into something else.

## Panels for one project type (API 0.58.0)

`SurfaceContribution.projectType` (a full type id) hides a panel's tab unless the open project has that type or a type that extends it. See the project-types guide.
