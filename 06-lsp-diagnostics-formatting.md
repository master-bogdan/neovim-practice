# Chapter 6 - LSP, Diagnostics, And Formatting

## Goal

Use LazyVim as an IDE: jump to definitions, inspect types, rename symbols, run code actions, format files, and navigate diagnostics.

## Mental Model

LSP features depend on language servers. LazyVim gives common keymaps, but each project needs the relevant language server installed and attached.

Check attachment with:

```vim
:LspInfo
```

## Keymaps

LSP navigation:
- `gd` - go to definition
- `gD` - go to declaration
- `gr` - references
- `gI` - go to implementation
- `gy` - go to type definition
- `K` - hover
- `gK` - signature help
- `<C-k>` - signature help in Insert mode

Code actions:
- `<leader>ca` - code action
- `<leader>cr` - rename symbol
- `<leader>cR` - rename file
- `<leader>co` - organize imports
- `<leader>cc` - run codelens
- `<leader>cC` - refresh and display codelens
- `<leader>cA` - source action

Diagnostics:
- `[d` - previous diagnostic
- `]d` - next diagnostic
- `[e` - previous error
- `]e` - next error
- `[w` - previous warning
- `]w` - next warning
- `<leader>cd` - line diagnostics
- `<leader>sd` - diagnostics picker
- `<leader>sD` - buffer diagnostics
- `<leader>xx` - diagnostics in Trouble when available
- `<leader>xX` - buffer diagnostics in Trouble when available

Formatting and tools:
- `<leader>cf` - format
- `<leader>cF` - format injected languages when available
- `<leader>cm` - Mason
- `<leader>cl` - LSP info

Symbols:
- `<leader>ss` - document symbols
- `<leader>sS` - workspace symbols
- `<leader>cs` - symbols in Trouble or outline depending on extras

## Common Workflows

Understand a symbol:

```text
K
gd
gr
```

Fix a diagnostic:

```text
]d
<leader>cd
<leader>ca
```

Rename safely:

```text
Put cursor on symbol
<leader>cr
enter new name
review changes
```

Format before saving or commit:

```text
<leader>cf
```

## Practice Scenarios

### Scenario 1

Open a file from a project with LSP support and run `:LspInfo`.

Expected result: at least one language server is attached.

### Scenario 2

Put cursor on a function call and press `gd`.

Expected result: you jump to the definition.

### Scenario 3

Return to the previous location with `<C-o>`.

Expected result: you return to the caller.

### Scenario 4

Use `gr` on a symbol.

Expected result: references appear in a picker or list.

### Scenario 5

Use `K` on a type, function, or imported symbol.

Expected result: hover documentation appears.

### Scenario 6

Use `[d` and `]d` in a file with diagnostics.

Expected result: you move through diagnostic locations.

### Scenario 7

Open line diagnostics with `<leader>cd`.

Expected result: current issue is visible without leaving the line.

### Scenario 8

Run a code action with `<leader>ca`.

Expected result: available fixes or refactors appear.

### Scenario 9

Format a file with `<leader>cf`.

Expected result: formatting runs, or LazyVim reports why no formatter is available.

## Real-World Drill

1. Open a TypeScript, Go, Python, or Lua file.
2. Jump to definition with `gd`.
3. Return with `<C-o>`.
4. Find references with `gr`.
5. Open diagnostics with `<leader>sd`.
6. Fix one issue using `<leader>ca`.
7. Rename one local symbol with `<leader>cr`.
8. Format with `<leader>cf`.

## Troubleshooting / Verify With Which-Key

- If `gd` does nothing, run `:LspInfo`.
- If no server is installed, open Mason with `<leader>cm`.
- If formatting fails, inspect `:ConformInfo` if conform.nvim is active.
- If mappings differ, search `<leader>sk` for `definition`, `diagnostic`, `format`, or `rename`.
