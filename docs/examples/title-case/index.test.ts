import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import type { PluginManifest } from '@veneer/api'
import { createFakeHost } from '@veneer/api/testing'
import * as plugin from './index.js'

const manifest = JSON.parse(readFileSync(join(__dirname, 'manifest.json'), 'utf8')) as PluginManifest

describe('title-case', () => {
  it('title-cases, keeping small words down unless first or last', () => {
    expect(plugin.titleCase('the lord of the rings')).toBe('The Lord of the Rings')
    expect(plugin.titleCase('what to look for in')).toBe('What to Look for In')
    expect(plugin.titleCase('  spaced   out  ')).toBe('  Spaced   Out  ')
  })

  it('sentence-cases from the first letter', () => {
    expect(plugin.sentenceCase('"HELLO THERE"')).toBe('"Hello there"')
    expect(plugin.sentenceCase('123')).toBe('123')
  })

  it('offers the three cases as replace options, as the tool', async () => {
    const fake = createFakeHost(manifest, plugin)
    await fake.load()
    const result = await fake.runTool('title-case:convert', {
      selection: { text: 'a tale of two cities', from: 0, to: 20 }
    })
    expect(result).toEqual({
      kind: 'replace',
      options: ['A Tale of Two Cities', 'A tale of two cities', 'A TALE OF TWO CITIES']
    })
  })

  it('leaves out an option equal to the text, and says so when nothing is left', async () => {
    const fake = createFakeHost(manifest, plugin)
    await fake.load()
    const some = await fake.runTool('title-case:convert', { selection: { text: 'Hello', from: 0, to: 5 } })
    expect(some).toEqual({ kind: 'replace', options: ['HELLO'] })
    const none = await fake.runTool('title-case:convert', { selection: { text: '', from: 0, to: 0 } })
    expect(none).toEqual({ kind: 'info', items: [{ text: 'Already in every case I offer.' }] })
  })
})
