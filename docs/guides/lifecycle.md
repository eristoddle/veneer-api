# The plugin lifecycle

A Veneer plugin is a folder (or a `.zip` of one) holding a `manifest.json` and one bundled ES module. There is no `npm install` at the writer's end: bundle your dependencies into the entry file. The only thing the entry imports from Veneer is `@veneer/api`. Type imports are erased, and the kernel hands your code its `api` object. If you import a runtime helper (`veneerError`, `adviseFrontmatter`, `findInText`), your bundler includes it in your entry, so the installed plugin has no imports left to resolve. The [examples](../examples/README.md) skip the build step: they are plain JavaScript that uses only `api`.

```ts
import type { PluginApi } from '@veneer/api'

export function onload(api: PluginApi): void {
  api.commands.handle('my-plugin:hello', () => {
    console.log('Hello')
  })
}

export function onunload(): void {
  // Optional. Release anything you created that isn't a Disposable.
}
```

## The entry module

`main` is a path inside your folder and may have subfolders (`dist/index.js`); it may not start with `/` or contain `..`. Veneer reads **named exports** only: `onload(api)` is required and must be a function, `onunload()` is optional. A default export is ignored, and a module with no `onload` fails to load with "its entry does not export onload". Everything else in the file is yours: comments, type hints (`// @ts-check` and JSDoc are ordinary comments), helper functions, and other exports.

## Install, enable, disable

- **Install** from Settings > Plugins (a folder or a `.zip`). The package goes to `userData/plugins/<id>/` and is enabled everywhere by default. A package with a missing or invalid manifest is refused with one plain sentence and leaves nothing behind.
- **Compatibility.** `apiVersion` in your manifest is `^x.y.z` or an exact `x.y.z`. While the API is below 1.0, `^0.40.0` accepts only `0.17.x`. A plugin built for another version is installed but not enabled, and Settings marks it "Incompatible".
- **Disable / enable** from Settings > Plugins, with no restart. Disabling runs `onunload`, disposes every registration you made, and withdraws your contributions. Enabling brings you back unloaded; you wake on first use.
- **Project overrides.** A project may turn plugins on or off in `.veneer/plugins.json`; the writer is asked once before it applies.

## Activation: lazy by default

Your entry module is not loaded until something needs it:

- a **command, tool, or surface** of yours is used for the first time, or
- an event listed in your manifest's `activationEvents` fires (for example `"vault:saved"`). The event that woke you is delivered to your listener.

Everything you contribute is listed from the manifest alone, before your code runs: your commands in the palette, your tools under `/`, your settings in Settings. Keep `onload` cheap; do work when asked.

## Disposables

Every `register*`, `handle`, `on*`, and `onChanged` call returns a `Disposable`. You don't have to keep it: the kernel disposes everything you registered when you unload or are turned off. Dispose one yourself only to stop early.

## When a plugin fails

If `onload` throws, a handler throws, or a promise you return rejects, the kernel isolates you: your contributions are withdrawn, one notice names your plugin ("<Name> failed to load: <reason>."), and the failure is recorded. Veneer keeps running. The writer sees the full error under Settings > Plugins, where **Try again** brings you back without a restart. On the next launch you get one more try.

Throw a `VeneerError` (`veneerError(code, message)`) for a failure you want described plainly.

## What a plugin never does

Plugins never raise modals and raise a notice only through `api.notify`, add visible chrome on their own, touch Node, read a key, or use the network directly. There is no API for any of those: files go through `api.vault`, models through `api.providers`. Anything you contribute starts hidden: a panel opens from the palette, and a top-bar button shows only after the writer turns it on.

## The development loop

In a development build, the palette has **Load plugin from folder** (it reads your working folder in place, with no copy) and **Reload plugin** (the old instance is disposed completely, `onunload` included, and the edited code is loaded, with no restart). These commands do not exist in a packaged build.
