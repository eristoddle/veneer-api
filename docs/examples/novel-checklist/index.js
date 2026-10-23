// @ts-check
/**
 * Novel Checklist: a plugin that needs a project type.
 *
 * manifest.json says `requiredProjectType`, so Veneer keeps this plugin inactive (not listed, not
 * woken) in any project that isn't a "Novel (chapters)" project, and Settings says why. The plugin
 * also OFFERS that type, so a writer can assign it in Project settings. Once they do, this panel
 * checks the open chapter's frontmatter against the type's fields. The check only advises: it never
 * blocks a save or fixes anything.
 */

const PANEL = 'novel-checklist:advice'

/**
 * The frontmatter text of a document (between the opening and closing `---` lines), or null.
 * @param {string | null} text
 * @returns {string | null}
 */
export function frontmatterOf(text) {
  if (text === null) return null
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(text.replace(/\r\n?/g, '\n'))
  return match === null ? null : match[1]
}

/**
 * Required fields of the type that the frontmatter lacks, and values of the wrong kind. (Veneer
 * ships a fuller `adviseFrontmatter` helper in @veneer/api; import it and let your bundler include
 * it if you build your plugin, instead of repeating this.)
 * @param {string | null} frontmatter
 * @param {readonly import('@veneer/api').FrontmatterField[]} fields
 * @returns {string[]}
 */
export function advise(frontmatter, fields) {
  /** @type {Map<string, string>} */
  const present = new Map()
  for (const line of (frontmatter ?? '').split('\n')) {
    const entry = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line)
    if (entry !== null) present.set(entry[1], entry[2].trim())
  }
  /** @type {string[]} */
  const out = []
  for (const field of fields) {
    const label = field.label ?? field.key
    const value = present.get(field.key)
    if (value === undefined || value === '') {
      if (field.required === true) out.push(`${label} is missing.`)
    } else if (field.type === 'number' && !/^-?\d+(\.\d+)?$/.test(value)) {
      out.push(`${label} should be a number.`)
    }
  }
  return out
}

/** @param {import('@veneer/api').PluginApi} api */
export function onload(api) {
  function show() {
    const type = api.workspace.projectType()
    const found = type === null ? [] : advise(frontmatterOf(api.editor.getText()), type.frontmatter)
    api.surfaces.setView(PANEL, {
      kind: 'list',
      items: found.map((message, i) => ({ id: `advice-${i}`, label: message })),
      empty: { text: `This chapter matches ${type?.name ?? 'the project type'}.` }
    })
  }
  api.surfaces.onRefresh(PANEL, show)
  api.editor.onChanged(show)
  api.events.on('document:opened', show)
  show()
}
