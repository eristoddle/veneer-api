/**
 * `@veneer/api/testing`: a fake host for plugin unit tests (AD-3). It loads an entry against
 * its manifest with the same manifest-authority rule as the kernel (handlers only for declared
 * IDs) and counts live disposables, so a test can check that `unload()` cleans up.
 *
 * The editor facade works against an in-memory text (`options.text`; null means no document)
 * and records each `edit` with its `plugin:<id>` source. `vault.process` works against the
 * `files` map the test seeds; the path in `options.openPath` (or `switchProject`'s) stands for
 * the open document and goes through the in-memory text instead, as the kernel routes it (AD-8).
 *
 * `api.editor.registerMode` is checked against `contributes.editingModes` like the kernel
 * checks it (FR-12, AD-5); live registrations are in `modes`, by mode ID.
 *
 * `api.settings` reads the manifest's `contributes.settings` (FR-44): a declared ID returns the
 * value `setSetting` gave it, else its default; any other ID rejects like the kernel's.
 *
 * `api.surfaces` is checked against `contributes.surfaces` (FR-7, AD-5): the last view each
 * surface was given is in `views`, and `openItem` stands in for the writer opening a row.
 *
 * `switchProject` stands in for a project switch (FR-2, AD-14): the closed files become the new
 * project's, keyed by paths relative to its root, and `project:switched` is emitted once.
 *
 * `vault.list` lists the `files` map plus the open document, with every folder on their paths
 * (a loose project lists only the open document). `workspace.open` checks the path like main
 * (inside the project, markdown, existing), records it in `opens`, makes it the open document,
 * and emits `document:opened`; `openFolderAsProject` turns a loose project into a project named
 * after the document's folder and emits `project:switched`. `api.palette` is checked against
 * `contributes.paletteProviders`: items are in `paletteItems`, and `runPaletteItem` stands in
 * for the writer picking one. `pressAction` and `refreshSurface` stand in for the writer pressing
 * a view's action button and the kernel asking for a fresh view.
 *
 * Story 2.8: `vault.create`, `createFolder`, `rename`, and `trash` work on the `files` map (an
 * image is any entry with an image extension; `folders` holds folders made empty), check like
 * main (a project only, nothing replaced: `vault/exists`), record what they did in `created`,
 * `renames`, and `trashed`, and emit `vault:created`, `vault:renamed`, `vault:trashed`. The fake
 * moves files but does not rewrite links: that is the kernel's (`src/common/links.ts`); rename
 * participants (`vault.onRename`) run after the move. `rowAction` stands in for the writer
 * finishing a row action, and `begunRowActions` records `surfaces.beginRowAction` calls.
 *
 * Story 2.10: `vault.search` runs `findInText` over the open document's text and the `files`
 * map (markdown only, path order; a loose project searches only the open document) and records
 * each query in `searches`; `holdSearches` holds them so a test can supersede one. A
 * `workspace.open` with `select` records it in `selections`. `input` stands in for the writer
 * typing in a view's input field (`surfaces.onInput`), and `shown` records `surfaces.show`.
 *
 * Story 2.11: `editor.onChanged` listeners fire on every `editor.edit`, on `changeText` (the
 * writer typing, or another document or none showing), and when `workspace.open` or
 * `switchProject` changes the open document. `editor.getSelection` returns what `setSelection`
 * set (clamped to the text; the caret at 0 by default, and again after `workspace.open` shows another
 * document), and `setSelection`, or `workspace.open` with `select` (origin `find`), fires
 * `editor.onSelectionChanged` listeners while a document is open.
 */
