# Building a Veneer plugin in its own repo

This folder is for an agent or a person who builds a Veneer plugin outside the Veneer app's repository. The two plugins planned this way are GitWrite and BookForge; each has a brief here. Everything a plugin may use is `@veneer/api`, documented in `docs/` (start with `docs/README.md`, then `docs/guides/`). The API version these briefs were written against is 0.39.0.

## Depend on the API

`@veneer/api` is not on npm. Install it from this repository, pinned to a release tag:

```
npm install --save-dev github:eristoddle/veneer-api#v0.39.0
```

npm 12 and later refuse git dependencies unless the project allows them, so a plugin repo carries an `.npmrc` with this one line (older npm only warns about it):

```
allow-git=all
```

The repository root is the built package (compiled JavaScript, `.d.ts` files, no build step on install). `src/` holds the TypeScript source for reading. The package has two entry points: `@veneer/api` (types, plus the runtime helpers `wordDiff`, `splitFrontmatter`, `adviseFrontmatter`, `findInText`, `veneerError`, `isVeneerError`) and `@veneer/api/testing` (the fake host).

A plugin's manifest names the API range it needs, for example `"apiVersion": "^0.39.0"`. While the API is below 1.0.0, a minor bump may change things, so `^0.39.0` accepts 0.39.x only. When the plugin needs a newer API, bump the dependency tag and the range together.

## Layout

```
my-plugin/
  manifest.json        id, name, version, apiVersion, main, contributes
  src/index.ts         exports onload(api)
  src/index.test.ts    tests on the fake host
  package.json         devDependencies: @veneer/api, esbuild, typescript, vitest
  tsconfig.json        strict, module esnext, moduleResolution bundler, noEmit
```

- The manifest is authoritative (AD-5): every command, tool, setting, and surface a plugin contributes is declared in `manifest.json`; code only attaches handlers by ID. IDs are lowercase-hyphen and contributions are `<pluginId>:<name>`.
- A plugin imports only from `@veneer/api`. It never touches Node, the network, the keychain, or the DOM directly: files go through `api.vault`, models through `api.providers`, the network through `api.net.fetch`, secrets through `api.secrets`. Plugin UI is host-drawn: a plugin hands the kernel data (list, tree, form, diff, split views) and never draws its own.
- `main` is one bundled ES module with a bare file name (`main.js`, no folder). Bundle with esbuild: `esbuild src/index.ts --bundle --format=esm --platform=neutral --outfile=main.js`. Helpers imported from `@veneer/api` are bundled in.
- A plugin does no work at load. Start on a declared activation event or on first use, and attach handlers in `onload(api)`.
- Logs never contain document text.

## Test

Test against the fake host, with Vitest:

```ts
import { createFakeHost } from '@veneer/api/testing'
```

`docs/guides/testing.md` lists what the fake host records and the helpers that stand in for the kernel (`run`, `runTool`, `emit`, `pressAction`, `refreshSurface`, `formChange`, `diffAction`, `markClick`, `switchProject`, and more). `docs/examples/` holds four small plugins with their tests; copy the shape of `note-list` (a surface) or `novel-checklist` (a project type). Tests run with `npx vitest run`; they never need the Veneer app.

## Release so Veneer can install it

Veneer installs a plugin from a GitHub repository (Settings, Plugins, Install from GitHub). It reads the **latest release** (not a draft or prerelease), in one of two layouts:

1. **Two loose assets** named exactly `manifest.json` and the file `manifest.main` names (`main.js`). Only those two files are fetched, so use this when the bundle is one file.
2. **One `.zip` asset** with `manifest.json` at its root (or under a single top-level folder) plus everything else the plugin needs.

Rules that bite:

- Every release needs a **new tag**. Veneer's "Check for updates" compares the latest tag with the installed one by plain inequality, not by version number.
- Bump `manifest.version` with the tag, and never change the manifest `id` (an update with a different `id` is refused).
- If `apiVersion` does not accept the running Veneer's API version, the plugin installs but is not turned on.
- The package may be at most 50 MB. The writer sees the usual trust warning at install.
- A private repository needs the writer's GitHub token (kept in the keychain, sent only to GitHub).

A release, from the plugin repo:

```
npm run build        # bundles main.js
gh release create v0.1.0 manifest.json main.js --title v0.1.0 --notes "First release"
```

Branch installs also work: the writer enters a branch name and Veneer reads `manifest.json` and the `main` file committed on that branch, pinned to the commit. Use that only for testing.

## Run it in Veneer while developing

A dev build of Veneer has "Load plugin from folder" and "Reload plugin" in the command palette: point it at the folder holding `manifest.json` and `main.js`. The packaged app installs from a folder, a zip, or GitHub in Settings, Plugins.

## What to send back

Report which of the brief's acceptance items are built and tested, and anything the API lacked. Do not work around a missing API with a hack: write down what was missing and what the plugin needed, so the API can grow instead.
