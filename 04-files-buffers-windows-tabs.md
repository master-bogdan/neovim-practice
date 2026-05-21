# Chapter 4 - Files, Buffers, Windows, And Tabs

## Goal

Navigate between files, manage multiple views of your code, and build efficient workspace layouts without reaching for the mouse. Understand when to use buffers, splits, tabs, and pickers so each project context stays organized.

## Mental Model

Neovim has four layers of organization:

```text
buffer   = an open file (or unsaved text) loaded into memory
window   = a viewport that displays one buffer
tab page = a layout of windows (not a single file tab like in VS Code)
session  = a saved snapshot of all tabs, windows, and buffers
```

Key insight: closing a window does NOT close the buffer. The file stays in memory until you explicitly delete the buffer. This means you can have 30 buffers open but only see 2 in windows.

The alternate file (`<C-^>`) is the single most useful buffer trick. It flips between your current buffer and the one you were just editing. Think of it as "the other file" toggle.

A picker (telescope) is almost always faster than cycling through buffers one at a time. Use cycling for adjacent buffers, pickers for anything else.

In LazyVim with edgy.nvim, sidebar windows (neo-tree, trouble, terminals) are managed automatically. They snap to edges and do not interfere with your main editing splits.

## Keymaps

File and buffer pickers (telescope):
- `<leader><space>` - find files in project root
- `<leader>,` - open buffer picker (shows all open buffers)
- `<leader>fb` - buffers (same as `<leader>,`)
- `<leader>fB` - all buffers (including unlisted)
- `<leader>ff` - find files in project root
- `<leader>fF` - find files in cwd
- `<leader>fg` - find git-tracked files only
- `<leader>fr` - recent files (across all projects)
- `<leader>fR` - recent files in cwd only
- `<leader>fc` - find Neovim config file

Buffer navigation and lifecycle:
- `<S-h>` - previous buffer
- `<S-l>` - next buffer
- `[b` - previous buffer (same as `<S-h>`)
- `]b` - next buffer (same as `<S-l>`)
- `<leader>bb` - switch to alternate buffer (same as `<C-^>`)
- `<leader>\`` - switch to alternate buffer
- `<C-^>` - alternate file (the last buffer you were editing)
- `<leader>bd` - delete buffer (closes buffer, keeps window)
- `<leader>bo` - delete other buffers (keep only current)
- `<leader>bD` - delete buffer and its window
- `:e <path>` - open file by path into current window
- `:b <partial>` - switch to buffer matching partial name
- `:ls` - list all buffers with numbers
- `:b#` - switch to alternate buffer (command form of `<C-^>`)
- `:bwipeout` - completely remove buffer and all its data

Window splits and navigation:
- `<C-h>` - move to left window
- `<C-j>` - move to lower window
- `<C-k>` - move to upper window
- `<C-l>` - move to right window
- `<leader>-` - split window below (horizontal split)
- `<leader>|` - split window right (vertical split)
- `<leader>wd` - delete (close) current window
- `<leader>wm` - toggle maximize/zoom current window
- `<C-Up>` - increase window height
- `<C-Down>` - decrease window height
- `<C-Left>` - decrease window width
- `<C-Right>` - increase window width
- `<C-w>=` - equalize all window sizes
- `<C-w>r` - rotate windows downward/rightward
- `<C-w>R` - rotate windows upward/leftward
- `<C-w>x` - exchange current window with next
- `<C-w>H` - move current window to far left (full height)
- `<C-w>J` - move current window to bottom (full width)
- `<C-w>K` - move current window to top (full width)
- `<C-w>L` - move current window to far right (full height)
- `<C-w>T` - move current window to a new tab page
- `<C-w>o` - close all other windows (only in LazyVim: `<leader>wo`)

