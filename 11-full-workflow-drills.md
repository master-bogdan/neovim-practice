# Chapter 11 - Full Workflow Drills

## Goal

Combine editing, navigation, LSP, git, terminal, AI, and refactoring into realistic developer workflows.

## Mental Model

A real editor session is not one command family. You move between reading, editing, searching, validating, and reviewing. These drills train transitions between all the tools you have available.

## Keymaps Reference

This chapter reuses everything from previous chapters:
- Motions: `w`, `b`, `e`, `f`, `t`, `gg`, `G`, `s` (Flash)
- Editing: `ciw`, `ci"`, `di(`, `yy`, `p`, `"_d`, `.`
- Surround: `gsaiw"`, `gsd(`, `gsr"'`
- Yank ring: `<C-p>`/`<C-n>` after paste, `<leader>p`
- Search: `/`, `n`, `N`, `<leader>sg`, `<leader><space>`
- Files/buffers: `<leader><space>`, `<leader>,`, `<leader>e`
- Windows: `<leader>|`, `<leader>-`, `<C-h/j/k/l>`, `<leader>wd`
- LSP: `gd`, `gr`, `K`, `<leader>ca`, `<leader>cr`, `<leader>cf`
- Diagnostics: `[d`, `]d`, `<leader>cd`, `<leader>sd`
- Git: `<leader>gg`, `<leader>gv`, `<leader>gH`, `<leader>gs`, `<leader>gb`
- Hunks: `]h`, `[h`
- Outline: `<leader>cs`
- Refactoring: `<leader>re`, `<leader>rv`, `<leader>rr`
- AI: `<leader>ae`, `<leader>ar`, `<leader>af`, `<leader>at`, `<leader>ac`
- Terminal: `<leader>ft`, `<C-\><C-n>`

## Common Workflows

Implementation loop:

```text
Find file → inspect outline → edit → format → check diagnostics → inspect diff
```

Review loop:

```text
Open git status → inspect changed files → blame → file history → summarize with AI
```

Refactor loop:

```text
Open outline → find target → select block → extract → rename → verify diagnostics
```

## Practice Scenarios

### Scenario 1 - Basic Coding Pass

Practice area — open any source file in your project.

Step-by-step:
1. Open a file with `<leader><space>`, type filename, press `<Enter>`.
2. Search inside it for a function: `/function<Enter>` or `/fn <Enter>`.
3. Jump to a visible target with `s`, type two characters of the target.
4. Change one word with `ciw`, type replacement, press `<Esc>`.
5. Change one string with `ci"`, type replacement, press `<Esc>`.
6. Format with `<leader>cf`.
7. Save with `:write<Enter>`.

Expected result: one intentional edit, formatted and saved.

> **Target times:**
> - Expert: 1 minute
> - Proficient: 2 minutes
> - Learning: take your time

### Scenario 2 - Multi-File Reading Pass

Practice area — use a real TypeScript or Go file in your project.

Step-by-step:
1. Open a source file with `<leader><space>`.
2. Put cursor on a function call.
3. Press `gd` to go to its definition.
4. Press `<C-o>` to return.
5. Press `gr` to find all references.
6. Press `<Enter>` on one reference to open it.
7. Switch back to the original file with `<leader>,`, press `<Enter>`.

Expected result: you traced code across files without losing your place.

> **Target times:**
> - Expert: 1.5 minutes
> - Proficient: 3 minutes
> - Learning: take your time

### Scenario 3 - Split Layout Pass

Practice area — use a source file and its corresponding test file.

Step-by-step:
1. Open a source file with `<leader><space>`.
2. Split right with `<leader>|`.
3. In the new split, open the related test file with `<leader><space>`.
4. Split the test window below with `<leader>-`.
5. In the bottom split, open a terminal with `<leader>ft`.
6. Run `pwd` and `<Enter>`.
7. Press `<C-\><C-n>` to exit terminal mode.
8. Move across windows: `<C-h>`, `<C-j>`, `<C-k>`, `<C-l>`.
9. Close the terminal window with `<leader>wd`.

Expected result: source and test stay visible, terminal is a transient workspace.

> **Target times:**
> - Expert: 1.5 minutes
> - Proficient: 3 minutes
> - Learning: take your time

### Scenario 4 - Search And Replace Pass

Practice area:

```ts
const apiEndpoint = "https://old-api.example.com/v1"
const authEndpoint = "https://old-api.example.com/v1/auth"
const dataEndpoint = "https://old-api.example.com/v1/data"
```

Step-by-step:
1. Copy the practice area to a scratch file: `<leader>.`, then `i`, paste, `<Esc>`.
2. Use `<leader>sg` to search for `old-api` across the project.
3. Open one result with `<Enter>`.
4. Use `/old-api<Enter>` to find the term in the buffer.
5. Replace on one line with `:s/old-api/new-api/g<Enter>`.
6. Use confirmation replace on the scratch file with `:%s/old-api/new-api/gc<Enter>`.
7. Press `y` to confirm each, `n` to skip, `a` to replace all.

