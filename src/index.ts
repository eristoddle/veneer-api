/**
 * `@veneer/api`: the public plugin API and the only module a plugin imports (AD-3).
 *
 * A plugin is a folder holding `manifest.json` and one ESM entry that exports `onload(api)`
 * and, optionally, `onunload()` (AD-5). The manifest is the only source of contribution
 * metadata; code attaches handlers by contribution ID. Plugins get no notice or modal API:
 * plugin-facing UI is host-drawn (AD-4).
 *
 * Seeded in Story 1.2; Story 1.3 adds `EditorHost`; Story 1.7 adds `EditorHost.applyResult`, the
 * `api.editor` facade, and `api.vault.process` (AD-8, AD-18); Story 1.8 adds `api.resources`
 * (AD-16); Story 1.10 adds `api.vault.saveImage` (FR-62); Story 1.11 adds editing modes
 * (`contributes.editingModes`, `api.editor.registerMode`, `EditorHost.setMode`; FR-12, AD-7);
 * Story 2.3 adds declared settings (`contributes.settings`, `api.settings`; FR-44, FR-26);
 * Story 2.4 adds side-panel surfaces (`contributes.surfaces`, `api.surfaces`; FR-7, AD-4, AD-15)
 * and bumps the API to 0.3.0; Story 2.6 adds offered top-bar buttons (`contributes.topBarButtons`;
 * FR-53, AD-15), additive, so 0.3.1. Story 2.7 adds `api.vault.list`, `api.workspace`, the
 * `document:opened` event, group rows and an empty state on item views, `api.surfaces.onAction`
 * and `onRefresh`, and palette providers (`contributes.paletteProviders`, `api.palette`; FR-10,
 * UX-DR10, UX-DR15), so 0.4.0. Story 2.8 adds `api.vault.create/createFolder/rename/trash`,
 * rename participants (`api.vault.onRename`), the `vault:created/renamed/trashed` events, image
 * entries in `vault.list`, row actions on surfaces (`SurfaceContribution.rowActions`,
 * `ViewItem.kind`, `api.surfaces.onRowAction/beginRowAction`), and `ViewItem.opens` (FR-10,
 * AD-4, AD-8, AD-17), and Story 2.9 adds EditorHost find/replace (FR-59), so 0.6.0. Story 2.10
 * adds project search (`api.vault.search`, `findInText`), opening a document with a selection
 * (`api.workspace.open(path, { select })`, `EditorHost.select`), a kernel-drawn input on item
 * views (`ItemsView.input`, `api.surfaces.onInput`), row details with marks, a view note, and
 * `api.surfaces.show` (FR-59, AD-4, AD-17), so 0.7.0. Story 2.11 adds editor change and selection
 * listeners (`api.editor.onChanged`, `onSelectionChanged`) and indented list rows
 * (`ViewItem.depth`) for the Outline (UX-DR10, AD-3, AD-4), so 0.8.0. Story 4.1 adds selection-box
 * tools (`contributes.tools`, `api.tools.handle`, `ToolResult`; FR-23, AD-10), so 0.9.0. Story 4.2 adds
 * `EditorHost.coordsAtPos` for the selection pill (FR-14, AD-18), so 0.10.0. Story 4.3 adds
 * `EditorHost.setHighlight`/`clearHighlight` for the selection card (UX-DR12), so 0.11.0. Story 5.5 adds
 * `api.providers` (`complete`, `stream`; FR-34, AD-11), so 0.12.0. Story 5.6 adds the optional `report`
 * argument to `ToolHandler`, for options that arrive while a tool runs (FR-39), so 0.13.0. Story 6.7 adds `contributes.keybindings`, keys a plugin suggests and the writer accepts
 * in Settings (FR-27, AD-5), so 0.14.0. Story 7.6 adds `api.vault.read`, a document's text as of its last save (FR-55), so 0.15.0. Story 7.4 adds `contributes.projectTypes` and `api.workspace.projectType()` (FR-36, FR-37,
 * AD-13), so 0.16.0. Story 7.5 adds the manifest's `requiredProjectType` (FR-38, AD-13), so 0.17.0. Story 8.3 adds `contributes.themes` (a light and dark pair of color values; FR-45, AD-5), so 0.18.0. Story 8.4 adds `contributes.colors` (a plugin's own color tokens, `--vnp-<pluginId>-<token>`; FR-57), so 0.19.0. Story 6.8 adds `api.net.fetch`, a plugin's only way onto the network (FR-51, AD-6), so 0.20.0. A setting's optional `category` (a page for it in Settings, FR-44), so 0.23.0. Story 9.4 adds fenced-block renderers (`contributes.blockRenderers`, `api.editor.registerBlockRenderer`, `EditorHost.setBlockRenderers`; AD-19), so 0.22.0. Story 9.5 adds the syntax color tokens and code themes (`ThemeContribution.scope: 'code'`; AD-19), so 0.23.0. Story 9.6 adds `api.resources.sanitizeSvg` and the `svg` block result (AD-16, AD-19), so 0.24.0. Story 9.8 adds `api.secrets`, `api.export`, binary and multipart `api.net.fetch` bodies, and network use from commands and events, so 0.25.0. Story 9.15 adds `wordDiff`, a word-by-word diff for compare views, so 0.26.0. Story 9.13 adds `api.history` and `history:saved` (AD-20), so 0.27.0. Story 9.14 adds branches, tags, merge, `commitOn`, and `history:switched`, so 0.28.0. Story 9.18 adds `remotes`, `setRemote`, and `sync`, so 0.29.0. Story 9.19 adds `vault.saveNow`, `vault.readFile`, and `splitFrontmatter`, so 0.30.0. Story 9.22 adds modal surfaces, the `split` view, and `surfaces.close`, so 0.31.0. Story 9.23 adds wide panels (`SurfaceContribution.width`), card layout (`ItemsView.layout`, `ViewItem.image`), and `surfaces.show(id, { focus })`, so 0.32.0. Story 9.24 adds reorderable lists (`ItemsView.reorderable`, `surfaces.onReorder`), so 0.33.0. Story 9.25 adds the `form` view (`FormView`, `surfaces.onFormChange`, `surfaces.onFormSubmit`), so 0.34.0. Story 9.26 adds `api.projectData` and `projectData:changed`, so 0.35.0. Story 9.27 adds `api.vault.query` and `api.vault.backlinks`, the project index made readable, so 0.36.0. Story 9.20 adds `api.notify`, a limited, kernel-drawn notice a plugin may request (AD-21), so 0.37.0. Story 9.16 adds the `diff` view (`DiffView`, `surfaces.onDiffAction`), so 0.38.0. Story 9.17 adds `api.editor.setMarks` and `onMarkClick`, marks on the text in the page (`Mark`, `EditorHost.setMarks`), so 0.39.0.
 */

/** The running API version. A manifest's `apiVersion` must accept it (AD-5: Compatibility). */
export const API_VERSION = '0.39.0'

/** Plugin IDs are lowercase-hyphen, e.g. `word-count` (spine: naming). */
export const PLUGIN_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** Returned by every registration and subscription; the kernel disposes them all on disable. */
export interface Disposable {
  dispose(): void
}

/** Typed rejection shape for every API and IPC failure (spine: Errors convention). */
export interface VeneerError {
  code: string
  message: string
  pluginId?: string
}

/**
 * Makes the error every part of Veneer rejects with: a `code` such as `my-plugin/no-notes`, a plain message, and optionally the plugin it concerns.
 *
 * @example
 * ```ts
 * throw veneerError('my-plugin/no-notes', 'There are no notes to export.', 'my-plugin')
 * ```
 */
export function veneerError(code: string, message: string, pluginId?: string): VeneerError {
  return pluginId === undefined ? { code, message } : { code, message, pluginId }
}

/**
 * Tells whether a caught value is a `VeneerError`, so its `code` can be read safely.
 *
 * @example
 * ```ts
 * try {
 *   await api.vault.read('missing.md')
 * } catch (err) {
 *   if (isVeneerError(err) && err.code === 'vault/read-failed') console.log('No such file')
 * }
 * ```
 */
export function isVeneerError(value: unknown): value is VeneerError {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.code === 'string' &&
    typeof v.message === 'string' &&
    (v.pluginId === undefined || typeof v.pluginId === 'string')
  )
}

/** Event names are `domain:past-verb`, e.g. `vault:saved`, `window:focused` (spine: naming). */
export type EventName = `${string}:${string}`

/** Every event carries its name in `type`; payload fields sit beside it. */
export interface VeneerEvent {
  readonly type: EventName
}

/**
 * Emitted after a document save resolves (AD-8). `path` is the API path: project-relative with
 * `/` for a project file, absolute for a loose one. `content` is the saved text (`\n` endings).
 */
export interface VaultSavedEvent extends VeneerEvent {
  readonly type: 'vault:saved'
  readonly path: string
  readonly content: string
}

/**
 * Emitted when a markdown file in the open project (or the open loose file) changes on disk
 * outside Veneer, e.g. by git, sync, or another editor (FR-55, Story 3.1). Veneer's own saves
 * never fire it. `path` is the API path, as in `VaultSavedEvent`. For the open document, the
 * page has already reloaded when this arrives, unless it held unsaved edits.
 */
export interface VaultChangedOutsideEvent extends VeneerEvent {
  readonly type: 'vault:changed-outside'
  readonly path: string
}

/**
 * Emitted when the project changes (FR-2, AD-14): File > Open Folder…, or opening a file that
 * belongs to another project or folder. Once per change of scope root or kind (a loose folder
 * opened as a project counts), and once more when a window loads, so a fresh renderer's
 * plugins learn the current project. `name` is the folder's base name, never a path; `kind` is
 * `project` for a project root, `loose` for a loose file's folder. Every API path after it
 * (`vault.process`, `vault:saved`) is relative to the new root, or absolute for a loose file.
 */
export interface ProjectSwitchedEvent extends VeneerEvent {
  readonly type: 'project:switched'
  readonly name: string
  readonly kind: 'project' | 'loose'
}

/**
 * Emitted when a document becomes the open one (FR-10): a Finder open, `api.workspace.open`, or
 * a window loading with a document open. `path` is the API path: project-relative with `/`, or
 * absolute for a loose file. `api.workspace.current()` already reports it when this arrives.
 */
export interface DocumentOpenedEvent extends VeneerEvent {
  readonly type: 'document:opened'
  readonly path: string
}

/**
 * One entry of `api.vault.list` (FR-10, AD-14). `path` is the API path (project-relative with `/`,
 * or absolute for a loose file); `name` is the base name with its extension (`b.md`, `notes`).
 * `file` is a markdown document; `image` is a PNG, JPEG, GIF, WebP, or SVG (Story 2.8).
 */
export interface VaultEntry {
  path: string
  name: string
  kind: 'file' | 'folder' | 'image'
}

/** What a rename or move did (FR-10): API paths before and after. A move is a rename. */
export interface VaultRename {
  from: string
  to: string
  kind: 'file' | 'folder'
}

/**
 * Emitted after `api.vault.create` or `createFolder` made something (FR-10). `kind` is `file`
 * for a document, `folder` for a folder.
 */
export interface VaultCreatedEvent extends VeneerEvent {
  readonly type: 'vault:created'
  readonly path: string
  readonly kind: 'file' | 'folder'
}

/**
 * Emitted after a rename or move finished (FR-10): the file or folder moved, links into it were
 * rewritten, and every rename participant ran. `kind` is `file` for a document or an image.
 */
export interface VaultRenamedEvent extends VeneerEvent, VaultRename {
  readonly type: 'vault:renamed'
}

/** Emitted after `api.vault.trash` moved something to the OS trash (FR-10). */
export interface VaultTrashedEvent extends VeneerEvent {
  readonly type: 'vault:trashed'
  readonly path: string
  readonly kind: 'file' | 'folder'
}

/**
 * A rename participant (FR-10, AD-17): called once per rename or move, after the kernel
 * rewrote relative markdown links and image embeds, with the old and new API paths. A plugin
 * with another link syntax (wikilinks, say) rewrites its own through `api.vault.process`.
 */
export type RenameParticipant = (rename: VaultRename) => unknown

/** The open project as `api.workspace.current()` reports it: base name only, never a path. */
export interface WorkspaceProject {
  name: string
  kind: 'project' | 'loose'
}

/** What is open now (FR-10, AD-14). */
export interface WorkspaceState {
  /** The open project or loose file's folder, or null before anything opened. */
  project: WorkspaceProject | null
  /** The open document's API path, or null (none, or the untitled page before its first save). */
  document: string | null
}

/** A span of document text by offsets (`\n` line endings, no BOM). */
export interface TextRange {
  from: number
  to: number
}

/** How `api.workspace.open` opens a document (Story 2.10). */
export interface WorkspaceOpenOptions {
  /** Select this range once the document shows (origin `find`), scrolled into view. */
  select?: TextRange
}

/**
 * One project-search hit (FR-59, Story 2.10). `from`/`to` are offsets into the document's text
 * as the editor holds it (`\n` line endings, no BOM), ready for `workspace.open`'s `select`.
 * `line` is one-based. `snippet` is the hit's line, shortened around the hit (with `…` where
 * cut) and stripped of leading whitespace; `marks` are the hit's offsets within `snippet`.
 */
export interface SearchMatch {
  from: number
  to: number
  line: number
  snippet: string
  marks: [number, number][]
}

/** One document's hits, in document order. `path` is an API path. */
export interface SearchFileResult {
  path: string
  matches: SearchMatch[]
}

/** `api.vault.search` stops after this many matches across all documents. */
export const MAX_SEARCH_MATCHES = 500
/** The longest query `api.vault.search` takes; a longer one rejects `vault/out-of-scope`. */
export const MAX_SEARCH_QUERY = 500
/** `api.vault.query` answers with at most this many documents; `limit` is capped here. */
export const MAX_QUERY_RESULTS = 2000
/** The most keys a query's `frontmatter` may name, and the longest string in a query. */
export const MAX_QUERY_KEYS = 20
export const MAX_QUERY_TEXT = 500

/** A frontmatter value a query can ask for. */
export type VaultQueryValue = string | number | boolean

/** What `api.vault.query` asks of the project index (Story 9.27). Every given condition must hold. */
export interface VaultQuery {
  /** Each key must equal the document's frontmatter value, or be in it when that value is a list. */
  frontmatter?: Record<string, VaultQueryValue>
  /** A tag the document has, from frontmatter `tags` or an inline `#tag`; case-insensitive. */
  tag?: string
  /** Keeps documents whose relative links include exactly this API path (a folder path matches nothing; `backlinks` also matches links into a folder). */
  linksTo?: string
  /** Keeps documents that this API path links to. */
  linkedFrom?: string
  /** At most this many results; default 200, capped at `MAX_QUERY_RESULTS`. */
  limit?: number
}

/** One document the index answered with. */
export interface VaultQueryEntry {
  /** The document's API path. */
  path: string
  /** Its YAML frontmatter as an object; empty without one. */
  frontmatter: Record<string, unknown>
  /** Its tags, without the `#`. */
  tags: string[]
  /** The API paths its relative links and images point to, each once. */
  links: string[]
}

/** `api.vault.query`'s answer. */
export interface VaultQueryResult {
  /** Matching documents sorted by path. */
  results: VaultQueryEntry[]
  /** True when more matched than were returned. */
  truncated: boolean
}
/** How much of a hit's line a snippet keeps before the hit, and its longest length. */
const SNIPPET_BEFORE = 30
const SNIPPET_MAX = 160

/**
 * Project search's matching (FR-59), the same as the editor's find: case-insensitive, literal,
 * non-overlapping substrings over the whole text, frontmatter included. Returns at most `max`
 * hits with snippets (see `SearchMatch`). `text` must already use `\n` line endings.
 *
 * @example
 * ```ts
 * const hits = findInText('A dark and stormy night.', 'stormy')
 * console.log(hits[0].snippet)
 * ```
 */
export function findInText(text: string, query: string, max = MAX_SEARCH_MATCHES): SearchMatch[] {
  if (query === '' || max <= 0) return []
  const pattern = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'giu')
  const out: SearchMatch[] = []
  let line = 1
  let lineStart = 0
  let scanned = 0
  for (const hit of text.matchAll(pattern)) {
    const from = hit.index
    const to = from + hit[0].length
    // Lines are counted incrementally, so a large file is walked once.
    for (let i = text.indexOf('\n', scanned); i !== -1 && i < from; i = text.indexOf('\n', i + 1)) {
      line++
      lineStart = i + 1
    }
    scanned = from
    let lineEnd = text.indexOf('\n', from)
    if (lineEnd === -1) lineEnd = text.length
    let start = Math.max(lineStart, from - SNIPPET_BEFORE)
    const cut = start > lineStart
    // Indentation says nothing in a one-line snippet.
    if (!cut) while (start < from && /\s/.test(text.charAt(start))) start++
    const end = Math.min(lineEnd, Math.max(to, start + SNIPPET_MAX), start + SNIPPET_MAX * 2)
    const head = cut ? '…' : ''
    const tail = end < lineEnd ? '…' : ''
    const snippet = head + text.slice(start, end) + tail
    const markFrom = head.length + (from - start)
    const markTo = head.length + (Math.min(to, end) - start)
    out.push({ from, to, line, snippet, marks: [[markFrom, markTo]] })
    if (out.length >= max) break
  }
  return out
}

/** Frontmatter longer than this many lines is body text, as the editor treats it. */
export const FRONTMATTER_MAX_LINES = 500

/** A document cut where the editor hides its frontmatter (Story 9.19). */
export interface FrontmatterSplit {
  /** The whole leading block, `---` through the closing `---` or `...` line and its newline; `''` when there is none. */
  frontmatter: string
  /** The lines between the fences (the YAML itself), without the fences. */
  yaml: string
  /** Everything after the block. `frontmatter + body` is always the original text. */
  body: string
}

/**
 * Splits a document's frontmatter from its body exactly where the editor hides it: a first line
 * of `---`, closed by a `---` or `...` line within `FRONTMATTER_MAX_LINES` lines. Anything else
 * is all body. Pure; it never changes a byte, so joining the parts gives the text back. `text`
 * should use `\n` line endings, as `vault.read` and the editor give it.
 *
 * @example
 * ```ts
 * const { yaml, body } = splitFrontmatter('---\ntitle: One\n---\n# Chapter One\n')
 * console.log(yaml) // 'title: One\n'
 * console.log(body) // '# Chapter One\n'
 * ```
 */
