// OBJECTIVE: Resolve merge conflicts using git-conflict.nvim and DiffView
//
// Setup: This file simulates a merge conflict. To create a REAL conflict:
//   1. git checkout -b feature/new-auth
//   2. Edit the `authenticate` function below, commit
//   3. git checkout main
//   4. Edit the same function differently, commit
//   5. git merge feature/new-auth → conflict!
//   6. Open the conflicted file in nvim and practice
//
// Tasks with git-conflict.nvim:
//   1. Navigate to next conflict: `<leader>gx` (list conflicts) or ]x
//   2. Choose "ours" (current branch): `co`
//   3. Choose "theirs" (incoming branch): `ct`
//   4. Choose "both": `cb`
//   5. Choose "none" (delete both): `c0`
//
// Tasks with DiffView:
//   1. Open merge tool: `<leader>gv` (DiffView toggle)
//   2. See 3-way diff: LOCAL | BASE | REMOTE
//   3. Navigate between conflicts in DiffView
//   4. Close DiffView when resolved: `<leader>gv`
//
// Tasks with gitsigns hunks:
//   1. After resolving, stage the hunk: `<leader>ghs` (stage hunk)
//   2. Preview the change: `<leader>ghp` (preview hunk)
//   3. Undo a staged hunk: `<leader>ghu` (undo stage)
//
// TIMING: Expert 60s | Proficient 120s | Learning 240s

// ===== SIMULATED CONFLICT MARKERS =====
// In a real conflict, git inserts these markers. Practice resolving each one.

interface AuthConfig {
  provider: string
  clientId: string
  secret: string
  redirectUrl: string
}

// CONFLICT 1: Different implementations of authenticate
// <<<<<<< HEAD (ours — current branch)
function authenticate(config: AuthConfig, token: string): boolean {
  // Our version: simple token validation
  if (!token || token.length < 32) {
    return false
  }
  return verifyToken(token, config.secret)
}
// =======
// function authenticate(config: AuthConfig, token: string): Promise<boolean> {
//   // Their version: async with external validation
//   const decoded = await decodeJWT(token)
//   if (decoded.exp < Date.now()) {
//     return false
//   }
//   return await validateWithProvider(config.provider, decoded)
// }
// >>>>>>> feature/new-auth (theirs — incoming branch)

// CONFLICT 2: Different error handling approaches
// <<<<<<< HEAD
function handleAuthError(error: Error): { code: number; message: string } {
  console.error("Auth failed:", error.message)
  return { code: 401, message: "Unauthorized" }
}
// =======
// function handleAuthError(error: Error): { code: number; message: string; retry: boolean } {
//   logger.warn("Auth failed", { error: error.message, stack: error.stack })
//   const isTransient = error.message.includes("timeout")
//   return { code: 401, message: "Unauthorized", retry: isTransient }
// }
// >>>>>>> feature/new-auth

// CONFLICT 3: Different exports
// <<<<<<< HEAD
export { authenticate, handleAuthError }
// =======
// export { authenticate, handleAuthError, refreshToken, revokeToken }
// >>>>>>> feature/new-auth

// After resolving all three:
// 1. Stage the file: <leader>ghs or :!git add %
// 2. Check status: <leader>gg (LazyGit) to see the staged resolution
// 3. Commit the merge: in LazyGit, press `c` then type merge message

function verifyToken(token: string, secret: string): boolean {
  return token.startsWith(secret.slice(0, 4))
}

function refreshToken(token: string): string {
  return `refreshed_${token}`
}

function revokeToken(token: string): void {
  console.log(`Revoked: ${token}`)
}
