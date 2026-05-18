# Neovim LazyVim Practice Class

Use this folder as a practical LazyVim training workbook. Every chapter lists the exact keybindings to use — no guessing. All mappings reflect the specific plugins and extras listed below.

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
- Day 1: motions + operators + surround + yank ring (ch 1, 2)
- Day 2: search, replace, pickers, files, buffers (ch 3, 4)
- Day 3: Neo-tree, terminal, LSP, diagnostics, formatting (ch 5, 6)
- Day 4: git — LazyGit, DiffView, hunks, blame (ch 7)
- Day 5: AI — CopilotChat custom prompts (ch 9)
- Day 6: outline + refactoring + GitHub/Octo (ch 10, 12)
- Day 7: full workflow drills (ch 11)

## Chapters

1. `01-modal-editing-and-motions.md` - modes, cursor movement, word movement, line movement, Flash
2. `02-editing-operators-and-text-objects.md` - operators, registers, text objects, visual mode, mini-surround, yanky
3. `03-search-replace-and-navigation.md` - search, substitute, project search, quickfix, location list, jumps
4. `04-files-buffers-windows-tabs.md` - pickers, buffers, splits, tabs, sessions
5. `05-explorer-terminal-and-scratch.md` - Neo-tree (full internal keys), terminal, scratch buffers
6. `06-lsp-diagnostics-formatting.md` - definitions, references, hover, rename, code actions, diagnostics, formatting
7. `07-git-workflows.md` - LazyGit, DiffView, gitsigns hunks, blame, file history
8. `08-lazyvim-customization-and-which-key.md` - which-key, Lazy, extras, keymap discovery, config habits
9. `09-ai-workflows.md` - CopilotChat with custom prompts: Explain, Review, Fix, Tests, Commit, Optimize
10. `10-outline-and-refactoring.md` - code outline sidebar, extract function/variable, inline, rename
11. `11-full-workflow-drills.md` - combined realistic drills across all tools
12. `12-octo-github-workflows.md` - GitHub PRs and issues as buffers, inline review, approve, comment

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