export function splitFrontmatter(text: string): FrontmatterSplit {
  const none: FrontmatterSplit = { frontmatter: '', yaml: '', body: text }
  const first = text.indexOf('\n')
  if (first === -1 || text.slice(0, first).trimEnd() !== '---') return none
  let lineStart = first + 1
  for (let n = 2; n <= FRONTMATTER_MAX_LINES && lineStart <= text.length; n++) {
    const nl = text.indexOf('\n', lineStart)
    const lineEnd = nl === -1 ? text.length : nl
    const line = text.slice(lineStart, lineEnd).trimEnd()
    if (line === '---' || line === '...') {
      const end = nl === -1 ? text.length : nl + 1
      return {
        frontmatter: text.slice(0, end),
        yaml: text.slice(first + 1, lineStart),
        body: text.slice(end)
      }
    }
    if (nl === -1) break
    lineStart = nl + 1
  }
  return none
}

/**
 * One piece of a `wordDiff` result. `equal` text is in both versions, `delete` text only in the
 * first, `insert` text only in the second.
 */
export interface WordDiffSegment {
  kind: 'equal' | 'insert' | 'delete'
  text: string
}

/** A diff that would need more edits than this between two anchors gives up on that stretch. */
const DIFF_MAX_EDITS = 2000
/** A changed stretch longer than this many words and spaces is shown whole, not word by word. */
const DIFF_MAX_REGION_TOKENS = 60000
/** Recursion limit for anchoring on unique lines or words; past it, the plain diff takes over. */
const DIFF_MAX_DEPTH = 48

const RUN_EQUAL = 0
const RUN_DELETE = 1
const RUN_INSERT = 2

/** Runs are flat pairs (kind, count); a run the same kind as the last one extends it. */
function pushRun(out: number[], kind: number, count: number): void {
  if (count === 0) return
  if (out.length > 0 && out[out.length - 2] === kind) out[out.length - 1] += count
  else out.push(kind, count)
}

/**
 * Myers' O(ND) diff, giving up past `maxEdits`. Each step keeps only the diagonals it reached,
 * so memory is O(D²), not O(D·(N+M)).
 */
function myersRuns(a: Int32Array, b: Int32Array, maxEdits: number, out: number[]): boolean {
  const n = a.length
  const m = b.length
  const limit = Math.min(maxEdits, n + m)
  const off = limit + 1
  const v = new Int32Array(2 * limit + 3)
  const trace: Int32Array[] = []
  for (let d = 0; d <= limit; d++) {
    // Diagonals -d-1 .. d+1 as they stood before this step, at index k + d + 1.
    trace.push(v.slice(off - d - 1, off + d + 2))
    for (let k = -d; k <= d; k += 2) {
      let x =
        k === -d || (k !== d && v[off + k - 1] < v[off + k + 1])
          ? v[off + k + 1]
          : v[off + k - 1] + 1
      let y = x - k
      while (x < n && y < m && a[x] === b[y]) {
        x++
        y++
      }
      v[off + k] = x
      if (x >= n && y >= m) {
        const ops: number[] = []
        let cx = n
        let cy = m
        for (let s = d; s > 0; s--) {
          const t = trace[s]
          const ck = cx - cy
          const at = (kk: number): number => t[kk + s + 1]
          const prevK = ck === -s || (ck !== s && at(ck - 1) < at(ck + 1)) ? ck + 1 : ck - 1
          const prevX = at(prevK)
          const prevY = prevX - prevK
          while (cx > prevX && cy > prevY) {
            ops.push(RUN_EQUAL)
            cx--
            cy--
          }
          ops.push(cx === prevX ? RUN_INSERT : RUN_DELETE)
          cx = prevX
          cy = prevY
        }
        for (let i = 0; i < cx; i++) ops.push(RUN_EQUAL)
        for (let i = ops.length - 1; i >= 0; i--) pushRun(out, ops[i], 1)
        return true
      }
    }
  }
  return false
}

/**
 * Pairs of positions whose item occurs exactly once in each side, longest in-order subset
 * (patience diff's anchors). Prose rarely repeats a whole line, so this splits a long document
 * into small gaps cheaply.
 */
function uniqueAnchors(a: Int32Array, b: Int32Array): [number, number][] {
  const count = new Map<number, number>()
  for (let i = 0; i < a.length; i++) count.set(a[i], (count.get(a[i]) ?? 0) + 1)
  const inB = new Map<number, number>()
  for (let j = 0; j < b.length; j++) {
    const c = count.get(b[j])
    if (c !== 1) continue
    inB.set(b[j], inB.has(b[j]) ? -1 : j)
  }
  const pairs: [number, number][] = []
  for (let i = 0; i < a.length; i++) {
    const j = inB.get(a[i])
    if (j !== undefined && j >= 0) pairs.push([i, j])
  }
  if (pairs.length === 0) return pairs
  // Longest increasing run of b positions (patience sorting), so anchors never cross.
  const tails: number[] = []
  const prev = new Int32Array(pairs.length).fill(-1)
  for (let p = 0; p < pairs.length; p++) {
    let lo = 0
    let hi = tails.length
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (pairs[tails[mid]][1] < pairs[p][1]) lo = mid + 1
      else hi = mid
    }
    if (lo > 0) prev[p] = tails[lo - 1]
    tails[lo] = p
  }
  const out: [number, number][] = []
  for (let p = tails[tails.length - 1]; p !== -1; p = prev[p]) out.push(pairs[p])
  return out.reverse()
}

function diffRuns(a: Int32Array, b: Int32Array, out: number[], depth: number): void {
  const min = Math.min(a.length, b.length)
  let start = 0
  while (start < min && a[start] === b[start]) start++
  let endA = a.length
  let endB = b.length
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--
    endB--
  }
  pushRun(out, RUN_EQUAL, start)
  const ma = a.subarray(start, endA)
  const mb = b.subarray(start, endB)
  if (ma.length === 0 || mb.length === 0) {
    pushRun(out, RUN_DELETE, ma.length)
    pushRun(out, RUN_INSERT, mb.length)
  } else {
    const anchors = depth < DIFF_MAX_DEPTH ? uniqueAnchors(ma, mb) : []
    if (anchors.length > 0) {
      let pa = 0
      let pb = 0
      for (const [ia, ib] of anchors) {
        diffRuns(ma.subarray(pa, ia), mb.subarray(pb, ib), out, depth + 1)
        pushRun(out, RUN_EQUAL, 1)
        pa = ia + 1
        pb = ib + 1
      }
      diffRuns(ma.subarray(pa), mb.subarray(pb), out, depth + 1)
    } else if (!myersRuns(ma, mb, DIFF_MAX_EDITS, out)) {
      pushRun(out, RUN_DELETE, ma.length)
      pushRun(out, RUN_INSERT, mb.length)
    }
  }
  pushRun(out, RUN_EQUAL, a.length - endA)
}

/** Diffs two lists of strings; `ids` gives equal strings one number across both. */
function diffPieces(
  a: string[],
  b: string[],
  emit: (kind: WordDiffSegment['kind'], text: string) => void
): void {
  const ids = new Map<string, number>()
  const intern = (list: string[]): Int32Array => {
    const out = new Int32Array(list.length)
    for (let i = 0; i < list.length; i++) {
      let id = ids.get(list[i])
      if (id === undefined) ids.set(list[i], (id = ids.size))
      out[i] = id
    }
    return out
  }
  const runs: number[] = []
  diffRuns(intern(a), intern(b), runs, 0)
  let ia = 0
  let ib = 0
  for (let r = 0; r < runs.length; r += 2) {
    const count = runs[r + 1]
    if (runs[r] === RUN_EQUAL) {
      emit('equal', a.slice(ia, ia + count).join(''))
      ia += count
      ib += count
    } else if (runs[r] === RUN_DELETE) {
      emit('delete', a.slice(ia, ia + count).join(''))
      ia += count
    } else {
      emit('insert', b.slice(ib, ib + count).join(''))
      ib += count
    }
  }
}

const splitLines = (text: string): string[] => text.match(/[^\n]*\n|[^\n]+$/g) ?? []
const splitWords = (text: string): string[] => text.match(/\s+|\S+/g) ?? []

/**
 * A word-by-word diff of two texts, for compare views (a history plugin showing what changed
 * between versions). Returns segments in order: joining every `equal` and `delete` gives
 * `before` back exactly, and every `equal` and `insert` gives `after`.
 *
 * A word is a run of non-space characters, punctuation included, so `text.` becoming
 * `text, indeed.` is one deletion and one insertion. Spaces between two changes on a line join
 * them into one change, and inside a change the deletion always comes before the insertion.
 * Lines are compared first and words only inside changed lines, so 100,000-word documents
 * finish well within a second; a changed stretch too long or too different to compare word by
 * word comes back as one deletion and one insertion. A pure function; it never throws.
 *
 * This ports the word level of GitWrite's `get_word_level_diff`, with one difference: GitWrite
 * shows a changed line pair under 60% similar as whole lines, while `wordDiff` still shows the
 * words the two share (`final word` → `final change` keeps `final ` as equal).
 *
 * @example
 * ```ts
 * const segments = wordDiff('The old line of text.', 'The new line of text, indeed.')
 * const added = segments.filter((s) => s.kind === 'insert').map((s) => s.text)
 * console.log(added) // ['new', 'text, indeed.']
 * ```
 */
export function wordDiff(before: string, after: string): WordDiffSegment[] {
  const raw: WordDiffSegment[] = []
  const emit = (kind: WordDiffSegment['kind'], text: string): void => {
    if (text !== '') raw.push({ kind, text })
  }
  let oldRegion: string[] = []
  let newRegion: string[] = []
  const flush = (): void => {
    if (oldRegion.length === 0 && newRegion.length === 0) return
    const oldText = oldRegion.join('')
    const newText = newRegion.join('')
    const oldWords = splitWords(oldText)
    const newWords = splitWords(newText)
    if (oldWords.length + newWords.length > DIFF_MAX_REGION_TOKENS) {
      emit('delete', oldText)
      emit('insert', newText)
    } else {
      diffPieces(oldWords, newWords, emit)
    }
    oldRegion = []
    newRegion = []
  }
  diffPieces(splitLines(before), splitLines(after), (kind, text) => {
    if (kind === 'equal') {
      flush()
      emit('equal', text)
    } else if (kind === 'delete') oldRegion.push(text)
    else newRegion.push(text)
  })
  flush()
  return tidyWordDiff(raw)
}

/**
 * Spaces (not line breaks) between two changes join them; each run of changes becomes one
 * deletion then one insertion; neighbours of one kind merge.
 */
function tidyWordDiff(raw: WordDiffSegment[]): WordDiffSegment[] {
  const out: WordDiffSegment[] = []
  let del = ''
  let ins = ''
  const flushChange = (): void => {
    if (del !== '') out.push({ kind: 'delete', text: del })
    if (ins !== '') out.push({ kind: 'insert', text: ins })
    del = ''
    ins = ''
  }
  for (let i = 0; i < raw.length; i++) {
    const s = raw[i]
    if (s.kind === 'delete') del += s.text
    else if (s.kind === 'insert') ins += s.text
    else if (
      (del !== '' || ins !== '') &&
      i + 1 < raw.length &&
      raw[i + 1].kind !== 'equal' &&
      /^[^\S\n]+$/.test(s.text)
    ) {
      del += s.text
      ins += s.text
    } else {
      flushChange()
      const last = out[out.length - 1]
      if (last !== undefined && last.kind === 'equal') last.text += s.text
      else out.push({ kind: 'equal', text: s.text })
    }
  }
  flushChange()
  return out
}

/**
 * The window's project and open document (FR-10, AD-14). Plugins never touch the filesystem
 * (AD-6): opening goes through main, which scope-checks every path.
 */
export interface WorkspaceApi {
  /**
   * What is open now: the project or loose file's folder and the open document's API path.
   *
   * @example
   * ```ts
   * const { project, document } = api.workspace.current()
   * if (project?.kind === 'project' && document !== null) {
   *   console.log(`Editing ${document} in ${project.name}`)
   * }
   * ```
   */
  current(): WorkspaceState
  /**
   * The open project's type with its inheritance applied, or null (no project, no type set, or
   * the plugin that offers it is off). A project has one type, stored in `.veneer/project.json`
   * (FR-37, AD-13).
   *
   * @example
   * ```ts
   * const type = api.workspace.projectType()
   * const needsPov = type?.frontmatter.some((f) => f.key === 'pov' && f.required)
   * ```
   */
  projectType(): ResolvedProjectType | null
  /**
   * Makes the document at `path` (an API path) the open one, the way a Finder open does: the
   * current document is saved first. Resolves once main has opened it. Rejects, carrying
   * `pluginId`, with `vault/out-of-scope` (outside the project or loose file, or not a markdown
   * document), `vault/read-failed` (missing, or a folder), or `plugin/unavailable`. For the two
   * vault codes the kernel has already shown "Couldn't open <path>: <reason>.", and a handler
   * that lets the rejection through is not failed for it.
   *
   * With `select` (Story 2.10), the range (offsets into the document's text, `\n` line endings,
   * no BOM: what `vault.search` reports) is selected once the document shows, with origin
   * `find`, and scrolled into view. When `path` is already the open document it is not
   * reloaded: only the selection moves, and undo history stays. A range past the end is
   * clamped; a malformed one is ignored.
   *
   * @example
   * ```ts
   * await api.workspace.open('chapters/one.md', { select: { from: 0, to: 5 } })
   * ```
   */
  open(path: string, options?: WorkspaceOpenOptions): Promise<void>
  /**
   * Opens the loose file's folder as a project, the same flow as File > Open Folder…: the
   * document stays open with the same key, so its snapshots and session survive (AD-14).
   * Rejects, carrying `pluginId`, with `vault/out-of-scope` when the open document isn't a
   * loose file, `vault/unknown-document` with none open, or `plugin/unavailable`.
   *
   * @example
   * ```ts
   * api.commands.handle('my-plugin:promote', () => api.workspace.openFolderAsProject())
   * ```
   */
  openFolderAsProject(): Promise<void>
}

/** A command contribution. `id` is the full contribution ID, `<pluginId>:<name>`. */
export interface CommandContribution {
  id: string
  title: string
}

/**
 * An editing mode contribution (FR-12, AD-7): a way of drawing the same file text, such as live
 * preview. `id` is the full contribution ID, `<pluginId>:<name>`; `title` is what the View menu
 * shows. The plugin attaches the mode's extension set with `api.editor.registerMode`.
 */
export interface EditingModeContribution {
  id: string
  title: string
}

/**
 * A mode's CodeMirror 6 extension set: a CM6 `Extension` handed to the editor as-is (the
 * raw-CM6 escape hatch, unstable and unenforced). Typed `unknown` so `@veneer/api` takes no
 * CodeMirror dependency. A mode must only draw: decorations, widgets, view plugins, themes
 * (AD-7). It must not change the text or override the base editor (read-only, spellcheck
 * attributes, keymaps, theme), even though raw CM6 makes that possible.
 */
export type EditingModeExtension = unknown

/**
 * A fenced-block renderer contribution (Story 9.4, AD-19): a plugin that draws fenced code
 * blocks of some languages. `id` is the full contribution ID, `<pluginId>:<name>`. `languages`
 * lists info-string languages (lowercase, as written after the opening fence, e.g. `mermaid`),
 * or is `["*"]` for every fenced block. A block goes to the most specific declaration: a
 * language named by one renderer beats `"*"`; among equals the first registered wins. The plugin
 * attaches the handler with `api.editor.registerBlockRenderer`; declare an activation event
 * (such as `app:started`) so it is loaded before blocks need it.
 */
export interface BlockRendererContribution {
  id: string
  languages: string[]
}

/** The fenced block a renderer is asked to draw. The text is never changed by a renderer. */
export interface BlockInfo {
  /** The info string's first word, lowercased; empty for a bare fence. */
  language: string
  /** The code between the fences, `\n` line endings, no trailing newline. */
  text: string
  /** Which Veneer theme is showing, so a diagram can pick its colors. */
  theme: 'light' | 'dark'
}

/** The syntax token names a `tokens` result may use; each maps to `--vn-syntax-<token>`. */
export const BLOCK_TOKENS = [
  'keyword',
  'string',
  'comment',
  'number',
  'function',
  'type',
  'variable',
  'operator',
  'punctuation',
  'tag',
  'attribute'
] as const

export type BlockToken = (typeof BLOCK_TOKENS)[number]

/** A token over `from`..`to`, offsets into `BlockInfo.text`. */
export interface BlockTokenSpan {
  from: number
  to: number
  token: BlockToken
}

/**
 * What a renderer returns for a block (AD-19, AD-4): `tokens` colors the block's real text, which
 * stays editable; `html` replaces the block with a picture while the cursor is outside it, and
 * the kernel sanitizes it (AD-16) so a plugin never touches the page's DOM; `svg` does the same
 * for a drawing, through `api.resources.sanitizeSvg`, which keeps the styling an SVG needs (its
 * `<style>` and `style`, ids) and drops anything that could load or run; `null` leaves the block
 * plain. Invalid spans are dropped.
 */
export type BlockResult =
  | { kind: 'tokens'; tokens: BlockTokenSpan[] }
  | { kind: 'html'; html: string }
  | { kind: 'svg'; svg: string }
  | null

/**
 * A renderer's handler. It runs after the editor is idle, only for blocks in or near the
 * viewport, and is aborted through `signal` after `BLOCK_RENDER_TIMEOUT_MS`. A throw, a
 * rejection, or a timeout leaves the plain block and raises one kernel notice naming the plugin.
 */
export type BlockRenderer = (
  block: BlockInfo,
  signal: AbortSignal
) => BlockResult | Promise<BlockResult>

/** How long a renderer may take before the plain block stays and the failure is reported. */
export const BLOCK_RENDER_TIMEOUT_MS = 2000

/** One available renderer as the kernel hands it to the editor (`EditorHost.setBlockRenderers`). */
export interface BlockRendererEntry {
  id: string
  languages: string[]
  render: BlockRenderer
  /** Called at most once per renderer per session with a failure; the kernel raises the notice. */
  report(err: unknown): void
}

/** A setting's value as stored: settings are flat JSON scalars (FR-44). */
export type SettingValue = boolean | number | string

