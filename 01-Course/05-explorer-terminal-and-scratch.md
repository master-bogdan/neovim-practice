# Chapter 5 - Explorer, Terminal, And Scratch

## Goal

Use Neo-tree for browsing, file management, and project structure awareness. Use terminal buffers for quick commands without leaving Neovim. Use scratch buffers as disposable workspaces for notes and experiments.

## Mental Model

There are three tools for different jobs:

```text
Neo-tree:   browse structure, create/rename/move files, see git status at a glance
Terminal:   run shell commands, interactive tools (lazygit, npm), capture output
Scratch:    temporary notes, paste snippets, draft text that does not belong in the project
```

Pickers (Telescope) are best when you know the name. Neo-tree is best when you want to see what is nearby, understand folder layout, or perform file operations. Terminal is best when the task requires a shell. Scratch is best when you need a throwaway buffer that persists across toggles.

Neo-tree has three source views:

```text
filesystem  - the default, shows the actual directory tree
buffers     - shows only files currently open in buffers
git_status  - shows only files with uncommitted changes
```

Switch between them with `<` and `>` while inside Neo-tree.

## Keymaps

Neo-tree open/close:
- `<leader>e` - toggle Neo-tree at project root (focus it if open, close if focused)
- `<leader>E` - toggle Neo-tree at current working directory
- `<leader>fe` - open Neo-tree at root
- `<leader>fE` - open Neo-tree at cwd
- `<leader>ge` - open Neo-tree git status view
- `<leader>be` - open Neo-tree buffers view

Neo-tree navigation (while focused inside the tree):
- `j` / `k` - move down / up
- `<Enter>` - open file or expand/collapse directory
- `l` - open file or expand directory
- `h` - collapse directory or go to parent
- `<` - switch to previous source (filesystem -> buffers -> git_status)
- `>` - switch to next source (filesystem -> buffers -> git_status)
- `.` - set root to current node (zoom into a directory)
- `<BS>` - navigate up one level (set parent as root)
- `[c` - jump to previous git-modified file
- `]c` - jump to next git-modified file

Neo-tree file operations:
- `a` - create new file (type `dirname/` for directory)
- `d` - delete file or directory
- `r` - rename file or directory
- `y` - copy file path to clipboard
- `x` - cut file (for move)
- `c` - copy file (for duplicate)
- `p` - paste file after cut or copy
- `m` - move file (prompts for destination path)

Neo-tree display and filtering:
- `H` - toggle hidden files (dotfiles)
- `/` - fuzzy filter tree by name
- `<Esc>` - clear filter or cancel action
- `P` - toggle preview (peek at file content without opening)
- `R` - refresh tree
- `?` - show all Neo-tree keymaps
- `q` - close Neo-tree
- `I` - toggle git ignored files visibility

Neo-tree open modes:
- `<Enter>` - open in current window
- `s` - open in vertical split
- `S` - open in horizontal split
- `t` - open in new tab
- `w` - open with window picker (choose which window)

Terminal:
- `<leader>ft` - open floating terminal at project root
- `<leader>fT` - open floating terminal at cwd
- `<C-/>` - toggle floating terminal (same as `<leader>ft`)
- `<C-\><C-n>` - exit terminal mode into Normal mode
- `:terminal` - open terminal in current split manually
- `<leader>-` - open terminal in horizontal split (edgy layout)

Terminal navigation:
- `<C-h>` / `<C-j>` / `<C-k>` / `<C-l>` - move between windows (works from terminal too)
- In Normal mode inside terminal buffer: all Normal keymaps work (yank, search, etc.)
- `i` or `a` - re-enter terminal mode from Normal mode in a terminal buffer

Scratch buffers:
- `<leader>.` - toggle scratch buffer (lua filetype by default)
- `<leader>S` - select from existing scratch buffers

Useful commands:
- `:pwd` - show current working directory
- `:cd path` - change working directory globally
- `:lcd path` - change working directory for current window only
- `:Neotree reveal` - reveal current file in Neo-tree
- `:Neotree close` - close Neo-tree programmatically
- `:Neotree filesystem` - open filesystem source
- `:Neotree buffers` - open buffers source
- `:Neotree git_status` - open git_status source

## Common Workflows

Browse from project root and open a file:

