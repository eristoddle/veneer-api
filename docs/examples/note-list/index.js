// @ts-check
/**
 * Note List: a side panel (a surface).
 *
 * The plugin hands the kernel DATA, a list of rows with an input field; the kernel draws the panel,
 * the tabs, the filter field, the arrow keys, and Esc. The panel stays hidden until the writer
 * summons it from the palette ("Show Notes"), a key, or a top-bar button they turn on.
 */

const PANEL = 'note-list:panel'

/**
 * The rows for a filter: every file whose path contains it, sorted by name.
 * @param {import('@veneer/api').VaultEntry[]} entries
 * @param {string} filter
 * @returns {import('@veneer/api').ViewItem[]}
 */
export function rowsFor(entries, filter) {
  const needle = filter.trim().toLowerCase()
  return entries
    .filter((e) => e.kind === 'file' && e.path.toLowerCase().includes(needle))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((e) => ({ id: e.path, label: e.name.replace(/\.(md|markdown)$/i, ''), detail: folderOf(e.path) }))
}

/** @param {string} path */
function folderOf(path) {
  const slash = path.lastIndexOf('/')
  return slash < 0 ? undefined : path.slice(0, slash)
}

/** @param {import('@veneer/api').PluginApi} api */
export function onload(api) {
  let filter = ''

  async function show() {
    const items = rowsFor(await api.vault.list(), filter)
    api.surfaces.setView(PANEL, {
      kind: 'list',
      items,
      input: { placeholder: 'Filter notes', value: filter },
      empty: { text: filter === '' ? 'No notes yet.' : `No notes match “${filter}”.` }
    })
  }

  // Opening a row opens the note; the kernel scope-checks the path and saves the current page first.
  api.surfaces.onOpen(PANEL, (path) => api.workspace.open(path))
  // Typing in the kernel-drawn field reaches us here; we answer with a fresh view.
  api.surfaces.onInput(PANEL, (value) => {
    filter = value
    return show()
  })
  // The kernel asks for fresh data each time the panel shows.
  api.surfaces.onRefresh(PANEL, show)
  // Keep the list current as files come and go.
  /** @type {import('@veneer/api').EventName[]} */
  const changes = ['vault:created', 'vault:renamed', 'vault:trashed', 'project:switched']
  for (const name of changes) api.events.on(name, show)
  return show()
}
