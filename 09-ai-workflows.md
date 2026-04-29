# Chapter 9 - AI Workflows

## Goal

Use AI integrations as editor tools: gather context, ask focused questions, review diffs, and apply changes deliberately.

## Mental Model

AI is most useful when the context is explicit and the request is narrow. Use LazyVim to select files, buffers, visual ranges, diagnostics, and git diffs, then ask the model for one concrete output.

Good request:

```text
Review this function for a race condition. Do not rewrite it. Return findings with file/line references.
```

Weak request:

```text
Improve this code.
```

## Keymaps

AI mappings depend on enabled LazyVim extras and installed plugins.

Avante extra examples:
- `<leader>aa` - ask Avante
- `<leader>ac` - chat with Avante
- `<leader>ae` - edit with Avante
- `<leader>af` - focus Avante
- `<leader>ah` - Avante history
- `<leader>am` - select model
- `<leader>an` - new Avante chat
- `<leader>ap` - switch provider
- `<leader>ar` - refresh
- `<leader>as` - stop
- `<leader>at` - toggle Avante

CopilotChat extra examples:
- `<leader>aa` - toggle CopilotChat
- `<leader>ap` - prompt actions
- `<leader>aq` - quick chat
- `<leader>ax` - clear
- `<C-s>` - submit prompt

Claude Code / Sidekick-style extras can reuse `<leader>a` groups, so always verify locally:
- `<leader>a` - AI group when enabled
- `<leader>sk` then search `Avante`, `Copilot`, `Claude`, `Sidekick`, or `AI`
- `:LazyExtras` to inspect enabled AI extras

## Common Workflows

Ask about selected code:

```text
Select a function in Visual mode
open AI action
ask for a focused review or explanation
```

Edit with guardrails:

```text
Ask for a minimal patch
review the diff
run tests or typecheck
keep or revert deliberately
```

Use AI for navigation:

```text
Ask where a behavior is implemented after giving filenames and search results.
```

Use AI for refactoring:

```text
Ask for a plan first when the change crosses module boundaries.
Ask for code changes only after the plan is clear.
```

## Practice Scenarios

### Scenario 1

Open `<leader>sk` and search for `AI`.

Expected result: you know which AI mappings are actually installed.

### Scenario 2

Run `:LazyExtras` and inspect AI extras.

Expected result: you can tell whether Avante, CopilotChat, Claude, or another AI extra is enabled.

### Scenario 3

Select a small function and ask AI to explain it.

Prompt:

```text
Explain this function in five bullets. Include inputs, outputs, side effects, and one risk.
```

Expected result: explanation is grounded in selected code.

### Scenario 4

Ask AI for a code review, not a rewrite.

Prompt:

```text
Review the selected code for correctness bugs only. Return findings first. Do not edit.
```

Expected result: response is focused on risks.

### Scenario 5

Ask AI for a minimal edit.

Prompt:

```text
Make the smallest change that fixes this diagnostic. Do not rename unrelated symbols.
```

Expected result: generated edit is narrow enough to review.

### Scenario 6

Ask AI to write a test case for selected behavior.

Prompt:

```text
Write one focused test for this branch. Match the existing test style.
```

Expected result: test proposal follows nearby patterns.

### Scenario 7

Ask AI to summarize a git diff.

Practice area: use a changed file or staged diff if your AI integration supports context from buffers or terminal output.

Expected result: summary separates behavior change from refactor.

## Real-World Drill

1. Open a changed source file.
2. Use LSP `gr` or project grep to gather related context.
3. Select the relevant function.
4. Ask AI for a correctness review only.
5. Apply one small suggested fix manually or through the AI tool.
6. Review the diff.
7. Run the nearest validation command.
8. Ask AI to write a concise commit message from the final diff.

## Troubleshooting / Verify With Which-Key

- AI mappings overlap by plugin. Verify with `<leader>sk`.
- If `<leader>a` does nothing, enable an AI extra with `:LazyExtras` or install/configure the plugin.
- If output is too broad, narrow the prompt and provide exact constraints.
- If AI edits too many files, stop and ask for a plan or patch-only output.
- Treat AI output as a draft. Use tests, LSP diagnostics, and git diff before trusting it.
