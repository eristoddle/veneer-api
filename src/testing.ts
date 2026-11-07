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
import {
  API_VERSION,
  CHAT_ERROR,
  type ChatOpenOptions,
  type ChatSessionEndedEvent,
  formatDatePattern,
  type ObsidianDailyNotes,
  type PageLook,
  type TypingKind,
  EDITOR_ERROR,
  HISTORY_ERROR,
  MAX_PROJECT_DATA_KEY_BYTES,
  MAX_PROJECT_DATA_PLUGIN_BYTES,
  PROJECT_DATA_ERROR,
  MAX_ATTACHMENT_BYTES,
  MAX_HISTORY_LOG,
  MAX_NET_BYTES,
  MAX_NOTICE_ACTION_LABEL,
  MAX_NOTICE_MESSAGE,
  NOTICE_LIMIT_PER_MINUTE,
  PLUGIN_ERROR,
  STORAGE_ERROR,
  VAULT_ERROR,
  WORKSPACE_ERROR,
  type NetRequest,
  type NetResponse,
  type PluginCompletion,
  type ModelToolArgs,
  type ModelToolHandler,
  type PluginImageRequest,
  type SourceFolder,
  type SourceHit,
  type DiffAction,
  type FormValue,
  type Mark,
  checkMarks,
  type ReorderEvent,
  MAX_QUERY_KEYS,
  MAX_QUERY_RESULTS,
  MAX_QUERY_TEXT,
  MAX_SEARCH_MATCHES,
  MAX_SEARCH_QUERY,
  splitFrontmatter,
  type VaultQuery,
  type VaultQueryEntry,
  type VaultQueryResult,
  changedSpan,
  findInText,
  MAX_MODEL_TOOL_RESULT,
  MAX_SOURCE_HITS,
  SOURCES_ERROR,
  cleanPaletteItems,
  checkTextChanges,
  cleanSurfaceView,
  isRelativeSource,
  isRemoteSource,
  isToolResult,
  isVeneerError,
  veneerError,
  type CommandHandler,
  type Disposable,
  type EditorHost,
  type EditorHostFactory,
  type BlockRenderer,
  type SyntaxClickHandler,
  type SyntaxRenderer,
  type EditingModeExtension,
  type ExportFile,
  type AskOptions,
  type PickedImage,
  CLIPBOARD_ERROR,
  MAX_CLIPBOARD_BYTES,
  type HistoryCommit,
  type HistorySavedEvent,
  type HistorySyncOptions,
  type HistorySyncResult,
  type ProjectDataChangedEvent,
  type EditorSelection,
  type EventListener,
  type EventName,
  type PluginApi,
  type PluginEntry,
  type PaletteItem,
  type PluginManifest,
  type ProjectSwitchedEvent,
  type RenameParticipant,
  type RowActionHandler,
  type SelectionOrigin,
  type SearchFileResult,
  type SettingValue,
  type SurfaceOpenHandler,
  type SurfaceView,
  type TextChange,
  type ToolHandler,
  type ToolReport,
  type ToolInput,
  type ToolResult,
  type VaultEntry,
  type VeneerEvent,
  type ResolvedProjectType,
  type ImageDestination,
  type ImageDestinationHandler,
  type ImageDestinationRequest,
  type TextReplacement,
  type WorkspaceProject
} from './index'

export interface FakeHostOptions {
  /** Other plugins `api.plugins` reports besides this one (Epic 35), as installed and on. */
  installedPlugins?: PluginManifest[]
  /** What `api.workspace.obsidianDailyNotes` resolves; null (the default) means the project has none. */
  obsidianDailyNotes?: ObsidianDailyNotes | null
  /** The open document's text; null (the default) means no document. */
  text?: string | null
  /** The API path of the open document, for `vault.process`. */
  openPath?: string
  /** Closed files by API path, for `vault.process`. */
  files?: Record<string, string>
  /** Image files' bytes by API path, for `vault.readFile` (Story 9.19). */
  binaryFiles?: Record<string, Uint8Array>
  /** Whether `resources.imageSource` lets remote images through (default false). */
  remoteAllowed?: boolean
  /**
   * Makes `vault.saveImage` reject with this code (e.g. `vault/not-image`) instead of saving.
   * `setImageFailure` changes it later.
   */
  imageFailure?: string | null
  /** Setting values by ID, standing in for what the writer set (FR-44). */
  settings?: Record<string, SettingValue>
  /** The open project for `workspace.current()`; null (the default) means nothing is open. */
  project?: WorkspaceProject | null
  /** What `workspace.projectType()` answers (Story 7.4); null (the default) means no type. */
  projectType?: ResolvedProjectType | null
  /**
   * What `api.providers` answers, one entry per call in order (the last repeats). A string is the
   * whole reply, an array its pieces. An empty list (the default) has no provider: each call
   * rejects `provider/none`.
   */
  replies?: (string | string[])[]
  /**
   * What `api.providers.image` answers, one entry per call in order (the last repeats): the
   * number of pictures is the request's `count`, each a tiny PNG whose first byte after the
   * signature is the entry's index. An empty list (the default) has no image provider.
   */
  imageReplies?: ('ok' | { code: string; message: string })[]
  /**
   * The folders the writer would pick for `api.sources.pickFolder`, in order: a name and its
   * files (text by relative path). Once they are used up the pick is canceled. `api.sources`
   * needs the manifest's `needs` to include `sourceFolders`, as the kernel does (Story 27.1).
   */
  sourceFolders?: { name: string; files: Record<string, string>; markers?: string[] }[]
  /** Whether AI features are on (default true). Off, `api.providers` rejects `ai/off` and `api.ai.enabled()` is false. */
  aiFeatures?: boolean
  /** Makes `api.providers` calls reject with this code and sentence instead of answering. */
  providerFailure?: { code: string; message: string } | null
  /**
   * What `api.net.fetch` answers, one entry per call in order (the last repeats). A string is the
   * body of a 200 answer. An empty list (the default) has no network: each call rejects `offline`.
   * The fake does not gate by tool: the real host refuses read-only tools and asks the writer.
   */
  netReplies?: (string | Partial<NetResponse>)[]
}

/** A project-data key as the real `api.projectData` checks it. */
function projectDataKey(key: string): string {
  if (typeof key !== 'string' || !/^[a-z0-9][a-z0-9._-]{0,63}$/.test(key) || key.includes('..')) {
    throw veneerError(PROJECT_DATA_ERROR.badKey, 'That project data key is not valid.')
  }
  return key
}

/** A secret's name as the real `api.secrets` checks it. */
function secretName(name: string): string {
  if (typeof name !== 'string' || !/^[a-z0-9][a-z0-9._-]{0,63}$/.test(name)) {
    throw veneerError(STORAGE_ERROR.badSecret, 'That secret name is not valid.')
  }
  return name
}

/** One `api.vault.saveAttachment` call, as the fake host recorded it. */
export interface FakeSavedAttachment {
  bytes: Uint8Array
  name: string
  /** The link the fake returned, or null when the call was made to fail. */
  link: string | null
}

/** One `api.vault.saveImage` call, as the fake host recorded it. */
export interface FakeSavedImage {
  bytes: Uint8Array
  /** The dropped file's name; undefined for a paste. */
  name: string | undefined
  /** The link the fake returned, or null when the call was made to fail. */
  link: string | null
}

/** One `api.editor.edit` (or `vault.process` on the open document), as the kernel would tag it. */
export interface FakeEdit {
  source: string
  changes: TextChange[]
}

/** One fake save point: the commit plus every file's text at that point, by API path. */
export interface FakeHistoryCommit extends HistoryCommit {
  files: Record<string, string>
}

/** The fake `api.history` (Story 9.13): one branch, `main`, held in memory. */
export interface FakeHistory {
  /** Whether `init` ran (or the test set it). */
  repository: boolean
  /** Every commit on every branch, oldest first, each with the files as of it. */
  readonly commits: FakeHistoryCommit[]
  /** Branch names to their newest commit ID (null before the first commit); starts with `main`. */
  readonly branches: Map<string, string | null>
  /** The branch the project's files are on. */
  current: string
  /** Tag names to the commit they name and their message. */
  readonly tags: Map<string, { commit: string; message: string }>
  /** Remote names to addresses (`setRemote`). */
  readonly remotes: Map<string, string>
  /** Every `sync` call, in order (the fake has no network: a sync only records). */
  readonly syncs: HistorySyncOptions[]
  /** What the next `sync` resolves with; by default it reports a push. */
  syncResult?: HistorySyncResult
}

