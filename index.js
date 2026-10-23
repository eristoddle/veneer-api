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
export const API_VERSION = '0.39.0';
/** Plugin IDs are lowercase-hyphen, e.g. `word-count` (spine: naming). */
export const PLUGIN_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/**
 * Makes the error every part of Veneer rejects with: a `code` such as `my-plugin/no-notes`, a plain message, and optionally the plugin it concerns.
 *
 * @example
 * ```ts
 * throw veneerError('my-plugin/no-notes', 'There are no notes to export.', 'my-plugin')
 * ```
 */
export function veneerError(code, message, pluginId) {
    return pluginId === undefined ? { code, message } : { code, message, pluginId };
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
export function isVeneerError(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const v = value;
    return (typeof v.code === 'string' &&
        typeof v.message === 'string' &&
        (v.pluginId === undefined || typeof v.pluginId === 'string'));
}
/** `api.vault.search` stops after this many matches across all documents. */
export const MAX_SEARCH_MATCHES = 500;
/** The longest query `api.vault.search` takes; a longer one rejects `vault/out-of-scope`. */
export const MAX_SEARCH_QUERY = 500;
/** `api.vault.query` answers with at most this many documents; `limit` is capped here. */
export const MAX_QUERY_RESULTS = 2000;
/** The most keys a query's `frontmatter` may name, and the longest string in a query. */
export const MAX_QUERY_KEYS = 20;
export const MAX_QUERY_TEXT = 500;
/** How much of a hit's line a snippet keeps before the hit, and its longest length. */
const SNIPPET_BEFORE = 30;
const SNIPPET_MAX = 160;
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
export function findInText(text, query, max = MAX_SEARCH_MATCHES) {
    if (query === '' || max <= 0)
        return [];
    const pattern = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'giu');
    const out = [];
    let line = 1;
    let lineStart = 0;
    let scanned = 0;
    for (const hit of text.matchAll(pattern)) {
        const from = hit.index;
        const to = from + hit[0].length;
        // Lines are counted incrementally, so a large file is walked once.
        for (let i = text.indexOf('\n', scanned); i !== -1 && i < from; i = text.indexOf('\n', i + 1)) {
            line++;
            lineStart = i + 1;
        }
        scanned = from;
        let lineEnd = text.indexOf('\n', from);
        if (lineEnd === -1)
            lineEnd = text.length;
        let start = Math.max(lineStart, from - SNIPPET_BEFORE);
        const cut = start > lineStart;
        // Indentation says nothing in a one-line snippet.
        if (!cut)
            while (start < from && /\s/.test(text.charAt(start)))
                start++;
        const end = Math.min(lineEnd, Math.max(to, start + SNIPPET_MAX), start + SNIPPET_MAX * 2);
        const head = cut ? '…' : '';
        const tail = end < lineEnd ? '…' : '';
        const snippet = head + text.slice(start, end) + tail;
        const markFrom = head.length + (from - start);
        const markTo = head.length + (Math.min(to, end) - start);
        out.push({ from, to, line, snippet, marks: [[markFrom, markTo]] });
        if (out.length >= max)
            break;
    }
    return out;
}
/** Frontmatter longer than this many lines is body text, as the editor treats it. */
export const FRONTMATTER_MAX_LINES = 500;
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
export function splitFrontmatter(text) {
    const none = { frontmatter: '', yaml: '', body: text };
    const first = text.indexOf('\n');
    if (first === -1 || text.slice(0, first).trimEnd() !== '---')
        return none;
    let lineStart = first + 1;
    for (let n = 2; n <= FRONTMATTER_MAX_LINES && lineStart <= text.length; n++) {
        const nl = text.indexOf('\n', lineStart);
        const lineEnd = nl === -1 ? text.length : nl;
        const line = text.slice(lineStart, lineEnd).trimEnd();
        if (line === '---' || line === '...') {
            const end = nl === -1 ? text.length : nl + 1;
            return {
                frontmatter: text.slice(0, end),
                yaml: text.slice(first + 1, lineStart),
                body: text.slice(end)
            };
        }
        if (nl === -1)
            break;
        lineStart = nl + 1;
    }
    return none;
}
/** A diff that would need more edits than this between two anchors gives up on that stretch. */
const DIFF_MAX_EDITS = 2000;
/** A changed stretch longer than this many words and spaces is shown whole, not word by word. */
const DIFF_MAX_REGION_TOKENS = 60000;
/** Recursion limit for anchoring on unique lines or words; past it, the plain diff takes over. */
const DIFF_MAX_DEPTH = 48;
const RUN_EQUAL = 0;
const RUN_DELETE = 1;
const RUN_INSERT = 2;
/** Runs are flat pairs (kind, count); a run the same kind as the last one extends it. */
function pushRun(out, kind, count) {
    if (count === 0)
        return;
    if (out.length > 0 && out[out.length - 2] === kind)
        out[out.length - 1] += count;
    else
        out.push(kind, count);
}
/**
 * Myers' O(ND) diff, giving up past `maxEdits`. Each step keeps only the diagonals it reached,
 * so memory is O(D²), not O(D·(N+M)).
 */
