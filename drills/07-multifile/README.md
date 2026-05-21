# Multi-File Refactoring Drill

This drill simulates a real cross-file rename and restructure operation.

## Scenario

You're renaming the `CacheService` to `StorageService` across 5 files,
and extracting a shared type into a new location.

## TIMING: Expert 3min | Proficient 5min | Learning 10min

## Steps

1. Open `types.ts` — rename the interface `CacheService` to `StorageService`
   using `<leader>cr` (LSP rename)

2. If LSP rename doesn't propagate to all files, use quickfix:
   - `<leader>sg` → search `CacheService`
   - `<C-q>` to send to quickfix
   - `:cdo s/CacheService/StorageService/g | update`

3. Open `service.ts` — extract the retry logic (the while loop) into
   a standalone function `withRetry` in `utils.ts`

4. Open `handler.ts` — rename the route from `/cache/` to `/storage/`

5. Open `config.ts` — rename `cacheConfig` to `storageConfig` using cgn:
   - `/cacheConfig` → `cgn` → type `storageConfig` → `<Esc>` → `.` to repeat

6. Verify: `<leader>sg` → `cacheService` should return 0 results
   `<leader>sg` → `StorageService` should show all 5 files

## Reset

To reset the drill: `git checkout -- drills/07-multifile/`
