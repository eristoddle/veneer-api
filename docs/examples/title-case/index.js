// @ts-check
/**
 * Title Case: a selection-box tool that needs no model and no network.
 *
 * Everything happens here, in plain code: the handler gets the selected text and returns options.
 * It changes nothing itself; the kernel applies the one the writer picks, as a single undo step.
 */

/** Small words a title leaves lower case, unless first or last. */
const SMALL = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to'])

/** @param {string} word */
const capital = (word) => (word === '' ? word : word[0].toUpperCase() + word.slice(1).toLowerCase())

/**
 * @param {string} text
 * @returns {string}
 */
export function titleCase(text) {
  const parts = text.split(/(\s+)/)
  const wordAt = parts.flatMap((part, i) => (part.trim() === '' ? [] : [i]))
  const first = wordAt[0]
  const last = wordAt[wordAt.length - 1]
  return parts
    .map((part, i) => {
      if (part.trim() === '') return part
      const small = SMALL.has(part.toLowerCase()) && i !== first && i !== last
      return small ? part.toLowerCase() : capital(part)
    })
    .join('')
}

/** @param {string} text */
export function sentenceCase(text) {
  const lower = text.toLowerCase()
  const at = lower.search(/\p{L}/u)
  return at < 0 ? lower : lower.slice(0, at) + lower[at].toUpperCase() + lower.slice(at + 1)
}

/** @param {import('@veneer/api').PluginApi} api */
export function onload(api) {
  api.tools.handle('title-case:convert', (input) => {
    const text = input.selection?.text ?? ''
    // Offer only versions that differ from what is there, and never the same one twice.
    const options = [titleCase(text), sentenceCase(text), text.toUpperCase()].filter(
      (option, i, all) => option !== text && all.indexOf(option) === i
    )
    return options.length > 0
      ? { kind: 'replace', options }
      : { kind: 'info', items: [{ text: 'Already in every case I offer.' }] }
  })
}
