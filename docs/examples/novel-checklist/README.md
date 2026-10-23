# Novel Checklist: a plugin that needs a project type

A right-side panel that checks the open chapter's frontmatter against a "Novel (chapters)" project type: point of view and chapter number required, status optional.

**What it shows**

- `requiredProjectType` in the manifest. The plugin is inactive, with its panel not listed, in any project that isn't of that type. Settings shows "Inactive: needs type Novel (chapters)", and turning it on without the type tells the writer why it stays inactive.
- Offering a project type with `contributes.projectTypes`: a frontmatter schema the writer assigns in Settings > Project > Project type. Try it: open a folder, assign the type, then open the panel from the palette.
- `api.workspace.projectType()` for the open project's type.
- A schema that only advises: the panel lists what is missing and never blocks or fixes anything.
- Reacting to the open document with `api.editor.onChanged` and `document:opened`.

**Install:** Settings > Plugins > Install plugin, then pick this folder. **Test:** `index.test.ts`. Read next: [project types](../../guides/project-types.md).
