# Interface: AiApi

Defined in: [index.ts:3080](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3080)

Whether AI features are on (Epic 12).

## Methods

### enabled()

> **enabled**(): `boolean`

Defined in: [index.ts:3091](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3091)

Whether AI features are on. While they are off the kernel already hides every contribution
the manifest marks `usesAI`; use this to leave AI rows out of data you hand the kernel, such
as a surface's items or palette items.

#### Returns

`boolean`

#### Example

```ts
const rows: ViewItem[] = [{ id: 'plain', label: 'Plain row' }]
if (api.ai.enabled()) rows.push({ id: 'ask', label: 'Ask the model' })
```

***

### onChanged()

> **onChanged**(`listener`): [`Disposable`](Disposable.md)

Defined in: [index.ts:3100](https://github.com/eristoddle/veneer/blob/5ad3c1eadc588faf752e3fe8662eafe718113df7/packages/api/src/index.ts#L3100)

Calls `listener` each time the writer turns AI features on or off, with the new state. The
subscription ends when you dispose it or the plugin unloads.

#### Parameters

##### listener

(`enabled`) => `void`

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
api.ai.onChanged((on) => console.log(on ? 'AI is on' : 'AI is off'))
```