```text
<leader>e          open Neo-tree
j/k                move up/down
l or <Enter>       expand directory or open file
<C-l>              jump back to editor window
```

Create a nested file structure:

```text
<leader>e
navigate to parent directory
a
type src/utils/helpers.ts
<Enter>
```

Neo-tree creates intermediate directories automatically when you include slashes in the filename.

Move a file to a different directory:

```text
<leader>e
navigate to the file
x                  cut the file
navigate to the target directory
p                  paste
```

Preview files without opening:

```text
<leader>e
navigate to a file
P                  toggle preview panel
j/k                move to other files (preview updates live)
P                  close preview when done
```

Filter the tree to find a file:

```text
<leader>e
/                  start filter
type partial name
<Enter>            confirm filter (tree narrows)
<Esc>              clear filter when done
```

See only git-modified files:

```text
<leader>ge         open git_status source
or inside Neo-tree:
>                  cycle to git_status source
```

Run a quick command and return:

```text
<leader>ft         open floating terminal
git log --oneline -5
<C-\><C-n>         exit terminal mode
<leader>ft         close terminal
```

Use LazyGit from terminal:

```text
<leader>ft         open floating terminal
lazygit
(use lazygit normally)
q                  quit lazygit
<leader>ft         close terminal
```

Create and switch between scratch buffers:

```text
<leader>.          open default scratch (scratch.lua)
write notes
<leader>.          close
<leader>S          open scratch picker
select a different scratch or create new
```

## Practice Scenarios

### Scenario 1 - Navigate Neo-tree And Open Files In Different Ways

Start with Neo-tree closed and a project with this structure:

```text
project/
  src/
    components/
      Header.tsx
      Footer.tsx
    utils/
      format.ts
      validate.ts
    index.ts
  tests/
    format.test.ts
  package.json
  README.md
```

Steps:

1. Press `<leader>e` to open Neo-tree.
2. Press `j` to move down to `src/`.
3. Press `l` to expand `src/`.
4. Press `j` to move to `components/`.
5. Press `l` to expand `components/`.
6. Press `j` to land on `Header.tsx`.
7. Press `<Enter>` to open it in the editor.
8. Press `<leader>e` to focus Neo-tree again.
9. Press `j` to move to `Footer.tsx`.
10. Press `s` to open it in a vertical split.
11. Verify: two files visible side by side, Neo-tree still open on the left.
12. Press `<leader>e` to focus Neo-tree, navigate to `format.ts`.
13. Press `S` to open it in a horizontal split.
14. Press `<C-l>` to return focus to the editor.

Expected result: three files open in splits (vertical and horizontal), Neo-tree showing the tree. You can reach any file without typing its name.

### Scenario 2 - Create Files And Directories

Start with Neo-tree open at the project root.

Steps:

1. Press `<leader>e` to open Neo-tree.
2. Navigate to `src/` and expand it with `l`.
3. Press `a` to create a new file.
4. Type `services/api.ts` and press `<Enter>`.
5. Verify: `services/` directory was created with `api.ts` inside it.
6. Navigate to the new `services/` directory.
7. Press `a` again.
8. Type `auth.ts` and press `<Enter>`.
9. Navigate up to `src/`.
10. Press `a`.
11. Type `types/` and press `<Enter>`.
12. Verify: an empty `types/` directory appears in the tree.

Expected result: Neo-tree created both the intermediate `services/` directory and the files. The trailing slash created an empty directory. Press `R` to refresh if any item does not appear immediately.

### Scenario 3 - Rename, Copy, And Delete Files

Start with a file `src/utils/helpers.ts` that you want to reorganize.

Steps:

1. Press `<leader>e` and navigate to `src/utils/helpers.ts`.
2. Press `r` to rename.
3. Change the name to `string-helpers.ts` and press `<Enter>`.
4. Verify: file renamed in the tree.
5. Press `c` to copy the file.
6. Navigate to `src/utils/`.
7. Press `p` to paste. A copy appears (may be named `string-helpers (copy).ts`).
8. Press `r` on the copy and rename it to `number-helpers.ts`.
9. Navigate to a file you want to remove (e.g., an old scratch file).
10. Press `d`.
11. Confirm deletion by pressing `y`.
12. Verify: file is gone from the tree.

