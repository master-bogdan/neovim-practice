export interface CacheConfig {
  host: string
  port: number
  ttl: number
  maxSize: number
  prefix: string
}

export interface CacheService {
  get(key: string): Promise<string | null>
  set(key: string, value: string, ttl?: number): Promise<void>
  delete(key: string): Promise<void>
  flush(): Promise<void>
  has(key: string): Promise<boolean>
  keys(pattern: string): Promise<string[]>
}

export interface CacheEntry {
  key: string
  value: string
  expiresAt: Date
  createdAt: Date
}

export type CacheEventType = "hit" | "miss" | "evict" | "expire"

export interface CacheEvent {
  type: CacheEventType
  key: string
  timestamp: Date
}
