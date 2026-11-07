# Interface: ProjectTypeChatTranscripts

Defined in: [index.ts:2476](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2476)

How a project type takes a saved chat as one of its documents (Epic 33). Added in 0.59.0.

## Properties

### template

> **template**: `string`

Defined in: [index.ts:2485](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L2485)

The ID of one of the type's own `templates`. Its pattern names the file (the date is today's)
and its body is written first; the conversation follows it. If the file exists, the
conversation is added at the end. Added in 0.59.0.

#### Example

```ts
const template: string = 'chat'
```
