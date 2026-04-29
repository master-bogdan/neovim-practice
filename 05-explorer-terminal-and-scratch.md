# Chapter 5 - Explorer, Terminal, And Scratch

## Goal

Use LazyVim's file explorer, terminal, and scratch buffers as part of normal development.

## Mental Model

Pickers are usually best for finding a known file. The explorer is best for browsing structure, creating files, and seeing nearby files. Terminal and scratch buffers are temporary workspaces, not permanent project navigation.

## Keymaps

Explorer and files:
- `<leader>e` - explorer at root directory
- `<leader>E` - explorer at current working directory
- `<leader>fe` - explorer at root directory
- `<leader>fE` - explorer at cwd
- `<leader>fn` - new file
- `<leader>fc` - find config file

Scratch buffers:
- `<leader>.` - toggle scratch buffer
- `<leader>S` - select scratch buffer

Terminal:
- `<leader>ft` - terminal at root directory
- `<leader>fT` - terminal at cwd
- `<C-/>` - terminal at root directory
- `<C-_>` - terminal mapping fallback / ignored by which-key in some terminals
- `:terminal` - open terminal manually
- `<C-\><C-n>` - leave terminal mode

Useful commands:
- `:pwd` - show current working directory
- `:cd path` - change working directory
- `:lcd path` - change local window directory
- `:write` - save file
- `:saveas path` - save current buffer as another file

## Common Workflows

Browse from project root:

```text
<leader>e
move in explorer
open a file
```

Create a scratch note:

```text
<leader>.
type notes
close when done
```

Run a terminal command:

```text
<leader>ft
pwd
git status
<C-\><C-n>
```

Create a new file:

```text
<leader>fn
enter filename
write content
:write
```

## Practice Scenarios

### Scenario 1

Open explorer at project root with `<leader>e`.

Expected result: you see files under the current project root.

### Scenario 2

Open explorer at cwd with `<leader>E`.

Expected result: you can compare root-based and cwd-based views.

### Scenario 3

Open a chapter file from the explorer.

Expected result: file opens without using the mouse.

### Scenario 4

Create a new scratch buffer with `<leader>.`.

Practice area:

```text
notes from current task
next command to run
question to verify
```

Expected result: scratch content exists temporarily.

### Scenario 5

Select a scratch buffer with `<leader>S`.

Expected result: you can recover an existing scratch buffer.

### Scenario 6

Create a new file with `<leader>fn`.

Suggested filename:

```text
scratch/lazyvim-practice-file.md
```

Expected result: new file exists after `:write`.

### Scenario 7

Use `:saveas scratch/lazyvim-practice-copy.md`.

Expected result: a second file exists under the new path.

### Scenario 8

Open a terminal with `<leader>ft`, run commands, then return to Normal mode.

Commands:

```sh
pwd
ls
git status
```

Expected result: terminal works and `<C-\><C-n>` returns to Normal mode.

## Real-World Drill

1. Open explorer with `<leader>e`.
2. Open a real file.
3. Toggle scratch with `<leader>.`.
4. Write a short implementation note.
5. Open terminal with `<leader>ft`.
6. Run `git status`.
7. Return to Normal mode with `<C-\><C-n>`.
8. Jump back to the previous buffer with `<leader>bb`.

## Troubleshooting / Verify With Which-Key

- If explorer behavior differs, search keymaps with `<leader>sk` for `Explorer`.
- If `<C-/>` does not work, use `<leader>ft` or `:terminal`.
- If terminal mode traps keys, use `<C-\><C-n>`.
- If a file is created in the wrong folder, check `:pwd`.
