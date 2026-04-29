# Chapter 8 - LazyVim Customization And Which-Key

## Goal

Learn how to discover commands, inspect keymaps, manage plugins, and make small LazyVim config changes safely.

## Mental Model

LazyVim is a curated Neovim distribution. You should first discover what already exists, then customize only the missing behavior.

Use this order:

```text
which-key -> picker/help -> LazyVim docs -> local config -> plugin docs
```

## Keymaps

Discovery:
- `<leader>` - open which-key leader menu
- `<leader>?` - buffer-local keymaps
- `<leader>sk` - keymaps picker
- `<leader>sC` - commands picker
- `<leader>sh` - help pages
- `<leader>sp` - search plugin specs
- `<leader>sa` - autocommands
- `<leader>si` - icons
- `<leader>sH` - highlights
- `<leader>ui` - inspect position
- `<leader>uI` - inspect tree

Lazy and config:
- `<leader>l` - Lazy plugin manager
- `<leader>L` - LazyVim changelog
- `<leader>fc` - find config file
- `<leader>cm` - Mason
- `:LazyExtras` - enable or inspect LazyVim extras
- `:Lazy` - plugin manager
- `:checkhealth` - health checks

UI toggles:
- `<leader>uw` - toggle wrap
- `<leader>ul` - toggle line numbers
- `<leader>uL` - toggle relative numbers
- `<leader>ud` - toggle diagnostics
- `<leader>uf` - toggle auto format globally
- `<leader>uF` - toggle auto format for buffer
- `<leader>us` - toggle spelling
- `<leader>uC` - colorschemes
- `<leader>uz` - zen mode
- `<leader>uZ` - zoom mode

## Common Workflows

Find a command:

```text
<leader>sC
type a word like format, rename, terminal, diagnostic
```

Find a keymap:

```text
<leader>sk
type the feature name
```

Open config:

```text
<leader>fc
select a config file
```

Inspect plugins:

```text
<leader>l
```

Enable extras:

```text
:LazyExtras
```

## Practice Scenarios

### Scenario 1

Press `<leader>` and wait.

Expected result: which-key shows possible leader mappings.

### Scenario 2

Open keymaps with `<leader>sk` and search for `diagnostic`.

Expected result: diagnostic mappings are visible.

### Scenario 3

Open commands with `<leader>sC` and search for `Lazy`.

Expected result: Lazy-related commands are visible.

### Scenario 4

Open help pages with `<leader>sh` and search for `text-objects`.

Expected result: Neovim help opens.

### Scenario 5

Open Lazy with `<leader>l`.

Expected result: plugin manager shows installed plugins.

### Scenario 6

Run `:LazyExtras`.

Expected result: extras list opens.

### Scenario 7

Open config with `<leader>fc`.

Expected result: LazyVim config files are discoverable.

### Scenario 8

Toggle relative numbers with `<leader>uL`.

Expected result: relative line numbers change.

### Scenario 9

Toggle diagnostics with `<leader>ud`, then turn them back on.

Expected result: diagnostics visibility changes without altering project code.

## Real-World Drill

1. Search keymaps for `terminal`.
2. Open a terminal using the discovered mapping.
3. Search commands for `Mason`.
4. Open Mason.
5. Search help for `registers`.
6. Open config with `<leader>fc`.
7. Toggle wrap with `<leader>uw`.
8. Restore your preferred UI state.

## Troubleshooting / Verify With Which-Key

- If you forget a mapping, do not guess. Use `<leader>sk`.
- If a mapping appears in docs but not locally, check your LazyVim version and enabled extras.
- If plugin behavior changed after an update, read `<leader>L`.
- If a customization breaks startup, inspect recent files under your LazyVim config and use `:checkhealth`.
