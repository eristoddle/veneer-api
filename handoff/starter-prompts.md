# Starter prompts for a cloud agent

Paste one of these into a cloud agent session opened on the plugin's own repository. Each assumes the public API repository, https://github.com/eristoddle/veneer-api, is pushed and has the tag `v0.39.0` (a pushed branch is not enough: `git push origin v0.39.0`). Until Stephan pushes it, the agent cannot install `@veneer/api`.

## GitWrite

```
Build the Veneer plugin for this repository, in a new folder veneer-plugin/. Veneer is a desktop writing app whose features are plugins on a documented API. Read https://github.com/eristoddle/veneer-api/blob/main/handoff/README.md (how to depend on the API, lay out, test, and release a plugin) and then handoff/gitwrite-plugin-brief.md (what to build, in order). Depend on @veneer/api with github:eristoddle/veneer-api#v0.39.0 (add an .npmrc containing allow-git=all first, since npm 12 refuses git dependencies by default). Use only that API, test on its fake host with Vitest, commit as you go, and finish by releasing as the README says. If the API lacks something, stop that item, write down exactly what was missing, and carry on with the rest. Do not push to any repository other than this one.
```

## BookForge

```
Build the Veneer plugin for this repository, in a new folder veneer-plugin/. Veneer is a desktop writing app whose features are plugins on a documented API. Read https://github.com/eristoddle/veneer-api/blob/main/handoff/README.md (how to depend on the API, lay out, test, and release a plugin) and then handoff/bookforge-plugin-brief.md (what to build, in order, and what this server must change). Depend on @veneer/api with github:eristoddle/veneer-api#v0.39.0 (add an .npmrc containing allow-git=all first, since npm 12 refuses git dependencies by default). Use only that API, test on its fake host with Vitest, commit as you go, and finish by releasing as the README says. Make the server changes the brief lists in separate commits, with their own tests. If the API lacks something, stop that item, write down exactly what was missing, and carry on with the rest. Do not push to any repository other than this one.
```
