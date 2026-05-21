# OBJECTIVE: Practice buffer, window, tab, and project workflows
#
# This is a guided drill — follow each step, then undo/close and repeat faster.
#
# TIMING: Expert 60s | Proficient 120s | Learning 240s

## Drill 1: Buffer Cycling (30s target)

1. Open this file in nvim
2. Open 3 more files from this repo using `<leader><space>`:
   - `drills/02-editing/fix-the-bugs.ts`
   - `drills/01-motions/navigate-functions.ts`
   - `drills/03-search-replace/rename-api-versions.ts`
3. Cycle backward through all buffers: `<S-h>` × 3
4. Cycle forward: `<S-l>` × 3
5. Jump directly to fix-the-bugs.ts using `<leader>,` (buffer picker)
6. Toggle alternate file: `<C-^>` (should go to last visited)
7. Delete current buffer: `<leader>bd`
8. Delete all other buffers: `<leader>bo`

## Drill 2: Split Layout (30s target)

1. Open `navigate-functions.ts` with `<leader><space>`
2. Vertical split: `<leader>|`
3. Move right: `<C-l>`
4. Open `fix-the-bugs.ts` here
5. Horizontal split in the right pane: `<leader>-`
6. Move down: `<C-j>`
7. Open `rename-api-versions.ts` here
8. Navigate all three panes with `<C-h/j/k/l>`
9. Maximize current pane: `<leader>wm`
10. Restore: `<leader>wm`
11. Equalize: `<C-w>=`
12. Close all but current: `<C-w>o`

## Drill 3: Tabs for Context Switching (30s target)

1. Set up a "coding" layout in tab 1 (split with impl + test)
2. New tab: `<leader><tab><tab>`
3. Set up a "review" layout in tab 2 (different files)
4. Switch back to tab 1: `gT` or `1gt`
5. Switch to tab 2: `gt` or `2gt`
6. Close tab 2: `<leader><tab>d`

## Drill 4: Project Switcher

1. Press `<leader>fp` to open the project picker
2. Select a different project from the list
3. Notice: buffers and session switch to that project
4. Return to this project using `<leader>fp` again
5. Restore session: `<leader>qs`

## Drill 5: Recent Files

1. Close all buffers: `<leader>bo`
2. Open recent files: `<leader>fr`
3. Notice files from other projects appear too
4. Open recent files (cwd only): `<leader>fR`
5. Now only files from the current project appear
