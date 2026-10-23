# Testing your plugin

`@veneer/api/testing` ships a fake host so you can unit-test a plugin without the app. It loads your entry module against in-memory text, files, settings, and a stubbed model provider, and records what your plugin did. It enforces the rules the kernel does: an undeclared contribution throws, a bad `edit` throws `editor/bad-change`, and every disposable is tracked.

```ts
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, it } from 'vitest'
import type { PluginManifest } from '@veneer/api'
import { createFakeHost } from '@veneer/api/testing'
import * as plugin from './index.js'

// Next to your manifest.json and index.js, as in the examples.
const manifest = JSON.parse(readFileSync(join(__dirname, 'manifest.json'), 'utf8')) as PluginManifest

it('replaces the selection with an upper-case version', async () => {
  const fake = createFakeHost(manifest, plugin, { text: 'hello there' })
  await fake.load()
  const result = await fake.runTool('my-plugin:shout', {
    selection: { text: 'hello', from: 0, to: 5 }
  })
  expect(result).toEqual({ kind: 'replace', options: ['HELLO'] })
})
```

**Running it.** Any test runner works; the examples use [Vitest](https://vitest.dev): add `vitest` and the `@veneer/api` types package as dev dependencies and run `npx vitest`. A plain-JavaScript plugin is imported as `./index.js`; a TypeScript plugin imports its source (`./index`) and you test before bundling.

`createFakeHost(manifest, entry, options?)` returns a host:

- **Lifecycle:** `load()` runs `onload`; `unload()` runs `onunload` and disposes everything; `liveDisposables()` counts what is still registered. `api` is the `PluginApi` your code received.
- **Driving it:** `run(commandId, ...args)` runs a command you handled; `runTool(id, input, signal?, report?)` runs a tool handler; `emit(event)` delivers an event; `switchProject({ name, kind })` simulates opening another project; `openItem`, `pressAction`, `refreshSurface`, `input`, and `rowAction` act on a surface; `runPaletteItem` and `refreshPalette` act on a palette provider.
- **State you set:** options `text`, `openPath`, `files` (closed documents by path), `settings`, `project`, `projectType`, `remoteAllowed`, `replies` (what `api.providers` answers, one entry per call), and `providerFailure`; and `setText`, `changeText`, `setSelection`, `setSetting`.
- **What it recorded:** `edits`, `files`, `views` (the last view per surface), `paletteItems`, `created`, `renames`, `trashed`, `searches`, `opens`, `modelRequests`, `images`, and `shown`.

A plugin that passes against the fake host and loads in the app behaves the same. Write tests for your handlers' logic; reserve the real app for the final check.

The reference for every option and record is generated from the types in [`reference/testing`](../reference/testing/README.md).