Tab pages:
- `<leader><tab><tab>` - new tab
- `<leader><tab>]` - next tab
- `<leader><tab>[` - previous tab
- `<leader><tab>l` - last tab
- `<leader><tab>f` - first tab
- `<leader><tab>d` - close tab
- `<leader><tab>o` - close other tabs
- `gt` - next tab
- `gT` - previous tab
- `{count}gt` - go to tab number (e.g. `2gt` for tab 2)
- `:tabnew` - new tab
- `:tabclose` - close current tab
- `:tabonly` - close all other tabs

Sessions (persistence across restarts):
- `<leader>qs` - restore session for current directory
- `<leader>ql` - restore last session (any directory)
- `<leader>qS` - select session from list
- `<leader>qd` - do not save current session on exit

Edgy and sidebar management:
- `<leader>e` - toggle neo-tree file explorer (snaps to left edge)
- `<leader>ge` - toggle neo-tree git status view
- `<leader>be` - toggle neo-tree buffer view

## Common Workflows

Open a file fast:

```text
<leader><space>
type part of file name (fuzzy match)
Enter
```

Toggle between two files (implementation and test):

```text
<C-^>
```

Work side-by-side:

```text
<leader>|            (split right)
<C-l>                (move to new window)
<leader><space>      (find and open another file)
```

Quickly compare a file with its test:

```text
Open main file first
<leader>|            (vertical split)
<leader><space>      (find the .test or _test file)
Now both are visible side by side
```

Clean up when too many buffers accumulate:

```text
<leader>bo           (delete all other buffers)
```

Use tabs for separate contexts:

```text
Tab 1: implementation files (models, services)
Tab 2: test files side-by-side with mocks
Tab 3: configuration and infrastructure
```

Restore a project after restarting Neovim:

```text
Open Neovim in the project directory
<leader>qs           (restores saved session)
```

## Practice Scenarios

### Scenario 1 - Open Files With The Picker And Cycle Between Them

Open three related files, then practice cycling forward and backward.

Practice area (files to open):

```text
src/services/userService.ts
src/services/roomService.ts
src/services/cacheService.ts
```

Step-by-step:
1. Press `<leader><space>`, type `userService`, press `Enter`
2. Press `<leader><space>`, type `roomService`, press `Enter`
3. Press `<leader><space>`, type `cacheService`, press `Enter`
4. You are now viewing `cacheService.ts`
5. Press `<S-h>` — you see `roomService.ts`
6. Press `<S-h>` — you see `userService.ts`
7. Press `<S-l>` — you see `roomService.ts` again
8. Press `<S-l>` — back to `cacheService.ts`

Expected result: you can move linearly through open buffers without a picker. Useful when you know the adjacent buffer is what you want.

### Scenario 2 - Jump Directly With The Buffer Picker

When you have many buffers open, cycling is slow. Use the picker to jump directly.

Step-by-step:
1. Open 5+ files using `<leader><space>` (any project files)
2. Press `<leader>,` — the buffer picker appears showing all open buffers
3. Type a few characters of the filename you want (fuzzy matching)
4. Press `Enter` to jump directly to that buffer
5. Alternatively: use `j`/`k` to select from the list, then `Enter`

Expected result: you reach any open buffer in 2-3 keystrokes regardless of how many are open.

### Scenario 3 - Alternate File Toggle With `<C-^>`

The alternate file is the last buffer you were editing. This is the fastest two-file workflow.

Practice area (simulated workflow):

```text
Scenario: you are writing a function in handler.go and need to check the type in types.go.
```

Step-by-step:
1. Open `handler.go` with `<leader><space>`
2. Open `types.go` with `<leader><space>` — now `handler.go` becomes the alternate
3. Press `<C-^>` — you jump back to `handler.go`
4. Press `<C-^>` — you jump back to `types.go`
5. Continue toggling as needed while working between the two files
6. Alternative: press `<leader>bb` (same effect as `<C-^>`)

Expected result: you flip between two related files instantly. This is the most efficient pattern when your work involves exactly two files (implementation/test, handler/types, component/styles).

### Scenario 4 - Buffer Lifecycle: Open, Switch, Close, Wipeout

Understand the difference between closing a window and deleting a buffer.

