# Note List: a panel

A left side panel listing the project's notes with a filter field. Open it from the palette ("Show Notes"), and open a row to open the note.

**What it shows**

- A surface declared in the manifest and fed with `api.surfaces.setView`: the plugin hands over data, and the kernel draws the panel, filter, arrow keys, and Esc.
- `onOpen`, `onInput` (the kernel-drawn text field), and `onRefresh` (fresh data each time the panel shows).
- `api.vault.list` and `api.workspace.open`, the only doors to files.
- Staying current by listening to `vault:created`, `vault:renamed`, `vault:trashed`, and `project:switched`.
- An empty state (`empty`) instead of a blank panel.
- A panel starts hidden: nothing appears until the writer asks.

**Install:** Settings > Plugins > Install plugin, then pick this folder. **Test:** `index.test.ts`. Read next: [host-drawn views](../../guides/views.md).
