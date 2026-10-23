import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import type { PluginManifest } from '@veneer/api'
import { createFakeHost } from '@veneer/api/testing'
import * as plugin from './index.js'

const manifest = JSON.parse(readFileSync(join(__dirname, 'manifest.json'), 'utf8')) as PluginManifest
const input = { selection: { text: 'It was fine.', from: 0, to: 12 }, title: 'Notes' }

describe('tone-shift', () => {
  it('returns the versions the model wrote, as options', async () => {
    const fake = createFakeHost(manifest, plugin, { replies: ['Warm one.\n===\nWarm two.\n===\nWarm three.'] })
    await fake.load()
    expect(await fake.runTool('tone-shift:rewrite', input)).toEqual({
      kind: 'replace',
      options: ['Warm one.', 'Warm two.', 'Warm three.']
    })
  })

  it('asks for the tone the writer chose, and sends the title', async () => {
    const fake = createFakeHost(manifest, plugin, {
      settings: { 'tone-shift:tone': 'formal' },
      replies: ['One.']
    })
    await fake.load()
    await fake.runTool('tone-shift:rewrite', input)
    const sent = fake.modelRequests[0].messages[0].content
    expect(sent).toContain('a formal tone')
    expect(sent).toContain('titled "Notes"')
    expect(sent).toContain('It was fine.')
  })

  it('reports each version as it completes while the reply streams', async () => {
    const fake = createFakeHost(manifest, plugin, { replies: [['One.\n===\nTw', 'o.\n===\nThree.']] })
    await fake.load()
    const reported: string[][] = []
    await fake.runTool('tone-shift:rewrite', input, undefined, (options) => reported.push(options))
    expect(reported).toEqual([['One.'], ['One.', 'Two.']])
  })

  it('says so when no version comes back, and passes a provider failure through', async () => {
    const empty = createFakeHost(manifest, plugin, { replies: ['   '] })
    await empty.load()
    expect(await empty.runTool('tone-shift:rewrite', input)).toEqual({
      kind: 'info',
      items: [{ text: 'No versions came back.' }]
    })
    const failing = createFakeHost(manifest, plugin, {
      providerFailure: { code: 'offline', message: 'Stub is offline.' }
    })
    await failing.load()
    await expect(failing.runTool('tone-shift:rewrite', input)).rejects.toMatchObject({ code: 'offline' })
  })
})