Step-by-step:
1. Open any file with `<leader><space>` — call it File A
2. Open another file with `<leader><space>` — call it File B (you are viewing B)
3. Run `:ls` — both A and B appear in the buffer list
4. Press `<leader>bd` — File B is deleted from the buffer list, window shows another buffer
5. Run `:ls` — only File A remains
6. Open File B again with `<leader><space>`
7. Now try `:bwipeout` — this fully removes the buffer AND its undo history, marks, etc.
8. Run `:ls` — File B is completely gone

Expected result: you understand `<leader>bd` (soft close) vs `:bwipeout` (hard removal). Use `bd` in daily work. Use `bwipeout` when a buffer has stale state you want fully purged.

### Scenario 5 - Create Vertical And Horizontal Splits

Build a multi-pane layout for comparing files or watching output.

Practice area (target layout):

```text
+-------------------+-------------------+
|                   |                   |
|   handler.go      |   handler_test.go |
|                   |                   |
+-------------------+-------------------+
|                                       |
|   terminal or notes                   |
|                                       |
+---------------------------------------+
```

Step-by-step:
1. Open `handler.go` with `<leader><space>`
2. Press `<leader>|` — creates a vertical split (two side-by-side windows showing the same buffer)
3. Press `<C-l>` — move cursor to the right window
4. Press `<leader><space>`, type `handler_test`, press `Enter` — right window now shows the test
5. Press `<C-h>` — move back to left window (handler.go)
6. Press `<leader>-` — creates a horizontal split below (left window splits into top and bottom)
7. Press `<C-j>` — move to the lower window
8. Open a notes file or terminal here
9. Navigate between all three windows with `<C-h/j/k/l>`

Expected result: you have a three-pane layout. Two files on top side by side, one file on the bottom left.

### Scenario 6 - Resize Windows For Comfortable Reading

After splitting, one pane is often too narrow or too short.

Step-by-step:
1. Create a vertical split: `<leader>|`
2. The windows are equal width. Make the left one wider:
3. With cursor in the left window, press `<C-Right>` several times — width increases
4. Press `<C-Left>` several times — width decreases
5. Create a horizontal split: `<leader>-`
6. With cursor in the top window, press `<C-Down>` — height decreases
7. Press `<C-Up>` — height increases
8. To reset all windows to equal size: press `<C-w>=`
9. To maximize the current window temporarily: press `<leader>wm` (zoom toggle)
10. Press `<leader>wm` again to restore the layout

Expected result: you can fine-tune pane sizes without memorizing pixel counts. The zoom toggle is especially useful for temporarily focusing on one file in a multi-split layout.

### Scenario 7 - Move Windows Around The Layout

Rearrange windows without closing and reopening them.

Step-by-step:
1. Create a layout: open file A, press `<leader>|`, open file B in the right pane
2. Press `<leader>-` in the right pane to add file C below it
3. Now you have: A (left), B (top-right), C (bottom-right)
4. Move cursor to window B: `<C-k>` or `<C-l>` then `<C-k>`
5. Press `<C-w>H` — window B moves to the far left (full height)
6. The layout is now rearranged
7. Press `u` — this does NOT undo window movements; undo is for text only
8. Try `<C-w>x` — exchanges the current window with the next one
9. Try `<C-w>r` — rotates all windows in the current row/column

Expected result: you can rearrange your layout without closing windows. Use `<C-w>H/J/K/L` for major repositioning, `<C-w>x` for swapping adjacent windows.

### Scenario 8 - Tab Pages For Separate Contexts

Use tabs when you need completely separate window layouts (not for individual files).

Practice area (scenario):

```text
Context 1: Feature development (implementation + test side by side)
Context 2: Reviewing a PR (multiple changed files)
Context 3: Config editing (docker-compose, env, Makefile)
```

Step-by-step:
1. Set up your feature development layout (splits with impl + test)
2. Press `<leader><tab><tab>` — creates a new tab page
3. You now have a fresh window. Open PR-related files here with their own splits
4. Press `<leader><tab><tab>` — creates a third tab page
5. Open config files here
6. Navigate between tabs:
   - `<leader><tab>]` or `gt` — next tab
   - `<leader><tab>[` or `gT` — previous tab
   - `1gt` — jump to tab 1 directly
   - `2gt` — jump to tab 2 directly
