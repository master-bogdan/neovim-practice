# Chapter 7 - Git Workflows

## Goal

Inspect changes, navigate hunks, view blame and history, use LazyGit and DiffView, all without leaving the editor.

## Mental Model

Git inside LazyVim is for local context and focused review. LazyGit handles staging, committing, and branching interactively. DiffView handles file-level diffs and history. Use the terminal only when you need raw commands.

### Git Operation Decision Tree

Use this to pick the fastest path for what you need:

- Quick status check → `<leader>gg` (LazyGit)
- Compare file to last commit → `<leader>gd` (inline diff)
- Compare branch to main → `:DiffviewOpen main...HEAD`
- Full file history → `<leader>gH`
- Who changed this line → `<leader>gb` (blame)
- Resolve conflicts → `]x`/`[x` + `co`/`ct`/`cb`
- Stash work-in-progress → LazyGit stash menu

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

Git conflict navigation and resolution (git-conflict.nvim):
- `]x` - jump to next conflict marker
- `[x` - jump to previous conflict marker
- `co` - accept ours (keep your version)
- `ct` - accept theirs (keep incoming version)
- `cb` - accept both (keep both versions)
- `c0` - accept none (delete both versions)
- `<leader>gx` - list all conflicts in quickfix

Gitsigns hunk navigation (in buffer with changes):
- `]h` - jump to next hunk
- `[h` - jump to previous hunk
- `<leader>gd` - diff this file (inline diff)
- `<leader>gD` - diff against origin

Gitsigns commands:
- `:Gitsigns toggle_current_line_blame` - toggle persistent inline blame on every line

Mini.diff overlay:
- `<leader>go` - toggle mini.diff overlay (shows inline diff signs)

DiffView internal keys (while DiffView is open):
- `<Tab>` - move to next changed file in the file panel
- `<S-Tab>` - move to previous changed file
- `<Enter>` - open file from the file panel
- `q` - close DiffView
- `<leader>b` - toggle DiffView file panel
- `]q` - next change in diff
- `[q` - previous change in diff

DiffView advanced commands:
- `:DiffviewFileHistory --author=name` - filter file history by author
- `:DiffviewFileHistory --range=main..HEAD` - show commits on current branch vs main

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
<Enter>                open file to inspect
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
:write<Enter>
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
3. Press `<Enter>` to open a file.
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
3. Press `<Enter>` to open a file.
4. Press `<C-v>` to open in vertical split instead.

Expected result: you can jump directly from status to any changed file.

### Scenario 8 - Terminal Git As Fallback

1. Press `<leader>ft` to open the terminal.
2. Run `git status` and press `<Enter>`.
3. Run `git diff --stat` and press `<Enter>`.
4. Run `git log --oneline --decorate -n 10` and press `<Enter>`.
5. Press `<C-\><C-n>` to exit terminal mode.
6. Press `<leader>ft` to close terminal.

Expected result: you know when the picker is enough and when the terminal gives more detail.

### Scenario 9 - Merge Conflict Resolution

Prerequisites: create a merge conflict so you have something to practice on.

Setup (run in terminal with `<leader>ft`):

```text
git checkout -b conflict-ours
```

Edit a config file (e.g., `config.json`) and change a port number:

```text
Open config.json (or create one with {"port": 3000, "host": "localhost"})
Change "port": 3000 to "port": 4000
:write<Enter>
```

Commit the change:

```text
<leader>gg
<Space>              stage the file
c                    commit with message "change port to 4000"
<Enter>
q
```

Now create the conflicting branch:

```text
<leader>ft
git checkout main
git checkout -b conflict-theirs
```

Edit the same file, same line area — add a new field next to the port:

```text
Open config.json
Change "port": 3000 to "port": 3000, "debug": true
:write<Enter>
```

Commit and merge:

```text
<leader>gg
<Space>              stage
c                    commit with message "add debug field"
<Enter>
q
<leader>ft
git checkout conflict-ours
git merge conflict-theirs
```

The merge will fail with a conflict. Now resolve it:

1. Open the conflicted file (it will have conflict markers).
2. Press `]x` to jump to the first conflict marker.
3. Read the conflict: "ours" shows `"port": 4000`, "theirs" shows `"port": 3000, "debug": true`.
4. Press `co` to accept ours (keeps port 4000), OR press `ct` to accept theirs, OR press `cb` to accept both.
5. If there are more conflicts, press `]x` to jump to the next one.
6. Press `<leader>gx` to list all remaining conflicts in quickfix.
7. After resolving all conflicts, save the file with `:write`.
8. Open LazyGit with `<leader>gg`, stage the resolved file, and commit the merge.

Expected result: you resolved the conflict entirely within Neovim using git-conflict.nvim keymaps without manually editing conflict markers.

### Scenario 10 - Reading Git Blame Output

Prerequisites: be in a repository with multiple commits by at least one author.

1. Open a file that has meaningful git history.
2. Put your cursor on a line you are curious about.
3. Press `<leader>gb` to see the inline blame.

Read the blame output. It contains:

- **Commit hash** (short) — the unique identifier for the commit that last changed this line.
- **Author name** — who made the change.
- **Date** — when the change was committed.
- **Commit message** — the first line of the commit message explaining why.