Expected result: you replaced scoped occurrences, not the whole project blindly.

> **Target times:**
> - Expert: 2 minutes
> - Proficient: 4 minutes
> - Learning: take your time

### Scenario 5 - Git Review Pass

Prerequisites: be in a git repository with uncommitted changes.

Step-by-step:
1. Open git status picker with `<leader>gs`.
2. Press `j`/`k` to browse changed files.
3. Press `<Enter>` to open one changed file.
4. Press `]h` to jump to the first hunk.
5. Press `<leader>gb` on the changed line to read blame.
6. Press `<leader>gH` to open file history in DiffView.
7. Press `q` to close DiffView.
8. Press `<leader>gg` to open LazyGit.
9. Press `d` to view the diff for the file.
10. Press `q` to close LazyGit.

Expected result: you understand current changes and their history without leaving the editor.

> **Target times:**
> - Expert: 2.5 minutes
> - Proficient: 5 minutes
> - Learning: take your time

### Scenario 6 - Diagnostic Fix Pass

Practice area — use a real file with LSP diagnostics, or introduce a deliberate error:

```ts
// Introduce an error: call a function that does not exist
const result = nonExistentFunction("test")
console.log(result.undeclared)
```

Step-by-step:
1. Open diagnostics picker with `<leader>sd`.
2. Press `j`/`k` to move through diagnostics.
3. Press `<Enter>` to jump to one diagnostic.
4. Press `<leader>cd` to read the line diagnostic.
5. Try code action with `<leader>ca` — see what actions LSP offers.
6. Make the smallest fix manually.
7. Format with `<leader>cf`.
8. Verify with `<leader>sd` — check that the diagnostic is gone.

Expected result: one diagnostic is fixed, layout is clean.

> **Target times:**
> - Expert: 2 minutes
> - Proficient: 4 minutes
> - Learning: take your time

### Scenario 7 - Refactor Pass

Practice area:

```ts
async function handleWebhook(req: Request, res: Response) {
  const payload = JSON.parse(req.body)
  const signature = req.headers['x-signature']
  const secret = process.env.WEBHOOK_SECRET
  const expected = crypto.createHmac('sha256', secret).update(req.body).digest('hex')
  if (signature !== `sha256=${expected}`) {
    res.status(401).send('Invalid signature')
    return
  }
  await db.saveWebhookEvent(payload)
  res.status(200).send('OK')
}
```

Step-by-step:
1. Press `<leader>cs` to open the outline and confirm you can see the function.
2. Press `<Enter>` to jump to `handleWebhook`, press `<C-l>` to return to editor.
3. Put cursor on line `const signature = ...`.
4. Press `V` to enter linewise visual.
5. Press `3j` to select down to `if (signature !== ...` line — 4 lines total.
6. Press `<leader>re` to extract to a function.
7. Type `verifyWebhookSignature` and press `<Enter>`.
8. Rename `verifyWebhookSignature` to `validateSignature` with `<leader>cr`.
9. Check diagnostics with `<leader>sd`.

Expected result: signature verification is in its own function, all references updated.

> **Target times:**
> - Expert: 2.5 minutes
> - Proficient: 5 minutes
> - Learning: take your time

### Scenario 8 - AI-Assisted Review Pass

Practice area — use a real or recently changed function.

Step-by-step:
1. Open a changed file with `<leader><space>`.
2. Use `gr` to find references to the main function.
3. Select the function with `V` and `j`/`k`.
4. Press `<leader>ar` to review for correctness.
5. Read findings — do not apply anything yet.
6. Apply at most one small fix manually.
7. Stage with LazyGit: `<leader>gg`, `<Space>`, `q`.
8. Press `<leader>ac` to generate a commit message.
9. Use the message in your commit.

Expected result: AI reviewed your code, you decided what to apply, commit message is ready.

> **Target times:**
> - Expert: 3 minutes
> - Proficient: 6 minutes
> - Learning: take your time

### Scenario 9 - Debug And Fix Pass

Practice area — create or use a TypeScript file with intentional errors:

```ts
import { unused } from "some-module"

interface User {
  name: string
  age: number
  email: string
}

function getUser(id): User {
  const user = { name: "Alice", age: "thirty", email: "alice@example.com" }
  return user
}

function processUsers(users: User[]) {
  const filtered = users.filter((u) => u.age > 18)
  filtered.map((u) => {
    console.log(u.name)
  })
}
```

Errors present: unused import, missing parameter type (implicit any), type mismatch (`"thirty"` assigned to `number`), missing return type annotation on `processUsers`, missing explicit return in `map`.