7. Close the config tab when done: `<leader><tab>d`
8. Close all other tabs, keep current: `<leader><tab>o`

Expected result: tabs give you separate layouts. You never lose your carefully arranged splits in tab 1 while working in tab 2.

### Scenario 9 - The Neo-tree Sidebar And edgy.nvim

Use the file explorer to browse and open files while edgy keeps it pinned to the left edge.

Step-by-step:
1. Press `<leader>e` — neo-tree opens on the left side (managed by edgy.nvim)
2. Navigate the tree with `j`/`k`
3. Press `Enter` on a file — it opens in the main editing area (not in the sidebar)
4. Press `<leader>e` — neo-tree closes, your main splits are undisturbed
5. Press `<leader>ge` — neo-tree opens showing git status (modified/untracked files)
6. Press `Enter` on a modified file to open it
7. Press `<leader>ge` — close git view
8. Notice: edgy.nvim keeps sidebar windows from stealing space from your editing splits
9. When you press `<C-h>` from your editor, you move INTO the neo-tree window
10. When you press `<C-l>` from neo-tree, you move back to your editor

Expected result: sidebars are stable, predictable, and never disrupt your main editing layout. edgy.nvim handles the window management for you.

### Scenario 10 - Session Save And Restore

Save your complete workspace state so you can resume after restarting Neovim.

Step-by-step:
1. Open a project directory: `cd ~/Projects/my-app && nvim`
2. Set up your layout: open files, create splits, arrange tabs
3. LazyVim auto-saves sessions on exit by default (via persistence.nvim)
4. Quit Neovim: `:qa`
5. Reopen Neovim in the same directory: `cd ~/Projects/my-app && nvim`
6. Press `<leader>qs` — your entire session is restored (buffers, windows, tabs)
7. If you want the last session regardless of directory: `<leader>ql`
8. To choose from all saved sessions: `<leader>qS`
9. If you do NOT want the current session saved on exit: `<leader>qd`

Expected result: you never lose your workspace layout. Sessions persist across Neovim restarts, complete with all open buffers and window arrangements.

### Scenario 11 - Multi-File Editing Workflow (TypeScript)

A realistic scenario: you are adding a new API endpoint and need to touch multiple files.

Practice area (files involved):

```text
src/routes/users.ts          (new route handler)
src/services/userService.ts  (new service method)
src/types/user.ts            (new type definition)
src/tests/users.test.ts      (new test)
```

Step-by-step:
1. Open `types/user.ts` with `<leader><space>` — define the type first
2. Open `services/userService.ts` with `<leader><space>` — write the service
3. Toggle back to types with `<C-^>` to check a field name
4. Toggle forward with `<C-^>` to continue the service
5. Press `<leader>|` to split right
6. Press `<C-l>`, open `routes/users.ts` — now service and route are side by side
7. When you need the test: `<leader><tab><tab>` for a new tab
8. Open `users.test.ts` and `userService.ts` side by side in this tab
9. Switch between tabs with `gt`/`gT` to move between implementation and testing
10. Use `<leader>,` anytime you need to jump to a specific buffer without knowing which tab it is in

Expected result: you maintain flow while touching 4+ files. The alternate file toggle handles the most common pair, splits handle side-by-side reference, and tabs separate your mental contexts.

### Scenario 12 - Multi-File Editing Workflow (Go)

A realistic Go scenario: implementing a new handler with its dependencies.

Practice area (files involved):

```text
internal/handler/room.go          (HTTP handler)
internal/handler/room_test.go     (handler tests)
internal/service/room.go          (business logic)
internal/repository/room.go       (database layer)
```