function myersRuns(a, b, maxEdits, out) {
    const n = a.length;
    const m = b.length;
    const limit = Math.min(maxEdits, n + m);
    const off = limit + 1;
    const v = new Int32Array(2 * limit + 3);
    const trace = [];
    for (let d = 0; d <= limit; d++) {
        // Diagonals -d-1 .. d+1 as they stood before this step, at index k + d + 1.
        trace.push(v.slice(off - d - 1, off + d + 2));
        for (let k = -d; k <= d; k += 2) {
            let x = k === -d || (k !== d && v[off + k - 1] < v[off + k + 1])
                ? v[off + k + 1]
                : v[off + k - 1] + 1;
            let y = x - k;
            while (x < n && y < m && a[x] === b[y]) {
                x++;
                y++;
            }
            v[off + k] = x;
            if (x >= n && y >= m) {
                const ops = [];
                let cx = n;
                let cy = m;
                for (let s = d; s > 0; s--) {
                    const t = trace[s];
                    const ck = cx - cy;
                    const at = (kk) => t[kk + s + 1];
                    const prevK = ck === -s || (ck !== s && at(ck - 1) < at(ck + 1)) ? ck + 1 : ck - 1;
                    const prevX = at(prevK);
                    const prevY = prevX - prevK;
                    while (cx > prevX && cy > prevY) {
                        ops.push(RUN_EQUAL);
                        cx--;
                        cy--;
                    }
                    ops.push(cx === prevX ? RUN_INSERT : RUN_DELETE);
                    cx = prevX;
                    cy = prevY;
                }
                for (let i = 0; i < cx; i++)
                    ops.push(RUN_EQUAL);
                for (let i = ops.length - 1; i >= 0; i--)
                    pushRun(out, ops[i], 1);
                return true;
            }
        }
    }
    return false;
}
/**
 * Pairs of positions whose item occurs exactly once in each side, longest in-order subset
 * (patience diff's anchors). Prose rarely repeats a whole line, so this splits a long document
 * into small gaps cheaply.
 */
