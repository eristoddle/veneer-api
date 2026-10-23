import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import type { ItemsView, PluginManifest, ResolvedProjectType } from '@veneer/api'
import { createFakeHost } from '@veneer/api/testing'
import { validateManifest } from '../../../../src/common/manifest'
import * as plugin from './index.js'

const manifest = JSON.parse(readFileSync(join(__dirname, 'manifest.json'), 'utf8')) as PluginManifest

const type: ResolvedProjectType = {
  id: 'novel-checklist/novel',
  name: 'Novel (chapters)',
  chain: ['novel-checklist/novel'],
  frontmatter: manifest.contributes.projectTypes?.[0].frontmatter ?? [],
  settings: {}
}

const view = (fake: ReturnType<typeof createFakeHost>): ItemsView =>
  fake.views.get('novel-checklist:advice') as ItemsView

describe('novel-checklist', () => {
  it('declares the type it requires, so it is valid and satisfiable', () => {
    expect(manifest.requiredProjectType).toBe('novel-checklist/novel')
    expect(manifest.contributes.projectTypes?.[0].id).toBe(manifest.requiredProjectType)
    expect(validateManifest(manifest, '0.39.0').ok).toBe(true)
  })

  it('reads the frontmatter block of a document', () => {
    expect(plugin.frontmatterOf('---\npov: first\n---\nText')).toBe('pov: first')
    expect(plugin.frontmatterOf('No frontmatter')).toBeNull()
    expect(plugin.frontmatterOf(null)).toBeNull()
  })

  it('advises missing required fields and a wrong number, and nothing for a good chapter', () => {
    const fields = type.frontmatter
    expect(plugin.advise('pov: first\nchapter: 3', fields)).toEqual([])
    expect(plugin.advise('chapter: three', fields)).toEqual([
      'Point of view is missing.',
      'Chapter number should be a number.'
    ])
    expect(plugin.advise(null, fields)).toEqual(['Point of view is missing.', 'Chapter number is missing.'])
  })

  it('lists the advice for the open chapter, and says it matches when it does', async () => {
    const fake = createFakeHost(manifest, plugin, {
      openPath: 'ch1.md',
      text: '---\nchapter: 1\n---\n\nIt was dark.',
      project: { name: 'Book', kind: 'project' },
      projectType: type
    })
    await fake.load()
    expect(view(fake).items.map((i) => i.label)).toEqual(['Point of view is missing.'])
    fake.changeText('---\npov: first\nchapter: 1\n---\n\nIt was dark.')
    expect(view(fake).items).toEqual([])
    expect(view(fake).empty?.text).toBe('This chapter matches Novel (chapters).')
  })

  it('has nothing to say in a project without a type', async () => {
    const fake = createFakeHost(manifest, plugin, { openPath: 'ch1.md', text: 'No frontmatter' })
    await fake.load()
    expect(view(fake).items).toEqual([])
  })
})