Step-by-step:
1. Open `internal/service/room.go` with `<leader><space>` — start with business logic
2. Press `<leader>|` to split right
3. Press `<C-l>`, open `internal/repository/room.go` — service references repository
4. Write service code on the left, reference repository interface on the right
5. When done, close the right split: press `<C-l>` then `<leader>wd`
6. Open `internal/handler/room.go` with `<leader><space>`
7. Use `<C-^>` to toggle between handler and service (the two most recent files)
8. For testing: press `<leader><tab><tab>` to create a test tab
9. Press `<leader>|` to split
10. Open `room.go` on the left and `room_test.go` on the right
11. Run tests from the terminal without leaving this layout

Expected result: Go's package structure maps naturally to buffer management. Use splits for cross-package reference and tabs to separate testing from implementation.

### Scenario 13 - Clean Up A Messy Workspace

After a long session, you have 20+ buffers and scattered windows. Reset efficiently.

Step-by-step:
1. Check current state: run `:ls` — notice many buffers listed
2. Close all buffers except the current one: `<leader>bo`
3. Run `:ls` again — only one buffer remains
4. If you have multiple confusing splits: `<C-w>o` closes all other windows
5. Now you have one window with one buffer — a clean slate
6. If you had multiple tabs and want only this one: `<leader><tab>o`
7. Alternatively, if you want to start fresh but keep the session saveable:
   - Close all tabs: `<leader><tab>o`
   - Delete other buffers: `<leader>bo`
   - Rebuild your layout intentionally

Expected result: you can reset from chaos to a clean workspace in 3-4 keystrokes. Do this periodically to avoid cognitive overload.

### Scenario 14 - Working With Config Files Across A Project

You need to edit multiple config files that live in different directories.

Practice area (files involved):

```text
docker-compose.yml
.env.development
Makefile
nginx/nginx.conf
k8s/deployment.yaml
```

Step-by-step:
1. Open `docker-compose.yml` with `<leader><space>`
2. Press `<leader>|` — split right
3. Open `.env.development` — reference env vars while editing compose
4. Need the Makefile? Press `<leader>,` (buffer picker) — but it is not open yet
5. Press `<leader><space>`, type `Makefile`, press `Enter` — opens in current window
6. Now `.env.development` is the alternate file. Press `<C-^>` to flip between Makefile and env
7. To see all three: press `<C-h>` to go to left split (docker-compose), then `<leader>-` to add a horizontal split below, open Makefile there
8. Use `<C-h/j/k/l>` to navigate between the three panes

Expected result: config editing often requires cross-referencing multiple files. Splits let you see them simultaneously, and the alternate file toggle handles your most active pair.

## Project Switcher (project.nvim extra)

When you work across multiple repositories or services, the project switcher lets you jump between them without leaving Neovim.

### Keymaps

- `<leader>fp` - open project picker (lists detected projects)

### How it works

Projects are auto-detected based on `.git`, `package.json`, `go.mod`, `Cargo.toml`, and similar root markers. When you switch projects:
- The working directory changes to the new project root
- `<leader><space>` now searches files in that project
- `<leader>sg` now greps within that project
- Session auto-save preserves your layout per project

### Common workflow

```text
<leader>fp            open project picker
type part of the project name (fuzzy)
Enter                 switches to that project
<leader>qs            restore that project's session (buffers, splits, tabs)
```

### Practice Scenario — Switch Between Two Projects

Step-by-step:
1. Open nvim in your current project
2. Press `<leader>fp` — see a list of recent projects
3. Select a different project from the list
4. Notice: the file picker (`<leader><space>`) now shows files from the new project
5. Open a file, make a mental note of the layout
6. Press `<leader>fp` again and switch back to the original project
7. Press `<leader>qs` to restore your saved session

When to use projects vs tabs:
- **Projects** — completely different codebases (different repos, different languages)
- **Tabs** — different contexts within the SAME codebase (feature code vs tests vs config)

## Treesitter Context (sticky function headers)

When scrolling inside a long function, the function signature disappears off-screen. Treesitter-context pins it to the top of the window so you always know where you are.

### Behavior

