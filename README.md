`@veneer/api`: the public plugin API types, `EditorHost`, the facade contract, and the `/testing` fake host; the only module plugins import (AD-3). Seeded in Story 1.2.

## Using the writer's models (Story 5.5)

`api.providers` sends a request to the writer's default provider through the kernel (FR-34, AD-11). `complete(request, signal?)` resolves with the whole reply; `stream(request, onText, signal?)` calls `onText` with each piece in order. A plugin never receives a key, a base URL, a model name, or the provider list.

Only a plugin whose manifest declares a tool with `needsProvider: true` may call it; any other plugin gets `plugin/undeclared-contribution` and nothing is sent. The selection card checks the provider before such a tool runs: no provider and offline answer in the card, and a remote provider the writer hasn't continued for is named first. Failures reject with a `VeneerError` whose code is `offline`, `auth`, `rate-limit`, `server`, `timeout`, or `canceled` and whose message names the provider.

In tests, `createFakeHost(manifest, entry, { replies })` scripts the answers (a string is the whole reply, an array its pieces), `providerFailure` makes calls fail, and `host.modelRequests` lists what was sent.

## Showing options as they arrive (Story 5.6)

A tool handler gets a third argument, `report(options)`. Call it with the complete options so far while the handler is still working and the card numbers them as they come; each call replaces the last, and the last row is shown as partial until the handler returns its `ToolResult`, which is the final answer. Give only options that are complete.

## Suggesting keys (Story 6.7)

A plugin can suggest a key for one of its own commands, tools, or surfaces in its manifest:

```json
"contributes": {
  "keybindings": [{ "command": "my-plugin:go", "key": "CmdOrCtrl+Shift+K" }]
}
```

A suggestion binds nothing. It appears in Settings > Keybindings, and only when the writer accepts it does the key go in their `keybindings.json`. A key the app reserves (cut, copy, paste, undo, redo, print) shows as unavailable, and a key another command already holds is settled by the writer as a conflict. The API version is 0.14.0.

## Hearing saves and reading what they wrote (Story 7.6)

A plugin that records history subscribes to `vault:saved`. The event carries the document's path (project-relative, or absolute for a loose file) and the saved text, and it fires after the save has resolved. List `vault:saved` under `activationEvents` and the plugin sleeps until the first save, then receives that event. `vault:changed-outside` reports a change made outside Veneer, with the path.

`api.vault.read(path)` returns a document's text as of its last save: what is on disk, with `\n` endings, the same text that save's event carried. An open document's unsaved edits are not in it. Veneer keeps no version history of its own; a plugin supplies that. The API version is 0.39.0.

## Project types (Story 7.4)

A plugin can offer kinds of project in its manifest. The ID is `<pluginId>/<typeId>`:

```json
"contributes": {
  "projectTypes": [
    {
      "id": "novel/novel",
      "name": "Novel",
      "frontmatter": [{ "key": "pov", "type": "text", "label": "Point of view", "required": true }],
      "settings": { "novel:daily-goal": 1000 }
    },
    { "id": "novel/thriller", "name": "Thriller", "extends": "novel/novel" }
  ]
}
```

The writer assigns one type per project in Project settings; it is stored in `.veneer/project.json`, and changing it rewrites no document. A type that `extends` another inherits its frontmatter fields and default settings; a child's field or default replaces its parent's. A type's `settings` are defaults only: they sit above a setting's own default and below anything the writer set. `api.workspace.projectType()` returns the open project's type with inheritance applied, or null.

A schema only advises. `adviseFrontmatter(frontmatterText, fields)` returns plain sentences for a missing required field or a value of the wrong kind; it never throws and nothing in Veneer uses it to block a save or fix a document. Field types are `text`, `number`, `boolean`, `date`, and `list`. The API version is 0.39.0.

A plugin that only makes sense for one kind of project can say so with `"requiredProjectType": "novel/novel"` at the top of its manifest. It is active only in a project whose type is that one, or a type that `extends` it. In any other project, or a loose file, it stays inactive: its commands and panels are not listed and it does not wake. Settings shows it as "Inactive: needs type Novel", and turning it on there says why it stays inactive. It waits until the project's type is known, then is judged on it. The API version is 0.39.0.

## Comparing two versions (Story 9.15)

`wordDiff(before, after)` returns the changes between two texts as ordered segments (`equal`, `delete`, `insert`) for a compare view. Joining the `equal` and `delete` segments gives `before` back exactly, and the `equal` and `insert` ones give `after`. A word is a run of non-space characters with its punctuation, and a changed phrase comes back as one deletion followed by one insertion. Lines are compared first, so long documents stay fast; a changed stretch too long to compare word by word comes back whole. It ports the word level of GitWrite's `get_word_level_diff`, except that it still shows shared words where GitWrite would mark a line under 60% similar as changed whole. The API version is 0.39.0.

