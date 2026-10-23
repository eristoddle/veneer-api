import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import type { ItemsView, PluginManifest } from '@veneer/api'
import { createFakeHost } from '@veneer/api/testing'
import * as plugin from './index.js'

const manifest = JSON.parse(readFileSync(join(__dirname, 'manifest.json'), 'utf8')) as PluginManifest
const project = { name: 'Book', kind: 'project' as const }
const files = { 'ideas.md': '', 'chapters/one.md': '', 'chapters/two.md': '' }

const view = (fake: ReturnType<typeof createFakeHost>): ItemsView =>
  fake.views.get('note-list:panel') as ItemsView

describe('note-list', () => {
  it('lists the notes by name, with their folder, when it loads', async () => {
    const fake = createFakeHost(manifest, plugin, { project, files })
    await fake.load()
    expect(view(fake).items.map((i) => [i.label, i.detail])).toEqual([
      ['ideas', undefined],
      ['one', 'chapters'],
      ['two', 'chapters']
    ])
  })

  it('filters as the writer types, and says when nothing matches', async () => {
    const fake = createFakeHost(manifest, plugin, { project, files })
    await fake.load()
    await fake.input('note-list:panel', 'chap')
    expect(view(fake).items.map((i) => i.label)).toEqual(['one', 'two'])
    expect(view(fake).input).toEqual({ placeholder: 'Filter notes', value: 'chap' })
    await fake.input('note-list:panel', 'zzz')
    expect(view(fake).items).toEqual([])
    expect(view(fake).empty?.text).toBe('No notes match “zzz”.')
  })

  it('opens a note when its row is opened', async () => {
    const fake = createFakeHost(manifest, plugin, { project, files })
    await fake.load()
    await fake.openItem('note-list:panel', 'chapters/one.md')
    expect(fake.opens).toEqual(['chapters/one.md'])
  })

  it('shows an empty project kindly', async () => {
    const fake = createFakeHost(manifest, plugin, { project })
    await fake.load()
    expect(view(fake).empty?.text).toBe('No notes yet.')
  })
})