/**
 * The control the kernel draws for a setting (FR-44, AD-4): `boolean` a switch, `string` and
 * `number` a text field (written on blur or Enter), `enum` a menu of `options`, `folder` the
 * path plus a "Choose…" button that opens the native folder picker.
 */
export type SettingType = 'boolean' | 'string' | 'number' | 'enum' | 'folder'

/**
 * Where a setting can be set (FR-26): `user` in `userData/settings.json`, `project` in the open
 * project's `.veneer/config.json`, `both` in either, the project value winning.
 */
export type SettingScope = 'user' | 'project' | 'both'

/** One choice of an `enum` setting. */
export interface SettingOption {
  value: string
  label: string
}

/**
 * A setting contribution (FR-44, AD-5). `id` is the full contribution ID, `<pluginId>:<name>`.
 * The kernel draws the control from this declaration alone; plugins never draw settings UI.
 * `default` must match `type` (an `enum` default is one of `options`; a `folder` default is a
 * path, or `''` for none).
 */
export interface SettingContribution {
  id: string
  type: SettingType
  default: SettingValue
  label: string
  description?: string
  /**
   * A page of this plugin's settings in the Settings sidebar, such as `Appearance`. Settings with
   * the same category (up to 40 characters) share a page, listed under the plugin's name; settings
   * with none stay on the plugin's own page. Optional, and a plugin with few settings can skip it.
   */
  category?: string
  scope: SettingScope
  /** Required for `enum`, and only allowed there. */
  options?: SettingOption[]
}

/**
 * Reads this plugin's own declared settings (FR-44, FR-26). The value is layered: the
 * declaration's default, then the open project type's default (Story 7.4), then the user value,
 * then the project value, the most specific winning. Plugins never write settings; the writer changes them in the settings surface.
 */
export interface SettingsApi {
  /**
   * The setting's current value, read fresh. Rejects `plugin/undeclared-contribution` for an
   * ID this plugin's manifest doesn't declare, including another plugin's.
   *
   * @example
   * ```ts
   * const goal = await api.settings.get('my-plugin:daily-goal')
   * if (typeof goal === 'number') console.log(`Goal: ${goal} words`)
   * ```
   */
  get(id: string): Promise<SettingValue>
  /**
   * Fires with the ID of one of this plugin's settings whose value changed: the writer changed
   * it, or a project switch changed which value applies.
   *
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * api.settings.onChanged(async (id) => {
   *   if (id === 'my-plugin:daily-goal') refresh(await api.settings.get(id))
   * })
   * ```
   */
  onChanged(listener: (id: string) => void): Disposable
}

/**
 * Where a surface lives: a side panel, or `modal`, a large surface centered over the dimmed
 * page, summoned and dismissed like Settings (Story 9.22).
 */
export type SurfaceSide = 'left' | 'right' | 'modal'

/**
 * A side-panel surface contribution (FR-7, AD-4, AD-15). `id` is the full contribution ID,
 * `<pluginId>:<name>`; `title` names it for assistive tech and tooltips; `icon` is a Lucide icon
 * name in kebab case (`"folder"`, `"list-tree"`), which the kernel draws as the surface's tab (an
 * unknown name gets a generic icon); `side` is the panel it opens in. The kernel draws the
 * panel frame, the tab, and the rows; the plugin only hands it a view (`api.surfaces.setView`).
 */
export interface SurfaceContribution {
  id: string
  title: string
  icon: string
  side: SurfaceSide
  /**
   * `wide` (Story 9.23) opens the panel at twice a side's width, for cards: the writer drags
   * its edge to resize it, and the width is remembered for this surface alone. Default `normal`.
   */
  width?: SurfaceWidth
  /** Actions on the surface's rows, drawn and run by the kernel (Story 2.8, AD-4). */
  rowActions?: RowActionContribution[]
}

/** How wide a surface's panel opens (`SurfaceContribution.width`). */
export type SurfaceWidth = 'normal' | 'wide'

/** What a row stands for, so the kernel knows which row actions apply (`ViewItem.kind`). */
export type RowKind = 'file' | 'image' | 'folder'

/** Where a row action applies: a kind of row, or `root`, the view's empty space. */
export type RowActionTarget = RowKind | 'root'

/**
 * How the kernel asks for a row action's value (AD-4): plugins never draw an input or a
 * confirmation.
 * - `name`: the row's label becomes a text field holding it, the part before an image's
 *   extension selected; Enter or a click away commits, Esc cancels. The value is the new name.
 * - `new-name`: an empty field in a new row inside the target folder: the folder row it was
 *   started on, else the started row's folder, else the root. The value is the name typed.
 * - `folder`: the palette card lists the root (`''`) and every folder row except the row
 *   itself, its descendants, and its parent; the value is the picked folder row's ID.
 * - `confirm`: the row reads `prompt`, with "↵ <verb> · esc cancel" beside it; Enter confirms
 *   and there is no value.
 * An empty or unchanged name, Esc, or a click away from a confirmation does nothing; a name
 * with a `/` is refused with a notice.
 */
export type RowActionInput = 'name' | 'new-name' | 'folder' | 'confirm'

/**
 * A row action contribution (FR-10, AD-4, AD-5), declared in a surface's `rowActions`. `id` is
 * `<pluginId>:<name>`; `title` labels it in the row's native right-click menu; `appliesTo`
 * says which rows offer it; `key` (optional, an accelerator such as `F2`, `Cmd+Backspace`, or
 * `Shift+Cmd+M`) starts it on the focused row while the panel has focus, and needs a modifier
 * unless it is a function key, so letters still filter. `prompt` is the confirmation's or the
 * folder card's text, with `{name}` standing for the row's label (default: the title); `verb`
 * is the confirmation hint's word (default `confirm`).
 */
export interface RowActionContribution {
  id: string
  title: string
  input: RowActionInput
  appliesTo: RowActionTarget[]
  key?: string
  prompt?: string
  verb?: string
}

/**
 * A row action's handler: `rowId` is the row it was started on (`''` for the root); `value` is
 * what the kernel asked for (see `RowActionInput`). It may resolve to the ID of a row to focus
 * afterwards, e.g. the renamed row's new ID. A rejection keeps a name field open; a vault
 * refusal from `api.vault` already raised the kernel's notice.
 */
export type RowActionHandler = (actionId: string, rowId: string, value?: string) => unknown

/**
 * A top-bar button a plugin offers (FR-53, AD-15, UX-DR7). `id` is `<pluginId>:<name>`; `title`
 * names it in its tooltip and in the "Show in top bar" checklist; `icon` is a Lucide name drawn
 * like a surface's. Exactly one target, declared in the same manifest: `surface` opens that
 * surface's side with it selected (or closes the side when it already shows there); `command`
 * runs that command. The button stays hidden until the writer turns it on, and the plugin is
 * never told whether it is shown.
 */
export interface TopBarButtonContribution {
  id: string
  title: string
  icon: string
  surface?: string
  command?: string
}

/** One row of a list or tree view. `id` is what `onOpen` handlers receive. */
export interface ViewItem {
  id: string
  label: string
  /** A tree row's children; the kernel indents them and collapses them with Left/Right. */
  children?: ViewItem[]
  /**
   * A group row, like a folder: Enter or a click expands or collapses it instead of opening it,
   * and the panel stays open. `onOpen` never receives a group row's ID.
   */
  group?: boolean
  /**
   * Whether a tree row with children starts expanded (default true). Read only the first time
   * the kernel sees the row's ID; after that, the writer's own toggles win.
   */
  expanded?: boolean
  /** What the row stands for; the surface's row actions for that kind apply to it. */
  kind?: RowKind
  /**
   * False when Enter or a click only selects the row: the panel stays and `onOpen` never gets
   * it (an image in Files). Default true.
   */
  opens?: boolean
  /**
   * A second line in quieter, smaller text under the label (a search hit's snippet, Story
   * 2.10). A row with an empty `label` shows only its detail.
   */
  detail?: string
  /** Spans of `detail` (`[from, to]` offsets) drawn on the accent tint, e.g. matched words. */
  marks?: [number, number][]
  /**
   * A list row's indent level (Story 2.11): an integer 0 to `MAX_LIST_DEPTH`, each level
   * indenting the row 10px, like an Outline heading under H1. Others are clamped; a tree
   * ignores it (its rows indent by nesting). Default 0.
   */
  depth?: number
  /**
   * A picture for a card (Story 9.23, `ItemsView.layout: 'cards'`): a path to an image inside
   * the project, such as `images/mara.png`. Remote URLs, `data:` URLs, files outside the
   * project, and missing files draw no picture. Rows ignore it.
   */
  image?: string
}

/** The deepest `ViewItem.depth` a list row can take (six heading levels: 0 to 5). */
export const MAX_LIST_DEPTH = 5

/** A button a view offers beside its rows, e.g. "Open its folder as a project". */
export interface SurfaceAction {
  id: string
  label: string
}

/**
 * What a list or tree view shows besides rows (UX-DR10): `text` when it has no rows (say
 * "No documents yet."), and `action` as a button under the rows, shown whether or not there are
 * rows. Pressing it calls the surface's `onAction` handlers with its ID.
 */
export interface ViewEmptyState {
  text: string
  action?: SurfaceAction
}

/**
 * A view the kernel draws (AD-4): rows, keyboard, filtering, and focus are the kernel's. `list`
 * ignores `children`. `selectedId` marks the row that stands for "here" (the open file, the
 * current heading); the panel opens with focus on it.
 */
export interface ItemsView {
  kind: 'list' | 'tree'
  items: ViewItem[]
  selectedId?: string
  /**
   * `cards` (Story 9.23) draws the items as a grid of cards (picture, label, one line of
   * `detail`) when the panel is at least 360px wide, and as rows when it is narrower. Default
   * `rows`. Keyboard, filtering, and row actions work the same either way.
   */
  layout?: 'rows' | 'cards'
  /**
   * True lets the writer rearrange the rows among their siblings (Story 9.24): drag a row, or
   * press Alt+Up / Alt+Down on the highlighted one. The kernel reorders nothing itself; each move
   * reaches `api.surfaces.onReorder`, and the view the plugin sets next is the truth. Off while
   * the writer's type-to-filter is active.
   */
  reorderable?: boolean
  empty?: ViewEmptyState
  /**
   * A text field the kernel draws above the rows (Story 2.10), e.g. a search box. Typing goes
   * to it, not to filtering the rows; each change reaches `api.surfaces.onInput`. `value` is
   * what the field holds: the kernel adopts it whenever a view brings a value different from
   * the previous view's, so a plugin clears the field by handing over `''`. Opening the panel
   * focuses the field; Down and Up move between it and the rows, and Enter in it opens the
   * highlighted row.
   */
  input?: ViewInput
  /** Quiet text under the rows, shown whether or not there are rows. */
  note?: string
}

/**
 * A row move asked for in a `reorderable` view. `beforeId` is the sibling the row now sits
 * before, or null for the end of its siblings; `parentId` is the parent row's ID, or null at the
 * top level. A row only moves among its siblings.
 */
export interface ReorderEvent {
  movedId: string
  beforeId: string | null
  parentId: string | null
}

/** `ItemsView.input`: the field's placeholder and value. */
export interface ViewInput {
  placeholder: string
  value: string
}

/**
 * The raw-DOM escape hatch (AD-4). @unstable: may change or go away in any minor version.
 * The kernel still owns the frame, tabs, Esc, open/close, and width; `mount` fills the element
 * it is given (style only with `--vn-*` variables) and may return a disposable that runs when the
 * view is replaced or the panel unmounts. Typing in the focused panel calls `filter` with the
 * whole query, Up/Down call `move(-1 | 1)`, Enter calls `activate`.
 */
export interface DomView {
  kind: 'dom'
  mount(element: HTMLElement): Disposable | void
  filter?(query: string): void
  move?(delta: number): void
  activate?(): void
}

/**
 * Two panes (Story 9.22): a list or tree on the left and any detail on the right, for a tool
 * that is a list plus a detail (characters and a character's form). Row opens in the list
 * reach `onOpen`, and the plugin sets a new view with the new detail. Keyboard focus and
 * filtering belong to the list. Drawn in a modal surface; a side panel draws the list only.
 */
export interface SplitView {
  kind: 'split'
  list: ItemsView
  detail: ItemsView | DomView | FormView | DiffView
}

/** The kinds of field a `FormView` draws (Story 9.25). */
export type FormFieldType =
  'text' | 'longtext' | 'number' | 'date' | 'choice' | 'tags' | 'toggle' | 'document'

/**
 * A form field's value: a string for `text`, `longtext`, `date`, and `choice` (a date is
 * `YYYY-MM-DD`); a number or null for `number`; a string array for `tags`; a boolean for `toggle`;
 * an API path or null for `document`.
 */
export type FormValue = string | number | boolean | string[] | null

/** One typed field of a `FormView`. */
export interface FormField {
  /** Unique within the form; reaches `onFormChange` and the submit values. */
  id: string
  type: FormFieldType
  label: string
  /** A line under the field in the caption type. */
  hint?: string
  value: FormValue
  /** Shown under the field in the emphasis color; the plugin sets and clears it. */
  error?: string
  /** The choices of a `choice` field. */
  options?: { value: string; label: string }[]
  placeholder?: string
}

/**
 * A form (Story 9.25): typed fields the kernel draws, so a plugin never draws its own inputs
 * (AD-4). Each change reaches `api.surfaces.onFormChange`; Cmd+Enter or the submit button
 * (shown only with `submitLabel`) reaches `api.surfaces.onFormSubmit`. The kernel never applies
 * a value itself: the plugin sets the next view. The writer's in-progress text stays in a field
 * until a view brings a different `value` for it. Works in a panel, the modal, and a split's detail.
 */
export interface FormView {
  kind: 'form'
  fields: FormField[]
  submitLabel?: string
  /** A line above the fields. */
  note?: string
}

/**
 * One piece of a `DiffView`: a `wordDiff` segment, with an optional `id` on the insert and
 * delete segments that make up one change. Neighbouring segments with the same `id` are one
 * change, so a replaced word (a delete then an insert) is accepted or rejected as one.
 */
export interface DiffSegment extends WordDiffSegment {
  /** Names the change this segment belongs to; ignored on `equal` segments. */
  id?: string
}

/**
 * A diff (Story 9.16): the segments of `wordDiff`, drawn in the page's type. Insertions sit on
 * the `change` kind tint and are underlined; deletions sit on the `flag` tint and are struck
 * through (a plugin never passes a color). A change with an `id` shows Accept and Reject; they
 * reach `api.surfaces.onDiffAction` with that ID. The kernel applies nothing itself: the plugin
 * sets the next view. The text scrolls and selects like any other. Works in a panel, the modal,
 * and a split's detail.
 */
export interface DiffView {
  kind: 'diff'
  segments: DiffSegment[]
  /** A line above the diff in the caption type. */
  note?: string
}

/** What the writer chose on a change in a `DiffView`. */
export type DiffAction = 'accept' | 'reject'

/** What a surface shows. */
export type SurfaceView = ItemsView | DomView | SplitView | FormView | DiffView

/** A row open: the ID of the row the writer opened (Enter or click). */
export type SurfaceOpenHandler = (itemId: string) => unknown

/**
 * A plugin's side-panel surfaces (FR-7, AD-4, AD-15). Every ID must be declared in this
 * plugin's `contributes.surfaces`; others throw `plugin/undeclared-contribution`. The kernel
 * decides when a panel opens and closes; showing a surface activates its plugin first.
 */
