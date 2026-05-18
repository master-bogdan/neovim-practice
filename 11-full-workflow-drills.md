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
1. Open a file with `<leader><space>`, type filename, press `<CR>`.
2. Search inside it for a function: `/function<CR>` or `/fn <CR>`.
3. Jump to a visible target with `s`, type two characters of the target.
4. Change one word with `ciw`, type replacement, press `<Esc>`.
5. Change one string with `ci"`, type replacement, press `<Esc>`.
6. Format with `<leader>cf`.
7. Save with `:write<CR>`.

Expected result: one intentional edit, formatted and saved.

### Scenario 2 - Multi-File Reading Pass

Practice area — use a real TypeScript or Go file in your project.

Step-by-step:
1. Open a source file with `<leader><space>`.
2. Put cursor on a function call.
3. Press `gd` to go to its definition.
4. Press `<C-o>` to return.
5. Press `gr` to find all references.
6. Press `<CR>` on one reference to open it.
7. Switch back to the original file with `<leader>,`, press `<CR>`.

Expected result: you traced code across files without losing your place.

### Scenario 3 - Split Layout Pass

Practice area — use a source file and its corresponding test file.

Step-by-step:
1. Open a source file with `<leader><space>`.
2. Split right with `<leader>|`.
3. In the new split, open the related test file with `<leader><space>`.
4. Split the test window below with `<leader>-`.
5. In the bottom split, open a terminal with `<leader>ft`.
6. Run `pwd` and `<CR>`.
7. Press `<C-\><C-n>` to exit terminal mode.
8. Move across windows: `<C-h>`, `<C-j>`, `<C-k>`, `<C-l>`.
9. Close the terminal window with `<leader>wd`.

Expected result: source and test stay visible, terminal is a transient workspace.

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
3. Open one result with `<CR>`.
4. Use `/old-api<CR>` to find the term in the buffer.
5. Replace on one line with `:s/old-api/new-api/g<CR>`.
6. Use confirmation replace on the scratch file with `:%s/old-api/new-api/gc<CR>`.
7. Press `y` to confirm each, `n` to skip, `a` to replace all.

Expected result: you replaced scoped occurrences, not the whole project blindly.

### Scenario 5 - Git Review Pass

Prerequisites: be in a git repository with uncommitted changes.

Step-by-step:
1. Open git status picker with `<leader>gs`.
2. Press `j`/`k` to browse changed files.
3. Press `<CR>` to open one changed file.
4. Press `]h` to jump to the first hunk.
5. Press `<leader>gb` on the changed line to read blame.
6. Press `<leader>gH` to open file history in DiffView.
7. Press `q` to close DiffView.
8. Press `<leader>gg` to open LazyGit.
9. Press `d` to view the diff for the file.
10. Press `q` to close LazyGit.

Expected result: you understand current changes and their history without leaving the editor.

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
3. Press `<CR>` to jump to one diagnostic.
4. Press `<leader>cd` to read the line diagnostic.
5. Try code action with `<leader>ca` — see what actions LSP offers.
6. Make the smallest fix manually.
7. Format with `<leader>cf`.
8. Verify with `<leader>sd` — check that the diagnostic is gone.

Expected result: one diagnostic is fixed, layout is clean.

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
2. Press `<CR>` to jump to `handleWebhook`, press `<C-l>` to return to editor.
3. Put cursor on line `const signature = ...`.
4. Press `V` to enter linewise visual.
5. Press `3j` to select down to `if (signature !== ...` line — 4 lines total.
6. Press `<leader>re` to extract to a function.
7. Type `verifyWebhookSignature` and press `<CR>`.
8. Rename `verifyWebhookSignature` to `validateSignature` with `<leader>cr`.
9. Check diagnostics with `<leader>sd`.

Expected result: signature verification is in its own function, all references updated.

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
12. Replace one occurrence with `:s/old/new/<CR>`.
13. Open terminal with `<leader>ft`.
14. Run `pwd` and `<CR>`.
15. Press `<C-\><C-n>` to exit terminal mode.
16. Press `<leader>ft` to close terminal.
17. Open git status with `<leader>gs`, open a changed file with `<CR>`.
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
