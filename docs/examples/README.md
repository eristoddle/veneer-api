# Example plugins

Four complete, working plugins to copy from. Each folder has a `manifest.json`, an `index.js` (plain JavaScript, no build step, only the `api` object Veneer hands it), a short README, and unit tests that run against `@veneer/api/testing`.

| Example | Shows |
|---|---|
| [`tone-shift`](tone-shift/README.md) | a selection-box tool that uses the writer's model: `needsProvider`, streaming, `report`, a setting |
| [`title-case`](title-case/README.md) | a tool with no model: the smallest useful plugin |
| [`note-list`](note-list/README.md) | a side panel (surface): lists, a filter field, opening files, an empty state |
| [`novel-checklist`](novel-checklist/README.md) | a plugin that needs a project type, and offers one |

## Using one

1. **Install it as it is:** Settings > Plugins > **Install plugin**, pick the example's folder. It works unmodified, with no restart.
2. **Or develop from it:** copy the folder, rename the `id` (and every `<id>:…` contribution in the manifest and code), and use **Load plugin from folder** and **Reload plugin** in a development build to edit and try.
3. **Test it:** `index.test.ts` shows how to drive a plugin with the fake host. Copy the pattern.

## Writing in TypeScript

These examples are plain JavaScript with type hints so they install with no build. For a TypeScript plugin, import `type { PluginApi } from '@veneer/api'` and bundle to one ES module (for example with esbuild) whose default export shape is `onload(api)`. If you import a runtime helper such as `adviseFrontmatter` from `@veneer/api`, the bundler includes it.

A repo test installs every example here and runs its tests, so these stay working as the API moves.
