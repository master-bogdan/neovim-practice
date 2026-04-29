# Chapter 10 - Testing, Debugging, And Language Extras

## Goal

Use LazyVim extras for test running, debugging, previews, language tools, and specialized project workflows.

## Mental Model

LazyVim core is broad, but testing and debugging are usually extras. Do not memorize every extra. Learn how to discover whether an extra is enabled and then practice the workflow for your active language.

## Keymaps

Testing with Neotest extra:
- `<leader>t` - test group
- `<leader>tr` - run nearest test
- `<leader>tt` - run file
- `<leader>tT` - run all test files
- `<leader>tl` - run last
- `<leader>ts` - toggle summary
- `<leader>to` - show output
- `<leader>tO` - toggle output panel
- `<leader>tS` - stop
- `<leader>tw` - toggle watch
- `<leader>td` - debug nearest

Debugging with DAP extra:
- `<leader>da` - run with args
- `<leader>db` - toggle breakpoint
- `<leader>dB` - breakpoint condition
- `<leader>dc` - run / continue
- `<leader>dC` - run to cursor
- `<leader>dg` - go to line without executing
- `<leader>di` - step into
- `<leader>dj` - down
- `<leader>dk` - up
- `<leader>dl` - run last
- `<leader>do` - step out
- `<leader>dO` - step over
- `<leader>dP` - pause
- `<leader>dr` - toggle REPL
- `<leader>ds` - session
- `<leader>dt` - terminate
- `<leader>du` - DAP UI
- `<leader>de` - eval
- `<leader>dw` - widgets

Language extras examples:
- `<leader>cp` - Markdown preview or Typst preview depending on enabled extra
- `<leader>cv` - select Python virtualenv with venv-selector extra
- `<leader>D` - DBUI with SQL extra
- language-specific localleader mappings may exist for Haskell, Scala, TeX, and others

Discovery:
- `:LazyExtras`
- `<leader>sk`
- `<leader>sC`
- `<leader>cm`
- `:checkhealth`

## Common Workflows

Run the nearest test:

```text
Put cursor inside a test
<leader>tr
```

Debug a test:

```text
Set breakpoint with <leader>db
Run debug nearest with <leader>td
Step with DAP mappings
```

Preview Markdown:

```text
Open markdown file
<leader>cp
```

Use DB UI:

```text
Enable SQL extra
configure connection
<leader>D
```

## Practice Scenarios

### Scenario 1

Run `:LazyExtras` and identify testing and debugging extras.

Expected result: you know whether Neotest and DAP are available.

### Scenario 2

Open a test file and use `<leader>tr`.

Expected result: nearest test runs, or LazyVim reports missing adapter/config.

### Scenario 3

Run the current test file with `<leader>tt`.

Expected result: file-level test run starts.

### Scenario 4

Open the test summary with `<leader>ts`.

Expected result: test tree or summary is visible.

### Scenario 5

Show test output with `<leader>to`.

Expected result: output for a selected test is visible.

### Scenario 6

Set a breakpoint with `<leader>db`.

Expected result: breakpoint marker appears.

### Scenario 7

Start debug nearest with `<leader>td` if configured.

Expected result: debug session starts or reports missing adapter.

### Scenario 8

Open a Markdown file and try `<leader>cp` if markdown preview extra is enabled.

Expected result: preview starts.

### Scenario 9

Open Mason with `<leader>cm` and inspect installed language tools.

Expected result: you know which formatters, linters, and servers are installed.

## Real-World Drill

1. Open a project test file.
2. Run nearest test with `<leader>tr`.
3. Open output with `<leader>to`.
4. Toggle summary with `<leader>ts`.
5. Set a breakpoint with `<leader>db`.
6. Try debug nearest with `<leader>td`.
7. If debugging is not configured, write down the missing adapter.
8. Open Mason and inspect whether the needed tool exists.

## Troubleshooting / Verify With Which-Key

- If `<leader>t` mappings are absent, enable test extras.
- If tests do not run, inspect adapter support for your language.
- If DAP starts but does not stop at breakpoints, check debug configuration.
- If preview mappings conflict, search `<leader>sk` for `Preview`.
- Extras are optional. A missing mapping can mean the extra is disabled, not that LazyVim is broken.
