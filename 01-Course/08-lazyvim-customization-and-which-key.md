# Chapter 8 - LazyVim Customization And Which-Key

## Goal

Learn how to discover available commands through Which-Key, manage plugins with Lazy, enable LazyVim extras, modify your config safely, and use UI toggles to adapt your editing environment on the fly.

## Mental Model

LazyVim is a curated Neovim distribution built on top of lazy.nvim (the plugin manager). It provides sensible defaults, but its real power is discoverability — you can find almost anything without leaving the editor. The discovery order should be:

```text
which-key popup -> keymap/command picker -> :help -> LazyVim docs -> local config -> plugin docs
```

Your config lives in `~/.config/nvim/` and follows this structure:

```text
~/.config/nvim/
  init.lua                  -- bootstrap (do not edit)
  lua/
    config/
      autocmds.lua          -- custom autocommands
      keymaps.lua           -- custom keymaps
      lazy.lua              -- lazy.nvim bootstrap (do not edit)
      options.lua           -- vim options overrides
    plugins/
      *.lua                 -- each file returns a plugin spec table
```

Files in `lua/config/` run after LazyVim defaults — your settings override theirs. Files in `lua/plugins/` add or modify plugin specs. LazyVim extras are pre-built bundles of plugin specs that you enable with `:LazyExtras` — they add language support, tools, or UI features without manual configuration.

## Keymaps

Discovery:
- `<leader>` (wait) - open Which-Key popup showing all leader mappings
- `<leader>?` - buffer-local keymaps (what is available in this buffer specifically)
- `<leader>sk` - keymaps picker (search all registered keymaps by name)
- `<leader>sC` - commands picker (search all Ex commands)
- `<leader>sh` - help pages picker (search Neovim and plugin docs)
- `<leader>sp` - search plugin specs
- `<leader>sa` - autocommands picker
- `<leader>si` - icons picker
- `<leader>sH` - highlights picker
- `<leader>ui` - inspect position (show highlight groups under cursor)
- `<leader>uI` - inspect tree (show Treesitter AST at cursor)

Lazy and config:
- `<leader>l` - open Lazy plugin manager UI
- `<leader>L` - LazyVim changelog
- `<leader>fc` - find config file (opens picker of your config files)
- `<leader>cm` - Mason (LSP/linter/formatter installer)
- `:Lazy` - open plugin manager (same as `<leader>l`)
- `:Lazy sync` - install missing plugins and update all
- `:Lazy update` - update all plugins
- `:Lazy profile` - show startup profile (load times per plugin)
- `:Lazy clean` - remove plugins no longer in spec
- `:LazyExtras` - browse and enable/disable LazyVim extras
- `:checkhealth` - run health checks for Neovim and plugins
- `:source %` - reload the current Lua config file
- `:help <topic>` - open Neovim help for any topic

UI toggles (`<leader>u` menu):
- `<leader>uf` - toggle auto format (global)
- `<leader>uF` - toggle auto format (buffer)
- `<leader>uw` - toggle wrap
- `<leader>ul` - toggle line numbers
- `<leader>uL` - toggle relative numbers
- `<leader>ud` - toggle diagnostics
- `<leader>us` - toggle spelling
- `<leader>uh` - toggle inlay hints
- `<leader>uC` - colorscheme picker
- `<leader>uz` - zen mode
- `<leader>uZ` - zoom mode (maximize current window)
- `<leader>un` - dismiss all notifications (noice.nvim)

Noice.nvim:
- `<leader>sn` - noice submenu (search notifications)
- `<leader>snl` - last notification
- `<leader>snh` - notification history
- `<leader>snd` - dismiss all visible notifications
- `<leader>sna` - all notifications

## Common Workflows

Discover a forgotten keymap:

```text
Press <leader> and wait for the Which-Key popup.
Read the group labels: b=buffers, c=code, f=file, g=git, s=search, u=ui, etc.
Press a group letter to drill deeper.
Press <Esc> to cancel without executing.
```

Search keymaps by feature name:

```text
<leader>sk
Type: diagnostic
Read the matching keymaps in the picker.
Press <Esc> to close.
```

Open and search help:

```text
<leader>sh
Type: text-objects
Press <Enter> to open the help page.
Inside help: use <C-]> to follow tags, <C-o> to go back.
```

Check startup performance:

```text
:Lazy profile
Sort by load time.
Identify slow plugins.
```

Enable an extra:

```text
:LazyExtras
Navigate to the extra you want (e.g., lang.typescript).
Press x to toggle it on.
Restart Neovim for the extra to take effect.
```

Write a custom keymap:

```text
<leader>fc -> select keymaps.lua
Add a line like:
  vim.keymap.set("n", "<leader>xx", "<cmd>TroubleToggle<cr>", { desc = "Toggle Trouble" })
Save and run :source % to reload.
```

Add a plugin spec:

```text
Create lua/plugins/my-plugin.lua
Return a table with the plugin spec.
Save, then run :Lazy sync.
```

## Practice Scenarios

### Scenario 1 - Discover Leader Mappings With Which-Key

Step-by-step:
1. Make sure you are in Normal mode (press `<Esc>` if unsure).
2. Press `<leader>` and hold — do not press anything else.
3. After a brief delay (~300ms), the Which-Key popup appears at the bottom.
4. Read the group labels: `b` for buffers, `c` for code, `f` for file/find, `g` for git, `s` for search, `u` for ui, `w` for windows, `x` for diagnostics.
5. Press `s` to drill into the search group.
6. Read the sub-keys: `k` for keymaps, `h` for help, `C` for commands, etc.
7. Press `<Esc>` to close without executing.

Expected result: you can navigate the full keymap tree by reading the popup — no memorization required.

### Scenario 2 - Search Keymaps For A Specific Feature

Step-by-step:
1. Press `<leader>sk` to open the keymaps picker.
2. Type `format` in the search box.
3. Observe results like: `<leader>cf` (Format), `<leader>uf` (Toggle Auto Format Global), `<leader>uF` (Toggle Auto Format Buffer).
4. Press `<Enter>` on one to see its details, or press `<Esc>` to close.
5. Now repeat: press `<leader>sk` and search for `terminal`.
6. Observe terminal-related mappings.

Expected result: you can find the keymap for any feature by name without checking documentation.

### Scenario 3 - Open The Lazy Plugin Manager And Check Status

Step-by-step:
1. Press `<leader>l` (or type `:Lazy<Enter>`).
2. The Lazy UI opens showing all installed plugins.
3. Observe the status indicators: a checkmark means loaded, a clock means lazy-loaded.
4. Press `p` to view the profile tab — this shows how long each plugin took to load.
5. Press `U` to check for updates (this fetches remote info).
6. Press `S` to sync (install missing, update all, clean removed).
7. Press `q` to close the Lazy UI.

Expected result: you understand your plugin state and can update or profile them at any time.

### Scenario 4 - Run Lazy Profile To Find Slow Plugins

Step-by-step:
1. Type `:Lazy profile<Enter>`.
2. The profile view shows plugins sorted by load time in milliseconds.
3. Look at the top entries — these are the slowest-loading plugins.
4. Note the total startup time at the top.
5. Press `<C-s>` to sort by different criteria if available.
6. Press `q` to close.

Expected result: you can identify which plugins slow your startup and decide whether to lazy-load them.

### Scenario 5 - Browse And Enable LazyExtras

Step-by-step:
1. Type `:LazyExtras<Enter>`.
2. A list appears showing all available extras grouped by category (lang, editor, formatting, etc.).
3. Extras with a checkmark are already enabled.
4. Navigate to `lang.typescript` (or any language you use) with `j`/`k`.
5. Press `x` to toggle it on (it will be written to your `lazy.lua` imports).
6. Press `q` to close.
7. Restart Neovim (`:qa` then reopen) for the extra to load.
8. After restart, verify by opening a `.ts` file and checking LSP with `:LspInfo`.

Expected result: you can enable language support and tool integrations without manually writing plugin specs.

### Scenario 6 - Add A Custom Keymap To keymaps.lua

Step-by-step:
1. Press `<leader>fc` to open the config file picker.
2. Select `keymaps.lua`.
3. The file opens — observe the existing keymaps (if any).
4. Go to the end of the file with `G`.
5. Press `o` to open a new line in insert mode.
6. Type the following keymap:

```lua
vim.keymap.set("n", "<leader>ot", "<cmd>terminal<cr>", { desc = "Open Terminal" })
```