function uniqueAnchors(a, b) {
    const count = new Map();
    for (let i = 0; i < a.length; i++)
        count.set(a[i], (count.get(a[i]) ?? 0) + 1);
    const inB = new Map();
    for (let j = 0; j < b.length; j++) {
        const c = count.get(b[j]);
        if (c !== 1)
            continue;
        inB.set(b[j], inB.has(b[j]) ? -1 : j);
    }
    const pairs = [];
    for (let i = 0; i < a.length; i++) {
        const j = inB.get(a[i]);
        if (j !== undefined && j >= 0)
            pairs.push([i, j]);
    }
    if (pairs.length === 0)
        return pairs;
    // Longest increasing run of b positions (patience sorting), so anchors never cross.
    const tails = [];
    const prev = new Int32Array(pairs.length).fill(-1);
    for (let p = 0; p < pairs.length; p++) {
        let lo = 0;
        let hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (pairs[tails[mid]][1] < pairs[p][1])
                lo = mid + 1;
            else
                hi = mid;
        }
        if (lo > 0)
            prev[p] = tails[lo - 1];
        tails[lo] = p;
    }
    const out = [];
    for (let p = tails[tails.length - 1]; p !== -1; p = prev[p])
        out.push(pairs[p]);
    return out.reverse();
}
function diffRuns(a, b, out, depth) {
    const min = Math.min(a.length, b.length);
    let start = 0;
    while (start < min && a[start] === b[start])
        start++;
    let endA = a.length;
    let endB = b.length;
    while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
        endA--;
        endB--;
    }
    pushRun(out, RUN_EQUAL, start);
    const ma = a.subarray(start, endA);
    const mb = b.subarray(start, endB);
    if (ma.length === 0 || mb.length === 0) {
        pushRun(out, RUN_DELETE, ma.length);
        pushRun(out, RUN_INSERT, mb.length);
    }
    else {
        const anchors = depth < DIFF_MAX_DEPTH ? uniqueAnchors(ma, mb) : [];
        if (anchors.length > 0) {
            let pa = 0;
            let pb = 0;
            for (const [ia, ib] of anchors) {
                diffRuns(ma.subarray(pa, ia), mb.subarray(pb, ib), out, depth + 1);
                pushRun(out, RUN_EQUAL, 1);
                pa = ia + 1;
                pb = ib + 1;
            }
            diffRuns(ma.subarray(pa), mb.subarray(pb), out, depth + 1);
        }
        else if (!myersRuns(ma, mb, DIFF_MAX_EDITS, out)) {
            pushRun(out, RUN_DELETE, ma.length);
            pushRun(out, RUN_INSERT, mb.length);
        }
    }
    pushRun(out, RUN_EQUAL, a.length - endA);
}
/** Diffs two lists of strings; `ids` gives equal strings one number across both. */
function diffPieces(a, b, emit) {
    const ids = new Map();
    const intern = (list) => {
        const out = new Int32Array(list.length);
        for (let i = 0; i < list.length; i++) {
            let id = ids.get(list[i]);
            if (id === undefined)
                ids.set(list[i], (id = ids.size));
            out[i] = id;
        }
        return out;
    };
    const runs = [];
    diffRuns(intern(a), intern(b), runs, 0);
    let ia = 0;
    let ib = 0;
    for (let r = 0; r < runs.length; r += 2) {
        const count = runs[r + 1];
        if (runs[r] === RUN_EQUAL) {
            emit('equal', a.slice(ia, ia + count).join(''));
            ia += count;
            ib += count;
        }
        else if (runs[r] === RUN_DELETE) {
            emit('delete', a.slice(ia, ia + count).join(''));
            ia += count;
        }
        else {
            emit('insert', b.slice(ib, ib + count).join(''));
            ib += count;
        }
    }
}
const splitLines = (text) => text.match(/[^\n]*\n|[^\n]+$/g) ?? [];
const splitWords = (text) => text.match(/\s+|\S+/g) ?? [];
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
export function wordDiff(before, after) {
    const raw = [];
    const emit = (kind, text) => {
        if (text !== '')
            raw.push({ kind, text });
    };
    let oldRegion = [];
    let newRegion = [];
    const flush = () => {
        if (oldRegion.length === 0 && newRegion.length === 0)
            return;
        const oldText = oldRegion.join('');
        const newText = newRegion.join('');
        const oldWords = splitWords(oldText);
        const newWords = splitWords(newText);
        if (oldWords.length + newWords.length > DIFF_MAX_REGION_TOKENS) {
            emit('delete', oldText);
            emit('insert', newText);
        }
        else {
            diffPieces(oldWords, newWords, emit);
        }
        oldRegion = [];
        newRegion = [];
    };
    diffPieces(splitLines(before), splitLines(after), (kind, text) => {
        if (kind === 'equal') {
            flush();
            emit('equal', text);
        }
        else if (kind === 'delete')
            oldRegion.push(text);
        else
            newRegion.push(text);
    });
    flush();
    return tidyWordDiff(raw);
}
/**
 * Spaces (not line breaks) between two changes join them; each run of changes becomes one
 * deletion then one insertion; neighbours of one kind merge.
 */