import { API_VERSION, EDITOR_ERROR, HISTORY_ERROR, MAX_PROJECT_DATA_KEY_BYTES, MAX_PROJECT_DATA_PLUGIN_BYTES, PROJECT_DATA_ERROR, MAX_HISTORY_LOG, MAX_NET_BYTES, MAX_NOTICE_ACTION_LABEL, MAX_NOTICE_MESSAGE, NOTICE_LIMIT_PER_MINUTE, PLUGIN_ERROR, STORAGE_ERROR, VAULT_ERROR, checkMarks, MAX_QUERY_KEYS, MAX_QUERY_RESULTS, MAX_QUERY_TEXT, MAX_SEARCH_MATCHES, MAX_SEARCH_QUERY, splitFrontmatter, changedSpan, findInText, cleanPaletteItems, checkTextChanges, cleanSurfaceView, isRelativeSource, isRemoteSource, isToolResult, isVeneerError, veneerError } from './index.js';
/** A project-data key as the real `api.projectData` checks it. */
function projectDataKey(key) {
    if (typeof key !== 'string' || !/^[a-z0-9][a-z0-9._-]{0,63}$/.test(key) || key.includes('..')) {
        throw veneerError(PROJECT_DATA_ERROR.badKey, 'That project data key is not valid.');
    }
    return key;
}
/** A secret's name as the real `api.secrets` checks it. */
function secretName(name) {
    if (typeof name !== 'string' || !/^[a-z0-9][a-z0-9._-]{0,63}$/.test(name)) {
        throw veneerError(STORAGE_ERROR.badSecret, 'That secret name is not valid.');
    }
    return name;
}
const FAKE_MARKDOWN = /\.(md|markdown)$/i;
/** A simple scalar from the fake's tiny YAML subset: quoted or bare text, numbers, booleans. */
function fakeScalar(raw) {
    const t = raw.trim().replace(/^(['"])(.*)\1$/, '$2');
    if (/^(['"])/.test(raw.trim()))
        return t;
    if (t === 'true')
        return true;
    if (t === 'false')
        return false;
    return t !== '' && Number.isFinite(Number(t)) ? Number(t) : t;
}
/**
 * The fake's index entry for one file (Story 9.27): frontmatter through `splitFrontmatter`, read
 * as `key: value`, `key: [a, b]`, and `key:` followed by `- item` lines (nothing deeper); tags
 * from frontmatter `tags` and inline `#tags`; links from `](relative.md)`. The real index uses a
 * full YAML parser and link resolver; a test relies on this only for the simple shapes.
 */
function fakeIndexEntry(path, text) {
    const body = text.replace(/\r\n?/g, '\n');
    const split = splitFrontmatter(body);
    const frontmatter = {};
    let listKey = null;
    for (const line of split.yaml.split('\n')) {
        const item = /^\s+-\s+(.*)$/.exec(line);
        if (item !== null && listKey !== null) {
            ;
            frontmatter[listKey].push(fakeScalar(item[1]));
            continue;
        }
        const pair = /^([^\s:#][^:]*):\s*(.*)$/.exec(line);
        if (pair === null)
            continue;
        const value = pair[2].trim();
        if (value === '') {
            listKey = pair[1];
            frontmatter[listKey] = [];
        }
        else {
            listKey = null;
            frontmatter[pair[1]] = value.startsWith('[')
                ? value
                    .slice(1, value.lastIndexOf(']'))
                    .split(',')
                    .filter((v) => v.trim() !== '')
                    .map(fakeScalar)
                : fakeScalar(value);
        }
    }
    const tags = new Set();
    const listed = frontmatter.tags;
    for (const tag of Array.isArray(listed)
        ? listed
        : typeof listed === 'string'
            ? listed.split(/[,\s]+/)
            : []) {
        const clean = String(tag).trim().replace(/^#/, '');
        if (clean !== '')
            tags.add(clean);
    }
    for (const m of split.body.matchAll(/(^|[\s,;])#([\p{L}\p{N}_/-]*[\p{L}_/-][\p{L}\p{N}_/-]*)/gu)) {
        tags.add(m[2]);
    }
    const links = new Set();
    const folder = path.includes('/') ? path.slice(0, path.lastIndexOf('/')).split('/') : [];
    for (const m of body.matchAll(/\]\(([^)\s]+)\)/g)) {
        const dest = m[1].split(/[?#]/)[0];
        if (dest === '' || /^([a-z][a-z0-9+.-]*:|\/)/i.test(dest))
            continue;
        const parts = [...folder];
        let decoded = dest;
        try {
            decoded = decodeURI(dest);
        }
        catch {
            // A malformed escape keeps the raw destination.
        }
        for (const seg of decoded.split('/')) {
            if (seg === '..')
                parts.pop();
            else if (seg !== '.' && seg !== '')
                parts.push(seg);
        }
        links.add(parts.join('/'));
    }
    return { path, frontmatter, tags: [...tags], links: [...links] };
}
/** Folder by folder, names by code unit, like the index (`a/y.md` before `a.md`). */
function fakeByFolder(a, b) {
    const x = a.split('/');
    const y = b.split('/');
    for (let i = 0; i < Math.min(x.length, y.length); i++) {
        if (x[i] !== y[i])
            return x[i] < y[i] ? -1 : 1;
    }
    return x.length - y.length;
}
/** A query the fake accepts: a plain object of the known keys and value types, or null. */
function fakeQueryCheck(query) {
    if (typeof query !== 'object' || query === null || Array.isArray(query))
        return null;
    const q = query;
    const known = ['frontmatter', 'tag', 'linksTo', 'linkedFrom', 'limit'];
    if (Object.keys(q).some((k) => !known.includes(k)))
        return null;
    const fm = q.frontmatter;
    if (fm !== undefined) {
        if (typeof fm !== 'object' || fm === null || Array.isArray(fm))
            return null;
        const pairs = Object.entries(fm);
        if (pairs.length > MAX_QUERY_KEYS)
            return null;
        for (const [k, v] of pairs) {
            if (k.length > MAX_QUERY_TEXT || k === '__proto__')
                return null;
            if (typeof v === 'string'
                ? v.length > MAX_QUERY_TEXT
                : typeof v === 'number'
                    ? !Number.isFinite(v)
                    : typeof v !== 'boolean') {
                return null;
            }
        }
    }
    for (const key of ['tag', 'linksTo', 'linkedFrom']) {
        const v = q[key];
        if (v !== undefined && (typeof v !== 'string' || v === '' || v.length > MAX_QUERY_TEXT))
            return null;
    }
    const limit = q.limit;
    if (limit !== undefined && (typeof limit !== 'number' || !Number.isInteger(limit) || limit < 1)) {
        return null;
    }
    return query;
}
/** The fake's `vault.query` over its entries: the same rules as the real index. */
function fakeQuery(entries, query) {
    const limit = Math.max(0, Math.min(query.limit ?? 200, MAX_QUERY_RESULTS));
    const from = query.linkedFrom === undefined
        ? null
        : (entries.find((e) => e.path === query.linkedFrom)?.links ?? []);
    const results = [];
    let truncated = false;
    for (const entry of [...entries].sort((a, b) => fakeByFolder(a.path, b.path))) {
        const fm = query.frontmatter ?? {};
        const ok = Object.entries(fm).every(([key, want]) => {
            if (!Object.hasOwn(entry.frontmatter, key))
                return false;
            const have = entry.frontmatter[key];
            return Array.isArray(have) ? have.some((v) => v === want) : have === want;
        }) &&
            (query.tag === undefined ||
                entry.tags.some((t) => t.toLowerCase() === query.tag?.replace(/^#/, '').toLowerCase())) &&
            (query.linksTo === undefined || entry.links.includes(query.linksTo)) &&
            (from === null || from.includes(entry.path));
        if (!ok)
            continue;
        if (results.length >= limit) {
            truncated = true;
            break;
        }
        results.push(entry);
    }
    return { results, truncated };
}
const FAKE_IMAGE = /\.(png|jpe?g|gif|webp|svg)$/i;
function applyChanges(text, changes) {
    let out = text;
    for (const change of [...changes].reverse()) {
        out = out.slice(0, change.from) + change.text + out.slice(change.to);
    }
    return out;
}
/**
 * A fake host for unit-testing a plugin without the app: it loads the plugin's entry against in-memory text, files, settings, and a stubbed provider, and records what the plugin did.
 *
 * @example
 * ```ts
 * const fake = createFakeHost(manifest, {
 *   onload: (api) => {
 *     api.commands.handle('my-plugin:hi', () => 'hi')
 *   }
 * })
 * await fake.load()
 * expect(await fake.run('my-plugin:hi')).toBe('hi')
 * ```
 */
export function createFakeHost(manifest, entry, options = {}) {
    const declared = new Set((manifest.contributes.commands ?? []).map((c) => c.id));
    const declaredModes = new Set((manifest.contributes.editingModes ?? []).map((m) => m.id));
    const modes = new Map();
    const declaredRenderers = new Set((manifest.contributes.blockRenderers ?? []).map((r) => r.id));
    const blockRenderers = new Map();
    const marks = new Map();
    const markHandlers = new Map();
    const handlers = new Map();
    const listeners = new Map();
    const live = new Set();
    let hostFactory = null;
    let text = options.text ?? null;
    const edits = [];
    const files = new Map(Object.entries(options.files ?? {}));
    let openPath = options.openPath;
    const source = `plugin:${manifest.id}`;
    let remoteAllowed = options.remoteAllowed ?? false;
    const images = [];
    let imageFailure = options.imageFailure ?? null;
    let imageGate = null;
    const resourceListeners = new Set();
    const declaredSettings = new Map((manifest.contributes.settings ?? []).map((d) => [d.id, d]));
    const settingValues = new Map(Object.entries(options.settings ?? {}));
    const settingListeners = new Set();
    const declaredSurfaces = new Set((manifest.contributes.surfaces ?? []).map((d) => d.id));
    const views = new Map();
    const openHandlers = new Map();
    const actionHandlers = new Map();
    const refreshHandlers = new Map();
    const declaredTools = new Set((manifest.contributes.tools ?? []).map((t) => t.id));
    const needsModel = (manifest.contributes.tools ?? []).some((t) => t.needsProvider === true);
    const modelRequests = [];
    let modelCalls = 0;
    const netRequests = [];
    const secrets = new Map();
    const projectData = new Map();
    const notices = [];
    let noticeTimes = [];
    const exported = [];
    const history = {
        repository: false,
        commits: [],
        branches: new Map([['main', null]]),
        current: 'main',
        tags: new Map(),
        remotes: new Map(),
        syncs: []
    };
    let netCalls = 0;
    const toolHandlers = new Map();
    const declaredProviders = new Set((manifest.contributes.paletteProviders ?? []).map((d) => d.id));
    const paletteItems = new Map();
    const runHandlers = new Map();
    const paletteRefreshHandlers = new Map();
    let project = options.project ?? null;
    const opens = [];
    const folders = new Set();
    const created = [];
    const renames = [];
    const trashed = [];
    const participants = new Set();
    const rowActionHandlers = new Map();
    const begunRowActions = [];
    const searches = [];
    let searchGate = null;
    let latestSearch = 0;
    const selections = [];
    const inputHandlers = new Map();
    const reorderHandlers = new Map();
    const formChangeHandlers = new Map();
    const diffActionHandlers = new Map();
    const formSubmitHandlers = new Map();
    const shown = [];
    const shownFocus = [];
    const closed = [];
    const changedListeners = new Set();
    const selectionListeners = new Set();
    let selection = { from: 0, to: 0, origin: 'plugin' };
    const currentSelection = () => {
        if (text === null)
            return null;
        const clamp = (n) => Math.min(Math.max(0, n), text?.length ?? 0);
        return { from: clamp(selection.from), to: clamp(selection.to), origin: selection.origin };
    };
    const fireChanged = () => {
        for (const listener of [...changedListeners])
            listener();
    };
    const under = (path, target) => path === target || path.startsWith(`${target}/`);
    /** Every file path, the open document included. */
    const allPaths = () => {
        const out = new Set(files.keys());
        if (openPath !== undefined)
            out.add(openPath);
        return [...out];
    };
    /** What is at `path`: a file, a folder (made empty, or holding a file), or nothing. */
    const kindAt = (path) => {
        if (allPaths().includes(path))
            return 'file';
        if (folders.has(path) || allPaths().some((p) => p.startsWith(`${path}/`)))
            return 'folder';
        return null;
    };
    /** Main's checks for a new path: a project, inside it, a name not starting with a dot. */
    const checkNew = (path) => {
        const base = path.split('/').pop() ?? '';
        if (project?.kind !== 'project' ||
            path.startsWith('/') ||
            path.split('/').includes('..') ||
            base === '' ||
            base.startsWith('.')) {
            throw veneerError(VAULT_ERROR.outOfScope, 'that name is not allowed', manifest.id);
        }
        if (kindAt(path) !== null) {
            throw veneerError(VAULT_ERROR.exists, 'that name is already taken', manifest.id);
        }
    };
    const undeclared = (id) => veneerError(PLUGIN_ERROR.undeclaredContribution, `${id} is not declared in the manifest`, manifest.id);
    const checkProvider = (id) => {
        if (!declaredProviders.has(id))
            throw undeclared(id);
    };
    /** Adds `handler` to `id`'s set in `map`, tracked for unload. */
    const addHandler = (map, id, handler) => {
        const set = map.get(id) ?? new Set();
        map.set(id, set);
        set.add(handler);
        return track(() => set.delete(handler));
    };
    /** History needs a project, as the real one does: a loose file rejects (no project set is fine). */
    const historyRoot = () => {
        if (project?.kind === 'loose') {
            throw veneerError(HISTORY_ERROR.noProject, 'History needs a project folder.', manifest.id);
        }
    };
    /** Project data needs a project, as the real one does: a loose file rejects. */
    const projectDataProject = () => {
        if (project?.kind === 'loose') {
            throw veneerError(PROJECT_DATA_ERROR.noProject, 'Project data needs a project folder; a single file has none.', manifest.id);
        }
    };
    const historyRepo = () => {
        historyRoot();
        if (!history.repository) {
            throw veneerError(HISTORY_ERROR.notRepository, 'This project has no history yet.', manifest.id);
        }
    };
    const plainCommit = (c) => ({
        id: c.id,
        message: c.message,
        body: c.body,
        author: { ...c.author },
        date: c.date,
        parents: [...c.parents]
    });
    const commitById = (id) => id === null ? undefined : history.commits.find((c) => c.id === id);
    const headCommit = () => commitById(history.branches.get(history.current) ?? null);
    /** The closed files plus the open document's current text, as a save would commit them. */
    const currentFiles = () => {
        const snapshot = Object.fromEntries(files);
        if (openPath !== undefined && text !== null)
            snapshot[openPath] = text;
        return snapshot;
    };
    /** The project's files become `next` (a switch or merge); the open document follows. */
    const loadFiles = (next) => {
        files.clear();
        for (const [path, content] of Object.entries(next))
            if (path !== openPath)
                files.set(path, content);
        if (openPath !== undefined)
            text = next[openPath] ?? null;
        fireChanged();
    };
    const ancestors = (id) => {
        const seen = new Set();
        const queue = [id];
        while (queue.length > 0) {
            const c = commitById(queue.pop() ?? null);
            if (c === undefined || seen.has(c.id))
                continue;
            seen.add(c.id);
            queue.push(...c.parents);
        }
        return seen;
    };
    const requireFakeBranch = (name) => {
        if (!history.branches.has(name)) {
            throw veneerError(HISTORY_ERROR.notFound, 'There is no branch with that name.', manifest.id);
        }
    };
    const requireFakeClean = (doing) => {
        if (!sameFiles(headCommit()?.files ?? {}, currentFiles())) {
            throw veneerError(HISTORY_ERROR.uncommitted, `Save a point before ${doing}.`, manifest.id);
        }
    };
    const addCommit = (message, parents, snapshot, branch) => {
        const cut = message.indexOf('\n');
        const commit = {
            id: (history.commits.length + 1).toString(16).padStart(40, '0'),
            message: cut === -1 ? message : message.slice(0, cut).trim(),
            body: cut === -1 ? '' : message.slice(cut + 1).trim(),
            author: { name: 'Fake Writer', email: 'writer@example.com' },
            date: new Date().toISOString(),
            parents,
            files: snapshot
        };
        history.commits.push(commit);
        history.branches.set(branch, commit.id);
        const plain = plainCommit(commit);
        void emitEvent({ type: 'history:saved', commit: plain });
        return plain;
    };
    const sameFiles = (a, b) => {
        const keys = Object.keys(a);
        return keys.length === Object.keys(b).length && keys.every((k) => a[k] === b[k]);
    };
    const emitEvent = async (event) => {
        for (const listener of [...(listeners.get(event.type) ?? [])])
            await listener(event);
    };
    const checkSurface = (id) => {
        if (!declaredSurfaces.has(id)) {
            throw veneerError(PLUGIN_ERROR.undeclaredContribution, `${id} is not declared in the manifest`, manifest.id);
        }
    };
    const settingOf = (id) => {
        const declaration = declaredSettings.get(id);
        if (declaration === undefined) {
            throw veneerError(PLUGIN_ERROR.undeclaredContribution, `${id} is not declared in the manifest`, manifest.id);
        }
        return settingValues.get(id) ?? declaration.default;
    };
    const tagged = (err) => isVeneerError(err) ? { ...err, pluginId: manifest.id } : err;
    /** One edit to the open document, as `applyResult` would apply it. */
    const applyEdit = (changes) => {
        if (text === null) {
            throw veneerError(EDITOR_ERROR.unavailable, 'No document is open', manifest.id);
        }
        try {
            checkTextChanges(changes, text.length);
        }
        catch (err) {
            throw tagged(err);
        }
        if (changes.length === 0)
            return;
        text = applyChanges(text, changes);
        edits.push({ source, changes: changes.map((c) => ({ ...c })) });
        fireChanged();
    };
    const track = (undo) => {
        const disposable = {
            dispose: () => {
                if (!live.delete(disposable))
                    return;
                undo();
            }
        };
        live.add(disposable);
        return disposable;
    };
    const api = {
        pluginId: manifest.id,
        apiVersion: API_VERSION,
        commands: {
            handle(id, handler) {
                if (!declared.has(id)) {
                    throw veneerError(PLUGIN_ERROR.undeclaredContribution, `${id} is not declared in the manifest`, manifest.id);
                }
                if (handlers.has(id)) {
                    throw veneerError(PLUGIN_ERROR.duplicateHandler, `${id} already has a handler`, manifest.id);
                }
                handlers.set(id, handler);
                return track(() => handlers.delete(id));
            }
        },
        tools: {
            handle(id, handler) {
                if (!declaredTools.has(id)) {
                    throw veneerError(PLUGIN_ERROR.undeclaredContribution, `${id} is not declared in the manifest`, manifest.id);
                }
                if (toolHandlers.has(id)) {
                    throw veneerError(PLUGIN_ERROR.duplicateHandler, `${id} already has a handler`, manifest.id);
                }
                toolHandlers.set(id, handler);
                return track(() => toolHandlers.delete(id));
            }
        },
        events: {
            on(name, listener) {
                const set = listeners.get(name) ?? new Set();
                listeners.set(name, set);
                set.add(listener);
                return track(() => set.delete(listener));
            }
        },
        editor: {
            registerHost(factory) {
                if (manifest.contributes.editorHost !== true) {
                    throw veneerError(PLUGIN_ERROR.undeclaredContribution, 'contributes.editorHost is not declared in the manifest', manifest.id);
                }
                if (hostFactory !== null) {
                    throw veneerError(EDITOR_ERROR.hostTaken, 'an editor host is already registered', manifest.id);
                }
                hostFactory = factory;
                return track(() => {
                    if (hostFactory === factory)
                        hostFactory = null;
                });
            },
            registerMode(id, extension) {
                if (!declaredModes.has(id)) {
                    throw veneerError(PLUGIN_ERROR.undeclaredContribution, `${id} is not declared in the manifest`, manifest.id);
                }
                if (modes.has(id)) {
                    throw veneerError(PLUGIN_ERROR.duplicateHandler, `${id} is already registered`, manifest.id);
                }
                modes.set(id, extension);
                return track(() => {
                    if (modes.get(id) === extension)
                        modes.delete(id);
                });
            },
            registerBlockRenderer(id, render) {
                if (!declaredRenderers.has(id)) {
                    throw veneerError(PLUGIN_ERROR.undeclaredContribution, `${id} is not declared in the manifest`, manifest.id);
                }
                if (blockRenderers.has(id)) {
                    throw veneerError(PLUGIN_ERROR.duplicateHandler, `${id} is already registered`, manifest.id);
                }
                blockRenderers.set(id, render);
                return track(() => {
                    if (blockRenderers.get(id) === render)
                        blockRenderers.delete(id);
                });
            },
            getText: () => text,
            getSelection: currentSelection,
            edit(changes) {
                applyEdit(Array.isArray(changes) ? changes : [changes]);
            },
            onChanged(listener) {
                changedListeners.add(listener);
                return track(() => changedListeners.delete(listener));
            },
            onSelectionChanged(listener) {
                selectionListeners.add(listener);
                return track(() => selectionListeners.delete(listener));
            },
            setMarks(setId, next) {
                let others = 0;
                for (const [id, set] of marks)
                    if (id !== setId)
                        others += set.length;
                const checked = checkMarks(next, others);
                if (!checked.ok)
                    throw veneerError(PLUGIN_ERROR.badMarks, checked.message, manifest.id);
                if (checked.marks.length === 0)
                    marks.delete(setId);
                else
                    marks.set(setId, checked.marks);
            },
            onMarkClick(setId, handler) {
                return addHandler(markHandlers, setId, handler);
            }
        },
        vault: {
            async saveNow() {
                // The open document's text becomes what `read` returns, as a real save would.
                if (openPath !== undefined && text !== null)
                    files.set(openPath, text);
            },
            async readFile(path) {
                const bytes = options.binaryFiles?.[path];
                if (!/\.(png|jpe?g|gif|webp|svg)$/i.test(path) || bytes === undefined) {
                    throw veneerError(VAULT_ERROR.outOfScope, 'Only image files in the project can be read', manifest.id);
                }
                return bytes;
            },
            async read(path) {
                const saved = files.get(path);
                if (saved === undefined) {
                    throw veneerError(VAULT_ERROR.readFailed, 'the file is missing or cannot be read', manifest.id);
                }
                return saved;
            },
            async process(path, fn) {
                // Like the kernel: a non-string is a bad change, and endings become `\n`.
                const run = (before) => {
                    const next = fn(before);
                    if (typeof next !== 'string') {
                        throw veneerError(EDITOR_ERROR.badChange, 'process must return the new text', manifest.id);
                    }
                    return next.replace(/\r\n?/g, '\n');
                };
                if (openPath !== undefined && path === openPath && text !== null) {
                    const before = text;
                    const next = run(before);
                    if (next !== before) {
                        const span = changedSpan(before, next);
                        applyEdit([span]);
                    }
                    return next;
                }
                const before = files.get(path);
                if (before === undefined) {
                    throw veneerError(VAULT_ERROR.readFailed, 'the file does not exist', manifest.id);
                }
                const next = run(before);
                if (next !== before)
                    files.set(path, next);
                return next;
            },
            async saveImage(bytes, name) {
                // Predictable links: `image-<n>.png` for a paste, the dropped name otherwise.
                if (imageGate !== null)
                    await imageGate;
                if (imageFailure !== null) {
                    images.push({ bytes, name, link: null });
                    throw veneerError(imageFailure, 'the image could not be saved', manifest.id);
                }
                const file = name ?? `image-${images.length + 1}.png`;
                const stem = file.replace(/\.[^.]*$/, '');
                const link = file
                    .split('/')
                    .map((part) => encodeURIComponent(part).replace(/\(/g, '%28').replace(/\)/g, '%29'))
                    .join('/');
                images.push({ bytes, name, link });
                return { link, alt: stem.replace(/[\\[\]]/g, '\\$&') };
            },
            async create(path, initial = '') {
                checkNew(path);
                if (!FAKE_MARKDOWN.test(path)) {
                    throw veneerError(VAULT_ERROR.outOfScope, 'only markdown can be created', manifest.id);
                }
                files.set(path, initial);
                created.push(path);
                await emitEvent({ type: 'vault:created', path, kind: 'file' });
            },
            async createFolder(path) {
                checkNew(path);
                folders.add(path);
                created.push(path);
                await emitEvent({ type: 'vault:created', path, kind: 'folder' });
            },
            async rename(from, to) {
                const kind = kindAt(from);
                if (kind === null) {
                    throw veneerError(VAULT_ERROR.readFailed, 'the file does not exist', manifest.id);
                }
                if (from === to)
                    return;
                if (kind === 'folder' && to.startsWith(`${from}/`)) {
                    throw veneerError(VAULT_ERROR.outOfScope, 'a folder can’t move into itself', manifest.id);
                }
                checkNew(to);
                const move = (path) => under(path, from) ? to + path.slice(from.length) : path;
                for (const [path, content] of [...files]) {
                    if (!under(path, from))
                        continue;
                    files.delete(path);
                    files.set(move(path), content);
                }
                for (const folder of [...folders]) {
                    if (!under(folder, from))
                        continue;
                    folders.delete(folder);
                    folders.add(move(folder));
                }
                if (openPath !== undefined)
                    openPath = move(openPath);
                const rename = { from, to, kind };
                renames.push(rename);
                for (const participant of [...participants])
                    await participant({ ...rename });
                await emitEvent({ type: 'vault:renamed', ...rename });
            },
            async trash(path) {
                const kind = kindAt(path);
                if (kind === null) {
                    throw veneerError(VAULT_ERROR.readFailed, 'the file does not exist', manifest.id);
                }
                for (const key of [...files.keys()])
                    if (under(key, path))
                        files.delete(key);
                for (const folder of [...folders])
                    if (under(folder, path))
                        folders.delete(folder);
                if (openPath !== undefined && under(openPath, path)) {
                    openPath = undefined;
                    text = null;
                }
                trashed.push(path);
                await emitEvent({ type: 'vault:trashed', path, kind });
            },
            onRename(participant) {
                participants.add(participant);
                return track(() => participants.delete(participant));
            },
            async list() {
                if (project === null)
                    return [];
                const paths = new Set(files.keys());
                if (openPath !== undefined)
                    paths.add(openPath);
                for (const folder of folders)
                    paths.add(`${folder}/`);
                const out = [];
                if (project.kind === 'loose') {
                    if (openPath !== undefined) {
                        out.push({ path: openPath, name: openPath.split('/').pop() ?? openPath, kind: 'file' });
                    }
                    return out;
                }
                const listed = new Set();
                for (const path of [...paths].sort()) {
                    const parts = path.split('/');
                    for (let i = 1; i < parts.length; i++) {
                        const folder = parts.slice(0, i).join('/');
                        if (listed.has(folder))
                            continue;
                        listed.add(folder);
                        out.push({ path: folder, name: parts[i - 1], kind: 'folder' });
                    }
                    const name = parts[parts.length - 1];
                    if (FAKE_MARKDOWN.test(path))
                        out.push({ path, name, kind: 'file' });
                    else if (FAKE_IMAGE.test(path))
                        out.push({ path, name, kind: 'image' });
                }
                return out;
            },
            async search(query) {
                if (typeof query !== 'string' || query.length > MAX_SEARCH_QUERY) {
                    throw veneerError(VAULT_ERROR.outOfScope, 'the query is too long', manifest.id);
                }
                if (query === '')
                    return [];
                searches.push(query);
                const mine = ++latestSearch;
                if (searchGate !== null)
                    await searchGate;
                if (mine !== latestSearch) {
                    throw veneerError(VAULT_ERROR.superseded, 'a newer search started', manifest.id);
                }
                if (project === null)
                    return [];
                const docs = new Map();
                if (project.kind === 'project') {
                    for (const [path, content] of files)
                        if (FAKE_MARKDOWN.test(path))
                            docs.set(path, content);
                }
                if (openPath !== undefined && text !== null)
                    docs.set(openPath, text);
                const out = [];
                let left = MAX_SEARCH_MATCHES;
                // Folder by folder, names by code unit, like the worker (`a/y.md` before `a.md`).
                const byFolder = (a, b) => {
                    const x = a.split('/');
                    const y = b.split('/');
                    for (let i = 0; i < Math.min(x.length, y.length); i++) {
                        if (x[i] !== y[i])
                            return x[i] < y[i] ? -1 : 1;
                    }
                    return x.length - y.length;
                };
                for (const path of [...docs.keys()].sort(byFolder)) {
                    if (left <= 0)
                        break;
                    const matches = findInText((docs.get(path) ?? '').replace(/\r\n?/g, '\n'), query, left);
                    if (matches.length === 0)
                        continue;
                    left -= matches.length;
                    out.push({ path, matches });
                }
                return out;
            },
            async query(query) {
                const clean = fakeQueryCheck(query);
                if (clean === null) {
                    throw veneerError(VAULT_ERROR.outOfScope, 'That query is not valid', manifest.id);
                }
                const docs = new Map();
                if (project?.kind === 'project') {
                    for (const [path, content] of files)
                        if (FAKE_MARKDOWN.test(path))
                            docs.set(path, content);
                }
                // The index holds what was saved, not unsaved typing.
                if (openPath !== undefined &&
                    text !== null &&
                    (project?.kind === 'loose' || !docs.has(openPath))) {
                    docs.set(openPath, files.get(openPath) ?? text);
                }
                return fakeQuery([...docs].map(([path, content]) => fakeIndexEntry(path, content)), clean);
            },
            async backlinks(path) {
                if (typeof path !== 'string' || path === '' || path.length > MAX_QUERY_TEXT) {
                    throw veneerError(VAULT_ERROR.outOfScope, 'That path is not valid', manifest.id);
                }
                if (project?.kind !== 'project')
                    return [];
                const prefix = `${path}/`;
                return [...files]
                    .filter(([p]) => FAKE_MARKDOWN.test(p))
                    .map(([p, content]) => fakeIndexEntry(p, content))
                    .filter((e) => e.links.some((l) => l === path || l.startsWith(prefix)))
                    .map((e) => e.path)
                    .sort(fakeByFolder);
            }
        },
        workspace: {
            projectType: () => (options.projectType === undefined ? null : options.projectType),
            current: () => ({
                project: project === null ? null : { ...project },
                document: openPath ?? null
            }),
            async open(path, options) {
                const escapes = path.split('/').includes('..') || (path.startsWith('/') && project?.kind !== 'loose');
                if (project === null || escapes || !/\.(md|markdown)$/i.test(path)) {
                    throw veneerError(VAULT_ERROR.outOfScope, 'That file is outside the project', manifest.id);
                }
                if (project.kind === 'loose' && path !== openPath) {
                    throw veneerError(VAULT_ERROR.outOfScope, 'That file is outside the vault', manifest.id);
                }
                const next = path === openPath ? text : files.get(path);
                if (next === undefined) {
                    throw veneerError(VAULT_ERROR.readFailed, 'the file does not exist', manifest.id);
                }
                const select = options?.select;
                if (select !== undefined)
                    selections.push({ path, from: select.from, to: select.to });
                const moveSelection = () => {
                    if (select === undefined)
                        return;
                    selection = { from: select.from, to: select.to, origin: 'find' };
                    const now = currentSelection();
                    if (now !== null)
                        for (const listener of [...selectionListeners])
                            listener(now);
                };
                // The open document only moves its selection; it isn't reopened.
                if (path === openPath && select !== undefined)
                    return moveSelection();
                if (openPath !== undefined && openPath !== path && text !== null)
                    files.set(openPath, text);
                files.delete(path);
                openPath = path;
                marks.clear();
                text = next;
                opens.push(path);
                selection = { from: 0, to: 0, origin: 'plugin' };
                fireChanged();
                await emitEvent({ type: 'document:opened', path });
                moveSelection();
            },
            async openFolderAsProject() {
                if (openPath === undefined) {
                    throw veneerError(VAULT_ERROR.unknownDocument, 'No document is open', manifest.id);
                }
                if (project?.kind !== 'loose') {
                    throw veneerError(VAULT_ERROR.outOfScope, 'The document is already in a project', manifest.id);
                }
                const parts = openPath.split('/');
                const name = parts[parts.length - 1];
                project = { name: parts[parts.length - 2] || 'Root', kind: 'project' };
                openPath = name;
                const event = { type: 'project:switched', ...project };
                await emitEvent(event);
            }
        },
        palette: {
            setItems(id, items) {
                checkProvider(id);
                const clean = cleanPaletteItems(items);
                if (clean === null) {
                    throw veneerError(PLUGIN_ERROR.badItems, `${id} got malformed items`, manifest.id);
                }
                paletteItems.set(id, clean);
            },
            onRun(id, handler) {
                checkProvider(id);
                return addHandler(runHandlers, id, handler);
            },
            onRefresh(id, handler) {
                checkProvider(id);
                return addHandler(paletteRefreshHandlers, id, handler);
            }
        },
        providers: {
            async complete(request, signal) {
                let out = '';
                await this.stream(request, (piece) => (out += piece), signal);
                return out;
            },
            async stream(request, onText, signal) {
                if (!needsModel) {
                    throw veneerError(PLUGIN_ERROR.undeclaredContribution, 'api.providers needs a tool that declares needsProvider', manifest.id);
                }
                if (signal?.aborted === true) {
                    throw veneerError('canceled', 'The request was canceled.', manifest.id);
                }
                const failure = options.providerFailure ?? null;
                if (failure !== null)
                    throw veneerError(failure.code, failure.message, manifest.id);
                const replies = options.replies ?? [];
                if (replies.length === 0) {
                    throw veneerError('provider/none', 'No model provider is set up yet.', manifest.id);
                }
                modelRequests.push(request);
                const reply = replies[Math.min(modelCalls, replies.length - 1)];
                modelCalls += 1;
                for (const piece of typeof reply === 'string' ? [reply] : reply)
                    onText(piece);
            }
        },
        net: {
            async fetch(request, signal) {
                if (signal?.aborted === true) {
                    throw veneerError('canceled', 'The request was canceled.', manifest.id);
                }
                const replies = options.netReplies ?? [];
                if (replies.length === 0) {
                    throw veneerError('offline', 'The site could not be reached.', manifest.id);
                }
                netRequests.push(request);
                const reply = replies[Math.min(netCalls, replies.length - 1)];
                netCalls += 1;
                const part = typeof reply === 'string' ? { text: reply } : reply;
                const status = part.status ?? 200;
                return {
                    status,
                    ok: status >= 200 && status < 300,
                    headers: part.headers ?? {},
                    text: part.text ?? '',
                    ...(part.data === undefined ? {} : { data: part.data }),
                    truncated: part.truncated ?? false
                };
            }
        },
        secrets: {
            async get(name) {
                return secrets.get(secretName(name)) ?? null;
            },
            async set(name, value) {
                if (typeof value !== 'string' || value.length > 8192) {
                    throw veneerError(STORAGE_ERROR.badSecret, 'That secret is not valid.', manifest.id);
                }
                secrets.set(secretName(name), value);
            },
            async delete(name) {
                secrets.delete(secretName(name));
            }
        },
        notify(notice) {
            const message = typeof notice?.message === 'string' ? notice.message.trim() : '';
            const bad = (why) => veneerError(PLUGIN_ERROR.badNotice, `A notice ${why}.`, manifest.id);
            if (message === '' || message.length > MAX_NOTICE_MESSAGE || /[\r\n]/.test(message)) {
                throw bad('needs one plain sentence on one line');
            }
            const action = notice.action;
            if (action !== undefined) {
                if (typeof action.label !== 'string' ||
                    action.label.trim() === '' ||
                    action.label.trim().length > MAX_NOTICE_ACTION_LABEL) {
                    throw bad('needs a short action label');
                }
                if (!declaredSurfaces.has(action.surface)) {
                    throw veneerError(PLUGIN_ERROR.undeclaredContribution, `${String(action.surface)} is not declared in the manifest`, manifest.id);
                }
            }
            const now = Date.now();
            noticeTimes = noticeTimes.filter((t) => now - t < 60_000);
            if (noticeTimes.length >= NOTICE_LIMIT_PER_MINUTE)
                return;
            noticeTimes.push(now);
            notices.push(action === undefined
                ? { message }
                : { message, action: { label: action.label.trim(), surface: action.surface } });
        },
        projectData: {
            async read(key) {
                projectDataKey(key);
                projectDataProject();
                const text = projectData.get(key);
                return text === undefined ? null : JSON.parse(text);
            },
            async write(key, value) {
                projectDataKey(key);
                projectDataProject();
                const json = JSON.stringify(value);
                if (json === undefined) {
                    throw veneerError(PROJECT_DATA_ERROR.tooLarge, 'That value cannot be saved as JSON.');
                }
                const text = `${JSON.stringify(value, null, 2)}\n`;
                let total = text.length;
                for (const [other, held] of projectData)
                    if (other !== key)
                        total += held.length;
                if (text.length > MAX_PROJECT_DATA_KEY_BYTES || total > MAX_PROJECT_DATA_PLUGIN_BYTES) {
                    throw veneerError(PROJECT_DATA_ERROR.tooLarge, 'That is too much data to keep.');
                }
                projectData.set(key, text);
            },
            async delete(key) {
                projectDataKey(key);
                projectDataProject();
                projectData.delete(key);
            },
            async keys() {
                projectDataProject();
                return [...projectData.keys()].sort();
            }
        },
        history: {
            async isRepository() {
                historyRoot();
                return history.repository;
            },
            async init() {
                historyRoot();
                if (history.repository)
                    return false;
                history.repository = true;
                return true;
            },
            async save(message) {
                historyRepo();
                const summary = typeof message === 'string' ? message.trim() : '';
                if (summary === '') {
                    throw veneerError(HISTORY_ERROR.invalid, 'A save point needs a message.', manifest.id);
                }
                const head = headCommit();
                const snapshot = currentFiles();
                if (head !== undefined && sameFiles(head.files, snapshot))
                    return null;
                return addCommit(summary, head === undefined ? [] : [head.id], snapshot, history.current);
            },
            async log(logOptions = {}) {
                historyRepo();
                let tip = headCommit();
                if (logOptions.branch !== undefined) {
                    if (!history.branches.has(logOptions.branch)) {
                        throw veneerError(HISTORY_ERROR.notFound, 'There is no branch with that name.', manifest.id);
                    }
                    tip = commitById(history.branches.get(logOptions.branch) ?? null);
                }
                const limit = Math.min(Math.max(1, Math.floor(logOptions.limit ?? 100)), MAX_HISTORY_LOG);
                const out = [];
                for (let c = tip; c !== undefined && out.length < limit; c = commitById(c.parents[0] ?? null)) {
                    const path = logOptions.path;
                    const parent = commitById(c.parents[0] ?? null);
                    if (path !== undefined && c.files[path] === parent?.files[path])
                        continue;
                    out.push(plainCommit(c));
                }
                return out;
            },
            async show(commit, path) {
                historyRepo();
                const found = commit.length >= 4
                    ? history.commits.filter((c) => c.id.startsWith(commit.toLowerCase()))
                    : [];
                const text = found.length === 1 ? found[0].files[path] : undefined;
                if (text === undefined) {
                    throw veneerError(HISTORY_ERROR.notFound, "That save point or file isn't there.", manifest.id);
                }
                return text;
            },
            async branches() {
                historyRepo();
                return [...history.branches.keys()].sort().map((name) => ({
                    name,
                    current: name === history.current,
                    commit: history.branches.get(name) ?? null
                }));
            },
            async createBranch(name) {
                historyRepo();
                const head = headCommit();
                if (head === undefined) {
                    throw veneerError(HISTORY_ERROR.invalid, 'Make a first save point before a branch.', manifest.id);
                }
                if (history.branches.has(name)) {
                    throw veneerError(HISTORY_ERROR.exists, 'A branch with that name already exists.', manifest.id);
                }
                history.branches.set(name, head.id);
            },
            async switchTo(name) {
                historyRepo();
                requireFakeBranch(name);
                if (name === history.current)
                    return;
                requireFakeClean('switching');
                history.current = name;
                loadFiles(headCommit()?.files ?? {});
                await emitEvent({ type: 'history:switched', branch: name });
            },
            async merge(name) {
                historyRepo();
                requireFakeBranch(name);
                const ours = headCommit();
                const theirs = commitById(history.branches.get(name) ?? null);
                if (ours === undefined || theirs === undefined || name === history.current) {
                    throw veneerError(HISTORY_ERROR.invalid, 'There is nothing to merge.', manifest.id);
                }
                requireFakeClean('merging');
                if (ancestors(ours.id).has(theirs.id))
                    return null;
                if (ancestors(theirs.id).has(ours.id)) {
                    history.branches.set(history.current, theirs.id);
                    loadFiles(theirs.files);
                    return plainCommit(theirs);
                }
                // Three-way, by whole file: a file changed on both sides since the base conflicts.
                const base = [...ancestors(ours.id)]
                    .map(commitById)
                    .find((c) => c !== undefined && ancestors(theirs.id).has(c.id));
                const merged = {};
                const conflicts = [];
                const paths = new Set([...Object.keys(ours.files), ...Object.keys(theirs.files)]);
                for (const path of paths) {
                    const b = base?.files[path];
                    const o = ours.files[path];
                    const t = theirs.files[path];
                    const pick = o === t || t === b ? o : o === b ? t : undefined;
                    if (pick === undefined && o !== t)
                        conflicts.push(path);
                    else if (pick !== undefined)
                        merged[path] = pick;
                }
                if (conflicts.length > 0) {
                    throw veneerError(HISTORY_ERROR.conflict, `Merging ${name} conflicts in ${conflicts.join(', ')}; nothing changed.`, manifest.id);
                }
                const commit = addCommit(`Merge ${name} into ${history.current}`, [ours.id, theirs.id], merged, history.current);
                loadFiles(merged);
                return commit;
            },
            async tags() {
                historyRepo();
                return [...history.tags.entries()]
                    .sort(([a], [b]) => (a < b ? -1 : 1))
                    .map(([name, t]) => ({ name, ...t }));
            },
            async createTag(name, commit, message) {
                historyRepo();
                if (history.tags.has(name)) {
                    throw veneerError(HISTORY_ERROR.exists, 'A tag with that name already exists.', manifest.id);
                }
                const target = commit === undefined ? headCommit() : history.commits.find((c) => c.id.startsWith(commit));
                if (target === undefined) {
                    throw veneerError(HISTORY_ERROR.notFound, 'There is no save point with that ID.', manifest.id);
                }
                history.tags.set(name, { commit: target.id, message: message?.trim() ?? '' });
            },
            async commitOn(branch, message, commitOptions) {
                historyRepo();
                requireFakeBranch(branch);
                if (commitOptions?.allowEmpty !== true ||
                    typeof message !== 'string' ||
                    message.trim() === '') {
                    throw veneerError(HISTORY_ERROR.invalid, 'A commit on another branch needs a message and allowEmpty: true.', manifest.id);
                }
                const tip = commitById(history.branches.get(branch) ?? null);
                return addCommit(message.trim(), tip === undefined ? [] : [tip.id], tip?.files ?? {}, branch);
            },
            async remotes() {
                historyRepo();
                return [...history.remotes.entries()]
                    .sort(([a], [b]) => (a < b ? -1 : 1))
                    .map(([name, url]) => ({ name, url }));
            },
            async setRemote(name, url) {
                historyRepo();
                if (/^ssh:\/\//i.test(url) || /^[\w.-]+@[\w.-]+:/.test(url)) {
                    throw veneerError(HISTORY_ERROR.sshUnsupported, 'Only HTTPS remotes work; this one uses SSH.', manifest.id);
                }
                history.remotes.set(name, url);
            },
            async sync(syncOptions = {}) {
                historyRepo();
                if (!history.remotes.has(syncOptions.remote ?? 'origin')) {
                    throw veneerError(HISTORY_ERROR.notFound, 'There is no remote with that name.', manifest.id);
                }
                requireFakeClean('syncing');
                history.syncs.push({ ...syncOptions });
                return (history.syncResult ?? {
                    fetched: false,
                    merged: 'none',
                    pushed: true,
                    upToDate: false,
                    commit: null
                });
            }
        },
        export: {
            async saveAs(file) {
                if (file.data.byteLength > MAX_NET_BYTES) {
                    throw veneerError(STORAGE_ERROR.tooLarge, 'That file is too large to save.', manifest.id);
                }
                exported.push(file);
                return { saved: true, name: file.suggestedName };
            }
        },
        resources: {
            // Text only: the fake never builds DOM from the HTML, so nothing in it can run.
            sanitizeHtml(html) {
                const fragment = document.createDocumentFragment();
                fragment.append(html);
                return fragment;
            },
            // Text only, like `sanitizeHtml`.
            sanitizeSvg(svg) {
                const fragment = document.createDocumentFragment();
                fragment.append(svg);
                return fragment;
            },
            imageSource(src) {
                const s = src.trim();
                if (/^data:image\//i.test(s))
                    return s;
                if (isRelativeSource(s))
                    return `veneer-doc://img?p=${encodeURIComponent(s)}&g=0`;
                if (!isRemoteSource(s) || !remoteAllowed)
                    return null;
                const url = s.startsWith('//') ? `https:${s}` : s;
                return `veneer-remote://img?u=${encodeURIComponent(url)}`;
            },
            onChanged(listener) {
                resourceListeners.add(listener);
                return track(() => resourceListeners.delete(listener));
            }
        },
        settings: {
            get: async (id) => settingOf(id),
            onChanged(listener) {
                settingListeners.add(listener);
                return track(() => settingListeners.delete(listener));
            }
        },
        surfaces: {
            setView(id, view) {
                checkSurface(id);
                const clean = cleanSurfaceView(view);
                if (clean === null) {
                    throw veneerError(PLUGIN_ERROR.badView, `${id} got a malformed view`, manifest.id);
                }
                views.set(id, clean);
            },
            onOpen(id, handler) {
                checkSurface(id);
                return addHandler(openHandlers, id, handler);
            },
            onAction(id, handler) {
                checkSurface(id);
                return addHandler(actionHandlers, id, handler);
            },
            onRefresh(id, handler) {
                checkSurface(id);
                return addHandler(refreshHandlers, id, handler);
            },
            onRowAction(id, handler) {
                checkSurface(id);
                return addHandler(rowActionHandlers, id, handler);
            },
            beginRowAction(id, actionId, rowId) {
                checkSurface(id);
                const surface = manifest.contributes.surfaces?.find((d) => d.id === id);
                if (!(surface?.rowActions ?? []).some((a) => a.id === actionId))
                    throw undeclared(actionId);
                begunRowActions.push({ surfaceId: id, actionId, rowId });
            },
            onInput(id, handler) {
                checkSurface(id);
                return addHandler(inputHandlers, id, handler);
            },
            onReorder(id, handler) {
                checkSurface(id);
                return addHandler(reorderHandlers, id, handler);
            },
            onFormChange(id, handler) {
                checkSurface(id);
                return addHandler(formChangeHandlers, id, handler);
            },
            onFormSubmit(id, handler) {
                checkSurface(id);
                return addHandler(formSubmitHandlers, id, handler);
            },
            onDiffAction(id, handler) {
                checkSurface(id);
                return addHandler(diffActionHandlers, id, handler);
            },
            show(id, options) {
                checkSurface(id);
                shown.push(id);
                shownFocus.push(options?.focus);
            },
            close(id) {
                checkSurface(id);
                closed.push(id);
            }
        }
    };
    return {
        api,
        history,
        modelRequests,
        netRequests,
        secrets,
        projectData,
        notices,
        projectDataChanged: (key) => emitEvent({ type: 'projectData:changed', key }),
        exported,
        async load() {
            await entry.onload(api);
        },
        async run(commandId, ...args) {
            const handler = handlers.get(commandId);
            if (handler === undefined) {
                throw veneerError(PLUGIN_ERROR.noHandler, `${commandId} has no handler`, manifest.id);
            }
            return await handler(...args);
        },
        emit: emitEvent,
        async switchProject(nextProject, next = {}) {
            files.clear();
            for (const [path, content] of Object.entries(next.files ?? {}))
                files.set(path, content);
            openPath = next.openPath;
            marks.clear();
            text = next.openPath === undefined ? null : (next.text ?? null);
            const event = {
                type: 'project:switched',
                name: nextProject.name,
                kind: nextProject.kind ?? 'project'
            };
            project = { name: event.name, kind: event.kind };
            fireChanged();
            await emitEvent(event);
        },
        async unload() {
            try {
                await entry.onunload?.();
            }
            finally {
                for (const d of [...live])
                    d.dispose();
            }
        },
        liveDisposables: () => live.size,
        text: () => text,
        setText(next) {
            text = next;
        },
        changeText(next) {
            text = next;
            fireChanged();
        },
        setSelection(next) {
            selection = { from: next.from, to: next.to, origin: next.origin ?? 'keyboard' };
            const now = currentSelection();
            if (now === null)
                return;
            for (const listener of [...selectionListeners])
                listener(now);
        },
        edits,
        modes,
        blockRenderers,
        marks,
        async markClick(setId, markId) {
            for (const handler of [...(markHandlers.get(setId) ?? [])])
                await handler(markId);
        },
        files,
        setRemoteAllowed(on) {
            remoteAllowed = on;
            for (const listener of [...resourceListeners])
                listener();
        },
        images,
        setImageFailure(code) {
            imageFailure = code;
        },
        holdImages() {
            let release = () => undefined;
            imageGate = new Promise((resolve) => {
                release = () => {
                    imageGate = null;
                    resolve();
                };
            });
            return release;
        },
        setSetting(id, value) {
            const before = settingOf(id);
            if (value === null)
                settingValues.delete(id);
            else
                settingValues.set(id, value);
            if (settingOf(id) === before)
                return;
            for (const listener of [...settingListeners])
                listener(id);
        },
        views,
        async openItem(surfaceId, itemId) {
            checkSurface(surfaceId);
            for (const handler of [...(openHandlers.get(surfaceId) ?? [])])
                await handler(itemId);
        },
        async pressAction(surfaceId, actionId) {
            checkSurface(surfaceId);
            for (const handler of [...(actionHandlers.get(surfaceId) ?? [])])
                await handler(actionId);
        },
        async refreshSurface(surfaceId) {
            checkSurface(surfaceId);
            for (const handler of [...(refreshHandlers.get(surfaceId) ?? [])])
                await handler();
        },
        opens,
        folders,
        created,
        renames,
        trashed,
        begunRowActions,
        searches,
        holdSearches() {
            let release = () => undefined;
            searchGate = new Promise((resolve) => {
                release = () => {
                    searchGate = null;
                    resolve();
                };
            });
            return release;
        },
        selections,
        async input(surfaceId, value) {
            checkSurface(surfaceId);
            for (const handler of [...(inputHandlers.get(surfaceId) ?? [])])
                await handler(value);
        },
        async reorder(surfaceId, event) {
            checkSurface(surfaceId);
            for (const handler of [...(reorderHandlers.get(surfaceId) ?? [])])
                await handler(event);
        },
        async formChange(surfaceId, fieldId, value) {
            checkSurface(surfaceId);
            for (const handler of [...(formChangeHandlers.get(surfaceId) ?? [])]) {
                await handler(fieldId, value);
            }
        },
        async formSubmit(surfaceId, values) {
            checkSurface(surfaceId);
            for (const handler of [...(formSubmitHandlers.get(surfaceId) ?? [])])
                await handler(values);
        },
        async diffAction(surfaceId, action, changeId) {
            checkSurface(surfaceId);
            for (const handler of [...(diffActionHandlers.get(surfaceId) ?? [])]) {
                await handler(action, changeId);
            }
        },
        shown,
        shownFocus,
        closed,
        async rowAction(surfaceId, actionId, rowId, value) {
            checkSurface(surfaceId);
            let result;
            for (const handler of [...(rowActionHandlers.get(surfaceId) ?? [])]) {
                result = await handler(actionId, rowId, value);
            }
            return result;
        },
        paletteItems,
        async runTool(id, input, signal, report) {
            if (!declaredTools.has(id)) {
                throw veneerError(PLUGIN_ERROR.undeclaredContribution, `${id} is not declared in the manifest`, manifest.id);
            }
            const handler = toolHandlers.get(id);
            if (handler === undefined) {
                throw veneerError(PLUGIN_ERROR.noHandler, `${id} has no handler`, manifest.id);
            }
            const result = await handler({ selection: null, ...input }, signal ?? new AbortController().signal, report ?? (() => undefined));
            if (!isToolResult(result)) {
                throw veneerError(PLUGIN_ERROR.badResult, `${id} returned a malformed result`, manifest.id);
            }
            return result;
        },
        async refreshPalette(providerId) {
            checkProvider(providerId);
            for (const handler of [...(paletteRefreshHandlers.get(providerId) ?? [])])
                await handler();
        },
        async runPaletteItem(providerId, itemId) {
            checkProvider(providerId);
            for (const handler of [...(runHandlers.get(providerId) ?? [])])
                await handler(itemId);
        },
        mountEditor(parent) {
            if (hostFactory === null) {
                throw veneerError(PLUGIN_ERROR.noHandler, 'no editor host is registered', manifest.id);
            }
            const host = hostFactory({ parent });
            const first = manifest.contributes.editingModes?.[0]?.id;
            const mode = first === undefined ? undefined : modes.get(first);
            if (mode !== undefined)
                host.setMode(mode);
            return host;
        }
    };
}