Expected result: you can reorganize files entirely from Neo-tree without touching the shell. LSP references may need updating after renames.

### Scenario 4 - Move Files Between Directories

Move `src/utils/validate.ts` into a new `src/validation/` directory.

Steps:

1. Press `<leader>e` and navigate to `src/`.
2. Press `a`, type `validation/` and press `<Enter>` to create the target directory.
3. Navigate to `src/utils/validate.ts`.
4. Press `x` to cut.
5. Navigate to `src/validation/`.
6. Press `p` to paste.
7. Verify: `validate.ts` is now inside `src/validation/`.
8. The old location under `src/utils/` no longer shows `validate.ts`.

Expected result: file moved successfully. If you had it open in a buffer, the buffer path updates automatically.

### Scenario 5 - Git Status Indicators And Git Source View

Prerequisite: a git repository with some uncommitted changes (modified files, untracked files, staged files).

Steps:

1. Press `<leader>e` to open Neo-tree filesystem view.
2. Observe: modified files show `M` markers, untracked files show `?`, staged files show a different icon.
3. Press `]c` to jump to the next git-modified file.
4. Press `]c` again to continue jumping through changes.
5. Press `[c` to jump back to the previous modified file.
6. Press `>` to switch to the git_status source.
7. Observe: only changed files are visible, grouped by status (staged, unstaged, untracked).
8. Press `<Enter>` on any file to open it.
9. Press `<` to switch back to the filesystem source.

Expected result: you can quickly find and navigate to all uncommitted changes without running `git status` in a terminal. The git source view acts as a focused diff navigator.

### Scenario 6 - Filter The Tree And Use Preview

In a large project, find a specific file using the filter, then preview several files without opening them.

Steps:

1. Press `<leader>e` to open Neo-tree.
2. Press `/` to start the fuzzy filter.
3. Type `config` and observe the tree narrowing to show only matching entries.
4. Press `<Enter>` to confirm the filter.
5. Navigate with `j`/`k` through the filtered results.
6. Press `P` to toggle preview mode.
7. Move to the first result — preview panel shows file contents.
8. Press `j` to move to the next file — preview updates live.
9. Press `k` to move back — preview updates again.
10. Press `P` to close the preview panel.
11. Press `<Esc>` to clear the filter and restore the full tree.

Expected result: you can browse and preview files by partial name without opening them in editor buffers. This keeps your buffer list clean.

### Scenario 7 - Hidden Files And Gitignore Influence

Understand how Neo-tree displays hidden and ignored files.

Steps:

1. Press `<leader>e` to open Neo-tree.
2. Observe: `.git/`, `.env`, and other dotfiles are hidden by default.
3. Press `H` to toggle hidden files ON.
4. Observe: `.git/`, `.gitignore`, `.env`, `.eslintrc` etc. now visible.
5. Observe: files listed in `.gitignore` (like `node_modules/`, `dist/`) may still be hidden.
6. Press `I` to toggle git-ignored files visibility.
7. Observe: `node_modules/`, `dist/`, `.next/` etc. now visible (if they exist).
8. Press `I` again to hide ignored files.
9. Press `H` again to hide dotfiles.

Expected result: you understand the two layers of filtering. `H` controls dotfiles (names starting with `.`). `I` controls files matched by `.gitignore`. Both can be toggled independently.

### Scenario 8 - Buffer Source View

Switch to the buffers source to see only currently open files.

Steps:

1. Open three files from your project using any method (Telescope, Neo-tree, etc.).
2. Press `<leader>e` to open Neo-tree.
3. Press `>` until you reach the `buffers` source (or use `<leader>be`).
4. Observe: only the three open files are listed.
5. Press `d` on one of the buffers to close/delete it.
6. Verify: the buffer is removed from the list and from the buffer list.
7. Press `<Enter>` on another buffer to switch to it.
8. Press `<` to go back to the filesystem source.

Expected result: the buffers source gives you a tree-style buffer manager. Useful when you have many files open and want to close several without remembering buffer numbers.

### Scenario 9 - Floating Terminal For Quick Commands

Use the floating terminal to run a sequence of commands, copy output, and return to editing.

Steps:

