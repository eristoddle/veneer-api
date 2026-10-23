# The Veneer plugin API

`@veneer/api` is the plugin API for Veneer, a desktop writing app where everything, the editor included, is a plugin. This is the reference for building one. It is meant to be read by a person or an agent with nothing else: the guides below explain how the parts fit together, and the generated [reference](reference/README.md) lists every type and method with its signature, notes, and an example.

**API version: 0.39.0** (`API_VERSION` in `@veneer/api`). It follows [semantic versioning](https://semver.org): while the major version is 0, a *minor* bump may include breaking changes, and each one is listed under Breaking changes below with a migration note; a *patch* bump never breaks. A plugin's `apiVersion` (`^0.34.0` or an exact `0.34.0`) must accept the running version, or it is installed but not enabled. Both `@veneer/api` (the types package) and the manifest carry this number.

## Start here

1. **Build the smallest plugin.** Copy one of the [examples](examples/README.md) (a tool that uses a model, a tool with no model, a panel, a plugin that needs a project type).
2. **Read the guides** in this order, or jump to what you need.
3. **Test it** with the fake host in [testing](guides/testing.md), then install it from Settings > Plugins.

## Guides

| Guide | What it covers |
|---|---|
| [The plugin lifecycle](guides/lifecycle.md) | the package, `onload`/`onunload`, lazy activation, disposables, failure, install and enable, the dev loop |
| [Manifests and contributions](guides/manifests-and-contributions.md) | every manifest field and contribution kind, naming, key suggestions |
| [Tools and results](guides/tools-and-results.md) | selection-box tools, the handler, `replace`/`insert`/`info`, side-effect confirmation |
| [Host-drawn views](guides/views.md) | surfaces, lists and trees, row actions, palette providers, images and HTML |
| [Settings](guides/settings.md) | declaring a setting, reading it, layering |
| [Models and the network](guides/providers.md) | `api.providers`, errors, disclosure, and `api.net.fetch` |
| [Skills](guides/skills.md) | extending Veneer with a markdown file and no code |
| [Project types](guides/project-types.md) | declaring types, inheritance, `api.workspace.projectType()`, plugins that need a type |
| [Events](guides/events.md) | every event and payload, save events and history plugins |
| [Colors and tokens](guides/color-tokens.md) | `--vn-*` and `--vnp-<pluginId>-<token>` |
| [Unstable parts](guides/unstable.md) | the escape hatches and the CSS override layer |
| [Testing](guides/testing.md) | the fake host in `@veneer/api/testing` |

## More pages

- [The variable catalog](catalog.md): the `--vn-*` tokens, their version, and what changes it.
- [Editing modes](editing-modes.md): for a plugin that supplies a way of drawing the document (live preview, source).
- [`api.vault.saveImage`](vault-save-image.md): saving pasted or dropped images.

## Reference

[`reference/`](reference/README.md) is generated from the source by TypeDoc (`npm run docs:api`). Every method of `api.*` and every exported function carries a purpose, its signature, lifecycle notes where it returns a subscription, and an example. A test in the suite fails if any entry is missing one, and every example is type-checked against the real API, so the reference can't drift from the code.

## Rules in one screen

- Plugins import only `@veneer/api`. They never touch Node, the keychain, or the network except through `api.net.fetch`.
- The manifest is the authority for what a plugin contributes; code attaches handlers by ID.
- The kernel draws all UI from data you hand over. Plugins never raise modals, raise a notice only through `api.notify` (one plain sentence, a few a minute, drawn by the kernel), and never add chrome on their own. Everything starts hidden.
- Documents change only through `api.editor` (the open document) or `api.vault.process` (a closed one). A tool returns a Result; only the kernel applies it.
- Plugins load lazily, and a failing plugin never takes Veneer down.

## Version history

Every version so far has only **added** to the API.

| Version | Added |
|---|---|
| 0.3 | declared settings, side-panel surfaces, offered top-bar buttons |
| 0.4 | `api.vault.list`, `api.workspace`, `document:opened`, palette providers |
| 0.6 | file operations (`create`, `createFolder`, `rename`, `trash`), rename participants, row actions, find and replace on the editor host |
| 0.7 | project search, opening a document with a selection, an input on views, `api.surfaces.show` |
| 0.8 | editor change and selection listeners, indented rows |
| 0.9 | selection-box tools (`contributes.tools`, `api.tools.handle`, `ToolResult`) |
| 0.10–0.11 | editor-host helpers for the selection pill and card |
| 0.12 | `api.providers` (`complete`, `stream`) |
| 0.13 | the `report` argument of a tool handler |
| 0.14 | `contributes.keybindings` (suggested keys) |
| 0.15 | `api.vault.read` (a document as last saved) |
| 0.16 | `contributes.projectTypes`, `api.workspace.projectType()`, `adviseFrontmatter` |
| 0.17 | the manifest's `requiredProjectType` |
| 0.18 | `contributes.themes` (a light and dark pair of colors) |
| 0.19 | `contributes.colors` (a plugin's own `--vnp-` color tokens) |
| 0.20 | `api.net.fetch` (the network, for tools only) |
| 0.21 | a setting's optional `category` (its page in Settings) |
| 0.22 | `contributes.blockRenderers` (plugins render fenced blocks) |
| 0.23 | syntax tokens and code themes |
| 0.24 | `api.resources.sanitizeSvg` |
| 0.25 | `api.net.fetch` from commands and events, bytes and multipart bodies, `api.secrets`, `api.export.saveAs` |
| 0.26 | `wordDiff` (a word-by-word diff for compare views) |
| 0.27 | `api.history` (save points as plain git) and `history:saved` |
| 0.28 | history branches, tags, merge, `commitOn`, and `history:switched` |
| 0.29 | history `remotes`, `setRemote`, and `sync` (HTTPS only) |
| 0.30 | `vault.saveNow`, `vault.readFile` (image bytes), `splitFrontmatter` |
| 0.31 | modal surfaces (`side: 'modal'`), the `split` view, `surfaces.close` |
| 0.32 | wide panels (`width: 'wide'`), card layout (`layout: 'cards'`, `ViewItem.image`), `surfaces.show(id, { focus })` |
| 0.37 | `api.notify` (a limited, kernel-drawn notice a plugin may request; AD-21) |
| 0.38 | the `diff` view and `api.surfaces.onDiffAction` (a host-drawn compare with Accept and Reject) |
| 0.39 | `api.editor.setMarks` and `onMarkClick` (marks on the text in the page) |

## Breaking changes

None so far. This section lists each breaking change, the version that made it, and how to migrate:

> **0.x.0, what changed.** Migration: the exact edit a plugin needs to make.

## Migration notes

None needed yet. When a breaking change lands, the migration note goes under Breaking changes above and in the release's entry in the version history.

## What is not here yet

Nothing planned is missing from this version. Open design questions are listed in the project's pending-review notes.
