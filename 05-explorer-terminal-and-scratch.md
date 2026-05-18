# Chapter 5 - Explorer, Terminal, And Scratch

## Goal

Use Neo-tree for browsing and file management, terminal and scratch buffers as temporary workspaces.

## Mental Model

Pickers are best for finding a known file by name. Neo-tree is best for browsing structure, creating files, and seeing what is nearby. Terminal and scratch buffers are temporary workspaces — not permanent navigation.

## Keymaps

Neo-tree open/close:
- `<leader>e` - toggle Neo-tree at project root (focus it if open, close if focused)
- `<leader>E` - toggle Neo-tree at current working directory
- `<leader>fe` - open Neo-tree at root
- `<leader>fE` - open Neo-tree at cwd

Neo-tree internal keys (while focused inside the tree):
- `<CR>` - open file or expand/collapse directory
- `l` - open file or expand directory (right)
- `h` - collapse directory (left)
- `a` - create new file or directory (type `dirname/` to create a directory)
- `d` - delete file or directory
- `r` - rename file or directory
- `y` - copy file path to clipboard
- `x` - cut file (for move)
- `c` - copy file
- `p` - paste file after cut or copy
- `R` - refresh tree
- `H` - toggle hidden files
- `q` - close Neo-tree
- `?` - show all Neo-tree keymaps
- `<Esc>` - go back / cancel action
- `s` - open file in vertical split
- `S` - open file in horizontal split
- `t` - open file in new tab
- `P` - toggle preview (peek at file without opening)
- `/` - fuzzy filter tree by name
- `<C-h/j/k/l>` - move between windows (works from inside Neo-tree too)

Scratch buffers:
- `<leader>.` - toggle scratch buffer
- `<leader>S` - select from existing scratch buffers

Terminal:
- `<leader>ft` - open floating terminal at project root
- `<leader>fT` - open floating terminal at cwd
- `<C-/>` - toggle floating terminal (same as `<leader>ft`)
- `<C-\><C-n>` - exit terminal mode, enter Normal mode (works inside any `:terminal` buffer)
- `:terminal` - open terminal in a split buffer manually

Useful commands:
- `:pwd` - show current working directory
- `:cd path` - change working directory globally
- `:lcd path` - change working directory for current window only
- `:write` - save current buffer
- `:saveas path` - save current buffer as a new file

## Common Workflows

Browse from project root:

```text
<leader>e          opens Neo-tree
j/k                move up/down
l or <CR>          expand directory or open file
<C-l>              jump back to editor window
```

Create a new file:

```text
<leader>e
navigate to parent directory
a
type filename
<CR>
```

Create a new directory:

```text
<leader>e
navigate to parent
a
type dirname/    <- trailing slash makes it a directory
<CR>
```

Rename a file:

```text
<leader>e
navigate to file
r
type new name
<CR>
```

Delete a file:

```text
<leader>e
navigate to file
d
y    <- confirm deletion
```

Open file in split from Neo-tree:

```text
<leader>e
navigate to file
s    <- vertical split
S    <- horizontal split
```

Create a scratch note:

```text
<leader>.
type notes
<leader>.    <- toggle closed when done
```

Run a terminal command and return:

```text
<leader>ft
pwd
git status
<C-\><C-n>    <- back to Normal mode
<C-l>         <- back to editor window if terminal is in a split
```

## Practice Scenarios

### Scenario 1 - Open And Navigate Neo-tree

1. Press `<leader>e` to open Neo-tree at project root.
2. Press `j` and `k` to move up and down.
3. Press `l` or `<CR>` to expand a directory.
4. Press `h` to collapse it.
5. Press `q` to close Neo-tree.

Expected result: you can browse directories without touching the mouse.

### Scenario 2 - Open A File From Neo-tree Into The Editor

1. Press `<leader>e` to open Neo-tree.
2. Navigate to any chapter file with `j`/`k`.
3. Press `<CR>` to open it.
4. Press `<C-l>` to move focus back to the editor window.

Expected result: file opens in the editor, cursor moves there automatically.

### Scenario 3 - Open A File In A Vertical Split From Neo-tree

1. Press `<leader>e` to open Neo-tree.
2. Navigate to a file.
3. Press `s` to open it in a vertical split.
4. Navigate between the two editor windows with `<C-h>` and `<C-l>`.

Expected result: two files visible side by side.

### Scenario 4 - Create A New File

1. Press `<leader>e` to open Neo-tree.
2. Navigate to the `scratch/` directory (or create it).
3. Press `a` to create a new file.
4. Type `practice-notes.md` and press `<CR>`.
5. Press `<CR>` again or `l` to open it.
6. Type some content in Insert mode: `i`, type, `<Esc>`.
7. Save: `:write<CR>`.

Expected result: new file exists in the tree and on disk.

### Scenario 5 - Rename A File

1. Press `<leader>e`.
2. Navigate to the file you just created.
3. Press `r`.
4. Edit the name to `practice-notes-v2.md`.
5. Press `<CR>`.

Expected result: file is renamed in the tree.

### Scenario 6 - Toggle Hidden Files

1. Press `<leader>e`.
2. Press `H` to show hidden files (dotfiles).
3. Press `H` again to hide them.

Expected result: `.git` and other hidden entries appear and disappear.

### Scenario 7 - Create A Scratch Buffer

1. Press `<leader>.` to open a scratch buffer.
2. Press `i` to enter Insert mode.
3. Type notes, press `<Esc>`.
4. Press `<leader>.` again to close it.
5. Press `<leader>.` again — your notes are still there.

Expected result: scratch buffer persists across toggles.

### Scenario 8 - Use The Terminal

1. Press `<leader>ft` to open the floating terminal.
2. Run `pwd` and press `<CR>`.
3. Run `ls` and press `<CR>`.
4. Run `git status` and press `<CR>`.
5. Press `<C-\><C-n>` to exit terminal mode.
6. Press `<leader>ft` to close the terminal.

Expected result: terminal works, `<C-\><C-n>` reliably exits terminal mode.

## Real-World Drill

Do this sequence without looking anything up:

1. Open Neo-tree with `<leader>e`.
2. Navigate to a source file with `j`/`k`.
3. Open it in a vertical split with `s`.
4. Press `<C-l>` to focus the editor.
5. Toggle scratch buffer with `<leader>.`.
6. Press `i`, write one implementation note, press `<Esc>`.
7. Press `<leader>.` to close scratch.
8. Open terminal with `<leader>ft`.
9. Run `git status` and `<CR>`.
10. Press `<C-\><C-n>` to exit terminal mode.
11. Press `<leader>ft` to close terminal.
12. Switch back to first buffer with `<leader>bb` or `<S-h>`.

## Troubleshooting / Verify With Which-Key

- If `<leader>e` opens something other than Neo-tree, check `:LazyExtras` for `editor.neo-tree`.
- If Neo-tree keys do nothing, press `?` inside Neo-tree to see available keymaps.
- If `<C-/>` does not work in your terminal emulator, use `<leader>ft` instead.
- If terminal mode traps all keys, use `<C-\><C-n>` — this always exits terminal mode.
- If a file is created in the wrong folder, check `:pwd` and navigate Neo-tree to the right parent first.
- Search `<leader>sk` for `Neo-tree` or `Explorer` to verify open/close mappings.
