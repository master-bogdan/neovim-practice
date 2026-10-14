const cache = new Map<string, unknown>()

export function writeCache(key: string, value: unknown): void {
  cache.set(key, value)
}

export function readCache<T>(key: string): T | undefined {
  return cache.get(key) as T | undefined
}
