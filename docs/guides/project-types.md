# Project types

A plugin can offer **kinds of project** (a novel, a screenplay, a thesis) so other plugins can use a project's structure. A project has exactly one type, chosen by the writer.

## Declaring types

```json
{
  "contributes": {
    "projectTypes": [
      {
        "id": "novel/novel",
        "name": "Novel",
        "description": "A long work of fiction.",
        "frontmatter": [
          { "key": "pov", "type": "text", "label": "Point of view", "required": true },
          { "key": "chapter", "type": "number" }
        ],
        "settings": { "novel:daily-goal": 1000 }
      },
      { "id": "novel/thriller", "name": "Thriller", "extends": "novel/novel" }
    ]
  }
}
```

- The ID is `<pluginId>/<typeId>`, named under your plugin.
- `frontmatter` describes fields. Types are `text`, `number`, `boolean`, `date`, `list`, `choice`. `required` fields are advised when missing.
- `settings` are default values for declared settings (yours or Veneer's) while a project has this type.
- `extends` names another type, of your plugin or any other. The child **inherits** its parent's fields and defaults; a child's field or default replaces the parent's of the same key. A child also satisfies a `requiredProjectType` of its parent.

## Every field of a type

| Field | What it does |
|---|---|
| `id`, `name`, `description` | The ID is `<pluginId>/<typeId>`. The name and description show in Settings. |
| `frontmatter` | The type's fields (below). Properties lists them for every document in the project, even one with no front matter yet. |
| `settings` | Default values for declared settings while a project has this type. |
| `extends` | A parent type. The child inherits fields, settings, home panel, templates, and folders. |
| `homePanel` | A surface ID. The left sidebar opens on it in place of Files (Files stays one click away). |
| `templates` | Documents New Document can make. |
| `folders` | Folders the type expects; offered once. |
| `detect` | How the type recognizes a folder it fits. |

### Fields

```json
{ "key": "mood", "type": "choice", "options": ["good", "okay", "rough"], "default": "okay" }
```

`choice` needs `options`. `default` is written **only** when a template makes a document; Properties and opening a file never write it. A value in a file that is not one of the options is kept and shown, marked as not one of the choices.

### Home panel and the sidebar rule

```json
{ "id": "daily/daily", "name": "Daily notes", "homePanel": "daily:days" }
```

The panel is any plugin's surface that is a project panel (`"scope": "project"`) or sits on the left. A surface's `scope` says what it is about: `project` panels (Files, Search) default to the left sidebar, `file` panels (Outline, Properties, Word Count) to the right. An explicit `side` wins over `scope`, and the writer's own move wins over both. The writer can set a project's home back to Files in Settings > Project type.

### Templates

```json
{
  "id": "today",
  "name": "Today’s note",
  "pattern": "{{date:YYYY-MM-DD}}.md",
  "folder": "days",
  "frontmatter": { "date": "{{date:YYYY-MM-DD}}" },
  "body": "# {{date:YYYY-MM-DD}}\n\n"
}
```

`pattern` is the file name and ends in `.md`. `{{date:FORMAT}}` uses moment-style tokens in English (`YYYY`, `YY`, `MMMM`, `MMM`, `MM`, `M`, `DD`, `D`, `dddd`, `ddd`, `HH`, `mm`, and `[text]` kept as written; any other letter is an error naming it), and `/` in a pattern makes folders (`{{date:YYYY}}/{{date:YYYY-MM-DD}}.md`). `formatDatePattern`, `parseDatePattern` (a path back to its ISO date), and `datePatternProblem` are exported for plugins (0.55.0). `createFromTemplate(id, { date, lazy })` takes an ISO `date` for the tokens, and with `lazy: true` opens the page without writing: the file is made on the writer's first change, and closing the page untouched leaves nothing behind; `{{title}}` asks the writer for a name. Both work in `body` and in the front matter values. New Document makes the document directly when the type has one template, and shows a pick list (with "Blank document") when it has several. If the file already exists it opens and nothing is written. A child's template with the same `id` replaces its parent's. A plugin can make a document the same way:

```ts
const path = await api.workspace.createFromTemplate('today')
```

The text starts with the template's front matter, then each field's `default` for keys the template does not set, then the body. The caret lands after the front matter.

### Folders

```json
{ "folders": ["chapters", "characters"] }
```

When the writer picks the type, Veneer asks once whether to create the missing ones ("Create" or "Not now"). Nothing else ever checks them; Settings has a "Create missing folders" button that asks again. At most 20, relative paths, no `..`.

### Detect

```json
{ "detect": { "exists": ["chapters"], "names": { "pattern": "{{date:YYYY-MM-DD}}.md", "share": 0.6 } } }
```

When an untyped folder opens as a project and exactly one installed type matches, Veneer asks once, quietly, "This looks like a … project. Use it?". `exists` matches when any path is there; `names` matches when `share` (default 0.6) of the top-level markdown files fit the pattern, with at least three files. A `*` glob also works in `pattern`. The answer is remembered by Veneer, not in the folder, so a "No thanks" leaves the folder untouched. If two unrelated types match, nothing is asked; a parent and its matching child count as one, and the child is offered.

## Shipping a type

A type can ship **alone** (a plugin with only `contributes.projectTypes`, so any other plugin can extend it or require it) or **with its features** (panels, commands, and tools in the same plugin). To build on someone else's type, either set `"requiredProjectType"` (your plugin is active only in that type and its children) or declare a child type with `extends`. A worked example is `examples/plugins/daily-notes-type`: everything but its small "Days" list is in the manifest.

Hidden configuration a type needs (a daily goal, a template choice) belongs in `api.projectData`, not in the writer's documents.

## The writer assigns it

Settings > Project > **Project type** lists the types of every plugin that is on, plus None. The choice is stored in `.veneer/project.json` as `{ "schemaVersion": 1, "type": "novel/novel" }`. Reopening the folder keeps it. **Changing the type rewrites no document.** A loose file has no project type.

## Reading it

```ts
const type = api.workspace.projectType()
// { id, name, chain: ['novel/thriller', 'novel/novel'], frontmatter: [...], settings: {...} } or null
```

It is the open project's type with inheritance applied, or `null` (no project, no type, or the plugin that offers it is off).

## Schemas only advise

A schema never blocks saving and never fixes anything. To check a document's frontmatter yourself:

```ts
const advice = adviseFrontmatter(frontmatterText, type.frontmatter)
// [{ key: 'pov', problem: 'missing', message: 'Point of view is missing.' }]
```

`adviseFrontmatter` returns plain sentences and never throws.

## Plugins that need a type

```json
{ "id": "scribe", "requiredProjectType": "novel/novel", "contributes": { ... } }
```

Such a plugin is active only in a project of that type or one that extends it. Elsewhere (and in a loose file) it stays inactive: its commands and panels aren't listed and it doesn't wake. Settings shows "Inactive: needs type Novel", and turning it on without the type tells the writer why it stays inactive. It waits until the project's type is known, and is judged again when the project or its type changes. A plugin with no `requiredProjectType` works everywhere.

## Sounds, page looks, typing pulses (API 0.55.0)

A plugin can bundle short sounds and fonts and use them on the page. Declare them in the manifest: `contributes.sounds: [{ "id": "my-plugin:bell", "file": "sounds/bell.ogg" }]` (`.ogg`, `.mp3`, or `.wav`, inside the plugin folder; keep each under 300 KB) and `contributes.fonts: [{ "family": "Special Elite", "file": "fonts/special-elite.woff2" }]`. `api.sound.play(id, { volume })` plays once and `api.sound.loop(id, { volume })` plays until you dispose it; the kernel plays the files from the plugin's folder (never a URL), at your volume times the writer's "Sound volume", and nothing plays while the writer's "Allow sounds from plugins" is off. At most 8 of a plugin's sounds play at once (the oldest is cut), and disabling or unloading the plugin stops them all.

`api.workspace.setPageLook({ font, tint, transitionMs })` sets the page's body font (a family you declared) and a tint blended over the page at a fixed 12%, moving there over `transitionMs` (0 to 20000; none under Reduce Motion). One look per plugin; the last plugin to set one wins; `null`, disabling, or unloading clears it. `api.editor.onTyping(kind => ...)` hears `char`, `enter`, or `delete` for the writer's own keystrokes in the page (never the text, never paste or undo), and `api.commands.run(id)` runs any registered command by ID.

`createFromTemplate` also takes `pattern` and `body` (API 0.55.0) to replace the template's name pattern and body for one call, so a plugin can follow a layout the writer already has (the Diary plugin does this with Obsidian's daily notes). `api.workspace.obsidianDailyNotes()` reads that one settings file, `.obsidian/daily-notes.json`, and resolves `{ folder, format, template }` or `null`; nothing else under `.obsidian` is reachable. A project type's `detect.exists` may name `.obsidian/daily-notes.json`. `api.settings.get` can read `editor:typewriter-mode` and `editor:focus-mode` (the page's view modes) from any plugin; `api.commands.run('veneer:typewriter-mode')` toggles one.

