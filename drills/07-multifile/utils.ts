import { CacheEvent, CacheEventType } from "./types"

const eventLog: CacheEvent[] = []

export function logCacheEvent(type: CacheEventType, key: string): void {
  eventLog.push({
    type,
    key,
    timestamp: new Date(),
  })
}

export function getCacheStats(): {
  hits: number
  misses: number
  evictions: number
  hitRate: number
} {
  const hits = eventLog.filter((e) => e.type === "hit").length
  const misses = eventLog.filter((e) => e.type === "miss").length
  const evictions = eventLog.filter((e) => e.type === "evict").length
  const total = hits + misses

  return {
    hits,
    misses,
    evictions,
    hitRate: total > 0 ? hits / total : 0,
  }
}

export function clearCacheStats(): void {
  eventLog.length = 0
}

export function formatCacheKey(prefix: string, ...parts: string[]): string {
  return [prefix, ...parts].join(":")
}
