import { CacheService } from "./types"

interface Request {
  params: Record<string, string>
  body: unknown
}

interface Response {
  status(code: number): Response
  json(data: unknown): void
}

export function createCacheHandler(cacheService: CacheService) {
  return {
    async getKey(req: Request, res: Response) {
      const { key } = req.params
      const value = await cacheService.get(key)

      if (value === null) {
        res.status(404).json({ error: "Key not found in cache" })
        return
      }

      res.status(200).json({ key, value })
    },

    async setKey(req: Request, res: Response) {
      const { key } = req.params
      const { value, ttl } = req.body as { value: string; ttl?: number }

      await cacheService.set(key, value, ttl)
      res.status(201).json({ key, value, ttl })
    },

    async deleteKey(req: Request, res: Response) {
      const { key } = req.params
      await cacheService.delete(key)
      res.status(204).json(null)
    },

    async listKeys(req: Request, res: Response) {
      const pattern = req.params.pattern ?? "*"
      const keys = await cacheService.keys(pattern)
      res.status(200).json({ keys, count: keys.length })
    },

    async flushAll(_req: Request, res: Response) {
      await cacheService.flush()
      res.status(200).json({ message: "Cache flushed" })
    },
  }
}

// Route registration
export function registerCacheRoutes(app: any, cacheService: CacheService) {
  const handler = createCacheHandler(cacheService)

  app.get("/cache/:key", handler.getKey)
  app.post("/cache/:key", handler.setKey)
  app.delete("/cache/:key", handler.deleteKey)
  app.get("/cache/keys/:pattern", handler.listKeys)
  app.post("/cache/flush", handler.flushAll)
}