- Automatically shows the enclosing function/class/block at the top of the window
- Stacks nested contexts (e.g., class → method → if-block)
- Click on the sticky line to jump to that scope's definition
- Disappears when you scroll back up to where the context is visible

### When it helps

- Long functions (50+ lines) — you always see the function signature
- Deeply nested code — you see the full nesting stack
- Reviewing unfamiliar code — never lose track of which function you're inside

### Practice Scenario — Navigate A Long File With Context

Step-by-step:
1. Open a large file (200+ lines, multiple functions)
2. Scroll into the middle of a function with `<C-d>`
3. Notice the function signature appears at the top of the window (pinned)
4. Continue scrolling into a nested block (if/for/while)
5. Notice the context stacks: function signature + block header both visible
6. Press on the sticky context line (or use `[c` if mapped) to jump to the definition
7. Scroll to a different function — context updates automatically

This is passive — no keymaps needed. Just be aware it's active and use it for orientation.

## Real-World Drill

Complete this 20-step workflow without using the mouse. This simulates a real feature development session.

1. Open Neovim in a project directory.
2. Press `<leader>qs` to restore your previous session (or start fresh if none exists).
3. Open the main file you will edit with `<leader><space>`.
4. Press `<leader>|` to split right.
5. Press `<C-l>` to move to the right window.
6. Open a related test file with `<leader><space>`.
7. Press `<C-h>` to go back to the implementation.
8. Make an edit to the implementation.
9. Press `<C-^>` — notice it jumps to the test file (alternate buffer).
10. Press `<C-^>` again to return to the implementation.
11. Press `<C-Down>` twice to shrink the height, then `<C-Up>` twice to restore it.
12. Press `<C-Right>` three times to give the left pane more width.
13. Press `<C-w>=` to equalize the panes again.
14. Press `<leader><tab><tab>` to create a new tab for config files.
15. Open a config file in this new tab.
16. Press `gT` to go back to your first tab (implementation + test still intact).
17. Press `<leader>,` to open the buffer picker and jump to any open buffer.
18. Press `<leader>bo` to close all buffers except the current one.
19. Press `<leader><tab>d` to close the config tab.
20. Press `<leader>wm` to zoom the remaining window, then press it again to unzoom.

After completing this drill, you should feel comfortable building, navigating, and tearing down workspace layouts entirely from the keyboard.

## Troubleshooting / Verify With Which-Key

- **Window movement conflicts with tmux**: If `<C-h/j/k/l>` is intercepted by tmux, ensure you have the `vim-tmux-navigator` plugin or configure tmux to pass these keys through.
- **`<C-^>` does nothing**: The alternate file is only set after you have visited at least two buffers. If you just opened Neovim, there is no alternate yet. Open a second file first.
- **Buffer not appearing in picker**: Run `:ls` to check if it is listed. Unlisted buffers (like help pages) require `<leader>fB` to find.
- **Split created in wrong direction**: `<leader>|` splits right (vertical), `<leader>-` splits below (horizontal). If you confuse them, close with `<leader>wd` and try again.
- **edgy.nvim sidebar steals focus unexpectedly**: Press `<C-l>` to move back to the main editing area. Sidebar windows are managed by edgy and should not interfere with `<C-w>` commands in the main area.
- **Session not restoring**: Ensure you are in the same directory where the session was saved. Use `<leader>qS` to browse all saved sessions if unsure.
- **Too many buffers after opening files from telescope**: Use `<leader>bo` periodically to keep only the buffer you are actively editing. Deleted buffers can always be reopened with `<leader>fr` (recent files).
- **Window zoom not working**: Verify the keymap with `<leader>sk` and search for `zoom` or `maximize`.
- **Tabs feel like VS Code tabs**: Remember that Neovim tabs are layouts (collections of windows), not individual file tabs. Use buffers for file switching, tabs for context switching.
- Use `<leader>sk` and search `buffer`, `window`, or `tab` to verify any keymap.
- Use `:ls` to list buffers and `:b <number>` to jump manually when pickers are unavailable.
