# Brief: the BookForge plugin for Veneer

Build a Veneer plugin that turns a writer's markdown project into an EPUB with the BookForge server. Read `README.md` here first (how to depend on the API, lay out, test, and release). The API version is 0.40.0. Repository for the plugin: the BookForge repository (`~/Dropbox/python/book_forge` on Stephan's machine), in a new folder such as `veneer-plugin/`.

## What BookForge is

BookForge is a FastAPI job server that makes an EPUB from markdown. `POST /api/v1/generate/files` takes multipart fields (title, author, theme, language, description, publisher, and repeated `files`, markdown only) and returns `{ job_id, status_url }`. `POST /api/v1/generate/github` takes a repository URL and a folder. `GET /api/v1/status/{id}` returns pending, processing, completed, or failed, with `download_url`, an error, and EPUB validation. `GET /api/v1/download/{id}` returns the bytes. There is no authentication, CORS is open, jobs live in a JSON file, the upload limit is 50 MB, and the themes are `modern`, `classic`, and `minimal` (the API does not list them). Images and a cover are documented but not implemented; the plugin's first version has none.

## Build, in this order

1. **Choose and order the chapters.** A surface listing the project's markdown files (`api.vault.list`), reorderable (`reorderable: true`, `surfaces.onReorder`), with a toggle to include or leave out a file. Keep the choice and order per project with `api.projectData` (stored in the project's `.veneer/data/`).
2. **Book details.** A form view (`kind: 'form'`) for title, author, language, description, publisher, and a theme choice. Prefill from the first chapter's frontmatter (`splitFrontmatter`) or the project type; keep it with `api.projectData`.
3. **Make the EPUB.** A command "Make an EPUB". Call `api.vault.saveNow()`, read each chapter with `api.vault.read`, strip frontmatter with `splitFrontmatter` (the server prints it otherwise), rewrite relative `.md` links to chapter anchors, and upload as `01_Title.md`, `02_Title.md`, … (the server orders by file name) with `api.net.fetch` multipart. A server on the writer's network needs the per-plugin allowance for local addresses; the writer grants it. An optional API token goes in `api.secrets` and into a header, never into settings.
4. **Progress.** Poll `/status/{id}` on a timer; show the state in a surface. Call `api.notify` when the job completes or fails, with the server's error in plain words.
5. **Save it.** Download with `api.net.fetch` using `as: 'bytes'`, then `api.export.saveAs` so the writer picks where it goes.

## APIs this uses

`api.net.fetch` (bytes and multipart bodies, local addresses; 0.25), `api.secrets` and `api.export.saveAs` (0.25), `api.projectData` (0.35), `api.vault.list`, `read`, `saveNow`, `readFile` (0.30), `splitFrontmatter` (0.30), `api.vault.query` (0.36), the `form`, `list` (reorderable, 0.33), and `split` views (0.31, 0.34), modal and wide surfaces (0.31, 0.32), `api.notify` (0.37), settings (`contributes.settings`). Each is in `docs/reference/` with an example.

## BookForge itself must change (separate from the plugin)

- Accept an explicit chapter order instead of ordering by file name.
- Strip YAML frontmatter, optionally reading title and author from it.
- Accept images and a cover (a second multipart field or a zip), rewrite image paths, and implement the cover (`_copy_cover_image` is a stub).
- Rewrite `.md` links to chapter anchors, add `GET /api/v1/themes`, implement or drop `bookforge.yaml` and custom themes.
- Add an optional API token, tighten CORS, expire old jobs, and report progress detail in `/status`.

A local EPUB generator inside the plugin is not planned; build against the server as it is.

## Done when

- From a project, a writer chooses and orders chapters, fills in the details, makes an EPUB, sees progress, and saves the finished file, all inside Veneer.
- A failed job shows the server's error in a notice; a server that is down says so plainly.
- The token, if any, is in `api.secrets` only.
- Tests on the fake host cover the chapter list, the form, the upload (with a stubbed `net.fetch`), the polling, and the save. The plugin is released as in `README.md` and installs from GitHub into Veneer.
