# Interface: NetFile

Defined in: [index.ts:4517](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4517)

A file in a multipart upload (Story 9.8).

## Properties

### name

> **name**: `string`

Defined in: [index.ts:4519](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4519)

The file name the service sees.

***

### type?

> `optional` **type?**: `string`

Defined in: [index.ts:4521](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4521)

Its media type; `application/octet-stream` when left out.

***

### data

> **data**: `Uint8Array`

Defined in: [index.ts:4522](https://github.com/eristoddle/veneer/blob/1e8bbc12ee3db875d6fe9ec34ab80f352ed7124a/packages/api/src/index.ts#L4522)