## Card fields (API 0.56.0)

Files can show a folder as cards: a title, a synopsis, an optional image, a colored label, and up to three tags, all read from each document's front matter. A type chooses which field fills each slot with `cards`: `"cards": { "slots": { "synopsis": "summary", "label": "status", "tags": ["pov", "@words"] }, "folders": ["scenes"], "labelColors": { "Draft": 2 } }`. A slot is the name of a front matter field (`@words` in `tags` is the document's word count); a slot you leave out keeps its default (`title`, `description`, `image`, `status`, `tags`). `folders` (project-relative, at most 20) start in Cards mode until the writer switches them to a list. `labelColors` maps a label's text to a color number from 1 to 6 (the `--vn-label-*` tokens); a label with no entry gets a color from its text. A child type inherits all three and overrides per key. The writer can swap any slot with Card Fields in the Files menu, and their choice wins over the type's. A plugin's own panel gets the same cards from `ViewItem.synopsis`, `cardLabel`, `tags`, and `editable` (see the views guide); `examples/plugins/daily-notes-type` declares `cards`.

## Panels for one type (API 0.58.0)

A surface can name `"projectType": "<pluginId>/<type>"` in its manifest entry. Its tab is then drawn only in a project of that type or a type that `extends` it, so a plugin that serves one kind of project leaves no stray tabs in the others. Assigning or removing a type redraws the tabs at once. Commands are not gated: keep your own guards, and keep setup commands (like `freelance:setup`) working in a project with no type.

## Saving a chat as one of the type's documents (API 0.59.0)

A type can say where a saved chat goes by naming one of its own templates: `"chatTranscripts": { "template": "today" }`. When the writer ends a chat with Done, Save then offers "Save as today's entry" before the plain file. The template's pattern names the file (today's date), its body is written first, and the conversation follows it as level-3 headings. If the file already exists, the conversation is added at its end under a "Chat" heading. A child type inherits the setting. The diary type uses it with a template whose body ends in a "Chat" heading.