1. Press `<leader>ft` to open the floating terminal.
2. The terminal opens at the project root. Type `pwd` and press `<Enter>` to verify.
3. Type `git log --oneline -5` and press `<Enter>`.
4. Type `npm test -- --testPathPattern="format"` and press `<Enter>` (or any relevant test command).
5. Press `<C-\><C-n>` to exit terminal mode into Normal mode.
6. Now you can use Normal mode keymaps: press `/FAIL` to search output for failures.
7. Press `yy` to yank a line of output.
8. Press `i` to re-enter terminal mode (cursor returns to the shell prompt).
9. Press `<C-/>` or `<leader>ft` to close the floating terminal.
10. Press `p` in your editor buffer to paste the yanked line.

Expected result: you ran commands, searched output using Vim motions, yanked text, and pasted it into your editor. The terminal is a Vim buffer when in Normal mode.

### Scenario 10 - Terminal Persistence And Multiple Terminals

The floating terminal preserves state across toggles.

Steps:

1. Press `<leader>ft` to open the floating terminal.
2. Type `export MY_VAR="hello"` and press `<Enter>`.
3. Type `echo $MY_VAR` and verify it prints `hello`.
4. Press `<leader>ft` to close the terminal (hide it).
5. Edit something in your buffer.
6. Press `<leader>ft` to reopen the terminal.
7. Type `echo $MY_VAR` and verify it still prints `hello`.
8. The shell session was preserved.
9. Press `<C-\><C-n>` then `<leader>ft` to close.

Expected result: toggling the terminal hides/shows it without destroying the shell session. Environment variables, directory changes, and history persist.

### Scenario 11 - LazyGit Integration From Terminal

Use the floating terminal to launch LazyGit for interactive git operations.

Steps:

1. Press `<leader>ft` to open the floating terminal.
2. Type `lazygit` and press `<Enter>`.
3. LazyGit opens full-screen inside the terminal buffer.
4. Press `Space` on a file to stage/unstage it.
5. Press `c` to open the commit prompt, type a message, press `<Enter>`.
6. Press `p` to push (if desired).
7. Press `q` to quit LazyGit.
8. You return to the shell prompt inside the floating terminal.
9. Press `<leader>ft` to close the terminal.
10. Press `<leader>e` and observe that Neo-tree git indicators updated.

Expected result: you performed a full git workflow (stage, commit, push) without leaving Neovim. Neo-tree reflects the new git state after refresh.

Note: LazyVim also provides `<leader>gg` as a dedicated LazyGit keymap that opens it directly without the terminal step.

### Scenario 12 - Scratch Buffer Workflow

Use scratch buffers for temporary notes during a debugging session.

Steps:

1. Press `<leader>.` to open the scratch buffer.
2. The buffer opens with lua filetype by default.
3. Press `i` and type: `-- TODO: check why cache returns stale data`.
4. Press `<Esc>`, then add another line: `o-- Steps: 1) check TTL 2) check key format<Esc>`.
5. Press `<leader>.` to close the scratch buffer.
6. Continue working in your code.
7. Press `<leader>.` to reopen — your notes are still there.
8. Press `<leader>S` to open the scratch buffer picker.
9. Observe: you can see all existing scratch buffers and create new ones.
10. Select a different scratch buffer or create a new one.
11. Write different notes in the second scratch.
12. Press `<leader>.` to close.

Expected result: scratch buffers persist across toggles and Neovim sessions (they are saved to disk by Snacks.nvim). You can maintain multiple scratch buffers for different purposes.

### Scenario 13 - Neo-tree vs Telescope Decision Making

Practice choosing the right tool for the job.

Steps:

1. Task: open a file whose name you know is `validate.ts`.
   - Best tool: `<leader><space>` (Telescope find files), type `validate`.
   - Why: faster than navigating the tree when you know the name.

2. Task: see what files exist in `src/components/`.
   - Best tool: `<leader>e` then navigate to `src/components/`.
   - Why: you want to browse and discover, not search for a known name.

3. Task: find all files that import `useAuth`.
   - Best tool: `<leader>sg` (grep), type `useAuth`.
   - Why: you are searching content, not filenames.

4. Task: create a new file `src/hooks/useTheme.ts`.
   - Best tool: `<leader>e`, navigate to `src/`, press `a`, type `hooks/useTheme.ts`.
   - Why: file creation is a Neo-tree operation.

