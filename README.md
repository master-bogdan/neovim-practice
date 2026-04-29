# Neovim LazyVim Practice Class

Use this folder as a practical LazyVim training workbook. It is written for stock LazyVim first, with notes to verify mappings through which-key when your local config differs.

Sources used:
- LazyVim keymaps: https://www.lazyvim.org/keymaps
- LazyVim for Ambitious Developers: https://lazyvim-ambitious-devs.phillips.codes/course/
- Local Vim practice material: `/Users/bogdan.shchavinskyi/Projects/vimclass`

## How To Use This Workbook

- Open this folder in LazyVim.
- Work through one chapter file at a time.
- Keep your hands on the keyboard.
- Verify mappings with `<leader>`, `<leader>sk`, `:map`, `:nmap`, `:vmap`, or `:verbose map`.
- If a scenario mentions an optional extra, skip it until that LazyVim extra is enabled.
- Practice accuracy first. Speed comes from repeated exact movements.

## Recommended Flow

Daily minimum:
- 10 minutes: `01-modal-editing-and-motions.md`
- 10 minutes: one workflow chapter
- 10 minutes: one real-world drill

Weekly rotation:
- Day 1: motions, operators, text objects
- Day 2: search, replace, pickers
- Day 3: files, buffers, windows, tabs
- Day 4: LSP, diagnostics, formatting
- Day 5: git and terminal workflow
- Day 6: customization and AI
- Day 7: full workflow drills

## Chapters

1. `01-modal-editing-and-motions.md` - modes, cursor movement, word movement, line movement, Flash
2. `02-editing-operators-and-text-objects.md` - operators, yanks, deletes, changes, registers, text objects, visual mode
3. `03-search-replace-and-navigation.md` - search, substitute, project search, quickfix, location list, jumps
4. `04-files-buffers-windows-tabs.md` - pickers, buffers, splits, tabs, sessions
5. `05-explorer-terminal-and-scratch.md` - explorer, terminal, scratch buffers, new files
6. `06-lsp-diagnostics-formatting.md` - definitions, references, hover, rename, code actions, diagnostics, formatting
7. `07-git-workflows.md` - git status, hunks, blame, file history, GitHub helpers
8. `08-lazyvim-customization-and-which-key.md` - which-key, Lazy, extras, keymap discovery, config habits
9. `09-ai-workflows.md` - AI extras, chat, edit, context, diff review, prompt discipline
10. `10-testing-debugging-and-language-extras.md` - tests, debug, language extras, database and preview extras
11. `11-full-workflow-drills.md` - combined realistic drills

## Stock LazyVim Assumptions

- `<leader>` is `<space>`.
- `<localleader>` is `\`.
- Current LazyVim uses Snacks for many picker, explorer, terminal, and scratch workflows.
- Some chapters mention extras such as AI, testing, debug, SQL, Markdown preview, or GitHub integration. These depend on enabled LazyVim extras and installed tools.

## Verification Commands

Use these when a mapping does not work:

```vim
:map <leader>ff
:nmap gd
:verbose map <leader>gs
:LazyExtras
:Lazy
```

Use these LazyVim discovery pickers:

- `<leader>sk` - keymaps
- `<leader>sC` - commands
- `<leader>sh` - help pages
- `<leader>sp` - plugin specs
- `<leader>?` - buffer-local keymaps

## Scenario Style

The scenarios are meant to feel like small editor jobs, not isolated key trivia:

- Start from a realistic snippet or workflow.
- Use the named keymaps as constraints.
- Prefer exact movement and minimal edits.
- Finish by checking the expected text, location, or editor state.