export interface SurfacesApi {
  /**
   * Hands the kernel what the surface shows, replacing the previous view. Call it again with a
   * new view whenever the data changes. A malformed view throws `plugin/bad-view`.
   *
   * @example
   * ```ts
   * api.surfaces.setView('my-plugin:list', {
   *   kind: 'list',
   *   items: [{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta' }]
   * })
   * ```
   */
  setView(id: string, view: SurfaceView): void
  /**
   * Called when the writer opens a row; the floating panel has already closed. Group rows never
   * reach it: they expand and collapse.
   *
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * api.surfaces.onOpen('my-plugin:list', (id) => {
   *   console.log(`Opened row ${id}`)
   * })
   * ```
   */
  onOpen(id: string, handler: SurfaceOpenHandler): Disposable
  /**
   * Called with the action's ID when the writer presses the view's `empty.action` button.
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * api.surfaces.onAction('my-plugin:list', (actionId) => {
   *   if (actionId === 'my-plugin:refresh') reload()
   * })
   * ```
   */
  onAction(id: string, handler: (actionId: string) => unknown): Disposable
  /**
   * Called when the kernel wants a fresh view of the surface, e.g. before it draws it again.
   * Nothing about when or why: hand over a new view with `setView` if the data changed. The
   * first activation doesn't call it; `onload` hands over the first view.
   *
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * api.surfaces.onRefresh('my-plugin:list', async () => {
   *   api.surfaces.setView('my-plugin:list', { kind: 'list', items: await loadItems() })
   * })
   * ```
   */
  onRefresh(id: string, handler: () => unknown): Disposable
  /**
   * Called when the writer finishes one of the surface's row actions (Story 2.8): from the
   * row's right-click menu, its key, or `beginRowAction`. See `RowActionHandler`.
   *
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * api.surfaces.onRowAction('my-plugin:list', async (actionId, rowId, value) => {
   *   if (actionId === 'my-plugin:new' && value) await api.vault.create(`${value}.md`)
   * })
   * ```
   */
  onRowAction(id: string, handler: RowActionHandler): Disposable
  /**
   * Starts a declared row action as if the writer had picked it on `rowId` (`''` for the
   * root): the kernel opens the surface's panel on that row and asks for the value. For
   * palette commands that act on the open document. An undeclared action throws
   * `plugin/undeclared-contribution`; a row that isn't in the view, or that the action doesn't
   * apply to, starts nothing.
   *
   * @example
   * ```ts
   * api.commands.handle('my-plugin:rename-open', () => {
   *   const { document } = api.workspace.current()
   *   if (document) api.surfaces.beginRowAction('my-plugin:list', 'my-plugin:rename', document)
   * })
   * ```
   */
  beginRowAction(id: string, actionId: string, rowId: string): void
  /**
   * Called with the whole text of the view's input field (`ItemsView.input`) each time the
   * writer changes it (Story 2.10).
   *
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * api.surfaces.onInput('my-plugin:search', async (value) => {
   *   api.surfaces.setView('my-plugin:search', {
   *     kind: 'list',
   *     items: await find(value),
   *     input: { placeholder: 'Search notes', value }
   *   })
   * })
   * ```
   */
  onInput(id: string, handler: (value: string) => unknown): Disposable
  /**
   * Called when the writer moves a row in a `reorderable` view (Story 9.24), by dragging it or
   * with Alt+Up / Alt+Down. Set the next view to show the new order; a handler that sets none
   * leaves the list as it was.
   *
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * const chapters = ['One', 'Two', 'Three']
   * api.surfaces.onReorder('my-plugin:chapters', ({ movedId, beforeId }) => {
   *   chapters.splice(chapters.indexOf(movedId), 1)
   *   chapters.splice(beforeId === null ? chapters.length : chapters.indexOf(beforeId), 0, movedId)
   *   api.surfaces.setView('my-plugin:chapters', {
   *     kind: 'list',
   *     reorderable: true,
   *     items: chapters.map((c) => ({ id: c, label: c }))
   *   })
   * })
   * ```
   */
  onReorder(id: string, handler: (event: ReorderEvent) => unknown): Disposable
  /**
   * Called when the writer changes a field of a `form` view (Story 9.25): text fields as they
   * type (debounced), the others at once. Set the next view to change the form; a handler that
   * sets none leaves it as it was.
   *
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * const character = { name: 'Mara', age: 34, hair: 'dark', tags: ['pilot'], alive: true }
   * api.surfaces.onFormChange('my-plugin:character', (fieldId, value) => {
   *   Object.assign(character, { [fieldId]: value })
   *   api.surfaces.setView('my-plugin:character', {
   *     kind: 'form',
   *     fields: [
   *       { id: 'name', type: 'text', label: 'Name', value: character.name },
   *       { id: 'age', type: 'number', label: 'Age', value: character.age },
   *       { id: 'tags', type: 'tags', label: 'Tags', value: character.tags },
   *       { id: 'alive', type: 'toggle', label: 'Alive', value: character.alive }
   *     ]
   *   })
   * })
   * ```
   */
  onFormChange(id: string, handler: (fieldId: string, value: FormValue) => unknown): Disposable
  /**
   * Called with every field's value, by field ID, when the writer submits a `form` view with
   * Cmd+Enter or the submit button (Story 9.25).
   *
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * api.surfaces.onFormSubmit('my-plugin:character', (values) => {
   *   const name = values.name
   *   api.surfaces.setView('my-plugin:character', {
   *     kind: 'form',
   *     submitLabel: 'Save',
   *     fields: [
   *       {
   *         id: 'name',
   *         type: 'text',
   *         label: 'Name',
   *         value: name,
   *         error: name === '' ? 'A character needs a name.' : undefined
   *       }
   *     ]
   *   })
   * })
   * ```
   */
  onFormSubmit(id: string, handler: (values: Record<string, FormValue>) => unknown): Disposable
  /**
   * Called when the writer chooses Accept or Reject on a change of a `diff` view (Story 9.16),
   * with the action and the change's `id`. The kernel changes nothing; set the next view to
   * show what is left to decide.
   *
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * const before = 'The quick brown fox'
   * let after = 'The fast brown fox'
   * api.surfaces.onDiffAction('my-plugin:compare', (action, changeId) => {
   *   if (action === 'accept') after = after.replace('fast', 'quick')
   *   const segments = wordDiff(before, after).map((s, i) =>
   *     s.kind === 'equal' ? s : { ...s, id: `c${i}` }
   *   )
   *   api.surfaces.setView('my-plugin:compare', { kind: 'diff', segments })
   * })
   * ```
   */
  onDiffAction(id: string, handler: (action: DiffAction, changeId: string) => unknown): Disposable
  /**
   * Opens the surface's panel with the surface selected and focus in it: on its input field
   * when the view has one, else on the highlighted row (Story 2.10). For a palette command
   * like "Search in Project". Already showing, it only takes focus.
   *
   * @example
   * ```ts
   * api.commands.handle('my-plugin:open-panel', () => api.surfaces.show('my-plugin:list', { focus: 'mara' }))
   * ```
   *
   * `options.focus` is a row ID: the panel opens with that row highlighted and scrolled into
   * view (a tree expands its ancestors). An unknown ID changes nothing.
   */
  show(id: string, options?: { focus?: string }): void
  /**
   * Closes the surface if it is showing, and focus returns to the caret: a modal surface after
   * its job is done (Story 9.22), or a side panel that isn't pinned. Not showing, it does
   * nothing.
   *
   * @example
   * ```ts
   * api.surfaces.onOpen('my-plugin:browser', () => api.surfaces.close('my-plugin:browser'))
   * ```
   */
  close(id: string): void
}

/**
 * A palette provider contribution (FR-9, UX-DR15, AD-5): items listed when the writer deletes
 * the `>` (files mode). `id` is `<pluginId>:<name>`; `title` names it.
 */
export interface PaletteProviderContribution {
  id: string
  title: string
}

/**
 * One item a palette provider lists. The kernel matches the query's words against `label` and
 * `detail` together, lists recent picks first, and draws `detail` beside the label in quieter
 * text (a file's folder).
 */
export interface PaletteItem {
  id: string
  label: string
  detail?: string
}

/**
 * A plugin's palette providers (FR-9, UX-DR15). Every ID must be declared in this plugin's
 * `contributes.paletteProviders`; others throw `plugin/undeclared-contribution`. The kernel
 * draws, filters, and ranks the items; the plugin never learns the query or whether the palette
 * is open. The palette entering files mode activates the provider's plugin first.
 */
export interface PaletteApi {
  /**
   * Replaces the provider's items. Malformed items throw `plugin/bad-items`.
   * @example
   * ```ts
   * api.palette.setItems('my-plugin:notes', [
   *   { id: 'inbox', label: 'Inbox' },
   *   { id: 'ideas', label: 'Ideas', detail: '12 notes' }
   * ])
   * ```
   */
  setItems(id: string, items: PaletteItem[]): void
  /**
   * Called with the item's ID when the writer picks it; the palette has already closed.
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * api.palette.onRun('my-plugin:notes', (itemId) => {
   *   void api.workspace.open(`${itemId}.md`)
   * })
   * ```
   */
  onRun(id: string, handler: (itemId: string) => unknown): Disposable
  /**
   * Called when the kernel wants fresh items, e.g. before listing them again. Nothing about
   * when or why: hand over new items with `setItems` if the data changed. The first activation
   * doesn't call it; `onload` hands over the first items.
   *
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * api.palette.onRefresh('my-plugin:notes', async () => {
   *   api.palette.setItems('my-plugin:notes', await loadNotes())
   * })
   * ```
   */
  onRefresh(id: string, handler: () => unknown): Disposable
}

/**
 * Contribution metadata, keyed by kind. `commands`, `editingModes`, `settings`, and `surfaces`
 * have handler APIs (tools too, Story 4.1); other kinds are indexed as metadata now so later stories add
 * handlers without changing the manifest format.
 */
/**
 * A key a plugin suggests for one of its commands, tools, or surfaces (FR-27, AD-5). It binds
 * nothing: the writer accepts it in Settings, and only then does it go in `keybindings.json`.
 */
export interface KeybindingSuggestion {
  /** The ID of a command, tool, or surface this plugin declares. */
  command: string
  /** An accelerator such as `CmdOrCtrl+Shift+K`. */
  key: string
}

/** The kinds of value a project type's frontmatter field can hold. */
export const FRONTMATTER_FIELD_TYPES = ['text', 'number', 'boolean', 'date', 'list'] as const
export type FrontmatterFieldType = (typeof FRONTMATTER_FIELD_TYPES)[number]

/** One frontmatter field a project type describes. Advisory only: nothing enforces it (AD-13). */
export interface FrontmatterField {
  /** The frontmatter key, e.g. `pov`. */
  key: string
  type: FrontmatterFieldType
  /** Shown in advice; defaults to the key. */
  label?: string
  /** A document without it is advised, never blocked. */
  required?: boolean
}

/**
 * A kind of project a plugin offers (FR-36, AD-13). The ID is `<pluginId>/<typeId>`. A project has
 * exactly one type; the schema covers frontmatter fields and default settings only, and only
 * advises. `extends` names another type (of this or any plugin): the child inherits its
 * frontmatter fields and default settings, and satisfies a `requiredProjectType` of the parent.
 */
export interface ProjectTypeContribution {
  id: string
  name: string
  description?: string
  extends?: string
  frontmatter?: FrontmatterField[]
  /** Default values for declared settings, by setting ID, while a project has this type. */
  settings?: Record<string, SettingValue>
}

/** A project type with everything it inherits applied, as the open project has it (FR-37). */
export interface ResolvedProjectType {
  id: string
  name: string
  /** This type's ID first, then each parent it extends, nearest first. */
  chain: string[]
  /** The parent's fields first, a child's field replacing a parent's of the same key. */
  frontmatter: FrontmatterField[]
  /** The parent's defaults, overridden by the child's. */
  settings: Record<string, SettingValue>
}

/** One way a document's frontmatter differs from a project type's schema. Advice, never a rule. */
export interface FrontmatterAdvice {
  key: string
  problem: 'missing' | 'wrong-type'
  /** A plain sentence, e.g. `Point of view is missing.` */
  message: string
}

const FRONTMATTER_TYPE_NAMES: Record<FrontmatterFieldType, string> = {
  text: 'text',
  number: 'a number',
  boolean: 'true or false',
  date: 'a date like 2026-10-16',
  list: 'a list'
}

