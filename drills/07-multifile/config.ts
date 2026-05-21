import { CacheConfig } from "./types"

const defaultCacheConfig: CacheConfig = {
  host: "localhost",
  port: 6379,
  ttl: 3600,
  maxSize: 1000,
  prefix: "app",
}

export function getCacheConfig(env: string): CacheConfig {
  const cacheConfig = { ...defaultCacheConfig }

  switch (env) {
    case "production":
      cacheConfig.host = "redis.internal.prod"
      cacheConfig.ttl = 7200
      cacheConfig.maxSize = 10000
      cacheConfig.prefix = "prod"
      break
    case "staging":
      cacheConfig.host = "redis.internal.staging"
      cacheConfig.ttl = 1800
      cacheConfig.maxSize = 5000
      cacheConfig.prefix = "stg"
      break
    case "development":
      cacheConfig.host = "localhost"
      cacheConfig.ttl = 300
      cacheConfig.maxSize = 100
      cacheConfig.prefix = "dev"
      break
  }

  return cacheConfig
}

export function validateCacheConfig(cacheConfig: CacheConfig): string[] {
  const errors: string[] = []

  if (!cacheConfig.host) {
    errors.push("Cache host is required")
  }

  if (cacheConfig.port < 1 || cacheConfig.port > 65535) {
    errors.push("Cache port must be between 1 and 65535")
  }

  if (cacheConfig.ttl < 0) {
    errors.push("Cache TTL must be non-negative")
  }

  if (cacheConfig.maxSize < 1) {
    errors.push("Cache maxSize must be at least 1")
  }

  return errors
}