5. Task: reveal where the current file lives in the tree.
   - Best tool: `<leader>e` (LazyVim auto-reveals current file) or `:Neotree reveal`.
   - Why: you want spatial context around the current file.

Expected result: you develop intuition for when to use the explorer vs pickers vs grep. Each has a distinct strength.

## Real-World Drill

Perform this entire sequence without looking up keymaps. Imagine you are starting a new feature in an existing project.

1. Press `<leader>e` to open Neo-tree.
2. Navigate to `src/` and expand it.
3. Press `a` and type `features/notifications/` to create the feature directory.
4. Press `a` and type `features/notifications/NotificationList.tsx` to create the component file.
5. Press `<Enter>` or `l` to open the new file.
6. Press `i`, type a basic React component skeleton, press `<Esc>`.
7. Save with `:w`.
8. Press `<leader>e` to return to Neo-tree.
9. Press `a` and type `features/notifications/useNotifications.ts` to create the hook.
10. Open it and add a placeholder: `export function useNotifications() { return [] }`.
11. Save with `:w`.
12. Press `<leader>.` to open scratch buffer.
13. Type design notes: `-- Notifications: poll every 30s, show toast on new`.
14. Press `<leader>.` to close scratch.
15. Press `<leader>ft` to open the floating terminal.
16. Run `git status` to see your new files listed as untracked.
17. Run `git add src/features/notifications/`.
18. Run `git status` again to confirm they are staged.
19. Press `<C-\><C-n>` to exit terminal mode.
20. Press `<leader>ft` to close terminal.
21. Press `<leader>e` to open Neo-tree.
22. Press `>` to switch to git_status source.
23. Observe your newly staged files listed.
24. Press `<` to return to filesystem source.
25. Navigate to `NotificationList.tsx` and press `P` to preview it without switching buffers.
26. Press `P` to close preview.
27. Press `q` to close Neo-tree.
28. Open the component with `<leader><space>`, type `NotificationList`, select it.
29. Continue editing.

## Alternatives Comparison

### File finding: Neo-tree filter vs Telescope

| Task | Neo-tree (`/` filter) | Telescope (`<leader><space>`) |
|------|----------------------|------------------------------|
| Find file by exact name | Slower, requires navigation first | Fast, type and select |
| Find file in unknown location | Good, browse and discover | Requires knowing partial name |
| See sibling files | Excellent, tree shows context | Must open each separately |
| Create/rename/delete | Built-in operations | Not available |

### Terminal: floating vs split vs shell escape

| Method | When to use |
|--------|------------|
| `<leader>ft` floating | Quick commands, lazygit, temporary tasks |
| `<leader>-` split terminal | Long-running processes you want visible while editing |
| `:!command` shell escape | One-off command, output shown then dismissed |
| `<leader>fT` floating at cwd | When you need terminal in a different directory than root |

### Scratch vs new buffer vs comment

| Method | When to use |
|--------|------------|
| `<leader>.` scratch | Temporary notes that persist but are not part of the project |
| `:enew` new buffer | Truly disposable, lost on close |
| Code comments | Notes that should live with the code permanently |

## Troubleshooting / Verify With Which-Key

- If `<leader>e` opens something other than Neo-tree, check `:LazyExtras` for `editor.neo-tree`.
- If Neo-tree keys do nothing, press `?` inside Neo-tree to see available keymaps.
- If `<C-/>` does not work in your terminal emulator, use `<leader>ft` instead.
- If terminal mode traps all keys, use `<C-\><C-n>` — this always exits terminal mode.
- If a file is created in the wrong folder, check which node is highlighted in Neo-tree. New files are created relative to the focused directory.
- If git indicators do not update after a commit, press `R` inside Neo-tree to refresh.
- If `.gitignore`d files are not showing, press `I` inside Neo-tree to toggle their visibility.
- If the filter (`/`) does not seem to work, ensure you are in the Neo-tree window (not the editor).
- If `<leader>.` does not open scratch, verify Snacks.nvim is installed (default in LazyVim).
- If preview (`P`) opens in a tiny panel, try widening your terminal or adjusting Neo-tree width.
- If you cannot move between Neo-tree and editor, use `<C-h>` / `<C-l>` (window navigation works globally).
- Search `<leader>sk` for `Neo-tree`, `Explorer`, `terminal`, or `scratch` to verify all mappings.