7. Press `<Esc>` to return to Normal mode.
8. Save with `:w`.
9. Reload with `:source %`.
10. Test: press `<leader>` and wait — look for `o` group. Then press `<leader>ot`.

Expected result: a new keymap appears in Which-Key under your chosen prefix and functions immediately.

### Scenario 7 - Write A Plugin Spec File

Step-by-step:
1. Open the plugins directory: `:e ~/.config/nvim/lua/plugins/zen-mode.lua<Enter>`.
2. The file is empty (new file).
3. Press `i` to enter insert mode and type:

```lua
return {
  "folke/zen-mode.nvim",
  cmd = "ZenMode",
  keys = {
    { "<leader>uz", "<cmd>ZenMode<cr>", desc = "Zen Mode" },
  },
  opts = {
    window = {
      width = 90,
    },
  },
}
```

4. Press `<Esc>`, then `:w` to save.
5. Run `:Lazy sync` to install the plugin.
6. Wait for the install to complete.
7. Test with `<leader>uz` — Zen Mode should activate.

Expected result: you have added a new plugin from scratch using the lazy.nvim spec format.

### Scenario 8 - Use UI Toggles To Customize Your View

Step-by-step:
1. Press `<leader>u` and wait — the Which-Key popup shows all UI toggles.
2. Press `l` to toggle line numbers off. Observe: line numbers disappear.
3. Press `<leader>uL` to toggle relative line numbers. Observe the change.
4. Press `<leader>ud` to toggle diagnostics off. Observe: diagnostic signs and virtual text vanish.
5. Press `<leader>ud` again to restore them.
6. Press `<leader>uf` to toggle auto-format off globally. Now saving will not auto-format.
7. Press `<leader>uf` again to restore.
8. Press `<leader>uh` to toggle inlay hints (if your LSP supports them).
9. Press `<leader>un` to dismiss any visible notifications.

Expected result: you can tune the UI dynamically without editing any config files.

### Scenario 9 - Navigate Help And Follow Tags

Step-by-step:
1. Type `:help vim.keymap.set<Enter>`.
2. The help page opens in a split window.
3. Move the cursor to any highlighted tag (like `|vim.keymap.set()|`).
4. Press `<C-]>` to follow the tag.
5. Press `<C-o>` to go back to the previous help page.
6. Type `:help lazy.nvim.txt<Enter>` to open lazy.nvim's help.
7. Read the sections — use `/` to search within help.
8. Press `:q` to close the help window.

Expected result: you can navigate Neovim's help system like a hyperlinked wiki.

### Scenario 10 - Run Checkhealth For Debugging

Step-by-step:
1. Type `:checkhealth<Enter>`.
2. A new buffer opens with health check results for Neovim core and all plugins.
3. Scroll through with `<C-d>` — look for `WARNING` and `ERROR` entries.
4. Run a specific check: `:checkhealth lazy<Enter>` to check only lazy.nvim.
5. Run `:checkhealth lsp<Enter>` to check LSP status.
6. Run `:checkhealth mason<Enter>` to check Mason installations.
7. If any errors appear, read the suggested fix in the output.
8. Press `:q` to close the checkhealth buffer.

Expected result: you can diagnose plugin issues, missing dependencies, and configuration errors systematically.

### Scenario 11 - View And Manage Notifications With Noice

Step-by-step:
1. Trigger a notification by running `:lua vim.notify("Hello from noice!", vim.log.levels.INFO)`.
2. Observe the notification appearing (styled by noice.nvim).
3. Press `<leader>un` to dismiss it.
4. Press `<leader>snl` to view the last notification again.
5. Press `<leader>snh` to open the full notification history.
6. Browse old messages and errors — press `<Esc>` or `q` to close.
7. If the command-line messages are distracting, remember noice.nvim routes them to the popup — this is normal.

Expected result: you understand where messages go in a noice.nvim setup and how to recall them.

### Scenario 12 - Reload Config After Changes

Step-by-step:
1. Open your keymaps file: `<leader>fc` then select `keymaps.lua`.
2. Add a test keymap at the bottom:

```lua
vim.keymap.set("n", "<leader>oT", function() vim.notify("Config reloaded!") end, { desc = "Test Reload" })
```

3. Save with `:w`.
4. Reload this specific file with `:source %`.
5. Press `<leader>oT` — you should see a notification saying "Config reloaded!".
6. Now remove the test keymap line, save, and `:source %` again.
7. Note: `:source %` only works for `lua/config/` files. For plugin spec changes, restart Neovim.

