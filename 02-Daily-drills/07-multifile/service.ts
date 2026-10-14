import { CacheConfig, CacheService, CacheEntry } from "./types"

export class RedisCacheService implements CacheService {
  private config: CacheConfig
  private connected: boolean = false

  constructor(config: CacheConfig) {
    this.config = config
  }

  async connect(): Promise<void> {
    let attempts = 0
    const maxAttempts = 3
    const delay = 1000

    while (attempts < maxAttempts) {
      try {
        // simulate connection
        await new Promise((resolve) => setTimeout(resolve, 100))
        this.connected = true
        return
      } catch (err) {
        attempts++
        if (attempts >= maxAttempts) {
          throw new Error(`Failed to connect after ${maxAttempts} attempts`)
        }
        await new Promise((resolve) => setTimeout(resolve, delay * attempts))
      }
    }
  }

  async get(key: string): Promise<string | null> {
    this.ensureConnected()
    const fullKey = `${this.config.prefix}:${key}`
    // simulate redis GET
    return null
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    this.ensureConnected()
    const fullKey = `${this.config.prefix}:${key}`
    const effectiveTtl = ttl ?? this.config.ttl
    // simulate redis SET with EX
  }

  async delete(key: string): Promise<void> {
    this.ensureConnected()
    const fullKey = `${this.config.prefix}:${key}`
    // simulate redis DEL
  }

  async flush(): Promise<void> {
    this.ensureConnected()
    // simulate redis FLUSHDB
  }

  async has(key: string): Promise<boolean> {
    const value = await this.get(key)
    return value !== null
  }

  async keys(pattern: string): Promise<string[]> {
    this.ensureConnected()
    const fullPattern = `${this.config.prefix}:${pattern}`
    // simulate redis KEYS
    return []
  }

  private ensureConnected(): void {
    if (!this.connected) {
      throw new Error("CacheService is not connected. Call connect() first.")
    }
  }
}

export function createCacheService(config: CacheConfig): CacheService {
  return new RedisCacheService(config)
}