export interface FakeHost {
  /** The in-memory history `api.history` reads and writes (Story 9.13). */
  readonly history: FakeHistory
  /** The notices `api.notify` let through (at most `NOTICE_LIMIT_PER_MINUTE` a minute), in order (Story 9.20). */
  readonly notices: { message: string; action?: { label: string; surface: string } }[]
  /** The JSON text `api.projectData` holds for this plugin, by key (Story 9.26). */
  readonly projectData: Map<string, string>
  /** Simulates a pull or checkout changing `key` on disk: emits `project-data:changed` to the plugin. */
  projectDataChanged(key: string): Promise<void>
  /** Every `api.net.fetch` request that was allowed through, in order. */
  readonly netRequests: NetRequest[]
  /** The secrets `api.secrets` holds for this plugin, by name (Story 9.8). */
  readonly secrets: Map<string, string>
  /** Every file `api.export.saveAs` was given, in order; the fake "writer" always saves (Story 9.8). */
  readonly exported: ExportFile[]
  /**
   * What `api.clipboard` holds (Story 11.2): set `text` or `html` to seed a read; a write or
   * `writeImage` replaces it. `image` is the project path last given to `writeImage`.
   */
  readonly clipboard: { text: string; html: string | null; image: string | null }
  /** What `api.workspace.pickImages` resolves next, in order (Story 11.13); empty is a cancel. */
  readonly pickedImages: PickedImage[][]
  /** Every path `api.workspace.revealImage` was given, in order (Story 11.13). */
  readonly revealed: string[]
  /** Every path `api.workspace.reveal` was given, in order (Story 18.1). */
  readonly revealedEntries: string[]
  /** Every folder `api.workspace.openFolder` opened, in order (Story 18.1). */
  readonly openedFolders: { path: string; newWindow: boolean }[]
  /** Every document `api.workspace.open(path, { newWindow: true })` opened (Story 18.1). */
  readonly openedInNewWindow: string[]
  /** Pages `createFromTemplate` opened with `lazy: true`: shown, nothing written (0.55.0). */
  readonly lazyPages: { path: string; text: string }[]
  /** Every `api.sound.play` and `api.sound.loop` in order; a loop is `loop: true` (0.55.0). */
  readonly sounds: { id: string; volume: number; loop: boolean; stopped: boolean }[]
  /** The plugin's current page look, or null (0.55.0). */
  readonly pageLook: PageLook | null
  /** Simulates the writer's keystroke for `api.editor.onTyping` listeners (0.55.0). */
  typing(kind: TypingKind): void
  /** The IDs of other commands `api.commands.run` was asked to run, in order (0.55.0). */
  readonly commandsRun: string[]
  /** What `api.workspace.pickGrid` resolves next, in order (Story 11.8); `null` or empty is a cancel. */
  readonly gridAnswers: ({ rows: number; cols: number } | null)[]
  /** How many times `api.resources.reload` ran (Story 13.5). */
  readonly reloadCount: number
  /** What `api.workspace.ask` resolves next, in order (Story 13.5); `null` or empty is a cancel. */
  readonly askAnswers: (string | null)[]
  /** Every `api.workspace.ask` the plugin made, in order. */
  readonly asked: AskOptions[]
  /** Every `api.providers` request that was allowed through, in order. */
  readonly modelRequests: PluginCompletion[]
  /** Every `api.providers.image` request that was allowed through, in order. */
  readonly imageRequests: PluginImageRequest[]
  /** Every `api.chat.open` that was allowed through, in order (0.59.0). */
  readonly chatOpened: ChatOpenOptions[]
  /** Ends the chat session as the writer would: calls the `api.chat.onSessionEnded` handlers (0.59.0). */
  endChatSession(event: ChatSessionEndedEvent): void
  /** The API object handed to `onload`. */
  readonly api: PluginApi
  /** Calls `onload(api)`. */
  load(): Promise<void>
  /** Runs a declared command's handler; rejects if the plugin attached none. */
  run(commandId: string, ...args: unknown[]): Promise<unknown>
  /** Delivers an event to every listener the plugin subscribed for its `type`. */
  emit(event: VeneerEvent): Promise<void>
  /**
   * Switches to another project the way the kernel would: replaces the closed files with
   * `files` (paths relative to the new root), clears the open document unless `text` is
   * given with `openPath`, then emits one `project:switched` with `name` and `kind`.
   */
  switchProject(
    project: { name: string; kind?: ProjectSwitchedEvent['kind'] },
    next?: { files?: Record<string, string>; openPath?: string; text?: string | null }
  ): Promise<void>
  /** Calls `onunload()` and disposes everything the plugin registered. */
  unload(): Promise<void>
  /** How many registrations and subscriptions are still live. */
  liveDisposables(): number
  /**
   * Calls the registered editor host factory with `parent` as the mount, the way the kernel
   * does (AD-18), then applies the default editing mode (the manifest's first, if registered)
   * as the kernel does on mount (FR-12). Throws if the plugin registered no host. Pass a jsdom
   * element in tests. The returned host includes the API's find operations and `select`; find state and
   * decorations belong to the registered editor factory, not the fake plugin facade.
   */
  mountEditor(parent: HTMLElement): EditorHost
  /** The open document's text, or null. */
  text(): string | null
  /** Replaces the open document's text (null: no document). Not recorded as an edit. */
  setText(text: string | null): void
  /**
   * Replaces the open document's text (null: no document) the way the writer typing or a
   * document switch would, firing `editor.onChanged` listeners. Not recorded as an edit.
   */
  changeText(text: string | null): void
  /**
   * Moves the main selection (origin `keyboard` unless given) and fires
   * `editor.onSelectionChanged` listeners when a document is open.
   */
  setSelection(selection: { from: number; to: number; origin?: SelectionOrigin }): void
  /** Every edit applied to the open document, in order. */
  readonly edits: FakeEdit[]
  /** Live `api.editor.registerMode` registrations: mode ID to its extension set. */
  readonly modes: ReadonlyMap<string, EditingModeExtension>
  /** Live `api.editor.registerBlockRenderer` registrations: contribution ID to its handler. */
  readonly blockRenderers: ReadonlyMap<string, BlockRenderer>
  /** Live `api.editor.onRenderSyntax` registrations: contribution ID to its handler (Story 22.4). */
  readonly syntaxRenderers: ReadonlyMap<string, SyntaxRenderer>
  /** Live `api.editor.onSyntaxClick` registrations: contribution ID to its handler. */
  readonly syntaxClicks: ReadonlyMap<string, SyntaxClickHandler>
  /**
   * The marks the plugin has set with `api.editor.setMarks` (Story 9.17): set ID to its marks.
   * Opening another document or switching project clears them, as the kernel does.
   */
  readonly marks: ReadonlyMap<string, Mark[]>
  /**
   * Clicks a mark the way the kernel does (Story 9.17): calls every live `onMarkClick` handler
   * for `setId` with the mark's ID, in order.
   */
  markClick(setId: string, markId: string): Promise<void>
  /** Closed files by API path; `vault.process` reads and writes here. */
  readonly files: Map<string, string>
  /** Flips the remote allowance and fires `resources.onChanged` listeners. */
  setRemoteAllowed(on: boolean): void
  /** Every `vault.saveImage` call, in order. */
  readonly images: FakeSavedImage[]
  /** What `api.workspace.textReplacements` resolves (Story 17.8); push pairs to seed it. */
  readonly textReplacements: TextReplacement[]
  /** Asks the plugin's `vault.onImageDestination` handler, as the kernel would (Story 17.2). */
  askImageDestination(request: ImageDestinationRequest): Promise<ImageDestination | undefined>
  /** Every `vault.saveAttachment` call, in order; `setImageFailure` and `holdImages` apply too. */
  readonly attachments: FakeSavedAttachment[]
  /** Makes later `vault.saveImage` calls reject with `code`, or succeed again with null. */
  setImageFailure(code: string | null): void
  /**
   * Holds every later `vault.saveImage` until the returned release is called, so a test can
   * edit the document while a save is in flight.
   */
  holdImages(): () => void
  /**
   * Sets a declared setting's value (null: back to its default) and fires `settings.onChanged`
   * listeners when it changed, as a write in the settings surface would.
   */
  setSetting(id: string, value: SettingValue | null): void
  /** The last view `api.surfaces.setView` gave each declared surface, by surface ID. */
  readonly views: ReadonlyMap<string, SurfaceView>
  /**
   * Opens a row the way the kernel does when the writer picks it: calls every live `onOpen`
   * handler for `surfaceId` with `itemId`, in registration order.
   */
  openItem(surfaceId: string, itemId: string): Promise<void>
  /** Calls every live `onAction` handler for `surfaceId` with `actionId`. */
  pressAction(surfaceId: string, actionId: string): Promise<void>
  /** Calls every live `onRefresh` handler for `surfaceId`, as the kernel does before a redraw. */
  refreshSurface(surfaceId: string): Promise<void>
  /** Every path `workspace.open` opened, in order. */
  readonly opens: string[]
  /**
   * Runs a declared tool's handler the way the kernel does (Story 4.1): `input` is the context
   * (`selection` defaults to null) and `signal` a live one unless given. Rejects
   * `plugin/undeclared-contribution` for an undeclared ID, `plugin/no-handler` with none
   * attached, and `plugin/bad-result` for a malformed Result.
   */
  /**
   * Calls a model tool's handler as the kernel would for the model (Story 27.2): the text it
   * answered, cut to `MAX_MODEL_TOOL_RESULT`; a throw becomes a short error sentence. Rejects
   * `plugin/undeclared-contribution` for an undeclared ID and `plugin/no-handler` with none.
   */
  callModelTool(id: string, args: ModelToolArgs): Promise<string>
  /** What the plugin last said with `api.ai.describeModelTool`, by tool ID (Story 27.2). */
  readonly modelToolDetails: Map<string, string>
  /** Every address `api.workspace.openExternal` was given, in order (Story 27.3). */
  readonly openedExternal: string[]
  runTool(
    id: string,
    input?: Partial<ToolInput>,
    signal?: AbortSignal,
    report?: ToolReport
  ): Promise<ToolResult>
  /** The last items `api.palette.setItems` gave each declared provider, by provider ID. */
  readonly paletteItems: ReadonlyMap<string, PaletteItem[]>
  /** Picks an item the way the palette does: calls every live `onRun` handler for the provider. */
  runPaletteItem(providerId: string, itemId: string): Promise<void>
  /** Calls every live `palette.onRefresh` handler for the provider, as entering files mode does. */
  refreshPalette(providerId: string): Promise<void>
  /** Empty folders `createFolder` made (folders holding a file show through `files`). */
  readonly folders: Set<string>
  /** Every path `vault.create` and `createFolder` made, in order. */
  readonly created: string[]
  /** Every rename or move, in order. */
  readonly renames: { from: string; to: string; kind: 'file' | 'folder' }[]
  /** Every `vault.copy`, in order. */
  readonly copies: { from: string; to: string }[]
  /** Every path `vault.trash` trashed, in order. */
  readonly trashed: string[]
  /**
   * Finishes a row action the way the kernel does: calls every live `onRowAction` handler for
   * the surface, in order, and resolves to the last one's result.
   */
  rowAction(surfaceId: string, actionId: string, rowId: string, value?: string): Promise<unknown>
  /** Every `surfaces.beginRowAction` call, in order. */
  readonly begunRowActions: { surfaceId: string; actionId: string; rowId: string }[]
  /** Every query `vault.search` searched (an empty one never searches), in order. */
  readonly searches: string[]
  /** The `folder` of every `api.vault.search` call, in order; '' is the whole project (Story 18.2). */
  readonly searchFolders: string[]
  /**
   * Holds every later `vault.search` until the returned release is called. A search started
   * while another is held supersedes it: the held one rejects `vault/superseded` on release.
   */
  holdSearches(): () => void
  /** Every `workspace.open` that carried `select`, in order. */
  readonly selections: { path: string; from: number; to: number }[]
  /**
   * Types in a view's input field the way the kernel reports it: calls every live `onInput`
   * handler for `surfaceId` with the whole `value`, in order.
   */
  input(surfaceId: string, value: string): Promise<void>
  /**
   * Moves a row the way the kernel does (Story 9.24): calls every live `onReorder` handler for
   * `surfaceId` with `event`, in order.
   */
  reorder(surfaceId: string, event: ReorderEvent): Promise<void>
  /**
   * Edits a card's synopsis the way the kernel does (Story 29.1): calls every live `onItemEdit`
   * handler for `surfaceId` with the item and the new text, in order.
   */
  itemEdit(surfaceId: string, itemId: string, value: string): Promise<void>
  /**
   * Changes a form field the way the kernel does (Story 9.25): calls every live `onFormChange`
   * handler for `surfaceId` with the field ID and value, in order.
   */
  formChange(surfaceId: string, fieldId: string, value: FormValue): Promise<void>
  /**
   * Submits a form the way the kernel does (Story 9.25): calls every live `onFormSubmit`
   * handler for `surfaceId` with the values by field ID, in order.
   */
  formSubmit(surfaceId: string, values: Record<string, FormValue>): Promise<void>
  /**
   * Chooses Accept or Reject on a diff's change the way the kernel does (Story 9.16): calls every
   * live `onDiffAction` handler for `surfaceId` with the action and the change's ID, in order.
   */
  diffAction(surfaceId: string, action: DiffAction, changeId: string): Promise<void>
  /** Every `surfaces.show` call, by surface ID, in order. */
  readonly shown: string[]
  /** The `focus` option of every `surfaces.show` call, one entry per call (Story 9.23). */
  readonly shownFocus: (string | undefined)[]
  /** Every `surfaces.close` call, in order (Story 9.22). */
  readonly closed: string[]
}

const FAKE_MARKDOWN = /\.(md|markdown)$/i

