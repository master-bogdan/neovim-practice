# Neovim LazyVim Practice Class

Use this repository as a practical LazyVim training workbook. Every chapter lists the exact keybindings to use. All mappings reflect the specific plugins and extras listed below.

Sources used:
- LazyVim keymaps: https://www.lazyvim.org/keymaps
- LazyVim for Ambitious Developers: https://lazyvim-ambitious-devs.phillips.codes/course/

## Repository Layout

- `01-Course/` - chapter guides, ordered from fundamentals to complete workflows
- `01-Course/practice-files/` - real source and configuration fixtures used by chapter scenarios
- `02-Daily-drills/` - repeatable timed exercises with their own instructions and source files

## How To Use This Workbook

- Open the repository root in Neovim with `nvim .`.
- Work through one chapter in `01-Course/` at a time.
- Keep your hands on the keyboard.
- Verify mappings with `<leader>`, `<leader>sk`, `:map`, `:nmap`, `:vmap`, or `:verbose map`.
- If a scenario mentions an optional extra, skip it until that LazyVim extra is enabled.
- Practice accuracy first. Speed comes from repeated exact movements.

## Recommended Flow

Daily minimum:
- 10 minutes: one drill from `02-Daily-drills/` (timed, hands-on)
- 10 minutes: one workflow chapter (theory + scenarios)
- 10 minutes: one real-world drill from a chapter

Weekly rotation:
- Day 1: motions + operators + surround + yank ring (ch 1, 2) + `02-Daily-drills/01-motions/`
- Day 2: search, replace, pickers, files, buffers (ch 3, 4) + `02-Daily-drills/03-search-replace/`
- Day 3: Neo-tree, terminal, LSP, diagnostics, formatting (ch 5, 6) + `02-Daily-drills/05-lsp/`
- Day 4: git — LazyGit, DiffView, hunks, blame (ch 7)
- Day 5: AI — CopilotChat + inline completions (ch 9)
- Day 6: outline + refactoring + GitHub/Octo (ch 10, 12) + `02-Daily-drills/06-refactoring/`
- Day 7: full workflow drills (ch 11) + `02-Daily-drills/07-multifile/`

## Chapters

1. `01-Course/01-modal-editing-and-motions.md` - modes, cursor movement, word movement, line movement, Flash
2. `01-Course/02-editing-operators-and-text-objects.md` - operators, registers, text objects, visual mode, mini-surround, yanky
3. `01-Course/03-search-replace-and-navigation.md` - search, substitute, project search, quickfix, location list, jumps
4. `01-Course/04-files-buffers-windows-tabs.md` - pickers, buffers, splits, tabs, sessions, project switcher, treesitter-context
5. `01-Course/05-explorer-terminal-and-scratch.md` - Neo-tree, terminal, scratch buffers
6. `01-Course/06-lsp-diagnostics-formatting.md` - definitions, references, hover, rename, code actions, diagnostics, formatting
7. `01-Course/07-git-workflows.md` - LazyGit, DiffView, gitsigns hunks, blame, file history
8. `01-Course/08-lazyvim-customization-and-which-key.md` - which-key, Lazy, extras, keymap discovery, config habits
9. `01-Course/09-ai-workflows.md` - CopilotChat custom prompts and inline completions
10. `01-Course/10-outline-and-refactoring.md` - code outline sidebar, extract function/variable, inline, rename
11. `01-Course/11-full-workflow-drills.md` - combined realistic drills across all tools
12. `01-Course/12-octo-github-workflows.md` - GitHub PRs and issues as buffers, inline review, approve, comment
13. `01-Course/13-advanced-editing-patterns.md` - block visual, marks, folds, batch editing, trouble, mini.map, mini.hipatterns

## Course Practice Files

These fixtures belong to chapter scenarios and are not timed drills.

- `01-Course/practice-files/03-search-replace/cdo-api/` - three TypeScript files for quickfix and `:cdo`
- `01-Course/practice-files/04-navigation/` - TypeScript, Go, and config files for buffer, split, tab, and session practice

## Daily Drills

Standalone exercises live in `02-Daily-drills/`. Each topic has source files or a guided drill with timing targets.

- `02-Daily-drills/01-motions/` - navigation and Flash precision
- `02-Daily-drills/02-editing/` - operators, text objects, surrounds, registers, and yank history
- `02-Daily-drills/03-search-replace/` - search, substitution, and global commands
- `02-Daily-drills/04-navigation/` - buffers, windows, tabs, and projects
- `02-Daily-drills/05-lsp/` - definitions, references, diagnostics, and code actions
- `02-Daily-drills/06-refactoring/` - extract, inline, rename, and restructure
- `02-Daily-drills/07-multifile/` - cross-file edits and quickfix workflows
- `02-Daily-drills/08-git/` - conflict resolution, hunks, blame, and DiffView

## Config Assumptions

- `<leader>` is `<space>`.
- `<localleader>` is `\`.

Active LazyVim extras this workbook is written for:

| Extra | What it adds |
|---|---|
| `ai.copilot-native` | GitHub Copilot inline suggestions |
| `ai.copilot-chat` | CopilotChat with custom prompts (Explain, Review, Fix, Tests, Commit, Optimize) |
| `coding.mini-surround` | Add/delete/replace surrounds: `gsa`, `gsd`, `gsr` |
| `coding.yanky` | Yank ring: `<C-p>`/`<C-n>` after paste, `<leader>p` history picker |
| `editor.mini-diff` | Inline diff signs and `<leader>go` overlay |
| `editor.neo-tree` | File explorer with `<leader>e`, full internal keys |
| `editor.outline` | Code outline sidebar with `<leader>cs` |
| `editor.refactoring` | Extract function/variable, inline: `<leader>re`, `<leader>rv`, `<leader>ri` |
| `formatting.prettier` | Prettier via `<leader>cf` on JS/TS/JSON/YAML/Markdown |
| `lang.git` | Git extras: LazyGit, lang-level git support |
| `lang.go` | gopls, gofmt, staticcheck |
| `lang.typescript` | vtsls with inlay hints |
| `lang.python` | pyright |
| `lang.markdown` | marksman, markdownlint |
| `linting.eslint` | ESLint diagnostics |
| `ui.edgy` | Structured sidebar layout |
| `ui.treesitter-context` | Sticky context header |
| `util.octo` | GitHub PRs and issues as buffers |
| `util.project` | Project picker |

Custom keymaps beyond LazyVim defaults:

| Key | Action |
|---|---|
| `<leader>gg` | LazyGit |
| `<leader>gv` | Toggle DiffView |
| `<leader>gH` | DiffView file history |
| `<leader>ae` | CopilotChat: Explain |
| `<leader>ar` | CopilotChat: Review |
| `<leader>af` | CopilotChat: Fix diagnostic |
| `<leader>at` | CopilotChat: Generate tests |
| `<leader>ac` | CopilotChat: Commit message |
| `<leader>ao` | CopilotChat: Optimize |
| `<leader>md` | Markdown preview toggle |
| `<leader>um` | Toggle minimap |

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
