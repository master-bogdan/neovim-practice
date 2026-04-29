# Chapter 7 - Git Workflows

## Goal

Inspect changes, navigate hunks, view blame and history, and use LazyVim's git pickers without leaving the editor.

## Mental Model

Git inside LazyVim is for local context and focused review. Use the terminal for commands that change repository state when you want full control.

## Keymaps

General git:
- `<leader>gs` - git status
- `<leader>gS` - git stash
- `<leader>gb` - git blame line
- `<leader>gf` - git current file history
- `<leader>gl` - git log
- `<leader>gL` - git log for cwd
- `<leader>gB` - git browse open
- `<leader>gY` - git browse copy

Diff and hunks:
- `<leader>gd` - git diff hunks
- `<leader>gD` - git diff against origin
- `<leader>go` - toggle mini.diff overlay when mini.diff extra is enabled

GitHub extras when enabled:
- `<leader>gi` - GitHub issues open
- `<leader>gI` - GitHub issues all
- `<leader>gp` - GitHub pull requests open
- `<leader>gP` - GitHub pull requests all

Terminal fallback:
- `<leader>ft` - terminal root
- `git status`
- `git diff`
- `git log --oneline --decorate -n 20`

## Common Workflows

Review changed files:

```text
<leader>gs
open changed file
inspect hunks
```

Understand one line:

```text
put cursor on line
<leader>gb
```

Review file history:

```text
<leader>gf
```

Use terminal for commits:

```text
<leader>ft
git status
git add path
git commit
```

## Practice Scenarios

### Scenario 1

Open a git repository and run `<leader>gs`.

Expected result: git status picker opens.

### Scenario 2

Open one changed file from git status.

Expected result: file opens at a relevant location.

### Scenario 3

Use `<leader>gb` on a real line.

Expected result: blame information appears.

### Scenario 4

Use `<leader>gf` in a tracked file.

Expected result: current file history appears.

### Scenario 5

Use `<leader>gl` or `<leader>gL`.

Expected result: git log picker appears.

### Scenario 6

Open terminal and compare with raw git.

Commands:

```sh
git status
git diff --stat
git log --oneline --decorate -n 10
```

Expected result: you know when to use picker vs terminal.

### Scenario 7

If GitHub extras are enabled, open PRs with `<leader>gp`.

Expected result: GitHub PR picker appears.

## Real-World Drill

1. Open a changed repository.
2. Use `<leader>gs` to inspect changed files.
3. Open one file.
4. Use search to find a changed function.
5. Use blame on a nearby line with `<leader>gb`.
6. Open file history with `<leader>gf`.
7. Open terminal and run `git diff`.
8. Return to the editor and close extra buffers.

## Troubleshooting / Verify With Which-Key

- If git pickers are empty, check `git status` in terminal.
- If GitHub mappings do not exist, the relevant LazyVim extras may not be enabled.
- If browse mappings fail, check that the repository has a remote URL.
- Search `<leader>sk` for `Git`, `Blame`, `Status`, `Diff`, or `Pull`.
