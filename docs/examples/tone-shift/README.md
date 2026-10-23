# Tone Shift: a selection-box tool that uses a model

Highlight a sentence or paragraph, type `/`, pick **Change tone**, and choose among a few rewrites in the tone set in Settings.

**What it shows**

- A tool with `needsProvider: true` calling `api.providers.stream`. The plugin never sees a key; the first send to a remote provider shows the writer a disclosure.
- `report(options)` showing each version as it finishes streaming.
- Returning a `replace` Result: the kernel applies the pick as one undo step.
- A declared `enum` setting read with `api.settings.get`.
- Passing a provider failure through (`offline`, `auth`, …) so the box shows it as one sentence.

**Install:** Settings > Plugins > Install plugin, then pick this folder. **Test:** `index.test.ts` uses the fake host from `@veneer/api/testing`. Read next: [tools and results](../../guides/tools-and-results.md), [models](../../guides/providers.md).
