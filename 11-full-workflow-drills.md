# Chapter 11 - Full Workflow Drills

## Goal

Combine editing, navigation, LSP, git, terminal, and AI into realistic developer workflows.

## Mental Model

A real editor session is not one command family. You move between reading, editing, searching, validating, and reviewing. These drills train transitions.

## Keymaps

This chapter reuses:
- Motions: `w`, `b`, `e`, `f`, `t`, `gg`, `G`, `s`
- Editing: `ciw`, `ci"`, `di(`, `yy`, `p`, `"_d`, `.`
- Search: `/`, `n`, `N`, `<leader>sg`
- Files: `<leader><space>`, `<leader>,`, `<leader>e`
- Windows: `<leader>|`, `<leader>-`, `<C-h/j/k/l>`, `<leader>wd`
- LSP: `gd`, `gr`, `K`, `<leader>ca`, `<leader>cr`, `<leader>cf`
- Diagnostics: `[d`, `]d`, `<leader>cd`, `<leader>sd`
- Git: `<leader>gs`, `<leader>gb`, `<leader>gf`
- Terminal: `<leader>ft`, `<C-\><C-n>`
- AI: verify locally with `<leader>sk`

## Common Workflows

Implementation loop:

```text
Find file -> inspect context -> edit -> format -> run test -> inspect diff.
```

Debug loop:

```text
Find failing test -> jump to source -> inspect references -> add focused change -> rerun.
```

Review loop:

```text
Open git status -> inspect changed files -> run diagnostics/tests -> summarize risks.
```

## Practice Scenarios

### Scenario 1 - Basic Coding Pass

1. Open a file with `<leader><space>`.
2. Search inside it with `/`.
3. Jump to a visible target with `s`.
4. Change one word with `ciw`.
5. Change one string with `ci"`.
6. Format with `<leader>cf`.
7. Save with `:write`.

Expected result: one intentional edit, formatted and saved.

### Scenario 2 - Multi-File Reading Pass

1. Open a source file.
2. Use `gd` on a symbol.
3. Return with `<C-o>`.
4. Use `gr` to find references.
5. Open one reference.
6. Switch buffers with `<leader>,`.

Expected result: you can trace code across files.

### Scenario 3 - Split Layout Pass

1. Open a source file.
2. Split right with `<leader>|`.
3. Open a related test file.
4. Split below with `<leader>-`.
5. Open terminal.
6. Move across windows with `<C-h/j/k/l>`.
7. Close terminal window with `<leader>wd`.

Expected result: source and test stay visible.

### Scenario 4 - Search And Replace Pass

1. Use `<leader>sg` to find a repeated term.
2. Open one result.
3. Use `/` to find the term in the buffer.
4. Replace one line with `:s/old/new/g`.
5. Use confirmation replace on a scratch file with `:%s/old/new/gc`.

Expected result: scoped replacements, no blind whole-project edits.

### Scenario 5 - Git Review Pass

1. Open git status with `<leader>gs`.
2. Open one changed file.
3. Use `<leader>gb` on a changed or nearby line.
4. Use `<leader>gf` to inspect file history.
5. Open terminal with `<leader>ft`.
6. Run `git diff --stat`.
7. Return to Normal mode with `<C-\><C-n>`.

Expected result: you understand current changes and file history.

### Scenario 6 - Diagnostic Fix Pass

1. Open diagnostics with `<leader>sd`.
2. Jump to one diagnostic.
3. Show line diagnostics with `<leader>cd`.
4. Try code action with `<leader>ca`.
5. Make the smallest edit.
6. Format with `<leader>cf`.

Expected result: one diagnostic is fixed or clearly understood.

### Scenario 7 - AI-Assisted Review Pass

1. Open a changed file.
2. Select the relevant function.
3. Open your installed AI action after verifying with `<leader>sk`.
4. Ask:

```text
Review this selected code for correctness bugs only. Return findings first. Do not edit.
```

5. Apply at most one small fix.
6. Review git diff.

Expected result: AI is used as a reviewer, not an uncontrolled editor.

### Scenario 8 - Test And Debug Pass

1. Open a test file.
2. Run nearest test with `<leader>tr` if available.
3. Show output with `<leader>to`.
4. Set a breakpoint with `<leader>db` if DAP is configured.
5. Try debug nearest with `<leader>td`.
6. Record missing config if it fails.

Expected result: you know whether your project test/debug workflow is ready.

## Real-World Drill

Do this sequence without looking anything up:

1. Open a file with `<leader><space>`.
2. Open explorer with `<leader>e`.
3. Open another file from explorer.
4. Split vertically with `<leader>|`.
5. Move to the other window with `<C-l>` or `<C-h>`.
6. Create a scratch buffer with `<leader>.`.
7. Type two lines.
8. Yank one line into register `a` with `"ayy`.
9. Delete one disposable word into the black hole register with `"_dw`.
10. Paste from register `a` with `"ap`.
11. Search for a word with `/`.
12. Replace one occurrence with `:s/old/new/`.
13. Open terminal with `<leader>ft`.
14. Run `pwd`.
15. Return to Normal mode with `<C-\><C-n>`.
16. Open git status with `<leader>gs`.
17. Inspect diagnostics with `<leader>sd`.
18. Ask AI to summarize the current task if an AI extra is enabled.
19. Close the extra window with `<leader>wd`.
20. Delete unnecessary buffers with `<leader>bo`.

## Troubleshooting / Verify With Which-Key

- If you forget a mapping, use `<leader>sk`; do not interrupt the drill with a web search.
- If an optional extra is missing, write it down and continue with the next step.
- If a command changes too much, undo with `u` and redo the step on a scratch file.
- If your layout gets messy, use `<leader>wm`, `<leader>wd`, and `<leader>bo`.
