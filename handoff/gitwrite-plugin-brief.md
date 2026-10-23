# Brief: the GitWrite plugin for Veneer

Build a Veneer plugin that brings GitWrite's writer-facing ideas (save a version, see history, explore alternatives, compare, annotate, share) into Veneer, on top of plain git. Read `README.md` here first (how to depend on the API, lay out, test, and release). The API version is 0.39.0. Repository for the plugin: the GitWrite repository (`~/Dropbox/python/git-write` on Stephan's machine), in a new folder such as `veneer-plugin/`.

## What GitWrite is

GitWrite is a Python tool for writers: a core library on pygit2 (save, history, branches called "explorations", merge, tags, sync, a word-level diff, export), a FastAPI server, a web app, and a CLI. A writer's project is a plain git repository. Annotations (feedback from a reader) are empty commits on a `feedback` branch whose message body is YAML: the file, the highlighted text, start and end line, the comment, the author, and a status (new, accepted, rejected); a status change is another commit pointing at the original.

## Direction

Local first. Veneer keeps the open project's history as plain git, in the project folder, with `api.history` (isomorphic-git in Veneer's main process; no system git is needed). The repository GitWrite's pygit2 makes and the one Veneer makes are the same kind of repository and open in each other. The plugin is an adapter: it maps GitWrite's words (save, version, exploration, compare) onto git and onto Veneer surfaces. The GitWrite server is optional: a place to sync to and to collect a beta reader's feedback.

Not supported, by design: revert, cherry-pick, rebase, SSH, LFS (restore a version by reading it with `show` and saving it as a new commit; pick one change from an alternative in the compare view). Merge conflicts are never resolved by the API: a merge that conflicts stops and names the files, and the plugin says so in plain words. A loose file (not in a project) has no history; say so once.

## Build, in this order

1. **Save a version.** A command "Save a Version" that calls `api.vault.saveNow()` then `api.history` commit with a message the writer types (a form view or the palette input). Show the new version in the history list.
2. **History.** A surface listing versions (`log`), newest first, with the message, author, and time. Opening a row shows that version's text read-only (`show`). Restore saves the old text as a new version, never rewriting history.
3. **Compare.** Between two versions, or a version and the open page: `wordDiff` into a `diff` surface view (`kind: 'diff'`, segments with `id`s on changes). Accept and Reject arrive in `api.surfaces.onDiffAction`; accepting applies that change to the open page with `api.editor.edit` (one undo step), and the plugin then sets the next view.
4. **Explorations (branches) and tags.** List, create, and switch (`branches`, `createBranch`, `switchTo`); name a tagged version (`tag`); merge an exploration back (`merge`). Say plainly that switching saves the open page first and reloads it.
5. **Annotations.** Read the `feedback` branch's commits (`log` on any branch with bodies; `commitOn` to write one), parse the YAML, locate each highlighted text in the open page with `findInText`, and draw them with `api.editor.setMarks` (kind `note`, `flag`, or `change` by status), re-set after each save. A click (`onMarkClick`) opens the annotation in a surface with Accept and Reject; the status change is a new commit on the feedback branch. The branch name is a plugin setting that defaults to `feedback`.
6. **Sync.** `setRemote`, `sync({ remote, token, username })` over HTTPS. Keep the token in `api.secrets`, never in settings or logs. Tell the writer after a sync with `api.notify`.
7. **Server (optional).** Log in to a GitWrite server and call its endpoints with `api.net.fetch` (a self-hosted server on the local network needs the per-plugin allowance for local addresses; the writer grants it). Export goes through `api.export.saveAs`.

## APIs this uses

`api.history` (0.27 to 0.30), `vault.saveNow` and `vault.readFile` (0.30), `wordDiff` (0.26), the `diff` view and `surfaces.onDiffAction` (0.38), `api.editor.setMarks` and `onMarkClick` (0.39), `findInText`, the `form`, `list`, and `split` views (0.31, 0.34), modal and wide surfaces (0.31, 0.32), `api.secrets` and `api.export.saveAs` (0.25), `api.net.fetch` (0.20, 0.25), `api.notify` (0.37), `api.projectData` (0.35), settings (`contributes.settings`). Each is in `docs/reference/` with an example.

## GitWrite itself must change (separate from the plugin)

- Export endpoints return server-side file paths; add a download route that returns the bytes.
- Annotations anchor by line and text only; add a few words of context before and after, or a character offset, so a moved passage can still be found.
- The `feedback` branch name is a convention only; document the default and keep git the source of truth.

## Done when

- A writer can save a version, list history, compare any two versions with Accept and Reject on each change, restore, make and switch an exploration, tag, and merge, all from Veneer, on a repository GitWrite's CLI also reads cleanly (`git fsck` passes both ways).
- Annotations written by GitWrite show as marks in the page and a status change round-trips.
- Sync pushes and pulls over HTTPS with a token kept in `api.secrets`.
- Tests on the fake host cover each command and surface. The plugin is released as in `README.md` and installs from GitHub into Veneer.