## Save points and history (Story 9.13)

`api.history` keeps the open project's history as plain git in the project folder, so GitWrite and the command line see the same commits. Veneer does the git work itself; the writer needs no git installed. `init()` makes the project a repository with a `.gitignore` for derived files only (`.veneer/cache/`, `.DS_Store`), and leaves an existing repository alone. `save(message)` saves the open document, then commits every change in the project, images and deletions included, and resolves with the commit (or null when nothing changed); `history:saved` follows. `log({ path, branch, limit })` lists commits newest first, and `show(commit, path)` returns a file's text as of a commit. A loose file has no history. The author is the writer's "Name in history" and "Email in history" settings, else their git config. The API version is 0.39.0.

## Alternative versions (Story 9.14)

`branches()`, `createBranch(name)`, and `switchTo(name)` work with branches; switching saves the open document first, changes the files on disk, reloads the page, and emits `history:switched`. `merge(name)` merges another branch into the current one (a fast-forward or a clean three-way merge) and resolves with the new commit, or null when there was nothing to merge; a conflict changes nothing and rejects `history/conflict` naming the files. Switching and merging need every change in a save point first, or they reject `history/uncommitted`. `createTag(name, commit?, message?)` and `tags()` name milestones. `commitOn(branch, message, { allowEmpty: true })` writes a message-only commit onto another branch without touching the files, so a plugin can keep structured data in commits, as GitWrite's annotations do. `history:saved` fires for every commit Veneer makes. The API version is 0.39.0.

## Sync (Story 9.18)

`setRemote(name, url)` connects the project to a git host, and `sync({ remote, token, username })` fetches, fast-forwards or merges cleanly, and pushes the current branch. Only HTTPS (or plain HTTP) remotes work; an SSH remote (`git@host:…`, `ssh://…`) rejects `history/ssh-unsupported`. Keep the token in `api.secrets` and pass it to each sync; it goes as the HTTP Basic password, with `username` defaulting to `x-access-token`, which GitHub accepts. Sync travels through Veneer's network rules: the first sync to a host asks the writer in a notice (the same consent as `api.net.fetch`), and a local address works only where the writer allowed it for your plugin. A conflict changes nothing, locally or on the remote, and rejects `history/conflict` naming the files. Everything must be in a save point first (`history/uncommitted`). `remotes()` never shows a credential stored in an address. The API version is 0.39.0.

## Reading what an export needs (Story 9.19)

An export should send exactly what the page shows. `api.vault.saveNow()` saves the open document if it has unsaved typing, so a following `vault.read` returns the page's text. `api.vault.readFile(path)` returns an image file's bytes (PNG, JPEG, GIF, WebP, SVG, up to 100 MB) from inside the open project or a loose file's own folder; this is stricter than the page, which may show `../images/x.png` from outside a loose file's folder. `splitFrontmatter(text)` cuts a document where the editor hides its frontmatter and returns `{ frontmatter, yaml, body }`; `frontmatter + body` is always the original text. The outline and word count use the same function. The API version is 0.39.0.

## Modal surfaces (Story 9.22)

A surface declared with `"side": "modal"` opens centered over the dimmed page when a command, a top-bar button, or `api.surfaces.show(id)` summons it, and closes with Esc, a click on the dim, its close button, or `api.surfaces.close(id)`; focus goes in and comes back to the caret. Lists, trees, row actions, input fields, and DOM views work in it as in a side panel, but opening a row keeps it open. A `split` view (`{ kind: 'split', list, detail }`) draws a list on the left and a list, tree, or DOM detail on the right; the keyboard and filtering belong to the list. A side panel shows only a split's list. The API version is 0.39.0.

## Reorderable lists (Story 9.24)

A list or tree view with `reorderable: true` lets the writer rearrange rows among their siblings: drag a row, or press Alt+Up or Alt+Down (Alt+Left and Alt+Right in cards) on the highlighted one. The kernel reorders nothing. `api.surfaces.onReorder(id, handler)` gets `{ movedId, beforeId, parentId }`, where `beforeId` is the sibling the row now sits before (null for the end) and `parentId` is the parent row (null at the top level); the view the plugin sets next is the truth, and a handler that sets none leaves the list as it was. A row can't be dropped under another parent, and rows don't move while the writer's type-to-filter is active. In tests, `host.reorder(surfaceId, event)` calls the handlers. The API version is 0.39.0.

