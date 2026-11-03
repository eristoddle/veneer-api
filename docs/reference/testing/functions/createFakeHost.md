# Function: createFakeHost()

> **createFakeHost**(`manifest`, `entry`, `options?`): [`FakeHost`](../interfaces/FakeHost.md)

Defined in: [testing.ts:634](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/testing.ts#L634)

A fake host for unit-testing a plugin without the app: it loads the plugin's entry against in-memory text, files, settings, and a stubbed provider, and records what the plugin did.

## Parameters

### manifest

[`PluginManifest`](../../index/interfaces/PluginManifest.md)

### entry

[`PluginEntry`](../../index/interfaces/PluginEntry.md)

### options?

[`FakeHostOptions`](../interfaces/FakeHostOptions.md) = `{}`

## Returns

[`FakeHost`](../interfaces/FakeHost.md)

## Example

```ts
const fake = createFakeHost(manifest, {
  onload: (api) => {
    api.commands.handle('my-plugin:hi', () => 'hi')
  }
})
await fake.load()
expect(await fake.run('my-plugin:hi')).toBe('hi')
```
