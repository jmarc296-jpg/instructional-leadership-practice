import type {
  AnalyticsSnapshot,
  ResponseHistoryEntry,
  ResponseVersion,
  SessionPerformance
} from '@/types'

const FAVORITES_KEY = 'ilp-favorites'
const PROGRESS_KEY = 'ilp-progress'
const ANALYTICS_KEY = 'ilp-analytics-snapshot'
const RESPONSES_KEY = 'ilp-written-responses'

type StoredResponseRecord = {
  cardId: string
  currentResponse: string
  createdAt: string
  updatedAt: string
  versions: ResponseVersion[]
}

type StoredResponsesMap = Record<string, StoredResponseRecord>

function isBrowser() {
  return typeof window !== 'undefined'
}

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback

  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

function safeGetItem(key: string): string | null {
  if (!isBrowser()) return null

  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSetItem(key: string, value: string): boolean {
  if (!isBrowser()) return false

  try {
    window.localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

function safeRemoveItem(key: string) {
  if (!isBrowser()) return

  try {
    window.localStorage.removeItem(key)
  } catch {
    // fail silently
  }
}

function createVersionId() {
  return `v_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function isValidIsoDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(new Date(value).getTime())
}

function normalizeResponseVersion(raw: unknown, fallbackDate: string): ResponseVersion | null {
  if (!raw || typeof raw !== 'object') return null

  const version = raw as Record<string, unknown>
  const response = typeof version.response === 'string' ? version.response.trim() : ''
  if (!response) return null

  return {
    versionId:
      typeof version.versionId === 'string' && version.versionId.trim()
        ? version.versionId
        : createVersionId(),
    response,
    savedAt: isValidIsoDate(version.savedAt) ? version.savedAt : fallbackDate
  }
}

function normalizeStoredResponseRecord(cardId: string, raw: unknown): StoredResponseRecord | null {
  if (!raw || typeof raw !== 'object') return null

  const record = raw as Record<string, unknown>
  const now = new Date().toISOString()

  const currentResponseRaw =
    typeof record.currentResponse === 'string'
      ? record.currentResponse
      : typeof record.response === 'string'
        ? record.response
        : ''

  const currentResponse = currentResponseRaw.trim()

  const createdAt = isValidIsoDate(record.createdAt) ? record.createdAt : now
  const updatedAt = isValidIsoDate(record.updatedAt) ? record.updatedAt : createdAt

  const rawVersions = Array.isArray(record.versions) ? record.versions : []
  const normalizedVersions = rawVersions
    .map((item) => normalizeResponseVersion(item, updatedAt))
    .filter(Boolean) as ResponseVersion[]

  const dedupedVersions: ResponseVersion[] = []
  const seen = new Set<string>()

  for (const version of normalizedVersions) {
    const signature = `${version.response}__${version.savedAt}`
    if (seen.has(signature)) continue
    seen.add(signature)
    dedupedVersions.push(version)
  }

  if (currentResponse) {
    const latestVersion = dedupedVersions[dedupedVersions.length - 1]
    if (!latestVersion || latestVersion.response.trim() !== currentResponse) {
      dedupedVersions.push({
        versionId: createVersionId(),
        response: currentResponse,
        savedAt: updatedAt
      })
    }
  }

  if (!currentResponse && dedupedVersions.length === 0) {
    return null
  }

  const finalCurrentResponse =
    currentResponse || dedupedVersions[dedupedVersions.length - 1]?.response || ''

  if (!finalCurrentResponse) return null

  return {
    cardId,
    currentResponse: finalCurrentResponse,
    createdAt,
    updatedAt,
    versions: dedupedVersions.sort(
      (a, b) => new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime()
    )
  }
}

function getResponsesMap(): StoredResponsesMap {
  const raw = safeParse<Record<string, unknown>>(safeGetItem(RESPONSES_KEY), {})
  const normalized: StoredResponsesMap = {}

  for (const [cardId, value] of Object.entries(raw)) {
    const record = normalizeStoredResponseRecord(cardId, value)
    if (record) {
      normalized[cardId] = record
    }
  }

  return normalized
}

function saveResponsesMap(map: StoredResponsesMap): boolean {
  return safeSetItem(RESPONSES_KEY, JSON.stringify(map))
}

/* Favorites */

export function getFavorites(): string[] {
  const raw = safeParse<unknown[]>(safeGetItem(FAVORITES_KEY), [])
  const unique = new Set<string>()

  for (const item of raw) {
    if (typeof item === 'string' && item.trim()) {
      unique.add(item)
    }
  }

  return [...unique]
}

export function addFavorite(cardId: string) {
  if (!cardId.trim()) return

  const current = new Set(getFavorites())
  current.add(cardId)
  safeSetItem(FAVORITES_KEY, JSON.stringify([...current]))
}

export function removeFavorite(cardId: string) {
  const current = new Set(getFavorites())
  current.delete(cardId)
  safeSetItem(FAVORITES_KEY, JSON.stringify([...current]))
}

/* Progress */

function isValidSessionPerformance(value: unknown): value is SessionPerformance {
  if (!value || typeof value !== 'object') return false

  const entry = value as Record<string, unknown>

  return (
    typeof entry.cardId === 'string' &&
    typeof entry.domain === 'string' &&
    typeof entry.difficulty === 'string' &&
    typeof entry.rating === 'string'
  )
}

export function getProgress(): SessionPerformance[] {
  const raw = safeParse<unknown[]>(safeGetItem(PROGRESS_KEY), [])
  return raw.filter(isValidSessionPerformance)
}

export function saveProgress(entry: SessionPerformance) {
  if (!isValidSessionPerformance(entry)) return

  const current = getProgress()
  current.push(entry)
  safeSetItem(PROGRESS_KEY, JSON.stringify(current))
}

export function clearProgress() {
  safeRemoveItem(PROGRESS_KEY)
}

/* Analytics */

function createEmptyAnalyticsSnapshot(): AnalyticsSnapshot {
  return {
    totalCompleted: 0,
    averageRatingByDomain: {
      rigor: 0,
      ddi: 0,
      coaching: 0,
      assessment: 0,
      culture: 0,
      leadership: 0
    },
    recentRatings: []
  }
}

function normalizeAnalyticsSnapshot(raw: unknown): AnalyticsSnapshot | null {
  if (!raw || typeof raw !== 'object') return null

  const snapshot = raw as Record<string, unknown>
  const fallback = createEmptyAnalyticsSnapshot()

  const averageRatingByDomain =
    snapshot.averageRatingByDomain && typeof snapshot.averageRatingByDomain === 'object'
      ? snapshot.averageRatingByDomain as any
      : fallback.averageRatingByDomain

  const recentRatings = Array.isArray(snapshot.recentRatings)
    ? snapshot.recentRatings.filter(
        (item): item is AnalyticsSnapshot['recentRatings'][number] =>
          item === 'strong' || item === 'partial' || item === 'struggled'
      )
    : []

  return {
    totalCompleted:
      typeof snapshot.totalCompleted === 'number' ? snapshot.totalCompleted : 0,
    averageRatingByDomain,
    recentRatings
  }
}

export function getAnalyticsSnapshot(): AnalyticsSnapshot | null {
  const raw = safeParse<unknown>(safeGetItem(ANALYTICS_KEY), null)
  return normalizeAnalyticsSnapshot(raw)
}

export function saveAnalyticsSnapshot(snapshot: AnalyticsSnapshot) {
  const normalized = normalizeAnalyticsSnapshot(snapshot)
  if (!normalized) return
  safeSetItem(ANALYTICS_KEY, JSON.stringify(normalized))
}

/* Written Responses */

export function saveWrittenResponse(cardId: string, response: string): boolean {
  const trimmedCardId = cardId.trim()
  const trimmedResponse = response.trim()

  if (!trimmedCardId) return false

  const current = getResponsesMap()
  const now = new Date().toISOString()

  if (!trimmedResponse) {
    delete current[trimmedCardId]
    return saveResponsesMap(current)
  }

  const existing = current[trimmedCardId]

  if (!existing) {
    current[trimmedCardId] = {
      cardId: trimmedCardId,
      currentResponse: trimmedResponse,
      createdAt: now,
      updatedAt: now,
      versions: [
        {
          versionId: createVersionId(),
          response: trimmedResponse,
          savedAt: now
        }
      ]
    }

    return saveResponsesMap(current)
  }

  const versions = [...existing.versions]
  const latestVersion = versions[versions.length - 1]

  if (!latestVersion || latestVersion.response.trim() !== trimmedResponse) {
    versions.push({
      versionId: createVersionId(),
      response: trimmedResponse,
      savedAt: now
    })
  }

  current[trimmedCardId] = {
    ...existing,
    currentResponse: trimmedResponse,
    updatedAt: now,
    versions
  }

  return saveResponsesMap(current)
}

export function getWrittenResponse(cardId: string): string {
  if (!cardId.trim()) return ''
  const current = getResponsesMap()
  return current[cardId]?.currentResponse ?? ''
}

export function clearWrittenResponse(cardId: string) {
  if (!cardId.trim()) return
  const current = getResponsesMap()
  delete current[cardId]
  saveResponsesMap(current)
}

export function getAllWrittenResponses(): ResponseHistoryEntry[] {
  const current = getResponsesMap()

  return Object.values(current)
    .map((entry) => ({
      cardId: entry.cardId,
      response: entry.currentResponse,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
      versionCount: entry.versions.length
    }))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

export function getResponseVersions(cardId: string): ResponseVersion[] {
  if (!cardId.trim()) return []

  const current = getResponsesMap()
  const record = current[cardId]
  if (!record) return []

  return [...record.versions].sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
  )
}

export function restoreResponseVersion(cardId: string, versionId: string) {
  const trimmedCardId = cardId.trim()
  const trimmedVersionId = versionId.trim()

  if (!trimmedCardId || !trimmedVersionId) return

  const current = getResponsesMap()
  const record = current[trimmedCardId]
  if (!record) return

  const version = record.versions.find(v => v.versionId === versionId)
  if (!version) return

  const now = new Date().toISOString()

  current[trimmedCardId] = {
    ...record,
    currentResponse: version.response,
    updatedAt: now,
    versions: [
      ...record.versions,
      {
        versionId: createVersionId(),
        response: version.response,
        savedAt: now
      }
    ]
  }

  saveResponsesMap(current)
}

export function clearAllWrittenResponses() {
  safeRemoveItem(RESPONSES_KEY)
}const ADMIN_MODE_KEY = 'ilp-admin-mode'

export function getAdminMode(): boolean {
  const value = safeGetItem(ADMIN_MODE_KEY)
  return value === 'true'
}

export function setAdminMode(value: boolean) {
  safeSetItem(ADMIN_MODE_KEY, String(value))
}

export function getFavoriteCards(): string[] {
  return getFavorites()
}