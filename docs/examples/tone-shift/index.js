// @ts-check
/**
 * Tone Shift: a selection-box tool that uses the writer's model.
 *
 * The tool is declared in manifest.json with `needsProvider: true`; that is what lets this code call
 * `api.providers`. It never sees a key or a URL. It makes one request, shows each version as it
 * finishes streaming (`report`), and returns them as `replace` options. The kernel applies the one
 * the writer picks, as a single undo step; this plugin never touches the page.
 */

/** The line the model puts between versions. */
export const SEPARATOR = '==='
export const VERSIONS = 3

/**
 * The versions in `text` so far. While the reply is still arriving the last one may be half
 * written, so it is left out; once the reply is done (`final`) it counts.
 * @param {string} text
 * @param {boolean} final
 * @returns {string[]}
 */
export function splitVersions(text, final) {
  const parts = text.split(/^[ \t]*===[ \t]*$/m).map((part) => part.trim())
  if (!final) parts.pop()
  return parts.filter((part) => part !== '')
}

/**
 * @param {string} tone
 * @param {string} passage
 * @param {string | undefined} title
 */
export function promptFor(tone, passage, title) {
  return [
    `Rewrite the passage below in a ${tone} tone. Keep its meaning.`,
    `Give ${VERSIONS} different versions, each a full replacement for the passage, separated by a`,
    `line containing only ${SEPARATOR}. No numbering, no commentary.`,
    title ? `\nThe document is titled "${title}".` : '',
    '',
    passage
  ].join('\n')
}

/** @param {import('@veneer/api').PluginApi} api */
export function onload(api) {
  api.tools.handle('tone-shift:rewrite', async (input, signal, report) => {
    const passage = input.selection?.text ?? ''
    const tone = String(await api.settings.get('tone-shift:tone'))
    let text = ''
    let shown = 0
    await api.providers.stream(
      { messages: [{ role: 'user', content: promptFor(tone, passage, input.title) }] },
      (piece) => {
        text += piece
        const versions = splitVersions(text, false).slice(0, VERSIONS)
        if (versions.length > shown) {
          shown = versions.length
          report(versions)
        }
      },
      signal
    )
    const versions = splitVersions(text, true).slice(0, VERSIONS)
    return versions.length > 0
      ? { kind: 'replace', options: versions }
      : { kind: 'info', items: [{ text: 'No versions came back.' }] }
  })
}
