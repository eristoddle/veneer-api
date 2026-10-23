# Skills

A **skill** adds a selection-box tool with no code: a markdown file of instructions. It is the lightest way to extend Veneer.

## Format

A skill is a folder with a `SKILL.md` that follows the [Agent Skills](https://agentskills.io) format. A single `.md` file also works: Veneer wraps it into a folder named from its `name`.

```markdown
---
name: tighten
description: Make the selection shorter without losing its meaning.
metadata:
  veneer-applies-to: sentence paragraph
  veneer-context: selection title
  veneer-result: replace
  veneer-options: 4
---
Rewrite the selection so it is shorter. Keep the writer's voice.
See [the tone guide](references/tone.md).
```

- `name`: lowercase words joined by hyphens, and **equal to the folder name**. `description` is required.
- Veneer's own settings live under `metadata` as `veneer-*` keys. Values are plain strings:
  - `veneer-applies-to`: selection kinds (`word`, `phrase`, `sentence`, `paragraph`, `any`), space or comma separated. Default `any`.
  - `veneer-context`: what to send alongside (`selection`, `paragraph`, `section`, `title`, `frontmatter`, `document`). Default `selection`.
  - `veneer-result`: `replace` (options that replace the selection, the default) or `info` (text to read).
  - `veneer-options`: how many versions a `replace` skill asks for, 1 to 10. Default 3.
  - `veneer-without-selection`: `true` to offer it at the caret.
- A skill that breaks a rule is refused at install with one sentence ("The skill has no description.").

## Install

Settings > Skills > **Install skill** (a folder or a `.md`). It goes to `userData/skills/<name>/` and appears under `/` and in the palette right away. Its ID is `skill.user:<name>` and the plugin column reads "Your skills". IDs are source-prefixed so skills from different places never shadow each other.

## How it runs

Only the name and description are read to list a skill. When it runs, the body of `SKILL.md` is read **then**, sent to the writer's model with the context the skill declared, and the replies come back as options in the box. The first send to a remote provider gets the usual disclosure.

A prompt-only skill is **read-only by construction**: it has no way to write a file, so it never triggers a write confirmation.

## Files a skill links to

Relative links in `SKILL.md` (`[the tone guide](references/tone.md)`) are the skill's reference files. How they reach the model depends on the provider:

- **A provider with tool calling.** The model is told which files exist and given one host tool, `read_skill_file(path)`. It reads a file only if it needs it, up to five rounds, and each file is cut off at 24 KB. A file is read from the skill's own folder and nowhere else: a path with `..`, an absolute path, or a symlink that leaves the folder is refused, and the model is told so in a sentence.
- **A provider without it.** Veneer tries tools first. If the provider turns the request down (HTTP 400 or 422), the files are inlined into the request instead, in order, up to 24 KB in total; a file that would not fit whole is left out and named in the request. Veneer remembers the refusal for the rest of the session and does not offer tools again.

Links with `..`, absolute paths, or URLs are never followed. A model that ignores `tools` and just answers is treated as one that read nothing: it works from `SKILL.md` alone.

## Project and plugin skills

A project can keep skills in `.veneer/skills/<name>/`. The first time the project opens, the writer is asked once whether to allow them; until they say yes the skills are neither listed nor read. If a skill in the project is added, removed, or edited, the writer is asked again. They appear as `skill.project:<name>` with "This project" in the plugin column.

A plugin can bundle skills in `skills/<name>/` inside its own folder. They appear as `<pluginId>:<name>` under the plugin's name, and go when the plugin is disabled.

## Skills with scripts

A skill folder with `scripts/*.js` is **code**, so it is installed as a plugin, not as a prompt skill. Install it from Settings > Skills; Veneer then shows the same warning as for any plugin and installs nothing until the writer agrees. After that it is the plugin `skill-<name>`: its failures raise a notice naming it, it has its own storage under that ID, and any file write it makes asks the writer first.

The script is the entry. It is `scripts/index.js` (or `.mjs`), or the only script if there is just one; with several and no `index.js` the install stops with a sentence saying so. It exports `onload(api)` and attaches its handler to the skill's single tool, `skill-<name>:run`. The tool's name, description, `veneer-applies-to`, and `veneer-context` come from the `SKILL.md` header:

```js
export function onload(api) {
  api.tools.handle('skill-shout:run', (input) => ({
    kind: 'replace',
    options: [(input.selection?.text ?? '').toUpperCase()]
  }))
}
```

A script's own `SKILL.md` body is not sent anywhere; the script decides what to do. A skill with scripts that are not JavaScript (`.py`, `.sh`) is listed in Settings as unsupported, with the reason, and is never offered under `/`.
