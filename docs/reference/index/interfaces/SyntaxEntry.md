# Interface: SyntaxEntry

Defined in: [index.ts:1520](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1520)

One available syntax contribution as the kernel hands it to the editor (`EditorHost.setSyntax`).

## Extends

- [`SyntaxContribution`](SyntaxContribution.md)

## Properties

### id

> **id**: `string`

Defined in: [index.ts:1467](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1467)

The full contribution ID, `<pluginId>:<name>`.

#### Inherited from

[`SyntaxContribution`](SyntaxContribution.md).[`id`](SyntaxContribution.md#id)

***

### kind

> **kind**: `"inline"` \| `"line"` \| `"block"`

Defined in: [index.ts:1468](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1468)

#### Inherited from

[`SyntaxContribution`](SyntaxContribution.md).[`kind`](SyntaxContribution.md#kind)

***

### pattern?

> `optional` **pattern?**: `string`

Defined in: [index.ts:1470](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1470)

A JavaScript regular expression source; the opening pattern for a `block`. Not needed with `callout`.

#### Inherited from

[`SyntaxContribution`](SyntaxContribution.md).[`pattern`](SyntaxContribution.md#pattern)

***

### end?

> `optional` **end?**: `string`

Defined in: [index.ts:1472](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1472)

The closing pattern of a `block`.

#### Inherited from

[`SyntaxContribution`](SyntaxContribution.md).[`end`](SyntaxContribution.md#end)

***

### hide?

> `optional` **hide?**: `number`[]

Defined in: [index.ts:1474](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1474)

Capture groups to hide off the caret line.

#### Inherited from

[`SyntaxContribution`](SyntaxContribution.md).[`hide`](SyntaxContribution.md#hide)

***

### token?

> `optional` **token?**: `string`

Defined in: [index.ts:1476](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1476)

A `--vn-*` or `--vnp-<pluginId>-*` color token for the match.

#### Inherited from

[`SyntaxContribution`](SyntaxContribution.md).[`token`](SyntaxContribution.md#token)

***

### look?

> `optional` **look?**: [`SyntaxLook`](../type-aliases/SyntaxLook.md)

Defined in: [index.ts:1477](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1477)

#### Inherited from

[`SyntaxContribution`](SyntaxContribution.md).[`look`](SyntaxContribution.md#look)

***

### callout?

> `optional` **callout?**: `object`

Defined in: [index.ts:1481](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1481)

A callout kind the core draws: its lower-case name, its label, and a `--vn-kind-*` tint token.

#### kind

> **kind**: `string`

#### label

> **label**: `string`

#### tint

> **tint**: `string`

#### Inherited from

[`SyntaxContribution`](SyntaxContribution.md).[`callout`](SyntaxContribution.md#callout)

***

### render?

> `optional` **render?**: `boolean`

Defined in: [index.ts:1521](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1521)

True when the plugin draws the match through `api.editor.onRenderSyntax`.

#### Overrides

[`SyntaxContribution`](SyntaxContribution.md).[`render`](SyntaxContribution.md#render)

***

### renderer?

> `optional` **renderer?**: [`SyntaxRenderer`](../type-aliases/SyntaxRenderer.md)

Defined in: [index.ts:1522](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1522)

***

### onClick?

> `optional` **onClick?**: [`SyntaxClickHandler`](../type-aliases/SyntaxClickHandler.md)

Defined in: [index.ts:1523](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1523)

## Methods

### report()

> **report**(`err`): `void`

Defined in: [index.ts:1525](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L1525)

Called at most once per contribution per session with a failure; the kernel raises the notice.

#### Parameters

##### err

`unknown`

#### Returns

`void`
