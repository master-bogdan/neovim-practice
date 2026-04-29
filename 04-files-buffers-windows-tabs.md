# Chapter 4 - Files, Buffers, Windows, And Tabs

## Goal

Understand Neovim layout vocabulary and move through files without confusing buffers, windows, and tabs.

## Mental Model

- A buffer is an open file or unsaved text.
- A window is a viewport showing a buffer.
- A tabpage is a collection of windows, not just one file.
- A picker is often faster than cycling.

## Keymaps

File and buffer pickers:
- `<leader><space>` - find files in root
- `<leader>,` - buffers
- `<leader>fb` - buffers
- `<leader>fB` - all buffers
- `<leader>ff` - find files in root
- `<leader>fF` - find files in cwd
- `<leader>fg` - find git files
- `<leader>fr` - recent files
- `<leader>fR` - recent files in cwd
- `<leader>fc` - find config file

Buffers:
- `<S-h>` - previous buffer
- `<S-l>` - next buffer
- `[b` - previous buffer
- `]b` - next buffer
- `<leader>bb` - switch to other buffer
- `<leader>\`` - switch to other buffer
- `<leader>bd` - delete buffer
- `<leader>bo` - delete other buffers
- `<leader>bD` - delete buffer and window

Windows:
- `<C-h>` - move to left window
- `<C-j>` - move to lower window
- `<C-k>` - move to upper window
- `<C-l>` - move to right window
- `<C-Up>` - increase window height
- `<C-Down>` - decrease window height
- `<C-Left>` - decrease window width
- `<C-Right>` - increase window width
- `<leader>-` - split window below
- `<leader>|` - split window right
- `<leader>wd` - delete window
- `<leader>wm` - toggle zoom mode

Tabs:
- `<leader><tab><tab>` - new tab
- `<leader><tab>]` - next tab
- `<leader><tab>[` - previous tab
- `<leader><tab>l` - last tab
- `<leader><tab>f` - first tab
- `<leader><tab>d` - close tab
- `<leader><tab>o` - close other tabs
- `gt` - next tab
- `gT` - previous tab
- `:tabnew` - new tab
- `:tabclose` - close current tab

Sessions:
- `<leader>qs` - restore session
- `<leader>ql` - restore last session
- `<leader>qS` - select session
- `<leader>qd` - do not save current session

## Common Workflows

Open a file fast:

```text
<leader><space>
type part of file name
Enter
```

Work side-by-side:

```text
<leader>|
<C-l>
<leader><space>
open another file
```

Clean up buffers:

```text
<leader>bo
```

Use tabs for separate layouts:

```text
One tab for implementation, another tab for tests, another tab for notes.
```

## Practice Scenarios

### Scenario 1

Open three files, then cycle forward with `<S-l>`.

Practice area: use this file plus two other chapter files.

Expected result: you can move through open buffers.

### Scenario 2

Cycle backward with `<S-h>`.

Expected result: you return to the previous buffer.

### Scenario 3

Open the buffer picker with `<leader>,` and select a specific buffer.

Expected result: you jump directly instead of cycling.

### Scenario 4

Create a vertical split with `<leader>|` and open another file in the right window.

Expected result: two side-by-side files.

### Scenario 5

Move between windows with `<C-h>` and `<C-l>`.

Expected result: active window changes without mouse input.

### Scenario 6

Resize the current window with `<C-Right>`, `<C-Left>`, `<C-Up>`, and `<C-Down>`.

Expected result: width and height change visibly.

### Scenario 7

Create a new tab with `<leader><tab><tab>`, then move with `<leader><tab>]` and `<leader><tab>[`.

Expected result: you understand tabs as layouts.

### Scenario 8

Close the extra tab with `<leader><tab>d`.

Expected result: tab layout is cleaned up.

## Real-World Drill

1. Open a project file with `<leader><space>`.
2. Split right with `<leader>|`.
3. Open a related test file.
4. Split below with `<leader>-`.
5. Open a notes buffer or terminal.
6. Move through all windows using `<C-h/j/k/l>`.
7. Close one window with `<leader>wd`.
8. Keep only useful buffers with `<leader>bo`.

## Troubleshooting / Verify With Which-Key

- If window movement conflicts with terminal or tmux, verify terminal key handling.
- Use `<leader>sk` and search `buffer`, `window`, or `tab`.
- Use `:ls` to list buffers and `:b <number>` to jump manually.
- Remember: closing a window does not necessarily delete the buffer.
