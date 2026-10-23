# Title Case: a tool with no model

Highlight a phrase, sentence, or paragraph, type `/`, pick **Change case**, and choose Title Case, Sentence case, or UPPER CASE.

**What it shows**

- The smallest useful tool: a manifest entry and a handler that returns a Result. No `needsProvider`, so no model and no disclosure.
- `appliesTo` limits which selections offer it.
- A `replace` Result with several options, and an `info` Result when there is nothing to offer.
- Pure functions (`titleCase`, `sentenceCase`) exported so they are easy to test on their own.

**Install:** Settings > Plugins > Install plugin, then pick this folder. **Test:** `index.test.ts`. Read next: [tools and results](../../guides/tools-and-results.md).
