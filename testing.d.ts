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
import { type NetRequest, type NetResponse, type PluginCompletion, type DiffAction, type FormValue, type Mark, type ReorderEvent, type EditorHost, type BlockRenderer, type EditingModeExtension, type ExportFile, type HistoryCommit, type HistorySyncOptions, type HistorySyncResult, type PluginApi, type PluginEntry, type PaletteItem, type PluginManifest, type ProjectSwitchedEvent, type SelectionOrigin, type SettingValue, type SurfaceView, type TextChange, type ToolReport, type ToolInput, type ToolResult, type VeneerEvent, type ResolvedProjectType, type WorkspaceProject } from './index.js';
export interface FakeHostOptions {
    /** The open document's text; null (the default) means no document. */
    text?: string | null;
    /** The API path of the open document, for `vault.process`. */
    openPath?: string;
    /** Closed files by API path, for `vault.process`. */
    files?: Record<string, string>;
    /** Image files' bytes by API path, for `vault.readFile` (Story 9.19). */
    binaryFiles?: Record<string, Uint8Array>;
    /** Whether `resources.imageSource` lets remote images through (default false). */
    remoteAllowed?: boolean;
    /**
     * Makes `vault.saveImage` reject with this code (e.g. `vault/not-image`) instead of saving.
     * `setImageFailure` changes it later.
     */
    imageFailure?: string | null;
    /** Setting values by ID, standing in for what the writer set (FR-44). */
    settings?: Record<string, SettingValue>;
    /** The open project for `workspace.current()`; null (the default) means nothing is open. */
    project?: WorkspaceProject | null;
    /** What `workspace.projectType()` answers (Story 7.4); null (the default) means no type. */
    projectType?: ResolvedProjectType | null;
    /**
     * What `api.providers` answers, one entry per call in order (the last repeats). A string is the
     * whole reply, an array its pieces. An empty list (the default) has no provider: each call
     * rejects `provider/none`.
     */
    replies?: (string | string[])[];
    /** Makes `api.providers` calls reject with this code and sentence instead of answering. */
    providerFailure?: {
        code: string;
        message: string;
    } | null;
    /**
     * What `api.net.fetch` answers, one entry per call in order (the last repeats). A string is the
     * body of a 200 answer. An empty list (the default) has no network: each call rejects `offline`.
     * The fake does not gate by tool: the real host refuses read-only tools and asks the writer.
     */
    netReplies?: (string | Partial<NetResponse>)[];
}
/** One `api.vault.saveImage` call, as the fake host recorded it. */
export interface FakeSavedImage {
    bytes: Uint8Array;
    /** The dropped file's name; undefined for a paste. */
    name: string | undefined;
    /** The link the fake returned, or null when the call was made to fail. */
    link: string | null;
}
/** One `api.editor.edit` (or `vault.process` on the open document), as the kernel would tag it. */
export interface FakeEdit {
    source: string;
    changes: TextChange[];
}
/** One fake save point: the commit plus every file's text at that point, by API path. */
export interface FakeHistoryCommit extends HistoryCommit {
    files: Record<string, string>;
}
/** The fake `api.history` (Story 9.13): one branch, `main`, held in memory. */
export interface FakeHistory {
    /** Whether `init` ran (or the test set it). */
    repository: boolean;
    /** Every commit on every branch, oldest first, each with the files as of it. */
    readonly commits: FakeHistoryCommit[];
    /** Branch names to their newest commit ID (null before the first commit); starts with `main`. */
    readonly branches: Map<string, string | null>;
    /** The branch the project's files are on. */
    current: string;
    /** Tag names to the commit they name and their message. */
    readonly tags: Map<string, {
        commit: string;
        message: string;
    }>;
    /** Remote names to addresses (`setRemote`). */
    readonly remotes: Map<string, string>;
    /** Every `sync` call, in order (the fake has no network: a sync only records). */
    readonly syncs: HistorySyncOptions[];
    /** What the next `sync` resolves with; by default it reports a push. */
    syncResult?: HistorySyncResult;
}
export interface FakeHost {
    /** The in-memory history `api.history` reads and writes (Story 9.13). */
    readonly history: FakeHistory;
    /** The notices `api.notify` let through (at most `NOTICE_LIMIT_PER_MINUTE` a minute), in order (Story 9.20). */
    readonly notices: {
        message: string;
        action?: {
            label: string;
            surface: string;
        };
    }[];
    /** The JSON text `api.projectData` holds for this plugin, by key (Story 9.26). */
    readonly projectData: Map<string, string>;
    /** Simulates a pull or checkout changing `key` on disk: emits `project-data:changed` to the plugin. */
    projectDataChanged(key: string): Promise<void>;
    /** Every `api.net.fetch` request that was allowed through, in order. */
    readonly netRequests: NetRequest[];
    /** The secrets `api.secrets` holds for this plugin, by name (Story 9.8). */
    readonly secrets: Map<string, string>;
    /** Every file `api.export.saveAs` was given, in order; the fake "writer" always saves (Story 9.8). */
    readonly exported: ExportFile[];
    /** Every `api.providers` request that was allowed through, in order. */
    readonly modelRequests: PluginCompletion[];
    /** The API object handed to `onload`. */
    readonly api: PluginApi;
    /** Calls `onload(api)`. */
    load(): Promise<void>;
    /** Runs a declared command's handler; rejects if the plugin attached none. */
    run(commandId: string, ...args: unknown[]): Promise<unknown>;
    /** Delivers an event to every listener the plugin subscribed for its `type`. */
    emit(event: VeneerEvent): Promise<void>;
    /**
     * Switches to another project the way the kernel would: replaces the closed files with
     * `files` (paths relative to the new root), clears the open document unless `text` is
     * given with `openPath`, then emits one `project:switched` with `name` and `kind`.
     */
    switchProject(project: {
        name: string;
        kind?: ProjectSwitchedEvent['kind'];
    }, next?: {
        files?: Record<string, string>;
        openPath?: string;
        text?: string | null;
    }): Promise<void>;
    /** Calls `onunload()` and disposes everything the plugin registered. */
    unload(): Promise<void>;
    /** How many registrations and subscriptions are still live. */
    liveDisposables(): number;
    /**
     * Calls the registered editor host factory with `parent` as the mount, the way the kernel
     * does (AD-18), then applies the default editing mode (the manifest's first, if registered)
     * as the kernel does on mount (FR-12). Throws if the plugin registered no host. Pass a jsdom
     * element in tests. The returned host includes the API's find operations and `select`; find state and
     * decorations belong to the registered editor factory, not the fake plugin facade.
     */
    mountEditor(parent: HTMLElement): EditorHost;
    /** The open document's text, or null. */
    text(): string | null;
    /** Replaces the open document's text (null: no document). Not recorded as an edit. */
    setText(text: string | null): void;
    /**
     * Replaces the open document's text (null: no document) the way the writer typing or a
     * document switch would, firing `editor.onChanged` listeners. Not recorded as an edit.
     */
    changeText(text: string | null): void;
    /**
     * Moves the main selection (origin `keyboard` unless given) and fires
     * `editor.onSelectionChanged` listeners when a document is open.
     */
    setSelection(selection: {
        from: number;
        to: number;
        origin?: SelectionOrigin;
    }): void;
    /** Every edit applied to the open document, in order. */
    readonly edits: FakeEdit[];
    /** Live `api.editor.registerMode` registrations: mode ID to its extension set. */
    readonly modes: ReadonlyMap<string, EditingModeExtension>;
    /** Live `api.editor.registerBlockRenderer` registrations: contribution ID to its handler. */
    readonly blockRenderers: ReadonlyMap<string, BlockRenderer>;
    /**
     * The marks the plugin has set with `api.editor.setMarks` (Story 9.17): set ID to its marks.
     * Opening another document or switching project clears them, as the kernel does.
     */
    readonly marks: ReadonlyMap<string, Mark[]>;
    /**
     * Clicks a mark the way the kernel does (Story 9.17): calls every live `onMarkClick` handler
     * for `setId` with the mark's ID, in order.
     */
    markClick(setId: string, markId: string): Promise<void>;
    /** Closed files by API path; `vault.process` reads and writes here. */
    readonly files: Map<string, string>;
    /** Flips the remote allowance and fires `resources.onChanged` listeners. */
    setRemoteAllowed(on: boolean): void;
    /** Every `vault.saveImage` call, in order. */
    readonly images: FakeSavedImage[];
    /** Makes later `vault.saveImage` calls reject with `code`, or succeed again with null. */
    setImageFailure(code: string | null): void;
    /**
     * Holds every later `vault.saveImage` until the returned release is called, so a test can
     * edit the document while a save is in flight.
     */
    holdImages(): () => void;
    /**
     * Sets a declared setting's value (null: back to its default) and fires `settings.onChanged`
     * listeners when it changed, as a write in the settings surface would.
     */
    setSetting(id: string, value: SettingValue | null): void;
    /** The last view `api.surfaces.setView` gave each declared surface, by surface ID. */
    readonly views: ReadonlyMap<string, SurfaceView>;
    /**
     * Opens a row the way the kernel does when the writer picks it: calls every live `onOpen`
     * handler for `surfaceId` with `itemId`, in registration order.
     */
    openItem(surfaceId: string, itemId: string): Promise<void>;
    /** Calls every live `onAction` handler for `surfaceId` with `actionId`. */
    pressAction(surfaceId: string, actionId: string): Promise<void>;
    /** Calls every live `onRefresh` handler for `surfaceId`, as the kernel does before a redraw. */
    refreshSurface(surfaceId: string): Promise<void>;
    /** Every path `workspace.open` opened, in order. */
    readonly opens: string[];
    /**
     * Runs a declared tool's handler the way the kernel does (Story 4.1): `input` is the context
     * (`selection` defaults to null) and `signal` a live one unless given. Rejects
     * `plugin/undeclared-contribution` for an undeclared ID, `plugin/no-handler` with none
     * attached, and `plugin/bad-result` for a malformed Result.
     */
    runTool(id: string, input?: Partial<ToolInput>, signal?: AbortSignal, report?: ToolReport): Promise<ToolResult>;
    /** The last items `api.palette.setItems` gave each declared provider, by provider ID. */
    readonly paletteItems: ReadonlyMap<string, PaletteItem[]>;
    /** Picks an item the way the palette does: calls every live `onRun` handler for the provider. */
    runPaletteItem(providerId: string, itemId: string): Promise<void>;
    /** Calls every live `palette.onRefresh` handler for the provider, as entering files mode does. */
    refreshPalette(providerId: string): Promise<void>;
    /** Empty folders `createFolder` made (folders holding a file show through `files`). */
    readonly folders: Set<string>;
    /** Every path `vault.create` and `createFolder` made, in order. */
    readonly created: string[];
    /** Every rename or move, in order. */
    readonly renames: {
        from: string;
        to: string;
        kind: 'file' | 'folder';
    }[];
    /** Every path `vault.trash` trashed, in order. */
    readonly trashed: string[];
    /**
     * Finishes a row action the way the kernel does: calls every live `onRowAction` handler for
     * the surface, in order, and resolves to the last one's result.
     */
    rowAction(surfaceId: string, actionId: string, rowId: string, value?: string): Promise<unknown>;
    /** Every `surfaces.beginRowAction` call, in order. */
    readonly begunRowActions: {
        surfaceId: string;
        actionId: string;
        rowId: string;
    }[];
    /** Every query `vault.search` searched (an empty one never searches), in order. */
    readonly searches: string[];
    /**
     * Holds every later `vault.search` until the returned release is called. A search started
     * while another is held supersedes it: the held one rejects `vault/superseded` on release.
     */
    holdSearches(): () => void;
    /** Every `workspace.open` that carried `select`, in order. */
    readonly selections: {
        path: string;
        from: number;
        to: number;
    }[];
    /**
     * Types in a view's input field the way the kernel reports it: calls every live `onInput`
     * handler for `surfaceId` with the whole `value`, in order.
     */
    input(surfaceId: string, value: string): Promise<void>;
    /**
     * Moves a row the way the kernel does (Story 9.24): calls every live `onReorder` handler for
     * `surfaceId` with `event`, in order.
     */
    reorder(surfaceId: string, event: ReorderEvent): Promise<void>;
    /**
     * Changes a form field the way the kernel does (Story 9.25): calls every live `onFormChange`
     * handler for `surfaceId` with the field ID and value, in order.
     */
    formChange(surfaceId: string, fieldId: string, value: FormValue): Promise<void>;
    /**
     * Submits a form the way the kernel does (Story 9.25): calls every live `onFormSubmit`
     * handler for `surfaceId` with the values by field ID, in order.
     */
    formSubmit(surfaceId: string, values: Record<string, FormValue>): Promise<void>;
    /**
     * Chooses Accept or Reject on a diff's change the way the kernel does (Story 9.16): calls every
     * live `onDiffAction` handler for `surfaceId` with the action and the change's ID, in order.
     */
    diffAction(surfaceId: string, action: DiffAction, changeId: string): Promise<void>;
    /** Every `surfaces.show` call, by surface ID, in order. */
    readonly shown: string[];
    /** The `focus` option of every `surfaces.show` call, one entry per call (Story 9.23). */
    readonly shownFocus: (string | undefined)[];
    /** Every `surfaces.close` call, in order (Story 9.22). */
    readonly closed: string[];
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
export declare function createFakeHost(manifest: PluginManifest, entry: PluginEntry, options?: FakeHostOptions): FakeHost;