Practice reading blame:

4. Move your cursor to different lines and press `<leader>gb` on each.
5. Find a line that was changed recently versus one that was part of the initial commit.
6. Note the commit hash from the blame output.
7. Open LazyGit with `<leader>gg`.
8. Press `/` to search in LazyGit and paste the commit hash.
9. Press `<Enter>` to view the full commit — you can now see all files changed in that commit.
10. Press `q` to close LazyGit.

For persistent blame on all lines:

11. Run `:Gitsigns toggle_current_line_blame` to see blame on every line as you move your cursor.
12. Run the same command again to toggle it off.

Expected result: you can read blame output, understand who changed what and when, and trace a line back to its originating commit.

### Scenario 11 - Git Stash Workflows

Prerequisites: be on a feature branch with uncommitted changes.

Practice area — simulate being mid-feature:

```text
Open a file
Press i, add several lines of work-in-progress code, press <Esc>
:write<Enter>
```

Now you need to hotfix something on main. Stash your work:

1. Press `<leader>gg` to open LazyGit.
2. Navigate to the files panel (should be the default view).
3. Press `s` to stash all current changes. LazyGit will prompt for a stash message.
4. Type a descriptive name like "WIP: feature X half done" and press `<Enter>`.
5. Confirm your working directory is now clean (no changes shown).

Switch to main and make the hotfix:

6. Press `b` to open the branches panel in LazyGit.
7. Navigate to `main` and press `<Space>` to checkout.
8. Press `q` to close LazyGit temporarily.
9. Make your hotfix edit, save the file.
10. Press `<leader>gg`, stage, commit with message "hotfix: fix critical bug".
11. Press `q` to close LazyGit.

Return to your feature branch and pop the stash:

12. Press `<leader>gg` to reopen LazyGit.
13. Press `b`, navigate to your feature branch, press `<Space>` to checkout.
14. Press `5` (or navigate to the stash panel — the number depends on your LazyGit layout).
15. Navigate to your stash entry.
16. Press `g` to pop the stash (applies and removes it) or `<Space>` to apply (keeps the stash).
17. Press `q` to close LazyGit.
18. Verify your work-in-progress changes are back in the file.

Expected result: you stashed WIP, switched branches for a hotfix, and restored your WIP without losing anything. This is safer than committing half-done work.

### Scenario 12 - Branch Comparison With DiffView

Prerequisites: be on a feature branch that has at least one commit ahead of main.

1. Run `:DiffviewOpen main...HEAD` to open a diff of everything your branch has changed compared to main.
2. In the file panel on the left, press `j`/`k` to navigate through all changed files.
3. Press `<Enter>` to open a file's diff view.
4. Press `]q` to jump to the next change within the file.
5. Press `[q` to jump to the previous change.
6. Press `<Tab>` to move to the next file.
7. Review each file as if you were reviewing your own PR before submitting.
8. Press `q` to close DiffView.

For filtering history by author:

9. Run `:DiffviewFileHistory --author=YourName` to see only your commits in the file history.
10. Press `q` to close.

For branch range comparison:

11. Run `:DiffviewFileHistory --range=main..HEAD` to see all commits on your branch.
12. Press `j`/`k` to browse commits, `<Enter>` to inspect one.
13. Press `q` to close.

Expected result: you reviewed all changes on your branch relative to main, exactly like a self-review before opening a pull request.

### Scenario 13 - Interactive Hunk Staging

Prerequisites: have a file with multiple unrelated changes (mix of feature code, formatting, and debug logging).

Practice area — create a file with three distinct changes:

```text
Open a tracked file
Make change 1: add a new function or feature line (the real work)
Make change 2: fix indentation or formatting on an unrelated line
Make change 3: add a console.log or print statement for debugging
:write<Enter>
```

Now stage only the feature change:

1. Press `<leader>gg` to open LazyGit.
2. Navigate to the changed file in the files panel.
3. Press `<Enter>` to expand the file and see individual hunks/lines.
4. Navigate to the hunk containing your feature addition.
5. Press `<Space>` to stage just that hunk.
6. If the feature change and debug log are in the same hunk, press `v` to switch to line-by-line staging mode, then select only the feature lines and press `<Space>`.
7. Navigate to the formatting fix hunk — leave it unstaged for now.
8. Navigate to the debug log hunk — leave it unstaged.
9. Press `c` to commit with message "feat: add new feature".
10. Press `<Enter>` to confirm.

Now stage the formatting fix separately:

11. Navigate to the formatting hunk, press `<Space>` to stage it.
12. Press `c`, commit with message "style: fix indentation".
13. Press `<Enter>`.

Leave the debug log unstaged (you will remove it later):

14. Press `q` to close LazyGit.
15. Open the file and remove the debug line manually.

Expected result: you created two focused commits from one file — one for the feature, one for formatting — and discarded the debug logging. Your git history is clean and reviewable.

## Real-World Drill

Do this sequence in a repository with uncommitted changes:

1. Press `<leader>gs` to open the status picker.
2. Press `<Enter>` to open one changed file.
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