function fitsFieldType(type: FrontmatterFieldType, value: string, hasList: boolean): boolean {
  const v = value.trim().replace(/^(['"])(.*)\1$/, '$2')
  switch (type) {
    case 'text':
      return v !== ''
    case 'number':
      return /^-?\d+(?:\.\d+)?$/.test(v)
    case 'boolean':
      return /^(?:true|false)$/i.test(v)
    case 'date':
      return /^\d{4}-\d{2}-\d{2}(?:[T ].*)?$/.test(v)
    case 'list':
      return hasList || /^\[.*\]$/.test(v)
  }
}

/**
 * Compares a document's frontmatter text (what sits between the `---` lines, or null for none)
 * to a project type's fields (FR-37, AD-13). It only advises: it returns sentences and never
 * throws, blocks a save, or changes a document. A required field that is absent, or a field
 * present with the wrong kind of value, is reported; an optional absent field is not. It reads
 * plain `key: value` lines and `- item` lists, which is what a type's fields describe.
 *
 * @example
 * ```ts
 * const advice = adviseFrontmatter('chapter: three', [
 *   { key: 'pov', type: 'text', required: true },
 *   { key: 'chapter', type: 'number' }
 * ])
 * console.log(advice.map((a) => a.message))
 * ```
 */
export function adviseFrontmatter(
  frontmatter: string | null,
  fields: readonly FrontmatterField[]
): FrontmatterAdvice[] {
  const present = new Map<string, { value: string; list: boolean }>()
  let last: string | null = null
  for (const line of (frontmatter ?? '').replace(/\r\n?/g, '\n').split('\n')) {
    const entry = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line)
    if (entry !== null) {
      last = entry[1]
      present.set(last, { value: entry[2], list: false })
    } else if (last !== null && /^\s*-\s+\S/.test(line)) {
      present.set(last, { value: present.get(last)?.value ?? '', list: true })
    }
  }
  const out: FrontmatterAdvice[] = []
  for (const field of fields) {
    const label = field.label ?? field.key
    const found = present.get(field.key)
    if (found === undefined || (found.value.trim() === '' && !found.list)) {
      if (field.required === true) {
        out.push({ key: field.key, problem: 'missing', message: `${label} is missing.` })
      }
      continue
    }
    if (!fitsFieldType(field.type, found.value, found.list)) {
      out.push({
        key: field.key,
        problem: 'wrong-type',
        message: `${label} should be ${FRONTMATTER_TYPE_NAMES[field.type]}.`
      })
    }
  }
  return out
}

/**
 * The color tokens a theme may set: DESIGN.md's 18 color tokens and the 11 syntax colors (Story
 * 9.5), named as in the `--vn-*` catalog without the prefix (`page` is `--vn-page`). A theme never
 * sets typography or layout (FR-45).
 */
export const COLOR_TOKENS = [
  'page',
  'text',
  'text-muted',
  'text-subtle',
  'text-faint',
  'text-placeholder',
  'text-plugin-label',
  'accent',
  'accent-hover',
  'accent-tint',
  'surface-overlay',
  'surface-panel',
  'surface-control',
  'surface-code',
  'rule',
  'divider',
  'shadow-ink',
  'shadow-ink-deep',
  'syntax-keyword',
  'syntax-string',
  'syntax-comment',
  'syntax-number',
  'syntax-function',
  'syntax-type',
  'syntax-variable',
  'syntax-operator',
  'syntax-punctuation',
  'syntax-tag',
  'syntax-attribute'
] as const
export type ColorToken = (typeof COLOR_TOKENS)[number]

/**
 * One mode of a theme: the tokens it changes, each a CSS color (`#RRGGBB` or `rgba(...)`). A theme
 * may also set a plugin's own token by its variable name, `--vnp-<pluginId>-<token>` (Story 8.4).
 */
export type ThemeColors = Partial<Record<ColorToken, string>> & {
  [pluginToken: `--vnp-${string}`]: string
}

/**
 * A color token a plugin adds (FR-57). `id` is lowercase-hyphen; the variable is
 * `--vnp-<pluginId>-<id>`. `light` and `dark` are its defaults: in dark mode, a theme that doesn't
 * mention the token gets `dark`, and a theme that sets it overrides these. Use it in a raw-DOM view
 * (`var(--vnp-my-plugin-bar)`); the plugin never handles a theme switch.
 */
export interface PluginColorContribution {
  id: string
  light: string
  dark: string
}

/**
 * A theme a plugin offers (FR-45, AD-5): a light and dark pair of color values. The ID is
 * `<pluginId>:<name>`. A token a mode leaves out keeps Veneer's own value for that mode, so a
 * theme can change just the accent. Typography and layout are page settings and never part of a
 * theme. The writer picks a theme and a mode in Settings; lists, settings, and results restyle
 * with no plugin code involved.
 *
 * With `scope: 'code'` it is a code theme (Story 9.5, AD-19): it may set only the `syntax-*`
 * tokens and `surface-code`, is chosen in the Code theme setting rather than the Theme menu, and
 * lays over whichever theme is showing.
 */
export interface ThemeContribution {
  id: string
  name: string
  scope?: 'code'
  light: ThemeColors
  dark: ThemeColors
}

export type PluginContributions = {
  commands?: CommandContribution[]
  /** Selection-box tools (FR-23, AD-10). */
  tools?: ToolContribution[]
  /** Settings the kernel draws in its settings surface (FR-44, AD-4). */
  settings?: SettingContribution[]
  /** Side-panel surfaces the kernel draws (FR-7, AD-4). */
  surfaces?: SurfaceContribution[]
  /** Top-bar buttons offered to the writer, hidden until turned on (FR-53). */
  topBarButtons?: TopBarButtonContribution[]
  /** Color tokens the plugin adds, as `--vnp-<pluginId>-<id>`, each with a light and dark default (FR-57). */
  colors?: PluginColorContribution[]
  /** Color themes the plugin offers, a light and dark pair each (FR-45). */
  themes?: ThemeContribution[]
  /** Kinds of project the plugin offers, one assigned per project (FR-36, AD-13). */
  projectTypes?: ProjectTypeContribution[]
  /** Keys the plugin suggests; none is bound until the writer accepts it (FR-27, AD-5). */
  keybindings?: KeybindingSuggestion[]
  /** Palette providers listed in the palette's files mode (FR-9, UX-DR15). */
  paletteProviders?: PaletteProviderContribution[]
  /**
   * Editing modes (FR-12, AD-7). The first mode declared by the plugin that declares
   * `editorHost` is the default every launch starts in.
   */
  editingModes?: EditingModeContribution[]
  /** Fenced-block renderers (Story 9.4, AD-19). */
  blockRenderers?: BlockRendererContribution[]
  /** The plugin may register the editor host (`api.editor.registerHost`, AD-18). */
  editorHost?: boolean
} & Record<string, unknown>

/** `manifest.json` (AD-5). */
export interface PluginManifest {
  /** Lowercase-hyphen, e.g. `word-count`. */
  id: string
  /** Display name, used in notices ("<name> failed to load: ..."). */
  name: string
  version: string
  /** The API versions this plugin accepts: `^x.y.z` or an exact `x.y.z`. */
  apiVersion: string
  /**
   * Entry module path, relative to the plugin folder. Bundled plugins must use `index.ts`: the
   * composition root (`src/renderer/plugins.ts`) globs only that file.
   */
  main: string
  contributes: PluginContributions
  /**
   * A project type (`<pluginId>/<typeId>`) the open project must have, or have a type that
   * `extends` it, for the plugin to be active (FR-38, AD-13). Elsewhere it stays inactive and
   * Settings says which type it needs. A loose file has no type, so such a plugin is inactive
   * there; a plugin without this field works everywhere.
   */
  requiredProjectType?: string
  /** Events that activate the plugin before first use of a contribution. */
  activationEvents?: EventName[]
  /** Declared capabilities. Recorded, not enforced, until Epic 6. */
  needs?: string[]
}

export type CommandHandler = (...args: unknown[]) => unknown

/** What a selection is, for a tool's `appliesTo` (FR-23). `any` applies to every kind. */
export const TOOL_APPLIES_TO = ['word', 'phrase', 'sentence', 'paragraph', 'any'] as const
export type ToolAppliesTo = (typeof TOOL_APPLIES_TO)[number]
/** A selection's kind: `ToolAppliesTo` without `any`. */
export type SelectionKind = Exclude<ToolAppliesTo, 'any'>

/** What a tool asks the kernel to assemble for it (FR-23, AD-10). */
export const TOOL_CONTEXTS = [
  'selection',
  'paragraph',
  'section',
  'title',
  'frontmatter',
  'document'
] as const
export type ToolContext = (typeof TOOL_CONTEXTS)[number]

/**
 * A selection-box tool (FR-23, AD-5, AD-10). `id` is `<pluginId>:<name>`. Everything here comes
 * from the manifest; a handler attaches by ID with `api.tools.handle`.
 */
export interface ToolContribution {
  id: string
  name: string
  description: string
  /** The selection kinds it works on; never empty. */
  appliesTo: ToolAppliesTo[]
  /** Offered when nothing is selected (Cmd+J at the caret). Default false. */
  worksWithoutSelection: boolean
  /** Needs a configured model provider. Default false. */
  needsProvider: boolean
  /** The context the kernel assembles for the handler; never empty. Default `['selection']`. */
  context: ToolContext[]
  /** Never changes the text by itself; results are for reading. Default false. */
  readOnly: boolean
}

/** What a tool handler receives; the fields it declared in `context` are present. */
export interface ToolInput {
  /** The selected text and its range, or null with nothing selected. */
  selection: { text: string; from: number; to: number } | null
  paragraph?: string
  section?: string
  title?: string
  frontmatter?: string
  document?: string
}

/** One item of an `info` result; `insertable` marks it sensible to insert. */
export interface ToolInfoItem {
  text: string
  insertable?: boolean
}

/** A tool's answer (AD-10). Only the kernel applies it, and only when the writer picks. */
export type ToolResult =
  | { kind: 'replace'; options: string[] }
  | { kind: 'insert'; text: string }
  | { kind: 'info'; items: ToolInfoItem[] }

/**
 * Shows options that have arrived so far while the handler is still running (Story 5.6). Each
 * call replaces the earlier one; the returned Result is the final answer. The last row is shown
 * as partial, so give only options that are complete.
 */
export type ToolReport = (options: string[]) => void

export type ToolHandler = (
  input: ToolInput,
  signal: AbortSignal,
  report: ToolReport
) => ToolResult | Promise<ToolResult>

/**
 * Whether `value` is a well-formed `ToolResult`.
 * @internal
 */
export function isToolResult(value: unknown): value is ToolResult {
  if (typeof value !== 'object' || value === null) return false
  const r = value as Record<string, unknown>
  if (r.kind === 'replace') {
    return (
      Array.isArray(r.options) &&
      r.options.length > 0 &&
      r.options.every((o) => typeof o === 'string')
    )
  }
  if (r.kind === 'insert') return typeof r.text === 'string'
  if (r.kind === 'info') {
    return (
      Array.isArray(r.items) &&
      r.items.every((i) => {
        if (typeof i !== 'object' || i === null) return false
        const item = i as Record<string, unknown>
        return (
          typeof item.text === 'string' &&
          (item.insertable === undefined || typeof item.insertable === 'boolean')
        )
      })
    )
  }
  return false
}

/**
 * Whether a tool applies to a selection of `kind`, or to none (`null`) (FR-23).
 * @internal
 */
export function toolApplies(tool: ToolContribution, kind: SelectionKind | null): boolean {
  if (kind === null) return tool.worksWithoutSelection
  return tool.appliesTo.includes('any') || tool.appliesTo.includes(kind)
}

/**
 * Where a selection change came from. `pointer`: mouse or trackpad; `keyboard`: arrows, typing,
 * and other keys; `select-all`: Select All; `find`: a find match; `plugin`: a programmatic
 * change with no user event behind it.
 */
export type SelectionOrigin = 'pointer' | 'keyboard' | 'select-all' | 'find' | 'plugin'

/** The main selection range as document offsets into the editor text (`\n` line endings). */
export interface EditorSelection {
  from: number
  to: number
  origin: SelectionOrigin
}

/**
 * One replacement in the editor text: the span `from`..`to` (offsets into the current text,
 * `\n` line endings) becomes `text`. An insert has `from === to`; a delete has `text === ''`.
 */
export interface TextChange {
  from: number
  to: number
  text: string
}

/**
 * The one change that turns `before` into `after`: everything between their common prefix and
 * common suffix. The kernel uses it to apply `vault.process` on the open document as one edit,
 * and main uses the same span to splice a save into the file's bytes (AD-8).
 *
 * @internal
 */
export function changedSpan(before: string, after: string): TextChange {
  const max = Math.min(before.length, after.length)
  let prefix = 0
  while (prefix < max && before.charCodeAt(prefix) === after.charCodeAt(prefix)) prefix++
  let suffix = 0
  while (
    suffix < max - prefix &&
    before.charCodeAt(before.length - 1 - suffix) === after.charCodeAt(after.length - 1 - suffix)
  ) {
    suffix++
  }
  return {
    from: prefix,
    to: before.length - suffix,
    text: after.slice(prefix, after.length - suffix)
  }
}

/**
 * Checks a change set against a document of `length` characters: every change in range, the
 * list sorted by position, and no two overlapping. Throws `editor/bad-change` otherwise.
 * Editor hosts run it in `applyResult`; the fake host runs it in `editor.edit`.
 *
 * @internal
 */
export function checkTextChanges(changes: readonly TextChange[], length: number): void {
  let end = 0
  for (const change of changes) {
    const ok =
      typeof change === 'object' &&
      change !== null &&
      Number.isInteger(change.from) &&
      Number.isInteger(change.to) &&
      typeof change.text === 'string' &&
      change.from >= end &&
      change.to >= change.from &&
      change.to <= length
    if (!ok) {
      throw veneerError(
        EDITOR_ERROR.badChange,
        'Each change must be in range, sorted, and not overlap another'
      )
    }
    end = change.to
  }
}

/**
 * The surface the kernel hands the editor: a raw DOM element (AD-4's escape hatch). The editor
 * fills it and scrolls itself; the kernel never touches what it draws.
 */
export interface EditorMount {
  parent: HTMLElement
}

/** Session-only literal, case-insensitive find over the entire markdown source (FR-59). */
export interface EditorFindSnapshot {
  query: string
  count: number
  /** One-based current match, or zero when there is no current match. */
  current: number
  readOnly: boolean
}

/**
 * The kernel's only route to the editor (AD-18). The editor plugin registers a factory; the
 * kernel calls it once with the mount and talks to the result through these methods only.
 * Later stories add coordinates.
 */
export interface EditorHost {
  getFind(): EditorFindSnapshot
  onFindChanged(listener: (snapshot: EditorFindSnapshot) => void): Disposable
  /** Selects the first non-overlapping match at/after the caret, wrapping; origin `find`. */
  setFindQuery(query: string): void
  findNext(backwards?: boolean): void
  /** Removes highlights without changing text, selection, or undo history. */
  clearFind(): void
  /** One isolated undo step; refuses read-only writes. Current replacement skips inserted text. */
  replaceFind(text: string): void
  replaceAllFind(text: string): void
  /** Replaces the whole document with `text` (`\n` line endings) and resets undo history. */
  setDocument(text: string): void
  getText(): string
  getSelection(): EditorSelection
  /**
   * Selects `from`..`to` (clamped to the text) with origin `find`, so the selection pill never
   * rises, and scrolls it into view, revealing hidden source it touches like a find match
   * (Story 2.10). Text and undo history are untouched.
   */
  select(from: number, to: number): void
  onSelectionChanged(listener: (selection: EditorSelection) => void): Disposable
  /**
   * Viewport pixel coordinates of the character edge at `pos` (clamped to the text): `left`, and
   * the line's `top` and `bottom`. Null when the position is not rendered or the view is hidden.
   * The kernel places the selection pill with it (FR-14, UX-DR11).
   */
  coordsAtPos(pos: number): { left: number; top: number; bottom: number } | null
  /**
   * Marks `from`..`to` (clamped) with the selection tint whether or not the editor has focus,
   * so a selection stays visible while the selection card holds focus (UX-DR12). The mark
   * follows edits; text, selection, and undo history are untouched.
   */
  setHighlight(from: number, to: number): void
  /** Removes the mark `setHighlight` made. */
  clearHighlight(): void
  /** Fires when the writer changes the text (typing, deleting, pasting). */
  onTyping(listener: () => void): Disposable
  /**
   * Fires after every document change from any source: typing, undo, paste, a plugin edit.
   * Not fired by `setDocument`. The kernel's autosave hangs off this (AD-8).
   */
  onChanged(listener: () => void): Disposable
  /**
   * The destination of the link under the caret (`[text](dest)`, `[text][ref]` resolved through
   * its definition, an autolink, or a bare URL), as written, or null. Story 9.1.
   */
  linkAtCaret(): string | null
  /**
   * Fires with a link's destination when the writer Cmd/Ctrl-clicks it. A plain click only places
   * the cursor and never fires this. The kernel decides what following means (Story 9.1).
   */
  onLinkFollowed(listener: (destination: string) => void): Disposable
  /**
   * Applies `changes` (see `TextChange`; checked with `checkTextChanges`) as one transaction
   * and exactly one undo step that never merges with the writer's typing before or after it,
   * tagged with `source` (e.g. `plugin:<id>`) (AD-8, AD-18). Fires `onChanged`, not
   * `onTyping`. Throws `editor/bad-change` for out-of-range, unsorted, or overlapping changes.
   */
  applyResult(changes: TextChange[], source: string): void
  /** Turns read-only on or off: the editor still shows the text but takes no edits. */
  setReadOnly(on: boolean): void
  /**
   * Draws the document with an editing mode's extension set (see `EditingModeExtension`),
   * replacing the previous mode's (FR-12, AD-7). Only how the text is drawn changes: no new
   * state, no document change, so undo history survives and `onChanged` doesn't fire.
   * `setDocument` keeps the current mode. Throws, leaving the previous mode in place, only for
   * errors raised synchronously by the reconfigure (an invalid extension value, a throwing
   * `StateField.create`); CM6 catches and only logs errors in view plugins and decoration
   * providers. The kernel calls it; plugins use `api.editor.registerMode`.
   */
  setMode(extension: EditingModeExtension): void
  /**
   * Replaces the available fenced-block renderers (Story 9.4, AD-19). The editor asks the one
   * that best matches each top-level fenced block (see `BlockRendererContribution`) and draws its
   * result without changing the text or the undo history. The kernel calls it when a renderer
   * registers or goes away, and when a host mounts.
   */
  setBlockRenderers(entries: BlockRendererEntry[]): void
  /**
   * Draws a plugin's marks over the real text (Story 9.17): a tint and an underline per kind, no
   * borders. `owner` is the plugin ID and `setId` the plugin's name for the set; setting a set
   * replaces its previous marks, and an empty list clears it. Ranges are clamped to the text, the
   * marks follow edits, and the text, selection, and undo history are untouched. `setDocument`
   * drops every mark.
   */
  setMarks(owner: string, setId: string, marks: Mark[]): void
  /** Removes every mark of `owner`'s sets. */
  clearMarks(owner: string): void
  /** Fires when the writer plainly clicks a mark: the caret still moves. */
  onMarkClick(listener: (owner: string, setId: string, markId: string) => void): Disposable
  focus(): void
  /** Tears the editor down and removes it from the mount. */
  destroy(): void
}

/** What a mark means; the kernel picks the tint (`--vn-kind-<kind>`), a plugin never passes a color. */
export type MarkKind = 'note' | 'flag' | 'change'

/**
 * A range of the open document a plugin marks (Story 9.17). `from` and `to` are character
 * offsets into the text `api.editor.getText` returns (`\n` endings); `id` is unique within the set.
 */
export interface Mark {
  id: string
  from: number
  to: number
  kind: MarkKind
  /** Shown as a tooltip on the marked text. */
  label?: string
}

/** At most this many marks per plugin, across all its sets (Story 9.17). */
export const MAX_MARKS = 3000

const MARK_KINDS: readonly string[] = ['note', 'flag', 'change']

/**
 * Checks the marks handed to `api.editor.setMarks` and copies them. `others` is how many marks
 * the plugin's other sets already hold. Returns the marks, or a plain sentence saying why not.
 *
 * @internal
 */
export function checkMarks(
  raw: unknown,
  others = 0
): { ok: true; marks: Mark[] } | { ok: false; message: string } {
  const bad = (message: string): { ok: false; message: string } => ({ ok: false, message })
  if (!Array.isArray(raw)) return bad('Marks must be a list.')
  if (raw.length + others > MAX_MARKS) {
    return bad(`A plugin may set at most ${MAX_MARKS} marks.`)
  }
  const ids = new Set<string>()
  const marks: Mark[] = []
  for (const item of raw) {
    const m = (typeof item === 'object' && item !== null ? item : {}) as Record<string, unknown>
    if (typeof m.id !== 'string' || m.id === '' || ids.has(m.id)) {
      return bad('Every mark needs an id that no other mark in its set uses.')
    }
    ids.add(m.id)
    if (
      typeof m.from !== 'number' ||
      typeof m.to !== 'number' ||
      !Number.isInteger(m.from) ||
      !Number.isInteger(m.to) ||
      m.from < 0 ||
      m.to <= m.from
    ) {
      return bad('A mark needs a range: whole numbers with `to` after `from`.')
    }
    if (typeof m.kind !== 'string' || !MARK_KINDS.includes(m.kind)) {
      return bad('A mark’s kind is note, flag, or change.')
    }
    if (m.label !== undefined && typeof m.label !== 'string') {
      return bad('A mark’s label must be text.')
    }
    const mark: Mark = { id: m.id, from: m.from, to: m.to, kind: m.kind as MarkKind }
    if (typeof m.label === 'string' && m.label !== '') mark.label = m.label
    marks.push(mark)
  }
  return { ok: true, marks }
}

export type EditorHostFactory = (mount: EditorMount) => EditorHost

/**
 * True for a source that names a remote resource: an `http:`/`https:` URL or a
 * protocol-relative `//host/…` one. Such a source never loads directly; it goes through
 * `api.resources.imageSource` (AD-16).
 *
 * @internal
 */
export function isRemoteSource(src: string): boolean {
  const s = src.trim()
  if (s.startsWith('//')) return true
  return /^https?:/i.test(s)
}

/**
 * True for a source that names a file relative to the document, like `cat.png` or
 * `../assets/My%20Cat.jpg`: no scheme, not absolute (`/`, `\`, `~`), not a bare fragment or
 * query. Such an image loads only through the kernel's scope-checked document scheme (FR-62,
 * AD-6); absolute paths and `file:` never load.
 *
 * @internal
 */
export function isRelativeSource(src: string): boolean {
  const s = src.trim()
  if (s === '' || isRemoteSource(s)) return false
  if (/^[/\\~#?]/.test(s)) return false
  return !/^[a-z][a-z0-9+.-]*:/i.test(s)
}

/**
 * How documents' HTML and images reach the page (FR-46, AD-16). The kernel decides; plugins
 * never load a remote resource themselves.
 */
export interface ResourcesApi {
  /**
   * Sanitizes untrusted HTML into an inert fragment: no scripts, styles, frames, forms, event
   * handlers, `style` attributes, or link targets. Images in it follow `imageSource`; a
   * blocked remote one becomes the kernel's placeholder.
   *
   * @example
   * ```ts
   * const fragment = api.resources.sanitizeHtml('<p onclick="x()">Hi <script>bad()</script></p>')
   * mount.append(fragment)
   * ```
   */
  sanitizeHtml(html: string): DocumentFragment
  /**
   * An SVG drawing (a diagram's output) as an inert fragment (Story 9.6, AD-16): like
   * `sanitizeHtml`, but it keeps what a drawing needs to look right, its `<style>` and `style`
   * attributes and its ids, and drops scripts, `foreignObject`, images, animation, event
   * handlers, links, and any CSS `url()` that isn't a `#fragment` or `@import`, so nothing in it
   * can run or load. The fragment is the SVG element, or empty if nothing survives.
   *
   * @example
   * ```ts
   * const fragment = api.resources.sanitizeSvg('<svg viewBox="0 0 4 4"><circle r="2" cx="2" cy="2"/></svg>')
   * mount.append(fragment)
   * ```
   */
  sanitizeSvg(svg: string): DocumentFragment
  /**
   * The `src` to give an `<img>` for a document's image source: a kernel-owned URL for an
   * allowed remote one or a relative one (`isRelativeSource`, read from the open document's
   * folder, FR-62), the source itself for `data:image/*`, and null otherwise. Null for a
   * remote source (`isRemoteSource`) means it is blocked: draw a quiet placeholder. Any other
   * null source stays as text.
   *
   * @example
   * ```ts
   * const src = api.resources.imageSource(markdownImageUrl)
   * if (src !== null) img.src = src
   * ```
   */
  imageSource(src: string): string | null
  /**
   * Fires when the remote allowance changes; re-render images and HTML.
   * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
   *
   * @example
   * ```ts
   * api.resources.onChanged(() => rerenderImages())
   * ```
   */
  onChanged(listener: () => void): Disposable
}
export type EventListener = (event: VeneerEvent) => unknown

/** What `api.vault.saveImage` resolves to: the pieces of `![alt](link)`. */
export interface SavedImage {
  /** Relative to the document, `/` separators, percent-encoded: ready for `(...)`. */
  link: string
  /** The file's stem, escaped for `[...]`. */
  alt: string
}

/** The largest image `api.vault.saveImage` accepts, in bytes (FR-62). */
export const MAX_IMAGE_BYTES = 25 * 1024 * 1024

/** What a plugin receives in `onload`. Every method that registers returns a `Disposable`. */
export interface PluginApi {
  readonly pluginId: string
  readonly apiVersion: string
  readonly commands: {
    /**
     * Attaches the handler for a command declared in this plugin's manifest. An ID the
     * manifest doesn't declare throws `plugin/undeclared-contribution` (AD-5).
     *
     * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
     *
     * @example
     * ```ts
     * export function onload(api: PluginApi): void {
     *   api.commands.handle('my-plugin:hello', () => {
     *     console.log('Hello from my plugin')
     *   })
     * }
     * ```
     */
    handle(id: string, handler: CommandHandler): Disposable
  }
  readonly tools: {
    /**
     * Attaches the handler for a tool declared in this plugin's manifest
     * (`contributes.tools`). An ID the manifest doesn't declare throws
     * `plugin/undeclared-contribution` (AD-5). The handler returns a `ToolResult` and never
     * touches the page (AD-10).
     *
     * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
     *
     * @example
     * ```ts
     * api.tools.handle('my-plugin:shout', (input) => ({
     *   kind: 'replace',
     *   options: [(input.selection?.text ?? '').toUpperCase()]
     * }))
     * ```
     */
    handle(id: string, handler: ToolHandler): Disposable
  }
  readonly events: {
    /**
     * Listens for a Veneer event by its `domain:past-verb` name. The listener gets the event object; the subscription is a disposable the kernel disposes with the plugin.
     *
     * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
     *
     * @example
     * ```ts
     * api.events.on('vault:saved', (event) => {
     *   const saved = event as VaultSavedEvent
     *   console.log(`${saved.path} saved, ${saved.content.length} characters`)
     * })
     * ```
     */
    on(name: EventName, listener: EventListener): Disposable
  }
  readonly editor: {
    /**
     * Registers the editor host factory (AD-18). Only a plugin whose manifest declares
     * `contributes.editorHost: true` may call it; others get `plugin/undeclared-contribution`
     * (AD-5). The kernel calls the factory once it has a mount.
     *
     * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
     *
     * @example
     * ```ts
     * export function onload(api: PluginApi): void {
     *   api.editor.registerHost((mount) => createMyEditor(mount.parent))
     * }
     * ```
     */
    registerHost(factory: EditorHostFactory): Disposable
    /**
     * Attaches the extension set for an editing mode declared in this plugin's manifest
     * (`contributes.editingModes`, FR-12, AD-5, AD-7). An undeclared ID throws
     * `plugin/undeclared-contribution`; registering one ID twice throws
     * `plugin/duplicate-handler`. The kernel applies it when the writer picks the mode, which
     * activates the plugin first if needed. If applying it throws synchronously (see
     * `EditorHost.setMode`), the previous mode is restored and the plugin fails with one notice;
     * errors CM6 catches itself (view plugins, decoration providers) are only logged. A mode
     * must only draw (see `EditingModeExtension`). Disposing withdraws the mode; if it was showing,
     * the editor falls back to the default mode.
     *
     * @example
     * ```ts
     * api.editor.registerMode('my-plugin:typewriter', typewriterExtensions)
     * ```
     */
    registerMode(id: string, extension: EditingModeExtension): Disposable
    /**
     * Attaches the handler for a fenced-block renderer declared in this plugin's manifest
     * (`contributes.blockRenderers`, Story 9.4, AD-5, AD-19). An undeclared ID throws
     * `plugin/undeclared-contribution`; registering one ID twice throws `plugin/duplicate-handler`.
     * The editor then asks it to draw matching blocks (see `BlockRenderer`). Disposing withdraws it.
     *
     * @example
     * ```ts
     * api.editor.registerBlockRenderer('my-plugin:shout', (block) => ({
     *   kind: 'html',
     *   html: `<p><strong>${block.text.toUpperCase().replace(/[<&]/g, '')}</strong></p>`
     * }))
     * ```
     */
    registerBlockRenderer(id: string, render: BlockRenderer): Disposable
    /**
     * The open document's text (`\n` line endings), or null when there is no editor or the
     * page is the untitled page before its first save created a file.
     *
     * @example
     * ```ts
     * const text = api.editor.getText()
     * if (text !== null) console.log(`${text.split(/\s+/).length} words`)
     * ```
     */
    getText(): string | null
    /**
     * The main selection, or null when `getText` would return null.
     * @example
     * ```ts
     * const selection = api.editor.getSelection()
     * if (selection !== null && selection.from !== selection.to) {
     *   console.log('Something is selected')
     * }
     * ```
     */
    getSelection(): EditorSelection | null
    /**
     * Fires after any change to the open document's text (typing, undo, paste, a plugin's
     * edit), and when another document shows or none does, including the untitled page getting
     * its file (Story 2.11). It carries nothing: read `getText`, which may now be null. It
     * fires on every keystroke, so debounce heavy work. Disposed with the plugin; a throw fails
     * only this plugin.
     *
     * @example
     * ```ts
     * const subscription = api.editor.onChanged(() => scheduleRecount())
     * // api.editor.onChanged returns a Disposable; the kernel disposes it when the plugin unloads.
     * ```
     */
    onChanged(listener: () => void): Disposable
    /**
     * Fires when the open document's main selection or caret moves, from any origin, while
     * `getSelection` would return non-null (Story 2.11). Disposed with the plugin; a throw fails
     * only this plugin.
     *
     * @example
     * ```ts
     * api.editor.onSelectionChanged((selection) => {
     *   highlightHeadingAt(selection.from)
     * })
     * ```
     */
    onSelectionChanged(listener: (selection: EditorSelection) => void): Disposable
    /**
     * Changes the open document: one transaction and one undo step, tagged `plugin:<id>`,
     * autosaved like typing (AD-8). Offsets are into `getText()`; several changes must be
     * sorted and not overlap. Throws `editor/unavailable` (no document), `vault/read-only`, or
     * `editor/bad-change`, each carrying `pluginId`.
     *
     * @example
     * ```ts
     * api.editor.edit({ from: 0, to: 0, text: '# Title\n\n' })
     * ```
     */
    edit(changes: TextChange | TextChange[]): void
    /**
     * Marks ranges of the open document (Story 9.17): annotations that show in the writing
     * itself. Each mark has an `id` (unique in the set), a `from` and `to` offset into the
     * text `getText` returns, a `kind` (`note`, `flag`, or `change`; the kernel picks the tint),
     * and an optional `label`. Setting a set replaces its marks; `[]` clears it. The kernel
     * draws them over the real text, never changing the text or the undo history, and the marks
     * follow the writer's edits. They go when the document is closed or switched and when the
     * plugin is turned off. A malformed set, or more than 3000 marks in all, throws
     * `plugin/bad-marks` with a plain sentence.
     *
     * @example
     * ```ts
     * const text = api.editor.getText() ?? ''
     * const at = text.indexOf('lighthouse')
     * if (at >= 0) {
     *   api.editor.setMarks('my-plugin:notes', [
     *     { id: 'n1', from: at, to: at + 'lighthouse'.length, kind: 'note', label: 'Check the name' }
     *   ])
     * }
     * ```
     */
    setMarks(setId: string, marks: Mark[]): void
    /**
     * Called with a mark's `id` when the writer clicks one of this plugin's marks in set
     * `setId`; the caret still moves. The plugin decides what to show.
     *
     * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
     *
     * @example
     * ```ts
     * api.editor.onMarkClick('my-plugin:notes', (markId) => {
     *   api.surfaces.show('my-plugin:notes-panel')
     *   console.log(`Clicked ${markId}`)
     * })
     * ```
     */
    onMarkClick(setId: string, handler: (markId: string) => unknown): Disposable
  }
  readonly vault: {
    /**
     * Read-modify-write of the document at `path` (an API path: project-relative, or absolute
     * for a loose file) (AD-8). `fn` gets the current text (`\n` endings) and returns the new
     * text; the promise resolves to it. The open document changes through the editor as one
     * undo step; a closed one is written atomically by main, changing only the edited bytes and
     * keeping line endings, BOM, and encoding, then `vault:saved` is emitted. If the file
     * changes between the read and the write, `fn` runs again (up to three tries). Returning
     * the same text writes nothing; line endings in the returned text are normalized to `\n`.
     * Only markdown documents (`.md`, `.markdown`) can be processed. Rejects, carrying
     * `pluginId`, with:
     * - `vault/out-of-scope`: outside the project or loose folder, or not a markdown document;
     * - `vault/read-failed`: the file is missing or can't be read; `vault/write-failed`;
     * - `vault/read-only`: not UTF-8 (or UTF-16 with a BOM);
     * - `vault/changed`: still changing after three tries;
     * - `vault/document-open`: open in the editor but not the active document;
     * - `editor/bad-change`: `fn` returned something other than a string;
     * - `editor/unavailable`: no document handle; `plugin/unavailable`: the plugin is disabled
     *   or failed.
     * If `fn` throws, rejects with that error and nothing changes.
     *
     * @example
     * ```ts
     * const next = await api.vault.process('notes/todo.md', (text) => text.replace('- [ ] ship', '- [x] ship'))
     * ```
     */
    process(path: string, fn: (text: string) => string): Promise<string>
    /**
     * The text of the document at `path` as of its last save: what is on disk, with `\n`
     * endings, the same text a `vault:saved` event for that save carried (FR-55, AD-8). An open
     * document's unsaved edits are not in it. The Story 7.6 foundation for a history plugin
     * that reads what each save wrote. Only markdown documents; rejects, carrying `pluginId`,
     * with `vault/out-of-scope`, `vault/read-failed`, `vault/read-only` (not UTF-8, or UTF-16
     * without a BOM), or `plugin/unavailable`.
     *
     * @example
     * ```ts
     * const savedText = await api.vault.read('chapters/one.md')
     * console.log(`${savedText.length} characters on disk`)
     * ```
     */
    read(path: string): Promise<string>
    /**
     * Saves the open document now, if it has unsaved typing, and resolves once it is on disk,
     * so a following `vault.read` returns what the page shows (Story 9.19). With nothing open
     * or nothing unsaved it resolves at once. Rejects `vault/write-failed` when the save fails.
     *
     * @example
     * ```ts
     * await api.vault.saveNow()
     * const chapter = await api.vault.read('chapters/one.md')
     * ```
     */
    saveNow(): Promise<void>
    /**
     * An image file's bytes, for an export that sends a chapter's pictures or a cover (Story
     * 9.19). `path` is an API path inside the open project, or inside a loose file's own folder:
     * stricter than the page, which may show `../images/x.png` from outside it. Only the image
     * types the editor draws (PNG, JPEG, GIF, WebP, SVG), whose bytes must really be an image,
     * up to 100 MB. Anything else rejects `vault/out-of-scope` (or `vault/too-large`).
     *
     * @example
     * ```ts
     * const cover = await api.vault.readFile('images/cover.png')
     * console.log(`${cover.byteLength} bytes`)
     * ```
     */
    readFile(path: string): Promise<Uint8Array>
    /**
     * Saves image bytes for the open document (FR-62, AD-14) and resolves to the markdown to
     * insert: `![alt](link)`. Main writes the file into the document's own folder, or the
     * project's `imageFolder` from `.veneer/config.json`, and never overwrites (a clash gets
     * `-2`, `-3`). The type is sniffed from the bytes: PNG, JPEG, GIF, WebP, or SVG, at most
     * `MAX_IMAGE_BYTES`. `name` is a dropped file's own name, made filesystem-safe; without it
     * the image was pasted and is named `image-YYYYMMDD-HHMMSS.<ext>`. `link` is relative to the
     * document, with `/` separators and unsafe characters percent-encoded; `alt` is the file's
     * stem, with `\`, `[`, and `]` escaped. On the untitled page the kernel first creates its
     * file. On failure the kernel raises one notice; the promise rejects, carrying `pluginId`,
     * with `vault/not-image`, `vault/too-large`, `vault/bad-image-folder`, `vault/write-failed`,
     * `vault/read-only`, `vault/unknown-document` (the document was switched or closed while
     * saving), `editor/unavailable` (no document), or `plugin/unavailable`.
     *
     * @example
     * ```ts
     * const { link, alt } = await api.vault.saveImage(pngBytes, 'cover.png')
     * api.editor.edit({ from: 0, to: 0, text: `![${alt}](${link})` })
     * ```
     */
    saveImage(bytes: Uint8Array, name?: string): Promise<SavedImage>
    /**
     * The open scope's documents and folders (FR-10, AD-14), read fresh from disk: every
     * markdown file (`.md`, `.markdown`) and every folder holding one, dot-entries and
     * symlinks skipped, at most `MAX_VIEW_ITEMS` entries. A loose file's scope lists only that
     * file; with nothing open the list is empty. File contents are never read. Rejects, carrying
     * `pluginId`, with `vault/read-failed` or `plugin/unavailable`.
     *
     * @example
     * ```ts
     * const files = (await api.vault.list()).filter((e) => e.kind === 'file')
     * console.log(files.map((f) => f.path))
     * ```
     */
    list(): Promise<VaultEntry[]>
    /**
     * Creates a markdown document at `path` (an API path in the open project) holding `text`
     * (default empty) and emits `vault:created` (FR-10). Never replaces a file. Rejects,
     * carrying `pluginId`, with `vault/exists` (the name is taken), `vault/out-of-scope` (not
     * in a project, outside it, not `.md`/`.markdown`, or a name starting with a dot),
     * `vault/write-failed` (say, the folder is missing), or `plugin/unavailable`. For the vault
     * codes the kernel has already shown "Couldn't create <name>: <reason>.", and a handler
     * that lets the rejection through is not failed for it.
     *
     * @example
     * ```ts
     * await api.vault.create('notes/ideas.md', '# Ideas\n')
     * ```
     */
    create(path: string, text?: string): Promise<void>
    /**
     * Creates one folder (its parent must exist); same rules and errors as `create`.
     * @example
     * ```ts
     * await api.vault.createFolder('notes/archive')
     * ```
     */
    createFolder(path: string): Promise<void>
    /**
     * Renames or moves a document, an image, or a folder (a move is a rename into another
     * folder) and resolves once everything that follows is done (FR-10, AD-8, AD-17): the open
     * document, if moved, stays on the page with its undo and caret; every document whose
     * relative markdown links, image embeds, or reference definitions point into the old path
     * is rewritten through `vault.process` (only the destination's path changes, one undo
     * step in an open one), and a moved document's own relative links are re-pointed; then
     * every rename participant runs;
     * then "Updated links in N documents." shows when N > 0, and `vault:renamed` is emitted. A
     * document that fails to update gets its own notice; the move stands. Rejects, carrying
     * `pluginId`, with `vault/exists`, `vault/out-of-scope` (outside the project, the root, a
     * folder into itself, or a file changing kind), `vault/read-failed`, `vault/rename-failed`,
     * or `plugin/unavailable`; on a rejection nothing moved, and for the vault codes the
     * kernel has already shown its notice.
     *
     * @example
     * ```ts
     * await api.vault.rename('notes/ideas.md', 'notes/archive/ideas.md')
     * ```
     */
    rename(from: string, to: string): Promise<void>
    /**
     * Moves a document, an image, or a folder (whole) to the OS trash; never a permanent delete
     * (FR-10). The open document's pending edits are saved first; if it was trashed, or sat in
     * a trashed folder, the page becomes the untitled page. Emits `vault:trashed`. Rejects,
     * carrying `pluginId`, with `vault/read-failed`, `vault/write-failed` (the trash refused it),
     * `vault/out-of-scope`, or `plugin/unavailable`; for the vault codes the kernel has already
     * shown its notice.
     *
     * @example
     * ```ts
     * await api.vault.trash('notes/old-draft.md')
     * ```
     */
    trash(path: string): Promise<void>
    /**
     * Registers a rename participant (see `RenameParticipant`): called once per rename or move,
     * after the kernel's own link rewrite, before `vault:renamed`. A throw fails the plugin the
     * usual way; the rename stands.
     *
     * Returns a Disposable. The kernel disposes it when the plugin unloads or is turned off; dispose it earlier to stop.
     *
     * @example
     * ```ts
     * api.vault.onRename(async (rename) => {
     *   await rewriteMyLinks(rename.from, rename.to)
     * })
     * ```
     */
    onRename(participant: RenameParticipant): Disposable
    /**
     * Searches the open scope's markdown documents for `query` (FR-59, Story 2.10), the way find
     * matches (see `findInText`): a project's documents by `vault.list`'s walk rules, a loose
     * file only itself, nothing with nothing open. The open document's pending edits are saved
     * first, so its offsets match the editor. Files are read fresh off main's thread; nothing is
     * indexed or kept. Files that aren't UTF-8 (or UTF-16 with a BOM) or are over 8 MB are
     * skipped. Resolves to the documents with hits, in path order, at most
     * `MAX_SEARCH_MATCHES` hits in all; an empty query resolves to none without searching.
     * Rejects, carrying `pluginId`, with `vault/superseded` when a newer search started before
     * this one finished (drop it), `vault/out-of-scope` for a query over `MAX_SEARCH_QUERY`
     * characters, or `plugin/unavailable`.
     *
     * @example
     * ```ts
     * const results = await api.vault.search('stormy night')
     * for (const file of results) console.log(file.path, file.matches.length)
     * ```
     */
    search(query: string): Promise<SearchFileResult[]>
    /**
     * Asks the project index which documents match, by frontmatter, tag, or links (Story 9.27,
     * AD-17), without reading any file: a compendium listing every character costs the same in a
     * series as in a short book. Every given condition must hold; see `VaultQuery`. `linksTo` matches one exact path, while `backlinks` also accepts a folder. Resolves to
     * the documents sorted by path, at most `limit` (default 200, never more than
     * `MAX_QUERY_RESULTS`), with `truncated` set when more matched. The open document's pending
     * edits are not in the index until they are saved (call `saveNow` first); a document saved
     * just before the query is already included. In a loose file, only the open file can match.
     * Only relative markdown links and images are tracked; wikilinks and other link styles are
     * not (yet). Frontmatter is cut by `splitFrontmatter`, so a block over
     * `FRONTMATTER_MAX_LINES` lines is body text. Rejects, carrying `pluginId`, with
     * `vault/out-of-scope` for a malformed or oversized query, or `plugin/unavailable`.
     *
     * @example
     * ```ts
     * const { results } = await api.vault.query({ frontmatter: { type: 'character' }, tag: 'lead' })
     * for (const character of results) console.log(character.path, character.frontmatter.name)
     * ```
     */
    query(query: VaultQuery): Promise<VaultQueryResult>
    /**
     * The documents whose relative links point at `path`, sorted by path (Story 9.27): what
     * links to this chapter, this character. A folder path matches links into it. Only relative
     * markdown links and images are tracked; wikilinks and other link styles are not (yet).
     * Resolves to `[]` in a loose file. Rejects `vault/out-of-scope` for a bad path, or
     * `plugin/unavailable`.
     *
     * @example
     * ```ts
     * const linkers = await api.vault.backlinks('chapters/one.md')
     * console.log(`${linkers.length} documents link to chapter one`)
     * ```
     */
    backlinks(path: string): Promise<string[]>
  }
  /** The project and open document, and opening another (FR-10, AD-14). */
  readonly workspace: WorkspaceApi
  /** This plugin's declared palette providers (`contributes.paletteProviders`, FR-9). */
  readonly palette: PaletteApi
  readonly resources: ResourcesApi
  /** This plugin's declared settings (`contributes.settings`, FR-44). */
  readonly settings: SettingsApi
  /** This plugin's declared side-panel surfaces (`contributes.surfaces`, FR-7). */
  readonly surfaces: SurfacesApi
  /** The writer's models, for plugins that declare a provider tool (FR-34, AD-11). */
  readonly providers: ProvidersApi
  /** The network, behind the writer's first-time consent (FR-51, AD-6). */
  readonly net: NetApi
  /** Secret storage scoped to this plugin (Story 9.8, AD-11). */
  readonly secrets: SecretsApi
  /** Saving a produced file where the writer chooses (Story 9.8). */
  readonly export: ExportApi
  /** Save points and history for the open project, kept as plain git (Story 9.13, AD-20). */
  readonly history: HistoryApi
  /** Structured data kept in the open project, per plugin (Story 9.26). */
  readonly projectData: ProjectDataApi
  /**
   * Tells the writer that a long job finished or failed, in a notice the kernel draws and
   * names after this plugin (Story 9.20, AD-21). One plain sentence, no modal, no focus taken,
   * and at most `NOTICE_LIMIT_PER_MINUTE` a minute: the rest are dropped. It needs no
   * permission beyond the plugin being on, and does nothing while it is off.
   *
   * `action` adds one button that opens one of this plugin's declared surfaces. An empty or
   * longer-than-`MAX_NOTICE_MESSAGE` message, a multi-line one, or a bad action throws
   * `plugin/bad-notice`; an undeclared surface throws `plugin/undeclared-contribution`.
   *
   * @example
   * ```ts
   * api.notify({
   *   message: 'The manuscript export finished.',
   *   action: { label: 'Show', surface: 'my-plugin:exports' }
   * })
   * ```
   */
  notify(notice: PluginNoticeRequest): void
}

/** What a plugin asks the kernel to show with `api.notify` (Story 9.20). */
export interface PluginNoticeRequest {
  /** One plain sentence: up to `MAX_NOTICE_MESSAGE` characters, on one line. */
  message: string
  /** A button that opens one of the plugin's declared surfaces. */
  action?: {
    /** Up to `MAX_NOTICE_ACTION_LABEL` characters. */
    label: string
    /** The ID of a surface the plugin's manifest declares. */
    surface: string
  }
}

/** One message of a model request. */
export interface PluginMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/** What a plugin asks the writer's model (FR-34). The provider is always the writer's default. */
export interface PluginCompletion {
  messages: PluginMessage[]
}

/**
 * The writer's models (FR-34, AD-11). Requests go to the default provider through the kernel;
 * a plugin gets text or a `VeneerError` and never a key, a URL, or the provider list. Only a
 * plugin whose manifest declares a tool with `needsProvider` may call it
 * (`plugin/undeclared-contribution` otherwise). Failures reject with `offline`, `auth`,
 * `rate-limit`, `server`, `timeout`, or `canceled`, and a sentence naming the provider.
 */
export interface ProvidersApi {
  /**
   * The whole reply.
   * @example
   * ```ts
   * const reply = await api.providers.complete({
   *   messages: [{ role: 'user', content: 'Give me a synonym for "quick".' }]
   * })
   * ```
   */
  complete(request: PluginCompletion, signal?: AbortSignal): Promise<string>
  /**
   * Calls `onText` with each piece as it arrives, in order, then resolves.
   * @example
   * ```ts
   * let text = ''
   * await api.providers.stream(
   *   { messages: [{ role: 'user', content: 'Rewrite: The cat sat.' }] },
   *   (piece) => { text += piece }
   * )
   * ```
   */
  stream(
    request: PluginCompletion,
    onText: (text: string) => void,
    signal?: AbortSignal
  ): Promise<void>
}

/** The most bytes a request body or a `bytes` response may hold (a book's files, an EPUB). */
export const MAX_NET_BYTES = 100 * 1024 * 1024

/** A file in a multipart upload (Story 9.8). */
export interface NetFile {
  /** The file name the service sees. */
  name: string
  /** Its media type; `application/octet-stream` when left out. */
  type?: string
  data: Uint8Array
}

/** One part of a multipart upload: a text field, or a file. */
export type NetFormField = { name: string; value: string } | { name: string; file: NetFile }

/** A `multipart/form-data` body (Story 9.8). Main builds it and sets the content type itself. */
export interface NetForm {
  form: NetFormField[]
}

/** A request for `api.net.fetch` (FR-51, AD-6). */
export interface NetRequest {
  /** An `http:` or `https:` address with no username or password. */
  url: string
  /** Defaults to `GET`. */
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  /** Request headers. `Cookie` and `Host` are not passed on. */
  headers?: Record<string, string>
  /**
   * The body, for methods that take one: text, raw bytes (up to `MAX_NET_BYTES`), or a multipart
   * form (`{ form: [...] }`, files included, up to `MAX_NET_BYTES` in all).
   */
  body?: string | Uint8Array | NetForm
  /**
   * How to read the answer: `text` (the default; `NetResponse.text`, cut off at 5 MB) or `bytes`
   * (`NetResponse.data`, up to `MAX_NET_BYTES`, for a downloaded file).
   */
  as?: 'text' | 'bytes'
}

/** What `api.net.fetch` resolves with: any status, since a 404 is an answer, not a failure. */
export interface NetResponse {
  status: number
  ok: boolean
  /** Response headers, names in lowercase. */
  headers: Record<string, string>
  /** The body as text, cut off at 5 MB. Empty when the request asked for `bytes`. */
  text: string
  /** The body's bytes, when the request asked for `as: 'bytes'`. */
  data?: Uint8Array
  /** True when the body was cut off at the limit. */
  truncated: boolean
}

/**
 * The network (FR-51, AD-6). Plugins never reach the network themselves: the renderer is
 * sandboxed, and this is main's proxied fetch. A tool marked `readOnly` is refused
 * (`plugin/read-only-tool`). Any other tool makes the writer confirm the first time
 * ("<Tool> from <Plugin> wants to connect to example.com. Allow it?"); declining rejects
 * `plugin/declined` and nothing is sent. From a command or an event handler the same first-time
 * question is asked in a notice ("<Plugin> wants to connect to example.com. Allow it?"), once per
 * plugin and address; declining rejects `plugin/declined`. Addresses on this computer or its local
 * network are refused (`net/blocked`), and so is a redirect to one, unless the writer has allowed
 * that address for this plugin in Settings > Plugins. Bodies may be text, bytes, or a multipart
 * form, and an answer may be read as bytes (see `NetRequest`). Failures reject with `offline`,
 * `timeout`, `canceled`, `net/blocked`, `net/invalid`, or `net/too-large`, and a plain sentence.
 */
export interface NetApi {
  /**
   * One request, answered in full.
   * @example
   * ```ts
   * const response = await api.net.fetch({ url: 'https://example.com/api/words?q=quick' })
   * const words = response.ok ? (JSON.parse(response.text) as string[]) : []
   * ```
   */
  fetch(request: NetRequest, signal?: AbortSignal): Promise<NetResponse>
}

/** Error codes for `api.history` (Story 9.13). */
export const HISTORY_ERROR = {
  /** A loose file is open: history needs a project folder. */
  noProject: 'history/no-project',
  /** The project is not a repository yet; `init` first. */
  notRepository: 'history/not-a-repository',
  /** An unknown commit, branch, or a file that isn't in the commit. */
  notFound: 'history/not-found',
  /** A bad argument: an empty message, a path outside the project. */
  invalid: 'history/invalid',
  /** Switching or merging with changes not yet in a save point. */
  uncommitted: 'history/uncommitted',
  /** A merge that conflicts; nothing changed. */
  conflict: 'history/conflict',
  /** A branch or tag name already in use. */
  exists: 'history/exists',
  /** A remote reached over SSH, which Veneer's git cannot do; HTTPS only. */
  sshUnsupported: 'history/ssh-unsupported',
  /** Git failed on disk; the message says what. */
  failed: 'history/failed'
} as const

/** Error codes for `api.projectData` (Story 9.26). */
export const PROJECT_DATA_ERROR = {
  /** A loose file is open: project data needs a project folder. */
  noProject: 'projectData/no-project',
  /** The file on disk is not valid JSON; it is left as it is. */
  invalid: 'projectData/invalid',
  /** A value over 1 MB, or a plugin's data over 20 MB in the project. */
  tooLarge: 'projectData/too-large',
  /** A key that is not allowed. */
  badKey: 'projectData/bad-key'
} as const

/** The most serialized bytes one `api.projectData` key holds. */
export const MAX_PROJECT_DATA_KEY_BYTES = 1_000_000
/** The most serialized bytes one plugin's project data holds in a project. */
export const MAX_PROJECT_DATA_PLUGIN_BYTES = 20_000_000

/**
 * Emitted to the owning plugin only, when a pull, checkout, or merge (or any tool outside Veneer)
 * changes or removes one of its `api.projectData` files. Veneer's own writes do not emit it.
 */
export interface ProjectDataChangedEvent extends VeneerEvent {
  readonly type: 'projectData:changed'
  readonly key: string
}

/**
 * Structured data that belongs to the open project (Story 9.26): a graph's node positions, a
 * timeline's lane order, a book's chapter order. Each key is a JSON file at
 * `.veneer/data/<pluginId>/<key>.json` in the project, written atomically, so it syncs and goes
 * into history with the manuscript. A plugin reaches only its own keys, and removing a plugin
 * keeps its data (it belongs to the book). Keep it for data, not for text the writer reads. A
 * loose file has no project: every call rejects `projectData/no-project`.
 */
export interface ProjectDataApi {
  /**
   * The value under `key`, or null when none is stored. Rejects `projectData/invalid` when the
   * file on disk is not valid JSON, and `projectData/bad-key` for a key that is not allowed.
   *
   * @example
   * ```ts
   * const positions = (await api.projectData.read('graph-positions')) ?? {}
   * console.log(Object.keys(positions as object).length, 'nodes placed')
   * ```
   */
  read(key: string): Promise<unknown>
  /**
   * Stores `value` (anything `JSON.stringify` accepts) under `key`, replacing the old one.
   * Keys are lowercase letters, digits, `.`, `_` and `-`, up to 64 characters, starting with a
   * letter or digit. A value is at most 1 MB serialized, and a plugin's data at most 20 MB per
   * project, else `projectData/too-large`.
   *
   * @example
   * ```ts
   * await api.projectData.write('graph-positions', { 'chapters/one.md': { x: 120, y: 48 } })
   * ```
   */
  write(key: string, value: unknown): Promise<void>
  /**
   * Removes `key`; one that isn't stored is ignored.
   *
   * @example
   * ```ts
   * await api.projectData.delete('graph-positions')
   * ```
   */
  delete(key: string): Promise<void>
  /**
   * Every key this plugin has stored in the project, sorted.
   *
   * @example
   * ```ts
   * for (const key of await api.projectData.keys()) console.log(key)
   * ```
   */
  keys(): Promise<string[]>
}

/** Error codes for `api.secrets` and `api.export` (Story 9.8). */
export const STORAGE_ERROR = {
  /** The system keychain could not be read or written. */
  keychain: 'secrets/keychain-unavailable',
  /** A name or value `api.secrets` can't hold. */
  badSecret: 'secrets/invalid',
  /** The bytes to save are over `MAX_NET_BYTES`. */
  tooLarge: 'export/too-large',
  /** The writer chose a place, but writing the file there failed. */
  writeFailed: 'export/write-failed'
} as const

/**
 * Secret storage for a plugin (Story 9.8, AD-11): a service token, an API key. Values live in the
 * system keychain under this plugin's own ID, so no other plugin can read them, and main never
 * logs them. Names are lowercase letters, digits, `.`, `_` and `-`, up to 64 characters, and a
 * value is up to 8,192 characters. Removing the plugin removes its secrets.
 */
export interface SecretsApi {
  /**
   * The secret stored under `name`, or null.
   *
   * @example
   * ```ts
   * const token = await api.secrets.get('service-token')
   * if (token === null) console.log('Ask the writer for a token first')
   * ```
   */
  get(name: string): Promise<string | null>
  /**
   * Stores or replaces a secret. Rejects `secrets/invalid` for a bad name or value, and
   * `secrets/keychain-unavailable` when the keychain refuses.
   *
   * @example
   * ```ts
   * const tokenTheWriterTyped = 'abc123'
   * await api.secrets.set('service-token', tokenTheWriterTyped)
   * ```
   */
  set(name: string, value: string): Promise<void>
  /**
   * Removes a secret; one that isn't stored is ignored.
   *
   * @example
   * ```ts
   * await api.secrets.delete('service-token')
   * ```
   */
  delete(name: string): Promise<void>
}

/** A file for the writer to save with `api.export.saveAs` (Story 9.8). */
export interface ExportFile {
  /** The name offered in the dialog, e.g. `My Book.epub`. */
  suggestedName: string
  /** The file's bytes, up to `MAX_NET_BYTES`. */
  data: Uint8Array
  /** File types the dialog offers, e.g. `[{ name: 'EPUB', extensions: ['epub'] }]`. */
  filters?: { name: string; extensions: string[] }[]
}

/**
 * Saving a file the plugin produced, such as an exported EPUB (Story 9.8, AD-6). The writer
 * chooses where in a save dialog, and main writes the bytes: a plugin never names a path.
 */
export interface ExportApi {
  /**
   * Opens the save dialog and writes the file where the writer chooses. Resolves `{ saved: false }`
   * when the writer cancels. Rejects `export/too-large` or `export/write-failed`.
   *
   * @example
   * ```ts
   * const epubBytes = new Uint8Array([0x50, 0x4b])
   * const result = await api.export.saveAs({
   *   suggestedName: 'My Book.epub',
   *   data: epubBytes,
   *   filters: [{ name: 'EPUB', extensions: ['epub'] }]
   * })
   * if (result.saved) console.log(`Saved ${result.name}`)
   * ```
   */
  saveAs(file: ExportFile): Promise<{ saved: boolean; name?: string }>
}

/** One save point in a project's history (Story 9.13). */
export interface HistoryCommit {
  /** The full commit ID (40 hex characters). */
  id: string
  /** The message's first line. */
  message: string
  /** The rest of the message after the first line and the blank line after it, or `''`. */
  body: string
  author: { name: string; email: string }
  /** When it was made, as an ISO 8601 string. */
  date: string
  /** The commits it follows: none for the first, two for a merge. */
  parents: string[]
}

/** What `api.history.log` lists (Story 9.13). */
export interface HistoryLogOptions {
  /** Only commits that changed this file (an API path). */
  path?: string
  /** Read this branch instead of the current one. */
  branch?: string
  /** At most this many, newest first; default 100, at most `MAX_HISTORY_LOG`. */
  limit?: number
}

/** A branch in the project's history (Story 9.14). */
export interface HistoryBranch {
  name: string
  /** Whether the project's files are on this branch now. */
  current: boolean
  /** Its newest commit, or null for a new repository's branch with no commit yet. */
  commit: string | null
}

/** A named milestone in the project's history (Story 9.14). */
export interface HistoryTag {
  name: string
  /** The commit it names. */
  commit: string
  /** Its message, or `''` for a tag made without one. */
  message: string
}

/** Emitted after `api.history.switchTo` changes the project's files to another branch. */
export interface HistorySwitchedEvent extends VeneerEvent {
  readonly type: 'history:switched'
  readonly branch: string
}

/** A remote the project's history syncs with (Story 9.18). Credentials are never shown. */
export interface HistoryRemote {
  name: string
  url: string
}

/** What `api.history.sync` syncs (Story 9.18). */
export interface HistorySyncOptions {
  /** The remote's name; default `origin`. */
  remote?: string
  /** The branch; default (and only) the current one. */
  branch?: string
  /** A token for the host, read from `api.secrets`; sent as the HTTP Basic password. */
  token?: string
  /** The HTTP Basic user name with the token; default `x-access-token` (GitHub accepts it). */
  username?: string
}

/** What a sync did (Story 9.18). */
export interface HistorySyncResult {
  /** The remote had commits this project did not. */
  fetched: boolean
  /** How they came in: not at all, by fast-forward, or by a merge commit. */
  merged: 'none' | 'fast-forward' | 'merge'
  /** This project's commits went to the remote. */
  pushed: boolean
  /** Nothing moved either way. */
  upToDate: boolean
  /** The merge commit, when `merged` is `merge`; otherwise null. */
  commit: HistoryCommit | null
}

/** The most commits one `api.history.log` call returns. */
export const MAX_HISTORY_LOG = 5000

/**
 * Emitted after Veneer makes a commit for any plugin (`save`, `merge`, `commitOn`), to every
 * plugin, so a history panel can refresh whoever made it.
 */
export interface HistorySavedEvent extends VeneerEvent {
  readonly type: 'history:saved'
  readonly commit: HistoryCommit
}

/**
 * Save points and history for the open project (Story 9.13, AD-20), kept as plain git in the
 * project folder on the writer's own computer, so other git tools (GitWrite, the command line)
 * see the same history. Veneer does the git work itself; the writer needs no git installed.
 * The API uses git's terms (commit, branch); a plugin shows the writer's own words. A loose file
 * has no history: every call rejects `history/no-project`.
 */
export interface HistoryApi {
  /**
   * Whether the open project folder is a git repository (its own `.git`, not a parent's).
   *
   * @example
   * ```ts
   * if (!(await api.history.isRepository())) console.log('No history yet')
   * ```
   */
  isRepository(): Promise<boolean>
  /**
   * Makes the open project a repository, with a `.gitignore` that keeps out only derived
   * files (`.veneer/cache/`, `.DS_Store`). Resolves true when it made one, false when the
   * project already was one (left untouched).
   *
   * @example
   * ```ts
   * const created = await api.history.init()
   * console.log(created ? 'History started' : 'History was already on')
   * ```
   */
  init(): Promise<boolean>
  /**
   * Saves the open document, then commits every change in the project (images and other files
   * too, and deletions) as the writer, with `message`. Resolves with the new commit, or null
   * when nothing changed. `history:saved` follows a commit. Rejects
   * `history/not-a-repository` before `init`.
   *
   * @example
   * ```ts
   * const commit = await api.history.save('Finished chapter three')
   * if (commit !== null) console.log(`Saved ${commit.id.slice(0, 7)}`)
   * ```
   */
  save(message: string): Promise<HistoryCommit | null>
  /**
   * Commits newest first, for the whole project or one file, on the current branch or another.
   * An empty repository lists none. An unknown branch rejects `history/not-found`.
   *
   * @example
   * ```ts
   * const recent = await api.history.log({ path: 'chapters/one.md', limit: 20 })
   * for (const c of recent) console.log(c.date, c.message)
   * ```
   */
  log(options?: HistoryLogOptions): Promise<HistoryCommit[]>
  /**
   * A file's text as of a commit (a full ID, or a unique prefix of at least 4 characters),
   * with `\n` line endings. An unknown commit, or a file that isn't in it, rejects
   * `history/not-found`.
   *
   * @example
   * ```ts
   * const [latest] = await api.history.log({ path: 'chapters/one.md', limit: 1 })
   * const then = await api.history.show(latest.id, 'chapters/one.md')
   * console.log(wordDiff(then, api.editor.getText() ?? '').length)
   * ```
   */
  show(commit: string, path: string): Promise<string>
  /**
   * Every branch, sorted by name, with the current one marked.
   *
   * @example
   * ```ts
   * const current = (await api.history.branches()).find((b) => b.current)
   * console.log(`On ${current?.name ?? 'no branch'}`)
   * ```
   */
  branches(): Promise<HistoryBranch[]>
  /**
   * Makes a branch at the current commit, without switching to it. Names are letters, digits,
   * `.`, `_`, `-`, and `/` between parts. Rejects `history/exists` for a name in use, and
   * `history/invalid` for a bad name or a repository with no commit yet.
   *
   * @example
   * ```ts
   * await api.history.createBranch('ending-b')
   * ```
   */
  createBranch(name: string): Promise<void>
  /**
   * Saves the open document, then changes the project's files to another branch: they change
   * on disk, the page reloads, and `history:switched` follows. Every change must already be in
   * a save point, or it rejects `history/uncommitted` naming the files and changes nothing.
   *
   * @example
   * ```ts
   * await api.history.save('Before trying the other ending')
   * await api.history.switchTo('ending-b')
   * ```
   */
  switchTo(name: string): Promise<void>
  /**
   * Saves the open document, then merges another branch into the current one: a fast-forward
   * or a clean three-way merge, and the files on disk follow. Resolves with the new commit, or
   * null when there was nothing to merge. A conflict rejects `history/conflict` naming the
   * files and changes nothing; uncommitted changes reject `history/uncommitted`.
   *
   * @example
   * ```ts
   * const merged = await api.history.merge('ending-b')
   * console.log(merged === null ? 'Already there' : merged.message)
   * ```
   */
  merge(name: string): Promise<HistoryCommit | null>
  /**
   * Every tag, sorted by name, with the commit it names.
   *
   * @example
   * ```ts
   * for (const tag of await api.history.tags()) console.log(tag.name, tag.commit.slice(0, 7))
   * ```
   */
  tags(): Promise<HistoryTag[]>
  /**
   * Names a commit (the current one by default) as a milestone, with an optional message.
   * Rejects `history/exists` for a name in use.
   *
   * @example
   * ```ts
   * await api.history.createTag('first-draft', undefined, 'Sent to beta readers')
   * ```
   */
  createTag(name: string, commit?: string, message?: string): Promise<void>
  /**
   * Writes a commit onto another branch without switching to it or touching the files: a
   * message-only commit (git's `--allow-empty`), so `allowEmpty: true` is required. `log({
   * branch })` returns its full message, so a plugin can keep structured data in commits, as
   * GitWrite's annotations do.
   *
   * @example
   * ```ts
   * await api.history.createBranch('feedback')
   * const note = await api.history.commitOn(
   *   'feedback',
   *   'Annotation: chapters/one.md\n\ncomment: Tighten this.\n',
   *   { allowEmpty: true }
   * )
   * console.log(note.body)
   * ```
   */
  commitOn(
    branch: string,
    message: string,
    options: { allowEmpty: boolean }
  ): Promise<HistoryCommit>
  /**
   * The project's remotes, with any credentials taken out of the address.
   *
   * @example
   * ```ts
   * const origin = (await api.history.remotes()).find((r) => r.name === 'origin')
   * console.log(origin?.url ?? 'Not connected')
   * ```
   */
  remotes(): Promise<HistoryRemote[]>
  /**
   * Adds or replaces a remote. Only `https://` (or `http://`) addresses: an SSH remote rejects
   * `history/ssh-unsupported`, and an address holding a user or token rejects
   * `history/invalid` (pass the token to `sync` instead).
   *
   * @example
   * ```ts
   * await api.history.setRemote('origin', 'https://github.com/writer/novel.git')
   * ```
   */
  setRemote(name: string, url: string): Promise<void>
  /**
   * Saves the open document, then fetches from the remote, fast-forwards or merges cleanly,
   * and pushes, over HTTPS through Veneer's network rules. The first sync to a host asks the
   * writer in a notice (shared with `api.net.fetch`); a decline sends nothing and rejects
   * `plugin/declined`. A conflict changes nothing and rejects `history/conflict` naming the
   * files; uncommitted changes reject `history/uncommitted`; an SSH remote rejects
   * `history/ssh-unsupported`. Only the current branch syncs.
   *
   * @example
   * ```ts
   * const token = (await api.secrets.get('github-token')) ?? undefined
   * const result = await api.history.sync({ remote: 'origin', token })
   * console.log(result.upToDate ? 'Up to date' : `Pushed: ${result.pushed}`)
   * ```
   */
  sync(options?: HistorySyncOptions): Promise<HistorySyncResult>
}

/** The entry module's exports. */
export interface PluginEntry {
  onload(api: PluginApi): void | Promise<void>
  onunload?(): void | Promise<void>
}

/** Error codes the plugin host uses. */
export const PLUGIN_ERROR = {
  undeclaredContribution: 'plugin/undeclared-contribution',
  duplicateHandler: 'plugin/duplicate-handler',
  unknownCommand: 'plugin/unknown-command',
  noHandler: 'plugin/no-handler',
  unavailable: 'plugin/unavailable',
  failed: 'plugin/failed',
  /** `api.surfaces.setView` got something that isn't a list, tree, DOM, split, form, or diff view. */
  badView: 'plugin/bad-view',
  /** `api.palette.setItems` got something that isn't a list of items. */
  badItems: 'plugin/bad-items',
  /** `api.editor.setMarks` got malformed marks or more than `MAX_MARKS`; the message says which. */
  badMarks: 'plugin/bad-marks',
  /** `runTool` named a tool no live plugin declares. */
  unknownTool: 'plugin/unknown-tool',
  /** A tool handler returned something that isn't a `ToolResult`. */
  badResult: 'plugin/bad-result',
  /** `api.notify` got an empty or over-long message, or a malformed action (Story 9.20). */
  badNotice: 'plugin/bad-notice'
} as const

/** The longest `api.notify` message (one plain sentence) and action label (Story 9.20, AD-21). */
export const MAX_NOTICE_MESSAGE = 200
export const MAX_NOTICE_ACTION_LABEL = 24
/** How many notices one plugin may raise in a minute; the rest are dropped (Story 9.20, AD-21). */
export const NOTICE_LIMIT_PER_MINUTE = 3

/** Bounds on a view: only a guard against runaway input. */
export const MAX_VIEW_ITEMS = 20000
export const MAX_VIEW_DEPTH = 32
/** The longest label, detail, empty-state text, or ID the kernel draws; only a runaway guard. */
export const MAX_VIEW_TEXT = 1000

const viewText = (value: unknown): value is string =>
  typeof value === 'string' && value.length <= MAX_VIEW_TEXT

/** A row's marks: `[from, to]` integer pairs with `0 <= from <= to`; null when malformed. */
function marksOf(raw: unknown): [number, number][] | null {
  if (!Array.isArray(raw) || raw.length > MAX_VIEW_TEXT) return null
  const out: [number, number][] = []
  for (const mark of raw) {
    if (!Array.isArray(mark) || mark.length !== 2) return null
    const [from, to] = mark as unknown[]
    if (!Number.isInteger(from) || !Number.isInteger(to)) return null
    if ((from as number) < 0 || (to as number) < (from as number)) return null
    out.push([from as number, to as number])
  }
  return out
}

function viewItemsOf(raw: unknown, depth: number, count: { n: number }): ViewItem[] | null {
  if (!Array.isArray(raw) || depth > MAX_VIEW_DEPTH) return null
  const out: ViewItem[] = []
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) return null
    const r = item as Record<string, unknown>
    if (typeof r.id !== 'string' || r.id === '' || typeof r.label !== 'string') return null
    if (++count.n > MAX_VIEW_ITEMS) return null
    if (r.group !== undefined && typeof r.group !== 'boolean') return null
    if (r.expanded !== undefined && typeof r.expanded !== 'boolean') return null
    if (r.opens !== undefined && typeof r.opens !== 'boolean') return null
    if (r.kind !== undefined && r.kind !== 'file' && r.kind !== 'image' && r.kind !== 'folder') {
      return null
    }
    if (r.detail !== undefined && !viewText(r.detail)) return null
    if (r.image !== undefined && (typeof r.image !== 'string' || r.image.length > 500)) {
      return null
    }
    const marks = r.marks === undefined ? undefined : marksOf(r.marks)
    if (marks === null) return null
    const clean: ViewItem = { id: r.id, label: r.label }
    if (r.group === true) clean.group = true
    if (typeof r.expanded === 'boolean') clean.expanded = r.expanded
    if (r.kind !== undefined) clean.kind = r.kind as RowKind
    if (r.opens === false) clean.opens = false
    if (typeof r.detail === 'string') clean.detail = r.detail
    if (typeof r.image === 'string' && r.image !== '') clean.image = r.image
    if (marks !== undefined) clean.marks = marks
    if (r.depth !== undefined) {
      if (typeof r.depth !== 'number' || Number.isNaN(r.depth)) return null
      const level = Math.min(MAX_LIST_DEPTH, Math.max(0, Math.trunc(r.depth)))
      if (level > 0) clean.depth = level
    }
    if (r.children !== undefined) {
      const children = viewItemsOf(r.children, depth + 1, count)
      if (children === null) return null
      clean.children = children
    }
    out.push(clean)
  }
  return out
}

function emptyStateOf(raw: unknown): ViewEmptyState | null {
  if (typeof raw !== 'object' || raw === null) return null
  const r = raw as Record<string, unknown>
  if (!viewText(r.text)) return null
  if (r.action === undefined) return { text: r.text }
  if (typeof r.action !== 'object' || r.action === null) return null
  const a = r.action as Record<string, unknown>
  if (!viewText(a.id) || a.id === '' || !viewText(a.label) || a.label === '') return null
  return { text: r.text, action: { id: a.id, label: a.label } }
}

const FORM_FIELD_TYPES: readonly string[] = [
  'text',
  'longtext',
  'number',
  'date',
  'choice',
  'tags',
  'toggle',
  'document'
]

/** The most fields one form may have. */
const MAX_FORM_FIELDS = 100
const MAX_DIFF_SEGMENTS = 20000

function formValueOk(
  type: string,
  value: unknown,
  options: { value: string }[] | undefined
): boolean {
  switch (type) {
    case 'number':
      return value === null || (typeof value === 'number' && Number.isFinite(value))
    case 'tags':
      return Array.isArray(value) && value.every((t) => viewText(t))
    case 'toggle':
      return typeof value === 'boolean'
    case 'document':
      return value === null || viewText(value)
    case 'choice':
      return viewText(value) && (value === '' || (options ?? []).some((o) => o.value === value))
    default:
      return viewText(value)
  }
}

function cleanFormView(v: Record<string, unknown>): FormView | null {
  if (!Array.isArray(v.fields) || v.fields.length > MAX_FORM_FIELDS) return null
  const ids = new Set<string>()
  const fields: FormField[] = []
  for (const raw of v.fields) {
    if (typeof raw !== 'object' || raw === null) return null
    const f = raw as Record<string, unknown>
    if (!viewText(f.id) || f.id === '' || ids.has(f.id)) return null
    ids.add(f.id)
    if (typeof f.type !== 'string' || !FORM_FIELD_TYPES.includes(f.type)) return null
    if (!viewText(f.label)) return null
    let options: { value: string; label: string }[] | undefined
    if (f.options !== undefined) {
      if (!Array.isArray(f.options)) return null
      options = []
      for (const o of f.options) {
        if (typeof o !== 'object' || o === null) return null
        const ov = o as Record<string, unknown>
        if (!viewText(ov.value) || !viewText(ov.label)) return null
        options.push({ value: ov.value, label: ov.label })
      }
    }
    if (f.type === 'choice' && options === undefined) return null
    if (!formValueOk(f.type, f.value, options)) return null
    const clean: FormField = {
      id: f.id,
      type: f.type as FormFieldType,
      label: f.label,
      value: Array.isArray(f.value) ? [...(f.value as string[])] : (f.value as FormValue)
    }
    for (const key of ['hint', 'error', 'placeholder'] as const) {
      const text = f[key]
      if (text === undefined) continue
      if (!viewText(text)) return null
      if (text !== '') clean[key] = text
    }
    if (options !== undefined) clean.options = options
    fields.push(clean)
  }
  const form: FormView = { kind: 'form', fields }
  if (v.submitLabel !== undefined) {
    if (!viewText(v.submitLabel)) return null
    if (v.submitLabel !== '') form.submitLabel = v.submitLabel
  }
  if (v.note !== undefined) {
    if (!viewText(v.note)) return null
    form.note = v.note
  }
  return form
}

function cleanDiffView(v: Record<string, unknown>): DiffView | null {
  if (!Array.isArray(v.segments) || v.segments.length > MAX_DIFF_SEGMENTS) return null
  const segments: DiffSegment[] = []
  for (const raw of v.segments) {
    if (typeof raw !== 'object' || raw === null) return null
    const seg = raw as Record<string, unknown>
    if (seg.kind !== 'equal' && seg.kind !== 'insert' && seg.kind !== 'delete') return null
    if (typeof seg.text !== 'string') return null
    const clean: DiffSegment = { kind: seg.kind, text: seg.text }
    if (seg.id !== undefined) {
      if (!viewText(seg.id)) return null
      if (seg.id !== '' && seg.kind !== 'equal') clean.id = seg.id
    }
    segments.push(clean)
  }
  const diff: DiffView = { kind: 'diff', segments }
  if (v.note !== undefined) {
    if (!viewText(v.note)) return null
    diff.note = v.note
  }
  return diff
}

/**
 * Checks a view handed to `api.surfaces.setView` and copies it, so later mutation by the plugin
 * changes nothing. Returns null when it is malformed. A DOM view is returned as given.
 *
 * @internal
 */
export function cleanSurfaceView(raw: unknown): SurfaceView | null {
  if (typeof raw !== 'object' || raw === null) return null
  const v = raw as Record<string, unknown>
  if (v.kind === 'dom') {
    if (typeof v.mount !== 'function') return null
    for (const key of ['filter', 'move', 'activate'] as const) {
      if (v[key] !== undefined && typeof v[key] !== 'function') return null
    }
    return raw as DomView
  }
  if (v.kind === 'form') return cleanFormView(v)
  if (v.kind === 'diff') return cleanDiffView(v)
  if (v.kind === 'split') {
    const list = cleanSurfaceView(v.list)
    const detail = cleanSurfaceView(v.detail)
    if (list === null || detail === null || list.kind === 'dom' || list.kind === 'split') {
      return null
    }
    if (list.kind === 'form' || list.kind === 'diff' || detail.kind === 'split') return null
    return { kind: 'split', list, detail }
  }
  if (v.kind !== 'list' && v.kind !== 'tree') return null
  const items = viewItemsOf(v.items, 0, { n: 0 })
  if (items === null) return null
  if (v.selectedId !== undefined && typeof v.selectedId !== 'string') return null
  const view: ItemsView = { kind: v.kind, items }
  if (typeof v.selectedId === 'string') view.selectedId = v.selectedId
  if (v.layout !== undefined && v.layout !== 'rows' && v.layout !== 'cards') return null
  if (v.layout === 'cards') view.layout = 'cards'
  if (v.reorderable !== undefined && typeof v.reorderable !== 'boolean') return null
  if (v.reorderable === true) view.reorderable = true
  if (v.empty !== undefined) {
    const empty = emptyStateOf(v.empty)
    if (empty === null) return null
    view.empty = empty
  }
  if (v.input !== undefined) {
    if (typeof v.input !== 'object' || v.input === null) return null
    const i = v.input as Record<string, unknown>
    if (!viewText(i.placeholder) || !viewText(i.value)) return null
    view.input = { placeholder: i.placeholder, value: i.value }
  }
  if (v.note !== undefined) {
    if (!viewText(v.note)) return null
    view.note = v.note
  }
  return view
}

/**
 * Checks items handed to `api.palette.setItems` and copies them (at most `MAX_VIEW_ITEMS`).
 * Returns null when they are malformed.
 *
 * @internal
 */
export function cleanPaletteItems(raw: unknown): PaletteItem[] | null {
  if (!Array.isArray(raw) || raw.length > MAX_VIEW_ITEMS) return null
  const out: PaletteItem[] = []
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) return null
    const r = item as Record<string, unknown>
    if (!viewText(r.id) || r.id === '' || !viewText(r.label)) return null
    if (r.detail !== undefined && !viewText(r.detail)) return null
    out.push(
      r.detail === undefined
        ? { id: r.id, label: r.label }
        : { id: r.id, label: r.label, detail: r.detail }
    )
  }
  return out
}