/** A simple scalar from the fake's tiny YAML subset: quoted or bare text, numbers, booleans. */
function fakeScalar(raw: string): string | number | boolean {
  const t = raw.trim().replace(/^(['"])(.*)\1$/, '$2')
  if (/^(['"])/.test(raw.trim())) return t
  if (t === 'true') return true
  if (t === 'false') return false
  return t !== '' && Number.isFinite(Number(t)) ? Number(t) : t
}

/**
 * The fake's index entry for one file (Story 9.27): frontmatter through `splitFrontmatter`, read
 * as `key: value`, `key: [a, b]`, and `key:` followed by `- item` lines (nothing deeper); tags
 * from frontmatter `tags` and inline `#tags`; links from `](relative.md)`. The real index uses a
 * full YAML parser and link resolver; a test relies on this only for the simple shapes.
 */
function fakeIndexEntry(path: string, text: string): VaultQueryEntry {
  const body = text.replace(/\r\n?/g, '\n')
  const split = splitFrontmatter(body)
  const frontmatter: Record<string, unknown> = {}
  let listKey: string | null = null
  for (const line of split.yaml.split('\n')) {
    const item = /^\s+-\s+(.*)$/.exec(line)
    if (item !== null && listKey !== null) {
      ;(frontmatter[listKey] as unknown[]).push(fakeScalar(item[1]))
      continue
    }
    const pair = /^([^\s:#][^:]*):\s*(.*)$/.exec(line)
    if (pair === null) continue
    const value = pair[2].trim()
    if (value === '') {
      listKey = pair[1]
      frontmatter[listKey] = []
    } else {
      listKey = null
      frontmatter[pair[1]] = value.startsWith('[')
        ? value
            .slice(1, value.lastIndexOf(']'))
            .split(',')
            .filter((v) => v.trim() !== '')
            .map(fakeScalar)
        : fakeScalar(value)
    }
  }
  const tags = new Set<string>()
  const listed = frontmatter.tags
  for (const tag of Array.isArray(listed)
    ? listed
    : typeof listed === 'string'
      ? listed.split(/[,\s]+/)
      : []) {
    const clean = String(tag).trim().replace(/^#/, '')
    if (clean !== '') tags.add(clean)
  }
  for (const m of split.body.matchAll(
    /(^|[\s,;])#([\p{L}\p{N}_/-]*[\p{L}_/-][\p{L}\p{N}_/-]*)/gu
  )) {
    tags.add(m[2])
  }
  const links = new Set<string>()
  const folder = path.includes('/') ? path.slice(0, path.lastIndexOf('/')).split('/') : []
  for (const m of body.matchAll(/\]\(([^)\s]+)\)/g)) {
    const dest = m[1].split(/[?#]/)[0]
    if (dest === '' || /^([a-z][a-z0-9+.-]*:|\/)/i.test(dest)) continue
    const parts = [...folder]
    let decoded = dest
    try {
      decoded = decodeURI(dest)
    } catch {
      // A malformed escape keeps the raw destination.
    }
    for (const seg of decoded.split('/')) {
      if (seg === '..') parts.pop()
      else if (seg !== '.' && seg !== '') parts.push(seg)
    }
    links.add(parts.join('/'))
  }
  return { path, frontmatter, tags: [...tags], links: [...links] }
}

/** Folder by folder, names by code unit, like the index (`a/y.md` before `a.md`). */
function fakeByFolder(a: string, b: string): number {
  const x = a.split('/')
  const y = b.split('/')
  for (let i = 0; i < Math.min(x.length, y.length); i++) {
    if (x[i] !== y[i]) return x[i] < y[i] ? -1 : 1
  }
  return x.length - y.length
}

/** A query the fake accepts: a plain object of the known keys and value types, or null. */
function fakeQueryCheck(query: unknown): VaultQuery | null {
  if (typeof query !== 'object' || query === null || Array.isArray(query)) return null
  const q = query as Record<string, unknown>
  const known = ['frontmatter', 'tag', 'linksTo', 'linkedFrom', 'limit']
  if (Object.keys(q).some((k) => !known.includes(k))) return null
  const fm = q.frontmatter
  if (fm !== undefined) {
    if (typeof fm !== 'object' || fm === null || Array.isArray(fm)) return null
    const pairs = Object.entries(fm)
    if (pairs.length > MAX_QUERY_KEYS) return null
    for (const [k, v] of pairs) {
      if (k.length > MAX_QUERY_TEXT || k === '__proto__') return null
      if (
        typeof v === 'string'
          ? v.length > MAX_QUERY_TEXT
          : typeof v === 'number'
            ? !Number.isFinite(v)
            : typeof v !== 'boolean'
      ) {
        return null
      }
    }
  }
  for (const key of ['tag', 'linksTo', 'linkedFrom']) {
    const v = q[key]
    if (v !== undefined && (typeof v !== 'string' || v === '' || v.length > MAX_QUERY_TEXT))
      return null
  }
  const limit = q.limit
  if (limit !== undefined && (typeof limit !== 'number' || !Number.isInteger(limit) || limit < 1)) {
    return null
  }
  return query as VaultQuery
}

/** The fake's `vault.query` over its entries: the same rules as the real index. */
function fakeQuery(entries: VaultQueryEntry[], query: VaultQuery): VaultQueryResult {
  const limit = Math.max(0, Math.min(query.limit ?? 200, MAX_QUERY_RESULTS))
  const from =
    query.linkedFrom === undefined
      ? null
      : (entries.find((e) => e.path === query.linkedFrom)?.links ?? [])
  const results: VaultQueryEntry[] = []
  let truncated = false
  for (const entry of [...entries].sort((a, b) => fakeByFolder(a.path, b.path))) {
    const fm = query.frontmatter ?? {}
    const ok =
      Object.entries(fm).every(([key, want]) => {
        if (!Object.hasOwn(entry.frontmatter, key)) return false
        const have = entry.frontmatter[key]
        return Array.isArray(have) ? have.some((v) => v === want) : have === want
      }) &&
      (query.tag === undefined ||
        entry.tags.some((t) => t.toLowerCase() === query.tag?.replace(/^#/, '').toLowerCase())) &&
      (query.linksTo === undefined || entry.links.includes(query.linksTo)) &&
      (from === null || from.includes(entry.path))
    if (!ok) continue
    if (results.length >= limit) {
      truncated = true
      break
    }
    results.push(entry)
  }
  return { results, truncated }
}
const FAKE_IMAGE = /\.(png|jpe?g|gif|webp|svg|docx)$/i

function applyChanges(text: string, changes: readonly TextChange[]): string {
  let out = text
  for (const change of [...changes].reverse()) {
    out = out.slice(0, change.from) + change.text + out.slice(change.to)
  }
  return out
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
export function createFakeHost(
  manifest: PluginManifest,
  entry: PluginEntry,
  options: FakeHostOptions = {}
): FakeHost {
  const declared = new Set((manifest.contributes.commands ?? []).map((c) => c.id))
  const declaredModes = new Set((manifest.contributes.editingModes ?? []).map((m) => m.id))
  const modes = new Map<string, EditingModeExtension>()
  const declaredRenderers = new Set((manifest.contributes.blockRenderers ?? []).map((r) => r.id))
  const blockRenderers = new Map<string, BlockRenderer>()
  const declaredSyntax = new Set((manifest.contributes.syntax ?? []).map((r) => r.id))
  const syntaxRenderers = new Map<string, SyntaxRenderer>()
  const syntaxClicks = new Map<string, SyntaxClickHandler>()
  const marks = new Map<string, Mark[]>()
  const markHandlers = new Map<string, Set<(markId: string) => unknown>>()
  const handlers = new Map<string, CommandHandler>()
  const listeners = new Map<EventName, Set<EventListener>>()
  const live = new Set<Disposable>()
  let hostFactory: EditorHostFactory | null = null
  let text: string | null = options.text ?? null
  const edits: FakeEdit[] = []
  const files = new Map(Object.entries(options.files ?? {}))
  let openPath = options.openPath
  const source = `plugin:${manifest.id}`
  let remoteAllowed = options.remoteAllowed ?? false
  const images: FakeSavedImage[] = []
  const attachments: FakeSavedAttachment[] = []
  let imageFailure = options.imageFailure ?? null
  let imageGate: Promise<void> | null = null
  const resourceListeners = new Set<() => void>()
  const declaredSettings = new Map((manifest.contributes.settings ?? []).map((d) => [d.id, d]))
  const settingValues = new Map(Object.entries(options.settings ?? {}))
  const settingListeners = new Set<(id: string) => void>()
  const declaredSurfaces = new Set((manifest.contributes.surfaces ?? []).map((d) => d.id))
  const views = new Map<string, SurfaceView>()
  const openHandlers = new Map<string, Set<SurfaceOpenHandler>>()
  const actionHandlers = new Map<string, Set<(actionId: string) => unknown>>()
  const refreshHandlers = new Map<string, Set<() => unknown>>()
  const declaredTools = new Set((manifest.contributes.tools ?? []).map((t) => t.id))
  const needsModel = (manifest.contributes.tools ?? []).some(
    (t) => t.needsProvider === true || t.canAskModel === true
  )
  const modelRequests: PluginCompletion[] = []
  const imageRequests: PluginImageRequest[] = []
  const chatOpened: ChatOpenOptions[] = []
  const chatEndHandlers = new Set<(event: ChatSessionEndedEvent) => void>()
  let sourcePicks = 0
  const openedExternal: string[] = []
  const grantedSources: SourceFolder[] = []
  const sourceGate = (): void => {
    if (manifest.needs?.includes('sourceFolders') !== true) {
      throw veneerError(
        SOURCES_ERROR.undeclared,
        'api.sources needs the manifest to say needs: ["sourceFolders"]',
        manifest.id
      )
    }
  }
  const sourcePath = (raw: string): string => {
    const parts = String(raw)
      .replace(/\\/g, '/')
      .split('/')
      .filter((p) => p !== '' && p !== '.')
    if (String(raw).startsWith('/') || parts.includes('..')) {
      throw veneerError(
        SOURCES_ERROR.outOfScope,
        'That path is not inside the folder.',
        manifest.id
      )
    }
    return parts.join('/')
  }
  const sourceFiles = (id: string): Record<string, string> => {
    sourceGate()
    const at = grantedSources.findIndex((f) => f.id === id)
    const folder = at === -1 ? undefined : (options.sourceFolders ?? [])[Number(id.slice(4)) - 1]
    if (folder === undefined) {
      throw veneerError(SOURCES_ERROR.unknownFolder, 'That folder is not granted.', manifest.id)
    }
    return folder.files
  }
  let imageCalls = 0
  let modelCalls = 0
  const netRequests: NetRequest[] = []
  const secrets = new Map<string, string>()
  const projectData = new Map<string, string>()
  const notices: FakeHost['notices'] = []
  let noticeTimes: number[] = []
  const exported: ExportFile[] = []
  const clipboard: FakeHost['clipboard'] = { text: '', html: null, image: null }
  const gridAnswers: FakeHost['gridAnswers'] = []
  const askAnswers: FakeHost['askAnswers'] = []
  let reloads = 0
  const asked: AskOptions[] = []
  const revealed: string[] = []
  const revealedEntries: string[] = []
  const openedFolders: { path: string; newWindow: boolean }[] = []
  const openedInNewWindow: string[] = []
  const lazyPages: { path: string; text: string }[] = []
  const sounds: { id: string; volume: number; loop: boolean; stopped: boolean }[] = []
  let pageLook: PageLook | null = null
  const typingListeners = new Set<(kind: TypingKind) => void>()
  const commandsRun: string[] = []
  const declaredSounds = new Set((manifest.contributes.sounds ?? []).map((x) => x.id))
  const declaredFonts = new Set((manifest.contributes.fonts ?? []).map((x) => x.family))
  const pickedImages: PickedImage[][] = []
  const history: FakeHistory = {
    repository: false,
    commits: [],
    branches: new Map([['main', null]]),
    current: 'main',
    tags: new Map(),
    remotes: new Map(),
    syncs: []
  }
  let netCalls = 0
  const toolHandlers = new Map<string, ToolHandler>()
  const declaredModelTools = new Set((manifest.contributes.modelTools ?? []).map((t) => t.id))
  const modelToolHandlers = new Map<string, ModelToolHandler>()
  const modelToolDetails = new Map<string, string>()
  const declaredProviders = new Set((manifest.contributes.paletteProviders ?? []).map((d) => d.id))
  const paletteItems = new Map<string, PaletteItem[]>()
  const runHandlers = new Map<string, Set<(itemId: string) => unknown>>()
  const paletteRefreshHandlers = new Map<string, Set<() => unknown>>()
  let project: WorkspaceProject | null = options.project ?? null
  const opens: string[] = []
  const folders = new Set<string>()
  const created: string[] = []
  const renames: { from: string; to: string; kind: 'file' | 'folder' }[] = []
  const copies: { from: string; to: string }[] = []
  const trashed: string[] = []
  const participants = new Set<RenameParticipant>()
  const imageDestinationHandlers = new Set<ImageDestinationHandler>()
  const textReplacementPairs: TextReplacement[] = []
  const rowActionHandlers = new Map<string, Set<RowActionHandler>>()
  const begunRowActions: { surfaceId: string; actionId: string; rowId: string }[] = []
  const searches: string[] = []
  const searchFolders: string[] = []
  let searchGate: Promise<void> | null = null
  let latestSearch = 0
  const selections: { path: string; from: number; to: number }[] = []
  const inputHandlers = new Map<string, Set<(value: string) => unknown>>()
  const reorderHandlers = new Map<string, Set<(event: ReorderEvent) => unknown>>()
  const itemEditHandlers = new Map<
    string,
    Set<(itemId: string, field: 'synopsis', value: string) => unknown>
  >()
  const formChangeHandlers = new Map<string, Set<(fieldId: string, value: FormValue) => unknown>>()
  const diffActionHandlers = new Map<
    string,
    Set<(action: DiffAction, changeId: string) => unknown>
  >()
  const formSubmitHandlers = new Map<string, Set<(values: Record<string, FormValue>) => unknown>>()
  const shown: string[] = []
  const shownFocus: (string | undefined)[] = []
  const closed: string[] = []
  const changedListeners = new Set<() => void>()
  const selectionListeners = new Set<(selection: EditorSelection) => void>()
  let selection: EditorSelection = { from: 0, to: 0, origin: 'plugin' }
  const currentSelection = (): EditorSelection | null => {
    if (text === null) return null
    const clamp = (n: number): number => Math.min(Math.max(0, n), text?.length ?? 0)
    return { from: clamp(selection.from), to: clamp(selection.to), origin: selection.origin }
  }
  const fireChanged = (): void => {
    for (const listener of [...changedListeners]) listener()
  }
  const under = (path: string, target: string): boolean =>
    path === target || path.startsWith(`${target}/`)
  /** Every file path, the open document included. */
  const allPaths = (): string[] => {
    const out = new Set(files.keys())
    if (openPath !== undefined) out.add(openPath)
    return [...out]
  }
  /** What is at `path`: a file, a folder (made empty, or holding a file), or nothing. */
  const kindAt = (path: string): 'file' | 'folder' | null => {
    if (allPaths().includes(path)) return 'file'
    if (folders.has(path) || allPaths().some((p) => p.startsWith(`${path}/`))) return 'folder'
    return null
  }
  /** Main's checks for a new path: a project, inside it, a name not starting with a dot. */
  const checkNew = (path: string): void => {
    const base = path.split('/').pop() ?? ''
    if (
      project?.kind !== 'project' ||
      path.startsWith('/') ||
      path.split('/').includes('..') ||
      base === '' ||
      base.startsWith('.')
    ) {
      throw veneerError(VAULT_ERROR.outOfScope, 'that name is not allowed', manifest.id)
    }
    if (kindAt(path) !== null) {
      throw veneerError(VAULT_ERROR.exists, 'that name is already taken', manifest.id)
    }
  }
  const undeclared = (id: string): unknown =>
    veneerError(
      PLUGIN_ERROR.undeclaredContribution,
      `${id} is not declared in the manifest`,
      manifest.id
    )
  const checkProvider = (id: string): void => {
    if (!declaredProviders.has(id)) throw undeclared(id)
  }
  /** Adds `handler` to `id`'s set in `map`, tracked for unload. */
  const addHandler = <H>(map: Map<string, Set<H>>, id: string, handler: H): Disposable => {
    const set = map.get(id) ?? new Set<H>()
    map.set(id, set)
    set.add(handler)
    return track(() => set.delete(handler))
  }
  /** History needs a project, as the real one does: a loose file rejects (no project set is fine). */
  const historyRoot = (): void => {
    if (project?.kind === 'loose') {
      throw veneerError(HISTORY_ERROR.noProject, 'History needs a project folder.', manifest.id)
    }
  }
  /** Project data needs a project, as the real one does: a loose file rejects. */
  const projectDataProject = (): void => {
    if (project?.kind === 'loose') {
      throw veneerError(
        PROJECT_DATA_ERROR.noProject,
        'Project data needs a project folder; a single file has none.',
        manifest.id
      )
    }
  }
  const historyRepo = (): void => {
    historyRoot()
    if (!history.repository) {
      throw veneerError(
        HISTORY_ERROR.notRepository,
        'This project has no history yet.',
        manifest.id
      )
    }
  }
  const plainCommit = (c: FakeHistoryCommit): HistoryCommit => ({
    id: c.id,
    message: c.message,
    body: c.body,
    author: { ...c.author },
    date: c.date,
    parents: [...c.parents]
  })
  const commitById = (id: string | null): FakeHistoryCommit | undefined =>
    id === null ? undefined : history.commits.find((c) => c.id === id)
  const headCommit = (): FakeHistoryCommit | undefined =>
    commitById(history.branches.get(history.current) ?? null)
  /** The closed files plus the open document's current text, as a save would commit them. */
  const currentFiles = (): Record<string, string> => {
    const snapshot: Record<string, string> = Object.fromEntries(files)
    if (openPath !== undefined && text !== null) snapshot[openPath] = text
    return snapshot
  }
  /** The project's files become `next` (a switch or merge); the open document follows. */
  const loadFiles = (next: Record<string, string>): void => {
    files.clear()
    for (const [path, content] of Object.entries(next))
      if (path !== openPath) files.set(path, content)
    if (openPath !== undefined) text = next[openPath] ?? null
    fireChanged()
  }
  const ancestors = (id: string): Set<string> => {
    const seen = new Set<string>()
    const queue = [id]
    while (queue.length > 0) {
      const c = commitById(queue.pop() ?? null)
      if (c === undefined || seen.has(c.id)) continue
      seen.add(c.id)
      queue.push(...c.parents)
    }
    return seen
  }
  const requireFakeBranch = (name: string): void => {
    if (!history.branches.has(name)) {
      throw veneerError(HISTORY_ERROR.notFound, 'There is no branch with that name.', manifest.id)
    }
  }
  const requireFakeClean = (doing: string): void => {
    if (!sameFiles(headCommit()?.files ?? {}, currentFiles())) {
      throw veneerError(HISTORY_ERROR.uncommitted, `Save a point before ${doing}.`, manifest.id)
    }
  }
  const addCommit = (
    message: string,
    parents: string[],
    snapshot: Record<string, string>,
    branch: string
  ): HistoryCommit => {
    const cut = message.indexOf('\n')
    const commit: FakeHistoryCommit = {
      id: (history.commits.length + 1).toString(16).padStart(40, '0'),
      message: cut === -1 ? message : message.slice(0, cut).trim(),
      body: cut === -1 ? '' : message.slice(cut + 1).trim(),
      author: { name: 'Fake Writer', email: 'writer@example.com' },
      date: new Date().toISOString(),
      parents,
      files: snapshot
    }
    history.commits.push(commit)
    history.branches.set(branch, commit.id)
    const plain = plainCommit(commit)
    void emitEvent({ type: 'history:saved', commit: plain } as HistorySavedEvent)
    return plain
  }
  const sameFiles = (a: Record<string, string>, b: Record<string, string>): boolean => {
    const keys = Object.keys(a)
    return keys.length === Object.keys(b).length && keys.every((k) => a[k] === b[k])
  }
  const emitEvent = async (event: VeneerEvent): Promise<void> => {
    for (const listener of [...(listeners.get(event.type) ?? [])]) await listener(event)
  }
  const checkSurface = (id: string): void => {
    if (!declaredSurfaces.has(id)) {
      throw veneerError(
        PLUGIN_ERROR.undeclaredContribution,
        `${id} is not declared in the manifest`,
        manifest.id
      )
    }
  }
  const settingOf = (id: string): SettingValue => {
    const declaration = declaredSettings.get(id)
    // The page's view modes may be read by any plugin (0.55.0); the fake host has them off.
    if (
      declaration === undefined &&
      (id === 'editor:typewriter-mode' || id === 'editor:focus-mode')
    ) {
      return settingValues.get(id) ?? false
    }
    if (declaration === undefined) {
      throw veneerError(
        PLUGIN_ERROR.undeclaredContribution,
        `${id} is not declared in the manifest`,
        manifest.id
      )
    }
    return settingValues.get(id) ?? declaration.default
  }
  const tagged = (err: unknown): unknown =>
    isVeneerError(err) ? { ...err, pluginId: manifest.id } : err

  /** One edit to the open document, as `applyResult` would apply it. */
  const applyEdit = (changes: TextChange[]): void => {
    if (text === null) {
      throw veneerError(EDITOR_ERROR.unavailable, 'No document is open', manifest.id)
    }
    try {
      checkTextChanges(changes, text.length)
    } catch (err) {
      throw tagged(err)
    }
    if (changes.length === 0) return
    text = applyChanges(text, changes)
    edits.push({ source, changes: changes.map((c) => ({ ...c })) })
    fireChanged()
  }

  const track = (undo: () => void): Disposable => {
    const disposable: Disposable = {
      dispose: () => {
        if (!live.delete(disposable)) return
        undo()
      }
    }
    live.add(disposable)
    return disposable
  }

  const api: PluginApi = {
    pluginId: manifest.id,
    apiVersion: API_VERSION,
    commands: {
      handle(id, handler) {
        if (!declared.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            `${id} is not declared in the manifest`,
            manifest.id
          )
        }
        if (handlers.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.duplicateHandler,
            `${id} already has a handler`,
            manifest.id
          )
        }
        handlers.set(id, handler)
        return track(() => handlers.delete(id))
      },
      async run(id) {
        commandsRun.push(id)
        const handler = handlers.get(id)
        if (handler === undefined) {
          throw veneerError(PLUGIN_ERROR.unknownCommand, `${id} is not a command`, manifest.id)
        }
        await handler()
      }
    },
    sound: {
      play(id, soundOptions) {
        if (!declaredSounds.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            `${id} is not declared in the manifest`,
            manifest.id
          )
        }
        sounds.push({ id, volume: soundOptions?.volume ?? 1, loop: false, stopped: false })
      },
      loop(id, soundOptions) {
        if (!declaredSounds.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            `${id} is not declared in the manifest`,
            manifest.id
          )
        }
        const entry = { id, volume: soundOptions?.volume ?? 1, loop: true, stopped: false }
        sounds.push(entry)
        return track(() => {
          entry.stopped = true
        })
      }
    },
    tools: {
      handle(id, handler) {
        if (!declaredTools.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            `${id} is not declared in the manifest`,
            manifest.id
          )
        }
        if (toolHandlers.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.duplicateHandler,
            `${id} already has a handler`,
            manifest.id
          )
        }
        toolHandlers.set(id, handler)
        return track(() => toolHandlers.delete(id))
      }
    },
    events: {
      on(name, listener) {
        const set = listeners.get(name) ?? new Set<EventListener>()
        listeners.set(name, set)
        set.add(listener)
        return track(() => set.delete(listener))
      }
    },
    editor: {
      registerHost(factory) {
        if (manifest.contributes.editorHost !== true) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            'contributes.editorHost is not declared in the manifest',
            manifest.id
          )
        }
        if (hostFactory !== null) {
          throw veneerError(
            EDITOR_ERROR.hostTaken,
            'an editor host is already registered',
            manifest.id
          )
        }
        hostFactory = factory
        return track(() => {
          if (hostFactory === factory) hostFactory = null
        })
      },
      registerMode(id, extension) {
        if (!declaredModes.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            `${id} is not declared in the manifest`,
            manifest.id
          )
        }
        if (modes.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.duplicateHandler,
            `${id} is already registered`,
            manifest.id
          )
        }
        modes.set(id, extension)
        return track(() => {
          if (modes.get(id) === extension) modes.delete(id)
        })
      },
      registerBlockRenderer(id, render) {
        if (!declaredRenderers.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            `${id} is not declared in the manifest`,
            manifest.id
          )
        }
        if (blockRenderers.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.duplicateHandler,
            `${id} is already registered`,
            manifest.id
          )
        }
        blockRenderers.set(id, render)
        return track(() => {
          if (blockRenderers.get(id) === render) blockRenderers.delete(id)
        })
      },
      onRenderSyntax(id, render) {
        if (!declaredSyntax.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            `${id} is not declared in the manifest`,
            manifest.id
          )
        }
        if (syntaxRenderers.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.duplicateHandler,
            `${id} is already registered`,
            manifest.id
          )
        }
        syntaxRenderers.set(id, render)
        return track(() => {
          if (syntaxRenderers.get(id) === render) syntaxRenderers.delete(id)
        })
      },
      onSyntaxClick(id, handler) {
        if (!declaredSyntax.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            `${id} is not declared in the manifest`,
            manifest.id
          )
        }
        syntaxClicks.set(id, handler)
        return track(() => {
          if (syntaxClicks.get(id) === handler) syntaxClicks.delete(id)
        })
      },
      getText: () => text,
      getSelection: currentSelection,
      edit(changes) {
        applyEdit(Array.isArray(changes) ? changes : [changes])
      },
      onChanged(listener) {
        changedListeners.add(listener)
        return track(() => changedListeners.delete(listener))
      },
      onSelectionChanged(listener) {
        selectionListeners.add(listener)
        return track(() => selectionListeners.delete(listener))
      },
      onTyping(listener) {
        typingListeners.add(listener)
        return track(() => typingListeners.delete(listener))
      },
      setMarks(setId, next) {
        let others = 0
        for (const [id, set] of marks) if (id !== setId) others += set.length
        const checked = checkMarks(next, others)
        if (!checked.ok) throw veneerError(PLUGIN_ERROR.badMarks, checked.message, manifest.id)
        if (checked.marks.length === 0) marks.delete(setId)
        else marks.set(setId, checked.marks)
      },
      onMarkClick(setId, handler) {
        return addHandler(markHandlers, setId, handler)
      }
    },
    vault: {
      async saveNow() {
        // The open document's text becomes what `read` returns, as a real save would.
        if (openPath !== undefined && text !== null) files.set(openPath, text)
      },
      async readFile(path) {
        const bytes = options.binaryFiles?.[path]
        if (!/\.(png|jpe?g|gif|webp|svg|docx)$/i.test(path) || bytes === undefined) {
          throw veneerError(
            VAULT_ERROR.outOfScope,
            'Only image files in the project can be read',
            manifest.id
          )
        }
        return bytes
      },
      async read(path) {
        const saved = files.get(path)
        if (saved === undefined) {
          throw veneerError(
            VAULT_ERROR.readFailed,
            'the file is missing or cannot be read',
            manifest.id
          )
        }
        return saved
      },
      async process(path, fn) {
        // Like the kernel: a non-string is a bad change, and endings become `\n`.
        const run = (before: string): string => {
          const next: unknown = fn(before)
          if (typeof next !== 'string') {
            throw veneerError(
              EDITOR_ERROR.badChange,
              'process must return the new text',
              manifest.id
            )
          }
          return next.replace(/\r\n?/g, '\n')
        }
        if (openPath !== undefined && path === openPath && text !== null) {
          const before = text
          const next = run(before)
          if (next !== before) {
            const span = changedSpan(before, next)
            applyEdit([span])
          }
          return next
        }
        const before = files.get(path)
        if (before === undefined) {
          throw veneerError(VAULT_ERROR.readFailed, 'the file does not exist', manifest.id)
        }
        const next = run(before)
        if (next !== before) files.set(path, next)
        return next
      },
      async saveImage(bytes, name) {
        // Predictable links: `image-<n>.png` for a paste, the dropped name otherwise.
        if (imageGate !== null) await imageGate
        if (imageFailure !== null) {
          images.push({ bytes, name, link: null })
          throw veneerError(imageFailure, 'the image could not be saved', manifest.id)
        }
        const file = name ?? `image-${images.length + 1}.png`
        const stem = file.replace(/\.[^.]*$/, '')
        const link = file
          .split('/')
          .map((part) => encodeURIComponent(part).replace(/\(/g, '%28').replace(/\)/g, '%29'))
          .join('/')
        images.push({ bytes, name, link })
        return { link, alt: stem.replace(/[\\[\]]/g, '\\$&') }
      },
      async saveAttachment(bytes, name) {
        if (imageGate !== null) await imageGate
        if (imageFailure !== null) {
          attachments.push({ bytes, name, link: null })
          throw veneerError(imageFailure, 'the file could not be saved', manifest.id)
        }
        if (bytes.byteLength > MAX_ATTACHMENT_BYTES) {
          attachments.push({ bytes, name, link: null })
          throw veneerError(VAULT_ERROR.tooLarge, 'the file is larger than 100 MB', manifest.id)
        }
        const link = name.includes(' ')
          ? `<${name}>`
          : name
              .split('/')
              .map((part) => encodeURIComponent(part).replace(/\(/g, '%28').replace(/\)/g, '%29'))
              .join('/')
        attachments.push({ bytes, name, link })
        return { link, label: name.replace(/[\\[\]]/g, '\\$&') }
      },
      async create(path, initial = '') {
        checkNew(path)
        if (!FAKE_MARKDOWN.test(path)) {
          throw veneerError(VAULT_ERROR.outOfScope, 'only markdown can be created', manifest.id)
        }
        files.set(path, initial)
        created.push(path)
        await emitEvent({ type: 'vault:created', path, kind: 'file' } as VeneerEvent)
      },
      async createFolder(path) {
        checkNew(path)
        folders.add(path)
        created.push(path)
        await emitEvent({ type: 'vault:created', path, kind: 'folder' } as VeneerEvent)
      },
      async rename(from, to) {
        const kind = kindAt(from)
        if (kind === null) {
          throw veneerError(VAULT_ERROR.readFailed, 'the file does not exist', manifest.id)
        }
        if (from === to) return
        if (kind === 'folder' && to.startsWith(`${from}/`)) {
          throw veneerError(VAULT_ERROR.outOfScope, 'a folder can’t move into itself', manifest.id)
        }
        checkNew(to)
        const move = (path: string): string =>
          under(path, from) ? to + path.slice(from.length) : path
        for (const [path, content] of [...files]) {
          if (!under(path, from)) continue
          files.delete(path)
          files.set(move(path), content)
        }
        for (const folder of [...folders]) {
          if (!under(folder, from)) continue
          folders.delete(folder)
          folders.add(move(folder))
        }
        if (openPath !== undefined) openPath = move(openPath)
        const rename = { from, to, kind }
        renames.push(rename)
        for (const participant of [...participants]) await participant({ ...rename })
        await emitEvent({ type: 'vault:renamed', ...rename } as VeneerEvent)
      },
      async copy(from, to) {
        if (kindAt(from) !== 'file') {
          throw veneerError(VAULT_ERROR.readFailed, 'the file does not exist', manifest.id)
        }
        checkNew(to)
        if (kindAt(to) !== null)
          throw veneerError(VAULT_ERROR.exists, 'that name is taken', manifest.id)
        files.set(to, files.get(from) ?? '')
        copies.push({ from, to })
        await emitEvent({ type: 'vault:created', path: to, kind: 'file' } as VeneerEvent)
      },
      async trash(path) {
        const kind = kindAt(path)
        if (kind === null) {
          throw veneerError(VAULT_ERROR.readFailed, 'the file does not exist', manifest.id)
        }
        for (const key of [...files.keys()]) if (under(key, path)) files.delete(key)
        for (const folder of [...folders]) if (under(folder, path)) folders.delete(folder)
        if (openPath !== undefined && under(openPath, path)) {
          openPath = undefined
          text = null
        }
        trashed.push(path)
        await emitEvent({ type: 'vault:trashed', path, kind } as VeneerEvent)
      },
      onImageDestination(handler) {
        imageDestinationHandlers.add(handler)
        return track(() => imageDestinationHandlers.delete(handler))
      },
      onRename(participant) {
        participants.add(participant)
        return track(() => participants.delete(participant))
      },
      async list() {
        if (project === null) return []
        const paths = new Set(files.keys())
        for (const bin of Object.keys(options.binaryFiles ?? {})) paths.add(bin)
        if (openPath !== undefined) paths.add(openPath)
        for (const folder of folders) paths.add(`${folder}/`)
        const out: VaultEntry[] = []
        if (project.kind === 'loose') {
          if (openPath !== undefined) {
            out.push({ path: openPath, name: openPath.split('/').pop() ?? openPath, kind: 'file' })
          }
          return out
        }
        const listed = new Set<string>()
        for (const path of [...paths].sort()) {
          const parts = path.split('/')
          for (let i = 1; i < parts.length; i++) {
            const folder = parts.slice(0, i).join('/')
            if (listed.has(folder)) continue
            listed.add(folder)
            out.push({ path: folder, name: parts[i - 1], kind: 'folder' })
          }
          const name = parts[parts.length - 1]
          if (FAKE_MARKDOWN.test(path)) out.push({ path, name, kind: 'file' })
          else if (FAKE_IMAGE.test(path)) out.push({ path, name, kind: 'image' })
        }
        return out
      },
      async search(query, searchOptions) {
        if (typeof query !== 'string' || query.length > MAX_SEARCH_QUERY) {
          throw veneerError(VAULT_ERROR.outOfScope, 'the query is too long', manifest.id)
        }
        if (query === '') return []
        searches.push(query)
        const folder = searchOptions?.folder ?? ''
        if (folder.startsWith('/') || folder.split('/').includes('..')) {
          throw veneerError(
            VAULT_ERROR.outOfScope,
            'that folder is outside the project',
            manifest.id
          )
        }
        searchFolders.push(folder)
        const mine = ++latestSearch
        if (searchGate !== null) await searchGate
        if (mine !== latestSearch) {
          throw veneerError(VAULT_ERROR.superseded, 'a newer search started', manifest.id)
        }
        if (project === null) return []
        const docs = new Map<string, string>()
        if (project.kind === 'project') {
          for (const [path, content] of files) if (FAKE_MARKDOWN.test(path)) docs.set(path, content)
        }
        if (openPath !== undefined && text !== null) docs.set(openPath, text)
        const out: SearchFileResult[] = []
        let left = MAX_SEARCH_MATCHES
        // Folder by folder, names by code unit, like the worker (`a/y.md` before `a.md`).
        const byFolder = (a: string, b: string): number => {
          const x = a.split('/')
          const y = b.split('/')
          for (let i = 0; i < Math.min(x.length, y.length); i++) {
            if (x[i] !== y[i]) return x[i] < y[i] ? -1 : 1
          }
          return x.length - y.length
        }
        const inFolder = (p: string): boolean => folder === '' || p.startsWith(`${folder}/`)
        for (const path of [...docs.keys()].filter(inFolder).sort(byFolder)) {
          if (left <= 0) break
          const matches = findInText((docs.get(path) ?? '').replace(/\r\n?/g, '\n'), query, left)
          if (matches.length === 0) continue
          left -= matches.length
          out.push({ path, matches })
        }
        return out
      },
      async query(query) {
        const clean = fakeQueryCheck(query)
        if (clean === null) {
          throw veneerError(VAULT_ERROR.outOfScope, 'That query is not valid', manifest.id)
        }
        const docs = new Map<string, string>()
        if (project?.kind === 'project') {
          for (const [path, content] of files) if (FAKE_MARKDOWN.test(path)) docs.set(path, content)
        }
        // The index holds what was saved, not unsaved typing.
        if (
          openPath !== undefined &&
          text !== null &&
          (project?.kind === 'loose' || !docs.has(openPath))
        ) {
          docs.set(openPath, files.get(openPath) ?? text)
        }
        return fakeQuery(
          [...docs].map(([path, content]) => fakeIndexEntry(path, content)),
          clean
        )
      },
      async backlinks(path) {
        if (typeof path !== 'string' || path === '' || path.length > MAX_QUERY_TEXT) {
          throw veneerError(VAULT_ERROR.outOfScope, 'That path is not valid', manifest.id)
        }
        if (project?.kind !== 'project') return []
        const prefix = `${path}/`
        return [...files]
          .filter(([p]) => FAKE_MARKDOWN.test(p))
          .map(([p, content]) => fakeIndexEntry(p, content))
          .filter((e) => e.links.some((l) => l === path || l.startsWith(prefix)))
          .map((e) => e.path)
          .sort(fakeByFolder)
      }
    },
    workspace: {
      projectType: () => (options.projectType === undefined ? null : options.projectType),
      async createFromTemplate(templateId, templateOptions) {
        const template = options.projectType?.templates?.find((t) => t.id === templateId)
        if (template === undefined) {
          throw veneerError(WORKSPACE_ERROR.noTemplate, 'No such template', manifest.id)
        }
        let when = new Date()
        if (templateOptions?.date !== undefined) {
          const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(templateOptions.date)
          const asked = parts === null ? null : new Date(+parts[1], +parts[2] - 1, +parts[3])
          if (asked === null || asked.getDate() !== Number(parts?.[3])) {
            throw veneerError(WORKSPACE_ERROR.badDate, 'date must be an ISO date', manifest.id)
          }
          when = asked
        }
        const fill = (text: string): string =>
          text
            .replace(/\{\{title\}\}/g, templateOptions?.title ?? '')
            .replace(/\{\{date:([^}]*)\}\}/g, (_m, format: string) =>
              formatDatePattern(format, when)
            )
        const pattern = templateOptions?.pattern ?? template.pattern
        if (
          !pattern.endsWith('.md') ||
          pattern.split('/').some((part) => part === '' || part.startsWith('.'))
        ) {
          throw veneerError(
            WORKSPACE_ERROR.badPattern,
            'that name pattern is not usable',
            manifest.id
          )
        }
        const bodyText = templateOptions?.body ?? template.body ?? ''
        const name = fill(pattern)
        const path = template.folder === undefined ? name : `${template.folder}/${name}`
        if (!files.has(path)) {
          if (templateOptions?.lazy === true) lazyPages.push({ path, text: fill(bodyText) })
          else files.set(path, fill(bodyText))
        }
        return path
      },
      async pick(pickOptions) {
        return pickOptions.items[0]?.id ?? null
      },
      async obsidianDailyNotes() {
        return options.obsidianDailyNotes === undefined || options.obsidianDailyNotes === null
          ? null
          : { ...options.obsidianDailyNotes }
      },
      setPageLook(look) {
        if (look !== null && look.font !== undefined && !declaredFonts.has(look.font)) {
          throw veneerError(WORKSPACE_ERROR.badLook, 'that font is not declared', manifest.id)
        }
        pageLook = look === null ? null : { ...look }
      },
      current: () => ({
        project: project === null ? null : { ...project },
        document: openPath ?? null
      }),
      async open(path, options) {
        const escapes =
          path.split('/').includes('..') || (path.startsWith('/') && project?.kind !== 'loose')
        if (project === null || escapes || !/\.(md|markdown)$/i.test(path)) {
          throw veneerError(VAULT_ERROR.outOfScope, 'That file is outside the project', manifest.id)
        }
        if (project.kind === 'loose' && path !== openPath) {
          throw veneerError(VAULT_ERROR.outOfScope, 'That file is outside the vault', manifest.id)
        }
        const next = path === openPath ? text : files.get(path)
        if (next === undefined) {
          throw veneerError(VAULT_ERROR.readFailed, 'the file does not exist', manifest.id)
        }
        if (options?.newWindow === true) {
          if (files.get(path) === undefined && path !== openPath) {
            throw veneerError(VAULT_ERROR.readFailed, 'the file does not exist', manifest.id)
          }
          openedInNewWindow.push(path)
          return
        }
        const select = options?.select
        if (select !== undefined) selections.push({ path, from: select.from, to: select.to })
        const moveSelection = (): void => {
          if (select === undefined) return
          selection = { from: select.from, to: select.to, origin: 'find' }
          const now = currentSelection()
          if (now !== null) for (const listener of [...selectionListeners]) listener(now)
        }
        // The open document only moves its selection; it isn't reopened.
        if (path === openPath && select !== undefined) return moveSelection()
        if (openPath !== undefined && openPath !== path && text !== null) files.set(openPath, text)
        files.delete(path)
        openPath = path
        marks.clear()
        text = next
        opens.push(path)
        selection = { from: 0, to: 0, origin: 'plugin' }
        fireChanged()
        await emitEvent({ type: 'document:opened', path } as VeneerEvent)
        moveSelection()
      },
      async openExternal(url) {
        const ok = /^(https?|obsidian|joplin):\/\//.test(String(url))
        if (!ok) {
          throw veneerError('workspace/refused', 'That kind of address does not open.', manifest.id)
        }
        openedExternal.push(String(url))
      },
      async pickImages() {
        return pickedImages.shift() ?? []
      },
      async textReplacements() {
        return textReplacementPairs.map((p) => ({ ...p }))
      },
      async reveal(path) {
        if (project === null || path.startsWith('/') || path.split('/').includes('..')) {
          throw veneerError(VAULT_ERROR.outOfScope, 'That file is outside the project', manifest.id)
        }
        revealedEntries.push(path)
      },
      async openFolder(path, folderOptions) {
        if (project === null || path.startsWith('/') || path.split('/').includes('..')) {
          throw veneerError(VAULT_ERROR.outOfScope, 'That file is outside the project', manifest.id)
        }
        openedFolders.push({ path, newWindow: folderOptions?.newWindow === true })
      },
      async revealImage(path) {
        if (
          !/\.(png|jpe?g|gif|webp|svg|bmp|avif)$/i.test(path) ||
          path.startsWith('/') ||
          path.split('/').includes('..')
        ) {
          throw veneerError(
            CLIPBOARD_ERROR.badImage,
            'That is not an image in the project.',
            manifest.id
          )
        }
        revealed.push(path)
      },
      async ask(options) {
        asked.push(options)
        const next = askAnswers.shift()
        return next === undefined ? null : next
      },
      async pickGrid() {
        const next = gridAnswers.shift()
        return next === undefined ? null : next
      },
      async openFolderAsProject() {
        if (openPath === undefined) {
          throw veneerError(VAULT_ERROR.unknownDocument, 'No document is open', manifest.id)
        }
        if (project?.kind !== 'loose') {
          throw veneerError(
            VAULT_ERROR.outOfScope,
            'The document is already in a project',
            manifest.id
          )
        }
        const parts = openPath.split('/')
        const name = parts[parts.length - 1]
        project = { name: parts[parts.length - 2] || 'Root', kind: 'project' }
        openPath = name
        const event: ProjectSwitchedEvent = { type: 'project:switched', ...project }
        await emitEvent(event)
      }
    },
    palette: {
      setItems(id, items) {
        checkProvider(id)
        const clean = cleanPaletteItems(items)
        if (clean === null) {
          throw veneerError(PLUGIN_ERROR.badItems, `${id} got malformed items`, manifest.id)
        }
        paletteItems.set(id, clean)
      },
      onRun(id, handler) {
        checkProvider(id)
        return addHandler(runHandlers, id, handler)
      },
      onRefresh(id, handler) {
        checkProvider(id)
        return addHandler(paletteRefreshHandlers, id, handler)
      }
    },
    providers: {
      async complete(request, signal) {
        let out = ''
        await this.stream(request, (piece) => (out += piece), signal)
        return out
      },
      async stream(request, onText, signal) {
        if (options.aiFeatures === false) {
          throw veneerError('ai/off', 'AI features are off in Settings.', manifest.id)
        }
        if (!needsModel) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            'api.providers needs a tool that declares needsProvider',
            manifest.id
          )
        }
        if (signal?.aborted === true) {
          throw veneerError('canceled', 'The request was canceled.', manifest.id)
        }
        const failure = options.providerFailure ?? null
        if (failure !== null) throw veneerError(failure.code, failure.message, manifest.id)
        const replies = options.replies ?? []
        if (replies.length === 0) {
          throw veneerError('provider/none', 'No model provider is set up yet.', manifest.id)
        }
        modelRequests.push(request)
        const reply = replies[Math.min(modelCalls, replies.length - 1)]
        modelCalls += 1
        for (const piece of typeof reply === 'string' ? [reply] : reply) onText(piece)
      },
      async image(request, signal) {
        if (options.aiFeatures === false) {
          throw veneerError('ai/off', 'AI features are off in Settings.', manifest.id)
        }
        if (!needsModel) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            'api.providers needs a tool that declares needsProvider',
            manifest.id
          )
        }
        if (signal?.aborted === true) {
          throw veneerError('canceled', 'The request was canceled.', manifest.id)
        }
        const replies = options.imageReplies ?? []
        if (replies.length === 0) {
          throw veneerError('provider/none', 'No image provider is set up yet.', manifest.id)
        }
        const reply = replies[Math.min(imageCalls, replies.length - 1)]
        imageCalls += 1
        if (reply !== 'ok') throw veneerError(reply.code, reply.message, manifest.id)
        imageRequests.push(request)
        const png = (n: number): Uint8Array =>
          new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, n])
        return {
          images: Array.from({ length: request.count ?? 1 }, (_, i) => png(i)),
          mime: 'image/png' as const
        }
      }
    },
    chat: {
      open(chatOptions) {
        if (options.aiFeatures === false) {
          return Promise.reject(
            veneerError(PLUGIN_ERROR.unavailable, 'AI features are off', manifest.id)
          )
        }
        const skill = chatOptions?.skill
        if (
          skill !== undefined &&
          !(
            skill.startsWith(`${manifest.id}:`) ||
            skill.startsWith('skill.user:') ||
            skill.startsWith('skill.project:')
          )
        ) {
          return Promise.reject(
            veneerError(
              CHAT_ERROR.skillNotAllowed,
              'A plugin can open the chat only with its own skill or one of the writer’s',
              manifest.id
            )
          )
        }
        chatOpened.push({ ...chatOptions })
        return Promise.resolve()
      },
      onSessionEnded(handler) {
        chatEndHandlers.add(handler)
        return track(() => chatEndHandlers.delete(handler))
      }
    },
    plugins: {
      list() {
        return Promise.resolve(
          [manifest, ...(options.installedPlugins ?? [])].map((m) => ({
            id: m.id,
            name: m.name,
            version: m.version,
            description: m.description ?? '',
            kind: m.main === undefined ? ('theme' as const) : ('plugin' as const),
            tier: 'installed' as const,
            enabled: true,
            contributions: Object.fromEntries(
              Object.entries(m.contributes)
                .filter(([, value]) => Array.isArray(value) && value.length > 0)
                .map(([kind, value]) => [kind, (value as unknown[]).length])
            )
          }))
        )
      },
      manifest(id) {
        const found = [manifest, ...(options.installedPlugins ?? [])].find((m) => m.id === id)
        return found === undefined
          ? Promise.reject(veneerError(PLUGIN_ERROR.unknownPlugin, `No plugin ${id}`, manifest.id))
          : Promise.resolve(JSON.parse(JSON.stringify(found)) as PluginManifest)
      }
    },
    ai: {
      enabled: () => options.aiFeatures !== false,
      // The fake's switch is fixed for the run; nothing changes it.
      onChanged: () => ({ dispose: () => undefined }),
      describeModelTool(id, detail) {
        if (!declaredModelTools.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            `${id} is not declared in the manifest`,
            manifest.id
          )
        }
        modelToolDetails.set(id, String(detail).replace(/\s+/g, ' ').trim().slice(0, 120))
      },
      onModelTool(id, handler) {
        if (!declaredModelTools.has(id)) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            `${id} is not declared in the manifest`,
            manifest.id
          )
        }
        modelToolHandlers.set(id, handler)
        return track(() => modelToolHandlers.delete(id))
      }
    },
    net: {
      async fetch(request, signal) {
        if (signal?.aborted === true) {
          throw veneerError('canceled', 'The request was canceled.', manifest.id)
        }
        const replies = options.netReplies ?? []
        if (replies.length === 0) {
          throw veneerError('offline', 'The site could not be reached.', manifest.id)
        }
        netRequests.push(request)
        const reply = replies[Math.min(netCalls, replies.length - 1)]
        netCalls += 1
        const part = typeof reply === 'string' ? { text: reply } : reply
        const status = part.status ?? 200
        return {
          status,
          ok: status >= 200 && status < 300,
          headers: part.headers ?? {},
          text: part.text ?? '',
          ...(part.data === undefined ? {} : { data: part.data }),
          truncated: part.truncated ?? false
        }
      }
    },
    sources: {
      async pickFolder() {
        sourceGate()
        const next = (options.sourceFolders ?? [])[sourcePicks]
        if (next === undefined) return null
        sourcePicks += 1
        const folder = { id: `src-${sourcePicks}`, name: next.name, markers: next.markers ?? [] }
        grantedSources.push(folder)
        return folder
      },
      async folders() {
        sourceGate()
        return grantedSources.map((f) => ({ ...f }))
      },
      async remove(id) {
        sourceGate()
        const at = grantedSources.findIndex((f) => f.id === id)
        if (at !== -1) grantedSources.splice(at, 1)
      },
      async list(id, dir = '') {
        const files = sourceFiles(id)
        const clean = sourcePath(dir)
        const prefix = clean === '' ? '' : `${clean}/`
        const seen = new Map<string, 'file' | 'folder'>()
        for (const path of Object.keys(files)) {
          if (!path.startsWith(prefix)) continue
          const rest = path.slice(prefix.length)
          const slash = rest.indexOf('/')
          if (slash === -1) seen.set(rest, 'file')
          else seen.set(rest.slice(0, slash), 'folder')
        }
        return [...seen]
          .map(([name, kind]) => ({ name, path: prefix + name, kind }))
          .sort((a, b) =>
            a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === 'folder' ? -1 : 1
          )
      },
      async read(id, path) {
        const files = sourceFiles(id)
        const text = files[sourcePath(path)]
        if (text === undefined) {
          throw veneerError(SOURCES_ERROR.notFound, 'That is not in the folder.', manifest.id)
        }
        return text
      },
      async search(id, query, searchOptions) {
        const files = sourceFiles(id)
        const cap = Math.min(searchOptions?.limit ?? MAX_SOURCE_HITS, MAX_SOURCE_HITS)
        const hits: SourceHit[] = []
        for (const [path, text] of Object.entries(files)) {
          if (!path.endsWith('.md') || hits.length >= cap) continue
          const found = findInText(text, query, 1)[0]
          if (found === undefined) continue
          const heading = /^#\s+(.+)$/m.exec(text)?.[1]
          hits.push({
            path,
            title: heading ?? (path.split('/').pop() ?? path).replace(/\.md$/, ''),
            line: found.line,
            snippet: found.snippet
          })
        }
        return hits
      }
    },
    secrets: {
      async get(name) {
        return secrets.get(secretName(name)) ?? null
      },
      async set(name, value) {
        if (typeof value !== 'string' || value.length > 8192) {
          throw veneerError(STORAGE_ERROR.badSecret, 'That secret is not valid.', manifest.id)
        }
        secrets.set(secretName(name), value)
      },
      async delete(name) {
        secrets.delete(secretName(name))
      }
    },
    notify(notice) {
      const message = typeof notice?.message === 'string' ? notice.message.trim() : ''
      const bad = (why: string): unknown =>
        veneerError(PLUGIN_ERROR.badNotice, `A notice ${why}.`, manifest.id)
      if (message === '' || message.length > MAX_NOTICE_MESSAGE || /[\r\n]/.test(message)) {
        throw bad('needs one plain sentence on one line')
      }
      const action = notice.action
      if (action !== undefined) {
        if (
          typeof action.label !== 'string' ||
          action.label.trim() === '' ||
          action.label.trim().length > MAX_NOTICE_ACTION_LABEL
        ) {
          throw bad('needs a short action label')
        }
        if (!declaredSurfaces.has(action.surface)) {
          throw veneerError(
            PLUGIN_ERROR.undeclaredContribution,
            `${String(action.surface)} is not declared in the manifest`,
            manifest.id
          )
        }
      }
      const now = Date.now()
      noticeTimes = noticeTimes.filter((t) => now - t < 60_000)
      if (noticeTimes.length >= NOTICE_LIMIT_PER_MINUTE) return
      noticeTimes.push(now)
      notices.push(
        action === undefined
          ? { message }
          : { message, action: { label: action.label.trim(), surface: action.surface } }
      )
    },
    projectData: {
      async read(key) {
        projectDataKey(key)
        projectDataProject()
        const text = projectData.get(key)
        return text === undefined ? null : JSON.parse(text)
      },
      async write(key, value) {
        projectDataKey(key)
        projectDataProject()
        const json = JSON.stringify(value)
        if (json === undefined) {
          throw veneerError(PROJECT_DATA_ERROR.tooLarge, 'That value cannot be saved as JSON.')
        }
        const text = `${JSON.stringify(value, null, 2)}\n`
        let total = text.length
        for (const [other, held] of projectData) if (other !== key) total += held.length
        if (text.length > MAX_PROJECT_DATA_KEY_BYTES || total > MAX_PROJECT_DATA_PLUGIN_BYTES) {
          throw veneerError(PROJECT_DATA_ERROR.tooLarge, 'That is too much data to keep.')
        }
        projectData.set(key, text)
      },
      async delete(key) {
        projectDataKey(key)
        projectDataProject()
        projectData.delete(key)
      },
      async keys() {
        projectDataProject()
        return [...projectData.keys()].sort()
      }
    },
    history: {
      async isRepository() {
        historyRoot()
        return history.repository
      },
      async init() {
        historyRoot()
        if (history.repository) return false
        history.repository = true
        return true
      },
      async save(message) {
        historyRepo()
        const summary = typeof message === 'string' ? message.trim() : ''
        if (summary === '') {
          throw veneerError(HISTORY_ERROR.invalid, 'A save point needs a message.', manifest.id)
        }
        const head = headCommit()
        const snapshot = currentFiles()
        if (head !== undefined && sameFiles(head.files, snapshot)) return null
        return addCommit(summary, head === undefined ? [] : [head.id], snapshot, history.current)
      },
      async log(logOptions = {}) {
        historyRepo()
        let tip = headCommit()
        if (logOptions.branch !== undefined) {
          if (!history.branches.has(logOptions.branch)) {
            throw veneerError(
              HISTORY_ERROR.notFound,
              'There is no branch with that name.',
              manifest.id
            )
          }
          tip = commitById(history.branches.get(logOptions.branch) ?? null)
        }
        const limit = Math.min(Math.max(1, Math.floor(logOptions.limit ?? 100)), MAX_HISTORY_LOG)
        const out: HistoryCommit[] = []
        for (
          let c = tip;
          c !== undefined && out.length < limit;
          c = commitById(c.parents[0] ?? null)
        ) {
          const path = logOptions.path
          const parent = commitById(c.parents[0] ?? null)
          if (path !== undefined && c.files[path] === parent?.files[path]) continue
          out.push(plainCommit(c))
        }
        return out
      },
      async show(commit, path) {
        historyRepo()
        const found =
          commit.length >= 4
            ? history.commits.filter((c) => c.id.startsWith(commit.toLowerCase()))
            : []
        const text = found.length === 1 ? found[0].files[path] : undefined
        if (text === undefined) {
          throw veneerError(
            HISTORY_ERROR.notFound,
            "That save point or file isn't there.",
            manifest.id
          )
        }
        return text
      },
      async branches() {
        historyRepo()
        return [...history.branches.keys()].sort().map((name) => ({
          name,
          current: name === history.current,
          commit: history.branches.get(name) ?? null
        }))
      },
      async createBranch(name) {
        historyRepo()
        const head = headCommit()
        if (head === undefined) {
          throw veneerError(
            HISTORY_ERROR.invalid,
            'Make a first save point before a branch.',
            manifest.id
          )
        }
        if (history.branches.has(name)) {
          throw veneerError(
            HISTORY_ERROR.exists,
            'A branch with that name already exists.',
            manifest.id
          )
        }
        history.branches.set(name, head.id)
      },
      async switchTo(name) {
        historyRepo()
        requireFakeBranch(name)
        if (name === history.current) return
        requireFakeClean('switching')
        history.current = name
        loadFiles(headCommit()?.files ?? {})
        await emitEvent({ type: 'history:switched', branch: name } as VeneerEvent)
      },
      async merge(name) {
        historyRepo()
        requireFakeBranch(name)
        const ours = headCommit()
        const theirs = commitById(history.branches.get(name) ?? null)
        if (ours === undefined || theirs === undefined || name === history.current) {
          throw veneerError(HISTORY_ERROR.invalid, 'There is nothing to merge.', manifest.id)
        }
        requireFakeClean('merging')
        if (ancestors(ours.id).has(theirs.id)) return null
        if (ancestors(theirs.id).has(ours.id)) {
          history.branches.set(history.current, theirs.id)
          loadFiles(theirs.files)
          return plainCommit(theirs)
        }
        // Three-way, by whole file: a file changed on both sides since the base conflicts.
        const base = [...ancestors(ours.id)]
          .map(commitById)
          .find((c) => c !== undefined && ancestors(theirs.id).has(c.id))
        const merged: Record<string, string> = {}
        const conflicts: string[] = []
        const paths = new Set([...Object.keys(ours.files), ...Object.keys(theirs.files)])
        for (const path of paths) {
          const b = base?.files[path]
          const o = ours.files[path]
          const t = theirs.files[path]
          const pick = o === t || t === b ? o : o === b ? t : undefined
          if (pick === undefined && o !== t) conflicts.push(path)
          else if (pick !== undefined) merged[path] = pick
        }
        if (conflicts.length > 0) {
          throw veneerError(
            HISTORY_ERROR.conflict,
            `Merging ${name} conflicts in ${conflicts.join(', ')}; nothing changed.`,
            manifest.id
          )
        }
        const commit = addCommit(
          `Merge ${name} into ${history.current}`,
          [ours.id, theirs.id],
          merged,
          history.current
        )
        loadFiles(merged)
        return commit
      },
      async tags() {
        historyRepo()
        return [...history.tags.entries()]
          .sort(([a], [b]) => (a < b ? -1 : 1))
          .map(([name, t]) => ({ name, ...t }))
      },
      async createTag(name, commit, message) {
        historyRepo()
        if (history.tags.has(name)) {
          throw veneerError(
            HISTORY_ERROR.exists,
            'A tag with that name already exists.',
            manifest.id
          )
        }
        const target =
          commit === undefined ? headCommit() : history.commits.find((c) => c.id.startsWith(commit))
        if (target === undefined) {
          throw veneerError(
            HISTORY_ERROR.notFound,
            'There is no save point with that ID.',
            manifest.id
          )
        }
        history.tags.set(name, { commit: target.id, message: message?.trim() ?? '' })
      },
      async commitOn(branch, message, commitOptions) {
        historyRepo()
        requireFakeBranch(branch)
        if (
          commitOptions?.allowEmpty !== true ||
          typeof message !== 'string' ||
          message.trim() === ''
        ) {
          throw veneerError(
            HISTORY_ERROR.invalid,
            'A commit on another branch needs a message and allowEmpty: true.',
            manifest.id
          )
        }
        const tip = commitById(history.branches.get(branch) ?? null)
        return addCommit(
          message.trim(),
          tip === undefined ? [] : [tip.id],
          tip?.files ?? {},
          branch
        )
      },
      async remotes() {
        historyRepo()
        return [...history.remotes.entries()]
          .sort(([a], [b]) => (a < b ? -1 : 1))
          .map(([name, url]) => ({ name, url }))
      },
      async setRemote(name, url) {
        historyRepo()
        if (/^ssh:\/\//i.test(url) || /^[\w.-]+@[\w.-]+:/.test(url)) {
          throw veneerError(
            HISTORY_ERROR.sshUnsupported,
            'Only HTTPS remotes work; this one uses SSH.',
            manifest.id
          )
        }
        history.remotes.set(name, url)
      },
      async sync(syncOptions = {}) {
        historyRepo()
        if (!history.remotes.has(syncOptions.remote ?? 'origin')) {
          throw veneerError(
            HISTORY_ERROR.notFound,
            'There is no remote with that name.',
            manifest.id
          )
        }
        requireFakeClean('syncing')
        history.syncs.push({ ...syncOptions })
        return (
          history.syncResult ?? {
            fetched: false,
            merged: 'none',
            pushed: true,
            upToDate: false,
            commit: null
          }
        )
      }
    },
    export: {
      async saveAs(file) {
        if (file.data.byteLength > MAX_NET_BYTES) {
          throw veneerError(STORAGE_ERROR.tooLarge, 'That file is too large to save.', manifest.id)
        }
        exported.push(file)
        return { saved: true, name: file.suggestedName }
      }
    },
    clipboard: {
      async readText() {
        return clipboard.text
      },
      async write(content) {
        const html = content?.html
        if (
          typeof content?.text !== 'string' ||
          (html !== undefined && typeof html !== 'string') ||
          content.text.length > MAX_CLIPBOARD_BYTES ||
          (html !== undefined && html.length > MAX_CLIPBOARD_BYTES)
        ) {
          throw veneerError(
            CLIPBOARD_ERROR.invalid,
            'The clipboard takes text and HTML.',
            manifest.id
          )
        }
        clipboard.text = content.text
        clipboard.html = html ?? null
        clipboard.image = null
      },
      async writePath(path, form) {
        if (
          path === '' ||
          path.startsWith('/') ||
          path.split('/').some((p) => p === '..' || p === '')
        ) {
          throw veneerError(
            CLIPBOARD_ERROR.invalid,
            'That path is not in the open project.',
            manifest.id
          )
        }
        clipboard.text = form === 'project' ? path : `/fake-project/${path}`
        clipboard.html = null
        clipboard.image = null
      },
      async writeImage(path) {
        if (
          !/\.(png|jpe?g|gif|webp|svg|bmp|avif)$/i.test(path) ||
          path.startsWith('/') ||
          path.split('/').includes('..')
        ) {
          throw veneerError(
            CLIPBOARD_ERROR.badImage,
            'That is not an image in the project.',
            manifest.id
          )
        }
        clipboard.text = ''
        clipboard.html = null
        clipboard.image = path
      }
    },
    resources: {
      // Text only: the fake never builds DOM from the HTML, so nothing in it can run.
      sanitizeHtml(html) {
        const fragment = document.createDocumentFragment()
        fragment.append(html)
        return fragment
      },
      // Text only, like `sanitizeHtml`.
      sanitizeSvg(svg) {
        const fragment = document.createDocumentFragment()
        fragment.append(svg)
        return fragment
      },
      imageSource(src) {
        const s = src.trim()
        if (/^data:image\//i.test(s)) return s
        if (isRelativeSource(s)) return `veneer-doc://img?p=${encodeURIComponent(s)}&g=0`
        if (!isRemoteSource(s) || !remoteAllowed) return null
        const url = s.startsWith('//') ? `https:${s}` : s
        return `veneer-remote://img?u=${encodeURIComponent(url)}`
      },
      onChanged(listener) {
        resourceListeners.add(listener)
        return track(() => resourceListeners.delete(listener))
      },
      reload() {
        reloads += 1
        for (const listener of [...resourceListeners]) listener()
      }
    },
    settings: {
      get: async (id) => settingOf(id),
      onChanged(listener) {
        settingListeners.add(listener)
        return track(() => settingListeners.delete(listener))
      }
    },
    surfaces: {
      setView(id, view) {
        checkSurface(id)
        const clean = cleanSurfaceView(view)
        if (clean === null) {
          throw veneerError(PLUGIN_ERROR.badView, `${id} got a malformed view`, manifest.id)
        }
        views.set(id, clean)
      },
      onOpen(id, handler) {
        checkSurface(id)
        return addHandler(openHandlers, id, handler)
      },
      onAction(id, handler) {
        checkSurface(id)
        return addHandler(actionHandlers, id, handler)
      },
      onRefresh(id, handler) {
        checkSurface(id)
        return addHandler(refreshHandlers, id, handler)
      },
      onRowAction(id, handler) {
        // A surface the plugin owns, or one it contributes a row action to (Story 17.1).
        if (!(manifest.contributes.rowActions ?? []).some((a) => a.surface === id)) {
          checkSurface(id)
        }
        return addHandler(rowActionHandlers, id, handler)
      },
      beginRowAction(id, actionId, rowId) {
        checkSurface(id)
        const surface = manifest.contributes.surfaces?.find((d) => d.id === id)
        if (!(surface?.rowActions ?? []).some((a) => a.id === actionId)) throw undeclared(actionId)
        begunRowActions.push({ surfaceId: id, actionId, rowId })
      },
      onInput(id, handler) {
        checkSurface(id)
        return addHandler(inputHandlers, id, handler)
      },
      onReorder(id, handler) {
        checkSurface(id)
        return addHandler(reorderHandlers, id, handler)
      },
      onItemEdit(id, handler) {
        checkSurface(id)
        return addHandler(itemEditHandlers, id, handler)
      },
      onFormChange(id, handler) {
        checkSurface(id)
        return addHandler(formChangeHandlers, id, handler)
      },
      onFormSubmit(id, handler) {
        checkSurface(id)
        return addHandler(formSubmitHandlers, id, handler)
      },
      onDiffAction(id, handler) {
        checkSurface(id)
        return addHandler(diffActionHandlers, id, handler)
      },
      show(id, options) {
        checkSurface(id)
        shown.push(id)
        shownFocus.push(options?.focus)
      },
      close(id) {
        checkSurface(id)
        closed.push(id)
      }
    }
  }

  return {
    api,
    history,
    modelRequests,
    imageRequests,
    chatOpened,
    endChatSession: (event) => {
      for (const handler of [...chatEndHandlers]) handler(event)
    },
    netRequests,
    secrets,
    projectData,
    notices,
    projectDataChanged: (key) =>
      emitEvent({ type: 'project-data:changed', key } as ProjectDataChangedEvent),
    exported,
    clipboard,
    gridAnswers,
    askAnswers,
    asked,
    get reloadCount() {
      return reloads
    },
    revealed,
    revealedEntries,
    openedFolders,
    openedInNewWindow,
    lazyPages,
    sounds,
    get pageLook() {
      return pageLook
    },
    typing(kind) {
      for (const listener of [...typingListeners]) listener(kind)
    },
    commandsRun,
    pickedImages,
    async load() {
      await entry.onload(api)
    },
    async run(commandId, ...args) {
      const handler = handlers.get(commandId)
      if (handler === undefined) {
        throw veneerError(PLUGIN_ERROR.noHandler, `${commandId} has no handler`, manifest.id)
      }
      return await handler(...args)
    },
    emit: emitEvent,
    async switchProject(nextProject, next = {}) {
      files.clear()
      for (const [path, content] of Object.entries(next.files ?? {})) files.set(path, content)
      openPath = next.openPath
      marks.clear()
      text = next.openPath === undefined ? null : (next.text ?? null)
      const event: ProjectSwitchedEvent = {
        type: 'project:switched',
        name: nextProject.name,
        kind: nextProject.kind ?? 'project'
      }
      project = { name: event.name, kind: event.kind }
      fireChanged()
      await emitEvent(event)
    },
    async unload() {
      try {
        await entry.onunload?.()
      } finally {
        for (const d of [...live]) d.dispose()
      }
    },
    liveDisposables: () => live.size,
    text: () => text,
    setText(next) {
      text = next
    },
    changeText(next) {
      text = next
      fireChanged()
    },
    setSelection(next) {
      selection = { from: next.from, to: next.to, origin: next.origin ?? 'keyboard' }
      const now = currentSelection()
      if (now === null) return
      for (const listener of [...selectionListeners]) listener(now)
    },
    edits,
    modes,
    blockRenderers,
    syntaxRenderers,
    syntaxClicks,
    marks,
    async markClick(setId, markId) {
      for (const handler of [...(markHandlers.get(setId) ?? [])]) await handler(markId)
    },
    files,
    setRemoteAllowed(on) {
      remoteAllowed = on
      for (const listener of [...resourceListeners]) listener()
    },
    images,
    textReplacements: textReplacementPairs,
    askImageDestination: async (request) => {
      const [handler] = [...imageDestinationHandlers]
      return handler === undefined ? undefined : handler(request)
    },
    attachments,
    setImageFailure(code) {
      imageFailure = code
    },
    holdImages() {
      let release = (): void => undefined
      imageGate = new Promise<void>((resolve) => {
        release = () => {
          imageGate = null
          resolve()
        }
      })
      return release
    },
    setSetting(id, value) {
      const before = settingOf(id)
      if (value === null) settingValues.delete(id)
      else settingValues.set(id, value)
      if (settingOf(id) === before) return
      for (const listener of [...settingListeners]) listener(id)
    },
    views,
    async openItem(surfaceId, itemId) {
      checkSurface(surfaceId)
      for (const handler of [...(openHandlers.get(surfaceId) ?? [])]) await handler(itemId)
    },
    async pressAction(surfaceId, actionId) {
      checkSurface(surfaceId)
      for (const handler of [...(actionHandlers.get(surfaceId) ?? [])]) await handler(actionId)
    },
    async refreshSurface(surfaceId) {
      checkSurface(surfaceId)
      for (const handler of [...(refreshHandlers.get(surfaceId) ?? [])]) await handler()
    },
    opens,
    folders,
    created,
    renames,
    copies,
    trashed,
    begunRowActions,
    searches,
    searchFolders,
    holdSearches() {
      let release = (): void => undefined
      searchGate = new Promise<void>((resolve) => {
        release = () => {
          searchGate = null
          resolve()
        }
      })
      return release
    },
    selections,
    async input(surfaceId, value) {
      checkSurface(surfaceId)
      for (const handler of [...(inputHandlers.get(surfaceId) ?? [])]) await handler(value)
    },
    async itemEdit(surfaceId, itemId, value) {
      checkSurface(surfaceId)
      for (const handler of [...(itemEditHandlers.get(surfaceId) ?? [])]) {
        await handler(itemId, 'synopsis', value)
      }
    },
    async reorder(surfaceId, event) {
      checkSurface(surfaceId)
      for (const handler of [...(reorderHandlers.get(surfaceId) ?? [])]) await handler(event)
    },
    async formChange(surfaceId, fieldId, value) {
      checkSurface(surfaceId)
      for (const handler of [...(formChangeHandlers.get(surfaceId) ?? [])]) {
        await handler(fieldId, value)
      }
    },
    async formSubmit(surfaceId, values) {
      checkSurface(surfaceId)
      for (const handler of [...(formSubmitHandlers.get(surfaceId) ?? [])]) await handler(values)
    },
    async diffAction(surfaceId, action, changeId) {
      checkSurface(surfaceId)
      for (const handler of [...(diffActionHandlers.get(surfaceId) ?? [])]) {
        await handler(action, changeId)
      }
    },
    shown,
    shownFocus,
    closed,
    async rowAction(surfaceId, actionId, rowId, value) {
      if (!(manifest.contributes.rowActions ?? []).some((a) => a.surface === surfaceId)) {
        checkSurface(surfaceId)
      }
      let result: unknown
      for (const handler of [...(rowActionHandlers.get(surfaceId) ?? [])]) {
        result = await handler(actionId, rowId, value)
      }
      return result
    },
    paletteItems,
    modelToolDetails,
    openedExternal,
    async callModelTool(id, args) {
      if (!declaredModelTools.has(id)) {
        throw veneerError(
          PLUGIN_ERROR.undeclaredContribution,
          `${id} is not declared in the manifest`,
          manifest.id
        )
      }
      const handler = modelToolHandlers.get(id)
      if (handler === undefined) {
        throw veneerError(PLUGIN_ERROR.noHandler, `${id} has no handler`, manifest.id)
      }
      try {
        return String(await handler(args)).slice(0, MAX_MODEL_TOOL_RESULT)
      } catch {
        return 'The tool failed.'
      }
    },
    async runTool(id, input, signal, report) {
      if (!declaredTools.has(id)) {
        throw veneerError(
          PLUGIN_ERROR.undeclaredContribution,
          `${id} is not declared in the manifest`,
          manifest.id
        )
      }
      const handler = toolHandlers.get(id)
      if (handler === undefined) {
        throw veneerError(PLUGIN_ERROR.noHandler, `${id} has no handler`, manifest.id)
      }
      const result: unknown = await handler(
        { selection: null, ...input },
        signal ?? new AbortController().signal,
        report ?? (() => undefined)
      )
      if (!isToolResult(result)) {
        throw veneerError(PLUGIN_ERROR.badResult, `${id} returned a malformed result`, manifest.id)
      }
      return result
    },
    async refreshPalette(providerId) {
      checkProvider(providerId)
      for (const handler of [...(paletteRefreshHandlers.get(providerId) ?? [])]) await handler()
    },
    async runPaletteItem(providerId, itemId) {
      checkProvider(providerId)
      for (const handler of [...(runHandlers.get(providerId) ?? [])]) await handler(itemId)
    },
    mountEditor(parent) {
      if (hostFactory === null) {
        throw veneerError(PLUGIN_ERROR.noHandler, 'no editor host is registered', manifest.id)
      }
      const host = hostFactory({ parent })
      const first = manifest.contributes.editingModes?.[0]?.id
      const mode = first === undefined ? undefined : modes.get(first)
      if (mode !== undefined) host.setMode(mode)
      return host
    }
  }
}