function tidyWordDiff(raw) {
    const out = [];
    let del = '';
    let ins = '';
    const flushChange = () => {
        if (del !== '')
            out.push({ kind: 'delete', text: del });
        if (ins !== '')
            out.push({ kind: 'insert', text: ins });
        del = '';
        ins = '';
    };
    for (let i = 0; i < raw.length; i++) {
        const s = raw[i];
        if (s.kind === 'delete')
            del += s.text;
        else if (s.kind === 'insert')
            ins += s.text;
        else if ((del !== '' || ins !== '') &&
            i + 1 < raw.length &&
            raw[i + 1].kind !== 'equal' &&
            /^[^\S\n]+$/.test(s.text)) {
            del += s.text;
            ins += s.text;
        }
        else {
            flushChange();
            const last = out[out.length - 1];
            if (last !== undefined && last.kind === 'equal')
                last.text += s.text;
            else
                out.push({ kind: 'equal', text: s.text });
        }
    }
    flushChange();
    return out;
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
];
/** How long a renderer may take before the plain block stays and the failure is reported. */
export const BLOCK_RENDER_TIMEOUT_MS = 2000;
/** The deepest `ViewItem.depth` a list row can take (six heading levels: 0 to 5). */
export const MAX_LIST_DEPTH = 5;
/** The kinds of value a project type's frontmatter field can hold. */
export const FRONTMATTER_FIELD_TYPES = ['text', 'number', 'boolean', 'date', 'list'];
const FRONTMATTER_TYPE_NAMES = {
    text: 'text',
    number: 'a number',
    boolean: 'true or false',
    date: 'a date like 2026-10-16',
    list: 'a list'
};
function fitsFieldType(type, value, hasList) {
    const v = value.trim().replace(/^(['"])(.*)\1$/, '$2');
    switch (type) {
        case 'text':
            return v !== '';
        case 'number':
            return /^-?\d+(?:\.\d+)?$/.test(v);
        case 'boolean':
            return /^(?:true|false)$/i.test(v);
        case 'date':
            return /^\d{4}-\d{2}-\d{2}(?:[T ].*)?$/.test(v);
        case 'list':
            return hasList || /^\[.*\]$/.test(v);
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
export function adviseFrontmatter(frontmatter, fields) {
    const present = new Map();
    let last = null;
    for (const line of (frontmatter ?? '').replace(/\r\n?/g, '\n').split('\n')) {
        const entry = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
        if (entry !== null) {
            last = entry[1];
            present.set(last, { value: entry[2], list: false });
        }
        else if (last !== null && /^\s*-\s+\S/.test(line)) {
            present.set(last, { value: present.get(last)?.value ?? '', list: true });
        }
    }
    const out = [];
    for (const field of fields) {
        const label = field.label ?? field.key;
        const found = present.get(field.key);
        if (found === undefined || (found.value.trim() === '' && !found.list)) {
            if (field.required === true) {
                out.push({ key: field.key, problem: 'missing', message: `${label} is missing.` });
            }
            continue;
        }
        if (!fitsFieldType(field.type, found.value, found.list)) {
            out.push({
                key: field.key,
                problem: 'wrong-type',
                message: `${label} should be ${FRONTMATTER_TYPE_NAMES[field.type]}.`
            });
        }
    }
    return out;
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
];
/** What a selection is, for a tool's `appliesTo` (FR-23). `any` applies to every kind. */
export const TOOL_APPLIES_TO = ['word', 'phrase', 'sentence', 'paragraph', 'any'];
/** What a tool asks the kernel to assemble for it (FR-23, AD-10). */
export const TOOL_CONTEXTS = [
    'selection',
    'paragraph',
    'section',
    'title',
    'frontmatter',
    'document'
];
/**
 * Whether `value` is a well-formed `ToolResult`.
 * @internal
 */
export function isToolResult(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const r = value;
    if (r.kind === 'replace') {
        return (Array.isArray(r.options) &&
            r.options.length > 0 &&
            r.options.every((o) => typeof o === 'string'));
    }
    if (r.kind === 'insert')
        return typeof r.text === 'string';
    if (r.kind === 'info') {
        return (Array.isArray(r.items) &&
            r.items.every((i) => {
                if (typeof i !== 'object' || i === null)
                    return false;
                const item = i;
                return (typeof item.text === 'string' &&
                    (item.insertable === undefined || typeof item.insertable === 'boolean'));
            }));
    }
    return false;
}
/**
 * Whether a tool applies to a selection of `kind`, or to none (`null`) (FR-23).
 * @internal
 */
export function toolApplies(tool, kind) {
    if (kind === null)
        return tool.worksWithoutSelection;
    return tool.appliesTo.includes('any') || tool.appliesTo.includes(kind);
}
/**
 * The one change that turns `before` into `after`: everything between their common prefix and
 * common suffix. The kernel uses it to apply `vault.process` on the open document as one edit,
 * and main uses the same span to splice a save into the file's bytes (AD-8).
 *
 * @internal
 */
export function changedSpan(before, after) {
    const max = Math.min(before.length, after.length);
    let prefix = 0;
    while (prefix < max && before.charCodeAt(prefix) === after.charCodeAt(prefix))
        prefix++;
    let suffix = 0;
    while (suffix < max - prefix &&
        before.charCodeAt(before.length - 1 - suffix) === after.charCodeAt(after.length - 1 - suffix)) {
        suffix++;
    }
    return {
        from: prefix,
        to: before.length - suffix,
        text: after.slice(prefix, after.length - suffix)
    };
}
/**
 * Checks a change set against a document of `length` characters: every change in range, the
 * list sorted by position, and no two overlapping. Throws `editor/bad-change` otherwise.
 * Editor hosts run it in `applyResult`; the fake host runs it in `editor.edit`.
 *
 * @internal
 */
export function checkTextChanges(changes, length) {
    let end = 0;
    for (const change of changes) {
        const ok = typeof change === 'object' &&
            change !== null &&
            Number.isInteger(change.from) &&
            Number.isInteger(change.to) &&
            typeof change.text === 'string' &&
            change.from >= end &&
            change.to >= change.from &&
            change.to <= length;
        if (!ok) {
            throw veneerError(EDITOR_ERROR.badChange, 'Each change must be in range, sorted, and not overlap another');
        }
        end = change.to;
    }
}
/** At most this many marks per plugin, across all its sets (Story 9.17). */
export const MAX_MARKS = 3000;
const MARK_KINDS = ['note', 'flag', 'change'];
/**
 * Checks the marks handed to `api.editor.setMarks` and copies them. `others` is how many marks
 * the plugin's other sets already hold. Returns the marks, or a plain sentence saying why not.
 *
 * @internal
 */
export function checkMarks(raw, others = 0) {
    const bad = (message) => ({ ok: false, message });
    if (!Array.isArray(raw))
        return bad('Marks must be a list.');
    if (raw.length + others > MAX_MARKS) {
        return bad(`A plugin may set at most ${MAX_MARKS} marks.`);
    }
    const ids = new Set();
    const marks = [];
    for (const item of raw) {
        const m = (typeof item === 'object' && item !== null ? item : {});
        if (typeof m.id !== 'string' || m.id === '' || ids.has(m.id)) {
            return bad('Every mark needs an id that no other mark in its set uses.');
        }
        ids.add(m.id);
        if (typeof m.from !== 'number' ||
            typeof m.to !== 'number' ||
            !Number.isInteger(m.from) ||
            !Number.isInteger(m.to) ||
            m.from < 0 ||
            m.to <= m.from) {
            return bad('A mark needs a range: whole numbers with `to` after `from`.');
        }
        if (typeof m.kind !== 'string' || !MARK_KINDS.includes(m.kind)) {
            return bad('A mark’s kind is note, flag, or change.');
        }
        if (m.label !== undefined && typeof m.label !== 'string') {
            return bad('A mark’s label must be text.');
        }
        const mark = { id: m.id, from: m.from, to: m.to, kind: m.kind };
        if (typeof m.label === 'string' && m.label !== '')
            mark.label = m.label;
        marks.push(mark);
    }
    return { ok: true, marks };
}
/**
 * True for a source that names a remote resource: an `http:`/`https:` URL or a
 * protocol-relative `//host/…` one. Such a source never loads directly; it goes through
 * `api.resources.imageSource` (AD-16).
 *
 * @internal
 */
export function isRemoteSource(src) {
    const s = src.trim();
    if (s.startsWith('//'))
        return true;
    return /^https?:/i.test(s);
}
/**
 * True for a source that names a file relative to the document, like `cat.png` or
 * `../assets/My%20Cat.jpg`: no scheme, not absolute (`/`, `\`, `~`), not a bare fragment or
 * query. Such an image loads only through the kernel's scope-checked document scheme (FR-62,
 * AD-6); absolute paths and `file:` never load.
 *
 * @internal
 */
export function isRelativeSource(src) {
    const s = src.trim();
    if (s === '' || isRemoteSource(s))
        return false;
    if (/^[/\\~#?]/.test(s))
        return false;
    return !/^[a-z][a-z0-9+.-]*:/i.test(s);
}
/** The largest image `api.vault.saveImage` accepts, in bytes (FR-62). */
export const MAX_IMAGE_BYTES = 25 * 1024 * 1024;
/** The most bytes a request body or a `bytes` response may hold (a book's files, an EPUB). */
export const MAX_NET_BYTES = 100 * 1024 * 1024;
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
};
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
};
/** The most serialized bytes one `api.projectData` key holds. */
export const MAX_PROJECT_DATA_KEY_BYTES = 1_000_000;
/** The most serialized bytes one plugin's project data holds in a project. */
export const MAX_PROJECT_DATA_PLUGIN_BYTES = 20_000_000;
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
};
/** The most commits one `api.history.log` call returns. */
export const MAX_HISTORY_LOG = 5000;
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
};
/** The longest `api.notify` message (one plain sentence) and action label (Story 9.20, AD-21). */
export const MAX_NOTICE_MESSAGE = 200;
export const MAX_NOTICE_ACTION_LABEL = 24;
/** How many notices one plugin may raise in a minute; the rest are dropped (Story 9.20, AD-21). */
export const NOTICE_LIMIT_PER_MINUTE = 3;
/** Bounds on a view: only a guard against runaway input. */
export const MAX_VIEW_ITEMS = 20000;
export const MAX_VIEW_DEPTH = 32;
/** The longest label, detail, empty-state text, or ID the kernel draws; only a runaway guard. */
export const MAX_VIEW_TEXT = 1000;
const viewText = (value) => typeof value === 'string' && value.length <= MAX_VIEW_TEXT;
/** A row's marks: `[from, to]` integer pairs with `0 <= from <= to`; null when malformed. */
function marksOf(raw) {
    if (!Array.isArray(raw) || raw.length > MAX_VIEW_TEXT)
        return null;
    const out = [];
    for (const mark of raw) {
        if (!Array.isArray(mark) || mark.length !== 2)
            return null;
        const [from, to] = mark;
        if (!Number.isInteger(from) || !Number.isInteger(to))
            return null;
        if (from < 0 || to < from)
            return null;
        out.push([from, to]);
    }
    return out;
}
function viewItemsOf(raw, depth, count) {
    if (!Array.isArray(raw) || depth > MAX_VIEW_DEPTH)
        return null;
    const out = [];
    for (const item of raw) {
        if (typeof item !== 'object' || item === null)
            return null;
        const r = item;
        if (typeof r.id !== 'string' || r.id === '' || typeof r.label !== 'string')
            return null;
        if (++count.n > MAX_VIEW_ITEMS)
            return null;
        if (r.group !== undefined && typeof r.group !== 'boolean')
            return null;
        if (r.expanded !== undefined && typeof r.expanded !== 'boolean')
            return null;
        if (r.opens !== undefined && typeof r.opens !== 'boolean')
            return null;
        if (r.kind !== undefined && r.kind !== 'file' && r.kind !== 'image' && r.kind !== 'folder') {
            return null;
        }
        if (r.detail !== undefined && !viewText(r.detail))
            return null;
        if (r.image !== undefined && (typeof r.image !== 'string' || r.image.length > 500)) {
            return null;
        }
        const marks = r.marks === undefined ? undefined : marksOf(r.marks);
        if (marks === null)
            return null;
        const clean = { id: r.id, label: r.label };
        if (r.group === true)
            clean.group = true;
        if (typeof r.expanded === 'boolean')
            clean.expanded = r.expanded;
        if (r.kind !== undefined)
            clean.kind = r.kind;
        if (r.opens === false)
            clean.opens = false;
        if (typeof r.detail === 'string')
            clean.detail = r.detail;
        if (typeof r.image === 'string' && r.image !== '')
            clean.image = r.image;
        if (marks !== undefined)
            clean.marks = marks;
        if (r.depth !== undefined) {
            if (typeof r.depth !== 'number' || Number.isNaN(r.depth))
                return null;
            const level = Math.min(MAX_LIST_DEPTH, Math.max(0, Math.trunc(r.depth)));
            if (level > 0)
                clean.depth = level;
        }
        if (r.children !== undefined) {
            const children = viewItemsOf(r.children, depth + 1, count);
            if (children === null)
                return null;
            clean.children = children;
        }
        out.push(clean);
    }
    return out;
}
function emptyStateOf(raw) {
    if (typeof raw !== 'object' || raw === null)
        return null;
    const r = raw;
    if (!viewText(r.text))
        return null;
    if (r.action === undefined)
        return { text: r.text };
    if (typeof r.action !== 'object' || r.action === null)
        return null;
    const a = r.action;
    if (!viewText(a.id) || a.id === '' || !viewText(a.label) || a.label === '')
        return null;
    return { text: r.text, action: { id: a.id, label: a.label } };
}
const FORM_FIELD_TYPES = [
    'text',
    'longtext',
    'number',
    'date',
    'choice',
    'tags',
    'toggle',
    'document'
];
/** The most fields one form may have. */
const MAX_FORM_FIELDS = 100;
const MAX_DIFF_SEGMENTS = 20000;
function formValueOk(type, value, options) {
    switch (type) {
        case 'number':
            return value === null || (typeof value === 'number' && Number.isFinite(value));
        case 'tags':
            return Array.isArray(value) && value.every((t) => viewText(t));
        case 'toggle':
            return typeof value === 'boolean';
        case 'document':
            return value === null || viewText(value);
        case 'choice':
            return viewText(value) && (value === '' || (options ?? []).some((o) => o.value === value));
        default:
            return viewText(value);
    }
}
function cleanFormView(v) {
    if (!Array.isArray(v.fields) || v.fields.length > MAX_FORM_FIELDS)
        return null;
    const ids = new Set();
    const fields = [];
    for (const raw of v.fields) {
        if (typeof raw !== 'object' || raw === null)
            return null;
        const f = raw;
        if (!viewText(f.id) || f.id === '' || ids.has(f.id))
            return null;
        ids.add(f.id);
        if (typeof f.type !== 'string' || !FORM_FIELD_TYPES.includes(f.type))
            return null;
        if (!viewText(f.label))
            return null;
        let options;
        if (f.options !== undefined) {
            if (!Array.isArray(f.options))
                return null;
            options = [];
            for (const o of f.options) {
                if (typeof o !== 'object' || o === null)
                    return null;
                const ov = o;
                if (!viewText(ov.value) || !viewText(ov.label))
                    return null;
                options.push({ value: ov.value, label: ov.label });
            }
        }
        if (f.type === 'choice' && options === undefined)
            return null;
        if (!formValueOk(f.type, f.value, options))
            return null;
        const clean = {
            id: f.id,
            type: f.type,
            label: f.label,
            value: Array.isArray(f.value) ? [...f.value] : f.value
        };
        for (const key of ['hint', 'error', 'placeholder']) {
            const text = f[key];
            if (text === undefined)
                continue;
            if (!viewText(text))
                return null;
            if (text !== '')
                clean[key] = text;
        }
        if (options !== undefined)
            clean.options = options;
        fields.push(clean);
    }
    const form = { kind: 'form', fields };
    if (v.submitLabel !== undefined) {
        if (!viewText(v.submitLabel))
            return null;
        if (v.submitLabel !== '')
            form.submitLabel = v.submitLabel;
    }
    if (v.note !== undefined) {
        if (!viewText(v.note))
            return null;
        form.note = v.note;
    }
    return form;
}
function cleanDiffView(v) {
    if (!Array.isArray(v.segments) || v.segments.length > MAX_DIFF_SEGMENTS)
        return null;
    const segments = [];
    for (const raw of v.segments) {
        if (typeof raw !== 'object' || raw === null)
            return null;
        const seg = raw;
        if (seg.kind !== 'equal' && seg.kind !== 'insert' && seg.kind !== 'delete')
            return null;
        if (typeof seg.text !== 'string')
            return null;
        const clean = { kind: seg.kind, text: seg.text };
        if (seg.id !== undefined) {
            if (!viewText(seg.id))
                return null;
            if (seg.id !== '' && seg.kind !== 'equal')
                clean.id = seg.id;
        }
        segments.push(clean);
    }
    const diff = { kind: 'diff', segments };
    if (v.note !== undefined) {
        if (!viewText(v.note))
            return null;
        diff.note = v.note;
    }
    return diff;
}
/**
 * Checks a view handed to `api.surfaces.setView` and copies it, so later mutation by the plugin
 * changes nothing. Returns null when it is malformed. A DOM view is returned as given.
 *
 * @internal
 */
export function cleanSurfaceView(raw) {
    if (typeof raw !== 'object' || raw === null)
        return null;
    const v = raw;
    if (v.kind === 'dom') {
        if (typeof v.mount !== 'function')
            return null;
        for (const key of ['filter', 'move', 'activate']) {
            if (v[key] !== undefined && typeof v[key] !== 'function')
                return null;
        }
        return raw;
    }
    if (v.kind === 'form')
        return cleanFormView(v);
    if (v.kind === 'diff')
        return cleanDiffView(v);
    if (v.kind === 'split') {
        const list = cleanSurfaceView(v.list);
        const detail = cleanSurfaceView(v.detail);
        if (list === null || detail === null || list.kind === 'dom' || list.kind === 'split') {
            return null;
        }
        if (list.kind === 'form' || list.kind === 'diff' || detail.kind === 'split')
            return null;
        return { kind: 'split', list, detail };
    }
    if (v.kind !== 'list' && v.kind !== 'tree')
        return null;
    const items = viewItemsOf(v.items, 0, { n: 0 });
    if (items === null)
        return null;
    if (v.selectedId !== undefined && typeof v.selectedId !== 'string')
        return null;
    const view = { kind: v.kind, items };
    if (typeof v.selectedId === 'string')
        view.selectedId = v.selectedId;
    if (v.layout !== undefined && v.layout !== 'rows' && v.layout !== 'cards')
        return null;
    if (v.layout === 'cards')
        view.layout = 'cards';
    if (v.reorderable !== undefined && typeof v.reorderable !== 'boolean')
        return null;
    if (v.reorderable === true)
        view.reorderable = true;
    if (v.empty !== undefined) {
        const empty = emptyStateOf(v.empty);
        if (empty === null)
            return null;
        view.empty = empty;
    }
    if (v.input !== undefined) {
        if (typeof v.input !== 'object' || v.input === null)
            return null;
        const i = v.input;
        if (!viewText(i.placeholder) || !viewText(i.value))
            return null;
        view.input = { placeholder: i.placeholder, value: i.value };
    }
    if (v.note !== undefined) {
        if (!viewText(v.note))
            return null;
        view.note = v.note;
    }
    return view;
}
/**
 * Checks items handed to `api.palette.setItems` and copies them (at most `MAX_VIEW_ITEMS`).
 * Returns null when they are malformed.
 *
 * @internal
 */
export function cleanPaletteItems(raw) {
    if (!Array.isArray(raw) || raw.length > MAX_VIEW_ITEMS)
        return null;
    const out = [];
    for (const item of raw) {
        if (typeof item !== 'object' || item === null)
            return null;
        const r = item;
        if (!viewText(r.id) || r.id === '' || !viewText(r.label))
            return null;
        if (r.detail !== undefined && !viewText(r.detail))
            return null;
        out.push(r.detail === undefined
            ? { id: r.id, label: r.label }
            : { id: r.id, label: r.label, detail: r.detail });
    }
    return out;
}
/** Error codes for the editor slot. */
export const EDITOR_ERROR = {
    hostTaken: 'editor/host-taken',
    badChange: 'editor/bad-change',
    unavailable: 'editor/unavailable'
};
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
};