A `form` view (`{ kind: 'form', fields, submitLabel?, note? }`) draws typed fields for an entity editor, since a plugin never draws its own inputs. Field types are `text`, `longtext`, `number` (a number or null), `date` (`YYYY-MM-DD`), `choice` (a string from `options`), `tags` (a string list), `toggle` (a boolean), and `document` (an API path or null, picked from the project's markdown). `api.surfaces.onFormChange(id, handler)` gets `(fieldId, value)` on each change (text as the writer types, after a short pause) and `api.surfaces.onFormSubmit(id, handler)` gets every value by field ID on Cmd+Enter or the submit button, which shows only when `submitLabel` is set. The kernel applies nothing itself: the view the plugin sets next is the truth, except that what the writer is typing in a field stays until a view brings a different value for it. A field's `error` shows under it. A form works in a side panel, the modal, and a split's detail. In tests, `host.formChange(surfaceId, fieldId, value)` and `host.formSubmit(surfaceId, values)` call the handlers. The API version is 0.39.0.

A `diff` view (`{ kind: 'diff', segments, note? }`) draws the segments `wordDiff` returns in the page's type: insertions on the `change` kind tint and underlined, deletions on the `flag` tint and struck through, and the text scrolls and selects like any page text. Give the insert and delete segments of one change the same `id` and the kernel adds Accept and Reject to it; `api.surfaces.onDiffAction(id, (action, changeId) => …)` runs with `'accept'` or `'reject'` and that ID. The kernel applies nothing: set the next view to show what is left. A diff works in a panel, the modal, and a split's detail. The fake host's `host.diffAction(surfaceId, action, changeId)` presses the button.

`api.editor.setMarks(setId, marks)` marks ranges of the open document so annotations show in the writing itself. Each mark is `{ id, from, to, kind, label? }`: `from` and `to` are offsets into the text `api.editor.getText()` returns, `kind` is `note`, `flag`, or `change` (the kernel picks the tint; a plugin never passes a color), and `label` shows as a tooltip. Setting a set replaces its marks, and `[]` clears it. The kernel draws the marks over the real text, never changing the text or the undo history, and they follow the writer's edits. `api.editor.onMarkClick(setId, handler)` runs with the mark's ID when the writer clicks it (the caret still moves); the plugin decides what to show. Marks go when the document is closed or switched and when the plugin is turned off. A malformed set, or more than 3000 marks across a plugin's sets, throws `plugin/bad-marks` with a plain sentence. The fake host has `host.marks` and `host.markClick(setId, markId)`.

`api.projectData` keeps structured data in the open project: a graph's node positions, a timeline's lane order, a book's chapter order. `read(key)` resolves the value or `null`, `write(key, value)` stores anything `JSON.stringify` accepts (1 MB per key, 20 MB per plugin per project), `delete(key)` removes it, and `keys()` lists yours, sorted. Each key is a pretty-printed JSON file at `.veneer/data/<pluginId>/<key>.json`, written atomically, so it syncs and goes into history with the manuscript; keys are lowercase letters, digits, `.`, `_` and `-`. A plugin reaches only its own keys, and removing the plugin keeps its data. It is for data, not for text the writer reads. When a pull, checkout, or merge changes one of your files, you hear `projectData:changed { key }` (and nobody else does); your own writes do not emit it. A loose file has no project, so every call rejects `projectData/no-project`. The API version is 0.39.0.

`api.vault.query({ frontmatter?, tag?, linksTo?, linkedFrom?, limit? })` asks the project index which documents match, without reading any file, so a compendium that lists every character costs the same in a series as in a short book. Every given condition must hold: each `frontmatter` key equals the document's value (strings exactly) or is in it when that value is a list; `tag` matches frontmatter `tags` and inline `#tags`, ignoring case; `linksTo` keeps documents linking to that path; `linkedFrom` keeps documents that path links to. It resolves `{ results, truncated }`, each result `{ path, frontmatter, tags, links }`, sorted by path, at most `limit` (default 200, never more than `MAX_QUERY_RESULTS`, 2000), with `truncated` true when more matched. A document saved just before the query is already in it; unsaved typing is not (`saveNow()` first). `api.vault.backlinks(path)` resolves the sorted paths of the documents linking to one file. Only relative markdown links and images are tracked; wikilinks and other link styles are not (yet). In a loose file only the open file can match, and `backlinks` resolves `[]`. The index cuts frontmatter with `splitFrontmatter`, like the editor, so a block longer than 500 lines is body text there too.
