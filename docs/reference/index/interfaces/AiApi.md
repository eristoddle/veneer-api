# Interface: AiApi

Defined in: [index.ts:4220](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4220)

Whether AI features are on (Epic 12).

## Methods

### enabled()

> **enabled**(): `boolean`

Defined in: [index.ts:4231](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4231)

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

Defined in: [index.ts:4240](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4240)

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

***

### onModelTool()

> **onModelTool**(`id`, `handler`): [`Disposable`](Disposable.md)

Defined in: [index.ts:4256](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4256)

Answers the model's calls to one of this plugin's declared `contributes.modelTools`. The
handler gets the arguments the model gave (checked against the declared parameters: strings
and numbers only) and returns plain text, at most `MAX_MODEL_TOOL_RESULT` characters (longer
is cut). A throw becomes a short error sentence for the model. Rejects
`plugin/undeclared-contribution` for an ID the manifest does not declare. The handler ends
when you dispose the subscription or the plugin unloads. Never called
while AI features are off or from a `/` tool run (Story 27.2). The writer's answer to "Let
the model use this tool?" also covers the network the handler needs (`api.net.fetch` asks no
separate question while it answers), but local addresses still need the writer's allowance.

#### Parameters

##### id

`string`

##### handler

[`ModelToolHandler`](../type-aliases/ModelToolHandler.md)

#### Returns

[`Disposable`](Disposable.md)

#### Example

```ts
api.ai.onModelTool('notes:find', async (args) => `Found nothing for ${String(args.query)}.`)
```

***

### describeModelTool()

> **describeModelTool**(`id`, `detail`): `void`

Defined in: [index.ts:4268](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4268)

Says what a model tool will reach right now, for the writer's permission question: the card
asks "Let the model use <plugin>: <tool name>?" and adds "It would search <detail>." Keep it
a short phrase such as `your Obsidian vault and Joplin`; more than 120 characters or a line
break is cut. Call it in `onload` and again when the answer changes. Rejects
`plugin/undeclared-contribution` for an ID the manifest does not declare.

#### Parameters

##### id

`string`

##### detail

`string`

#### Returns

`void`

#### Example

```ts
api.ai.describeModelTool('notes:find', 'your Obsidian vault')
```
