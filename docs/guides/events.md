# Events

Events tell your plugin that something happened. They are named `domain:past-verb`. You listen with `api.events.on(name, listener)`, which returns a `Disposable`.

```ts
api.events.on('vault:saved', (event) => {
  const { path, content } = event as VaultSavedEvent
  console.log(`${path} saved (${content.length} characters)`)
})
```

Listing an event in your manifest's `activationEvents` wakes the plugin when it first fires, and the event that woke you is delivered to your listener.

## The events

| Event | When | Payload |
|---|---|---|
| `vault:saved` | after a document's save has resolved (an autosave, a flush on switch, or a `vault.process` write) | `path` (project-relative with `/`, or absolute for a loose file), `content` (the saved text, `\n` endings) |
| `vault:changed-outside` | a markdown file in the open project changes on disk outside Veneer (git, sync, another editor). Veneer's own saves never fire it | `path` |
| `vault:created` | a file or folder was created through the vault | `path`, `kind` (`file` or `folder`) |
| `vault:renamed` | a file or folder was renamed or moved | `from`, `to`, `kind` |
| `vault:trashed` | a file or folder was moved to the Trash | `path`, `kind` |
| `project:switched` | File > Open Folder…, or opening a file that lands in another project or loose scope | `name`, `kind` (`project` or `loose`) |
| `document:opened` | a document becomes the open one | `path` |
| `window:focused` | the window gains focus | none |

## History and save events

A plugin that records history (a Git-like or snapshot plugin) subscribes to `vault:saved`, then reads back what that save wrote:

```ts
api.events.on('vault:saved', async (event) => {
  const { path } = event as VaultSavedEvent
  const asSaved = await api.vault.read(path) // the text on disk as of the last save
  await recordVersion(path, asSaved)
})
```

`api.vault.read(path)` returns exactly what the last `vault:saved` for that path carried: what is on disk with `\n` endings, not the editor's unsaved edits. Veneer itself keeps no version history; its snapshots are a safety net, not history.

## Rules

- A listener may be async. A listener that throws fails the plugin like any other plugin code.
- You never emit events. The kernel does.
- Events are for reacting. To change something, call `api.vault` or `api.editor`; documents change only through those two doors.