/** Error codes for the editor slot. */
export const EDITOR_ERROR = {
  hostTaken: 'editor/host-taken',
  badChange: 'editor/bad-change',
  unavailable: 'editor/unavailable'
} as const

/** Vault error codes a plugin can see from `api.vault` (AD-6, AD-8). */
export const VAULT_ERROR = {
  outOfScope: 'vault/out-of-scope',
  readFailed: 'vault/read-failed',
  writeFailed: 'vault/write-failed',
  unknownDocument: 'vault/unknown-document',
  /** The snapshot id is not a snapshot of that document (Story 3.4). */
  badSnapshot: 'vault/bad-snapshot',
  readOnly: 'vault/read-only',
  renameFailed: 'vault/rename-failed',
  /** `create`, `createFolder`, `rename`: something already has that name (Story 2.8). */
  exists: 'vault/exists',
  /** The file changed between the read and the write. */
  changed: 'vault/changed',
  /** The file is open in the editor, which owns it (AD-8). */
  documentOpen: 'vault/document-open',
  /** `saveImage`: the bytes aren't a PNG, JPEG, GIF, WebP, or SVG (FR-62). */
  notImage: 'vault/not-image',
  /** `saveImage`: more than `MAX_IMAGE_BYTES`. */
  tooLarge: 'vault/too-large',
  /** `saveImage`: the project's `imageFolder` is absolute or leads outside the project. */
  badImageFolder: 'vault/bad-image-folder',
  /** `search`: a newer search started before this one finished (Story 2.10). */
  superseded: 'vault/superseded'
} as const
