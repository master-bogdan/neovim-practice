# Chapter 7 - Git Workflows

## Goal

Inspect changes, navigate hunks, view blame and history, use LazyGit and DiffView, all without leaving the editor.

## Mental Model

Git inside LazyVim is for local context and focused review. LazyGit handles staging, committing, and branching interactively. DiffView handles file-level diffs and history. Use the terminal only when you need raw commands.

## Keymaps

LazyGit:
- `<leader>gg` - open LazyGit full screen
- `<leader>gG` - open LazyGit for cwd only

DiffView:
- `<leader>gv` - toggle DiffView open/close (shows all changed files)
- `<leader>gH` - open DiffView file history for current file

Snacks git pickers:
- `<leader>gs` - git status picker
- `<leader>gS` - git stash picker
- `<leader>gb` - git blame for current line
- `<leader>gf` - git log for current file
- `<leader>gl` - git log for repo
- `<leader>gL` - git log for cwd
- `<leader>gB` - git browse (open file on GitHub/GitLab in browser)
- `<leader>gY` - git browse copy URL

Gitsigns hunk navigation (in buffer with changes):
- `]h` - jump to next hunk
- `[h` - jump to previous hunk
- `<leader>gd` - diff this file (inline diff)
- `<leader>gD` - diff against origin

Mini.diff overlay:
- `<leader>go` - toggle mini.diff overlay (shows inline diff signs)

DiffView internal keys (while DiffView is open):
- `<Tab>` - move to next changed file in the file panel
- `<S-Tab>` - move to previous changed file
- `<CR>` - open file from the file panel
- `q` - close DiffView
- `<leader>b` - toggle DiffView file panel
- `]q` - next change in diff
- `[q` - previous change in diff

LazyGit internal keys (common ones):
- `j`/`k` - move up/down
- `<Space>` - stage/unstage file or hunk
- `c` - commit staged changes
- `P` - push
- `p` - pull
- `q` - quit LazyGit
- `?` - show all LazyGit keymaps
- `<Enter>` - open item / expand
- `e` - open file in editor
- `d` - view diff
- `b` - view branches

Terminal fallback:
- `<leader>ft` - open floating terminal
- `git status`
- `git diff`
- `git log --oneline --decorate -n 20`
- `<C-\><C-n>` - exit terminal mode

## Common Workflows

Stage and commit interactively:

```text
<leader>gg          open LazyGit
<Space>             stage file or hunk
c                   write commit message
<Enter>             confirm commit
q                   close LazyGit
```

Review all changed files at once:

```text
<leader>gv          open DiffView
<Tab>               move to next changed file
<CR>                open file to inspect
]q / [q             jump between hunks
q                   close DiffView
```

Understand one commit's file history:

```text
Open the file
<leader>gH          DiffView file history
<Enter>             inspect a specific commit
q                   close
```

Blame a line to understand context:

```text
Put cursor on line
<leader>gb          inline blame appears
```

## Practice Scenarios

### Scenario 1 - Open LazyGit And Explore

Prerequisites: be in a git repository with at least one change or commit.

1. Press `<leader>gg` to open LazyGit.
2. Press `j`/`k` to move through the list.
3. Press `?` to see available keymaps.
4. Press `q` to close.

Expected result: you opened LazyGit, confirmed it works, and closed it cleanly.

### Scenario 2 - Stage A File And Commit In LazyGit

Practice area — make a small throwaway change first:

```text
Open any chapter file
Press i, add a space somewhere, press <Esc>
:write<CR>
```

Then:
1. Press `<leader>gg` to open LazyGit.
2. Navigate to the changed file with `j`/`k`.
3. Press `<Space>` to stage it.
4. Press `c` to enter commit message.
5. Type a test commit message, press `<Enter>`.
6. Press `q` to close LazyGit.

Expected result: change is committed. You can verify with `<leader>gl`.

### Scenario 3 - View All Changes With DiffView

Prerequisites: have at least one changed or staged file.

1. Press `<leader>gv` to open DiffView.
2. Press `<Tab>` to move to the next changed file in the panel.
3. Press `<CR>` to open a file.
4. Press `]q` to jump to the next hunk.
5. Press `[q` to jump back.
6. Press `q` to close DiffView.

Expected result: you reviewed all changes without leaving the editor.

### Scenario 4 - Inspect File History With DiffView

1. Open any tracked file.
2. Press `<leader>gH` to open DiffView file history.
3. Press `j`/`k` to move through commits.
4. Press `<Enter>` to inspect a specific commit's diff.
5. Press `q` to close.

Expected result: you can trace how the current file changed over time.

### Scenario 5 - Blame A Line

Practice area:

```text
Open any file that has git history
Put your cursor on a specific line
```

1. Put cursor on a line you want to understand.
2. Press `<leader>gb` to see blame for that line.

Expected result: author, date, and commit message appear for the line.

### Scenario 6 - Navigate Hunks In A Changed File

Prerequisites: have unsaved or uncommitted changes in a file.

Practice area — make a small change in a file:

```text
Open a file
Press i, change a word, press <Esc>
Do NOT save yet
```

1. Press `]h` to jump to the next hunk.
2. Press `[h` to jump back.
3. Press `<leader>gd` to see the inline diff.
4. Press `<leader>go` to toggle the mini.diff overlay.

Expected result: you can navigate individual changes within a file without leaving the buffer.

### Scenario 7 - Use Git Status Picker

1. Press `<leader>gs` to open the git status picker.
2. Press `j`/`k` to move through changed files.
3. Press `<CR>` to open a file.
4. Press `<C-v>` to open in vertical split instead.

Expected result: you can jump directly from status to any changed file.

### Scenario 8 - Terminal Git As Fallback

1. Press `<leader>ft` to open the terminal.
2. Run `git status` and press `<CR>`.
3. Run `git diff --stat` and press `<CR>`.
4. Run `git log --oneline --decorate -n 10` and press `<CR>`.
5. Press `<C-\><C-n>` to exit terminal mode.
6. Press `<leader>ft` to close terminal.

Expected result: you know when the picker is enough and when the terminal gives more detail.

## Real-World Drill

Do this sequence in a repository with uncommitted changes:

1. Press `<leader>gs` to open the status picker.
2. Press `<CR>` to open one changed file.
3. Press `]h` to jump to the first changed hunk.
4. Press `<leader>gb` on the changed line to read the blame.
5. Press `<leader>gH` to see the file's commit history.
6. Press `q` to close DiffView.
7. Press `<leader>gg` to open LazyGit.
8. Stage the change with `<Space>`.
9. Commit with `c`, write message, `<Enter>`.
10. Press `q` to close LazyGit.

## Troubleshooting / Verify With Which-Key

- If `<leader>gg` does nothing, check `:Lazy` for `lazygit`.
- If `<leader>gv` does nothing, check `:Lazy` for `diffview`.
- If hunk navigation does not work, check that `gitsigns` is loaded with `:checkhealth`.
- If `<leader>gb` shows nothing, the file may not be tracked by git yet.
- Search `<leader>sk` for `Git`, `LazyGit`, `DiffView`, `Blame`, or `Hunk` to verify mappings.