Expected result: you can iterate on config changes quickly without restarting for keymaps and options.

### Scenario 13 - Modify Options In options.lua

Step-by-step:
1. Press `<leader>fc` and select `options.lua`.
2. The file shows option overrides (or is empty if you have not customized yet).
3. Add these lines at the bottom:

```lua
vim.opt.scrolloff = 8          -- keep 8 lines visible above/below cursor
vim.opt.sidescrolloff = 8      -- keep 8 columns visible left/right
vim.opt.wrap = false           -- disable line wrapping by default
vim.opt.colorcolumn = "100"    -- show a column marker at 100 characters
```

4. Save with `:w` and reload with `:source %`.
5. Observe: a vertical line appears at column 100, and scrolling now keeps 8 lines of context.
6. To revert, delete those lines, save, and `:source %`.

Expected result: you can override any Vim option and see the effect immediately.

### Scenario 14 - Inspect What A Keymap Does

Step-by-step:
1. Press `<leader>sk` and search for `<leader>cf`.
2. Read the description — it says "Format" or similar.
3. Note the source — it tells you which plugin defined it.
4. For deeper inspection, type `:map <leader>cf<Enter>`.
5. The output shows the exact command or Lua function bound to that key.
6. If you want to override it, add your own definition in `keymaps.lua` with the same key — yours wins because config files load last.

Expected result: you can trace any keymap back to its source and understand what it does before overriding.

## Real-World Drill

Perform this full sequence without using the mouse or external documentation:

1. Press `<leader>` and wait. Read the top-level groups in Which-Key.
2. Press `s` to enter the search group. Read available searches. Press `<Esc>`.
3. Press `<leader>sk` and search for `lazy`. Note the mappings you find.
4. Press `<leader>l` to open the Lazy UI. Check how many plugins are installed.
5. Press `p` to view profile. Note the total startup time. Press `q`.
6. Type `:LazyExtras<Enter>`. Find the `editor.mini-files` extra (or any disabled extra). Note its status but do not enable it. Press `q`.
7. Press `<leader>fc` and open `keymaps.lua`.
8. Add a keymap: `vim.keymap.set("n", "<leader>oh", "<cmd>checkhealth<cr>", { desc = "Health Check" })`.
9. Save with `:w` and reload with `:source %`.
10. Test the new keymap: press `<leader>oh`. Verify checkhealth opens.
11. Press `:q` to close the checkhealth buffer.
12. Press `<leader>u` and wait. Read all available UI toggles.
13. Toggle off diagnostics with `<leader>ud`. Observe the change.
14. Toggle them back on with `<leader>ud`.
15. Toggle off auto-format with `<leader>uf`.
16. Open a file, make a whitespace change, save — confirm it was NOT auto-formatted.
17. Toggle format back on with `<leader>uf`.
18. Run `:lua vim.notify("Drill complete!", vim.log.levels.INFO)`.
19. Dismiss the notification with `<leader>un`.
20. View notification history with `<leader>snh` to confirm the message was recorded.

## Troubleshooting / Verify With Which-Key

- If you forget a mapping, press `<leader>` and wait. Do not guess — read the popup.
- If you know a feature exists but cannot find its key, use `<leader>sk` and search by feature name.
- If a keymap appears in docs but not locally, check your LazyVim version (`<leader>L`) and enabled extras (`:LazyExtras`).
- If plugin behavior changed after an update, read the changelog with `<leader>L`.
- If a customization breaks startup, check the error message. Then open the offending file with `:e ~/.config/nvim/lua/plugins/filename.lua` and fix or remove it.
- If `:source %` causes errors, check for syntax issues with `:lua dofile(vim.fn.expand("%"))` for a more detailed traceback.
- If a new plugin does not appear, run `:Lazy sync` and check for errors in the Lazy UI.
- If notifications are not showing, verify noice.nvim is loaded with `:Lazy` and search for `noice`.
- If Which-Key is slow to appear, check that `timeoutlen` is set (default 300ms in LazyVim). You can adjust in `options.lua`: `vim.opt.timeoutlen = 200`.
- If `:checkhealth` shows LSP errors, run `:Mason` to verify your language servers are installed.