Step-by-step:
1. Open the file with `<leader><space>`.
2. Press `]d` to jump to the first diagnostic.
3. Press `K` to hover and understand the error.
4. Press `<leader>ca` to see if LSP offers a quick fix. If it does, apply it.
5. Press `]d` to move to the next diagnostic.
6. Press `K` to understand this error.
7. If the fix is non-obvious, select the problematic area with `V` and press `<leader>af` (AI Fix) to let the AI suggest a correction.
8. Apply the AI suggestion or fix manually.
9. Press `]d` again and repeat: `K` to understand, `<leader>ca` for quick fix or manual edit.
10. Continue until `]d` wraps around (no more diagnostics forward).
11. Verify all diagnostics are resolved: press `<leader>sd` — the list should be empty for this file.
12. Format the file with `<leader>cf`.
13. Save with `:write<Enter>`.

Expected result: all 4-5 diagnostics resolved, file formatted and saved.

> **Target times:**
> - Expert: 3 minutes
> - Proficient: 6 minutes
> - Learning: take your time

### Scenario 10 - Search-Replace-Verify Pass

Practice area — use a file where a variable or function name appears 5+ times and needs renaming (or use this example):

```ts
const fetchData = async (url: string) => {
  const fetchDataResult = await fetch(url)
  if (!fetchDataResult.ok) {
    throw new Error(`fetchData failed: ${fetchDataResult.status}`)
  }
  return fetchDataResult.json()
}

export function useFetchData(url: string) {
  return fetchData(url)
}
```

Goal: rename all occurrences of `fetchData` to `requestData` using the `cgn` pattern.

Step-by-step:
1. Open the file with `<leader><space>`.
2. Put cursor on the first `fetchData` occurrence.
3. Press `*` to search for the word under cursor. All occurrences are now highlighted.
4. Press `N` to return to the first match (since `*` moves forward).
5. Type `cgn` — this selects the current match and enters change mode.
6. Type `requestData` and press `<Esc>`.
7. Press `.` to repeat the change on the next occurrence.
8. If an occurrence should NOT be renamed (like a different context), press `n` to skip to the next match, then `.` to change it.
9. Continue pressing `.` or `n` then `.` until all desired occurrences are renamed.
10. Open trouble.nvim diagnostics with `<leader>sd` to verify no new errors were introduced.
11. If diagnostics appear, jump to them with `<Enter>` and fix (the partial rename may have broken a reference).
12. Format the file with `<leader>cf`.
13. Save with `:write<Enter>`.
14. Stage and commit: press `<leader>gg` to open LazyGit, stage the file with `<Space>`, press `c` to commit, type your message, confirm with `<Enter>`, press `q` to close.

Expected result: all intended occurrences renamed, no new diagnostics, file formatted and committed.

> **Target times:**
> - Expert: 2 minutes
> - Proficient: 4 minutes
> - Learning: take your time

## Real-World Drill

Do this entire sequence without looking anything up. If you forget a mapping, use `<leader>sk` to find it — do not open a browser.

1. Open a file with `<leader><space>`.
2. Open Neo-tree with `<leader>e`, navigate to a nearby file with `j`/`k`, open it with `l`.
3. Press `<C-l>` to return to the editor.
4. Split vertically with `<leader>|`.
5. Move to the other window with `<C-l>` or `<C-h>`.
6. Create a scratch buffer with `<leader>.`.
7. Press `i`, type two lines of notes, press `<Esc>`.
8. Yank one line into register `a` with `"ayy`.
9. Delete one disposable word into the black hole register with `"_dw`.
10. Paste from register `a` with `"ap`.
11. Search for a word with `/`.
12. Replace one occurrence with `:s/old/new/<Enter>`.

> **Recovery Checkpoint:** At this point you should have: 2 splits visible, terminal output captured, outline showing 5+ symbols. If your layout is different, use `<C-w>o` to reset to one window and restart from step 8.

13. Open terminal with `<leader>ft`.
14. Run `pwd` and `<Enter>`.
15. Press `<C-\><C-n>` to exit terminal mode.
16. Press `<leader>ft` to close terminal.
17. Open git status with `<leader>gs`, open a changed file with `<Enter>`.
18. Navigate hunks with `]h`.
19. Read blame with `<leader>gb`.
20. Press `<leader>gg` to open LazyGit, press `q` to close.
21. Open diagnostics with `<leader>sd`.
22. Select a suspicious function with `V` and `j`, ask AI to review with `<leader>ar`.
23. Close the AI window with `<leader>aa`.
24. Close extra window with `<leader>wd`.
25. Delete unnecessary buffers with `<leader>bo`.

## Troubleshooting / Verify With Which-Key

- If you forget a mapping, use `<leader>sk` — do not interrupt the drill with a web search.
- If an action does nothing, check `:LazyExtras` or `:Lazy` for the relevant plugin.
- If a command changes too much, undo with `u` and redo the step on a scratch file.
- If your layout gets messy, use `<leader>wm` (maximize), `<leader>wd` (close), and `<leader>bo` (close other buffers).
