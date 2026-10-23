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
- `frontmatter` describes fields. Types are `text`, `number`, `boolean`, `date`, `list`. `required` fields are advised when missing.
- `settings` are default values for declared settings (yours or Veneer's) while a project has this type.
- `extends` names another type, of your plugin or any other. The child **inherits** its parent's fields and defaults; a child's field or default replaces the parent's of the same key. A child also satisfies a `requiredProjectType` of its parent.

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
