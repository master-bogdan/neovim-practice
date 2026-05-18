# Chapter 9 - AI Workflows With CopilotChat

## Goal

Use CopilotChat as an editor tool: ask focused questions, review code, generate tests, fix diagnostics, and write commit messages — all from the editor with deliberate context control.

## Mental Model

CopilotChat is most useful when the context is explicit and the request is narrow. You control what context the model sees by selecting code visually or using buffer/file context. Broad requests produce broad answers. Narrow requests with real code selections produce actionable outputs.

Good request:

```text
Review this function for a race condition. Do not rewrite it. Return findings with line references.
```

Weak request:

```text
Improve this code.
```

Your config has these custom prompts pre-defined — use them by name:
- **Explain** — explains behavior, data flow, and tradeoffs
- **Review** — checks for bugs, regressions, missing tests, and maintainability issues
- **Fix** — fixes the current diagnostic with explanation
- **Tests** — generates tests covering happy path, edge cases, and error handling
- **Commit** — writes a conventional commit message from staged diff
- **Optimize** — optimizes for performance and readability with explanation of impact

## Keymaps

CopilotChat:
- `<leader>aa` - toggle CopilotChat window
- `<leader>ax` - clear CopilotChat context and history
- `<leader>aq` - quick chat (inline prompt without opening full window)

Custom prompts (works on visual selection or current buffer):
- `<leader>ae` - Explain selected code
- `<leader>ar` - Review selected code
- `<leader>af` - Fix current diagnostic
- `<leader>at` - Generate tests for selected code
- `<leader>ac` - Generate commit message from staged changes
- `<leader>ao` - Optimize selected code

Inside CopilotChat window:
- `<C-s>` - submit prompt
- `<Esc>` - close the chat window
- `q` - close the chat window
- `<Enter>` - submit prompt (in insert mode inside chat)

Context control before asking:
- Select code in Visual mode first, then press a `<leader>a` mapping — the selection becomes context
- Without a selection, the current buffer is used as context
- `gr` or `<leader>sg` to gather references before asking about cross-file behavior

## Common Workflows

Explain a function:

```text
Put cursor inside the function
V                     select the function with linewise visual
<leader>ae            runs Explain prompt with selection as context
Read the output
```

Review for correctness:

```text
Select the suspicious function in Visual mode
<leader>ar            runs Review prompt
Read findings
Apply one fix at a time manually
```

Fix a diagnostic:

```text
Navigate to the diagnostic line with ]d or [d
<leader>af            runs Fix prompt with context around the diagnostic
Review the suggested fix
Apply manually if it looks right
```

Generate tests:

```text
Select the function to test
<leader>at            runs Tests prompt
Review generated tests
Paste them into the test file manually
```

Write a commit message:

```text
Stage your changes in terminal or LazyGit first
<leader>ac            runs Commit prompt with git:staged context
Review the message
Copy and use in your commit
```

Optimize code:

```text
Select the code to optimize
<leader>ao            runs Optimize prompt
Read the explanation of the proposed change
Apply if the tradeoff is clear
```

## Practice Scenarios

### Scenario 1 - Open And Close CopilotChat

1. Press `<leader>aa` to open CopilotChat.
2. Type a test message in the input.
3. Press `<C-s>` to submit.
4. Press `<leader>aa` again to close.

Expected result: CopilotChat opens, responds, and closes cleanly.

### Scenario 2 - Explain Selected Code

Practice area:

```ts
function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>
  return function (...args: Parameters<T>) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  } as T
}
```

Step-by-step:
1. Put cursor on the first line of the function above.
2. Press `V` to enter linewise visual.
3. Press `6j` to select all 7 lines.
4. Press `<leader>ae` to run Explain.
5. Read the output — it should cover behavior, data flow, and the timer tradeoff.

Expected result: explanation is grounded in the selected code, not generic.

### Scenario 3 - Review For Correctness Only

Practice area:

```ts
async function fetchUserData(userId: string) {
  const cache = global.userCache
  if (cache[userId]) return cache[userId]
  const data = await db.query(`SELECT * FROM users WHERE id = ${userId}`)
  cache[userId] = data
  return data
}
```

Step-by-step:
1. Select all lines of the function above with `V` then `5j`.
2. Press `<leader>ar` to run Review.
3. Read findings — expect it to flag the SQL injection and missing cache invalidation.
4. Do not apply any changes yet. Read only.

Expected result: review identifies real bugs, not style issues.

### Scenario 4 - Fix A Diagnostic

Prerequisites: have a file open with at least one LSP diagnostic (red underline).

Step-by-step:
1. Navigate to a diagnostic line with `]d`.
2. Press `<leader>cd` to read the diagnostic message first.
3. Press `<leader>af` to run Fix with the diagnostic as context.
4. Read the suggested fix.
5. Apply the fix manually — do not let the AI edit the file directly unless you understand the change.

Expected result: diagnostic is resolved or you understand why the suggested fix works.

### Scenario 5 - Generate Tests

Practice area:

```ts
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
```

Step-by-step:
1. Select the function with `V` then `2j`.
2. Press `<leader>at` to run Tests.
3. Read the generated tests — expect happy path, boundary values (value === min, value === max), and below/above range.
4. Copy the tests manually into a test file.

Expected result: tests cover the behavior you selected, not a generic template.

### Scenario 6 - Generate A Commit Message

Prerequisites: have staged changes in your git repository.

Step-by-step:
1. Stage your changes in terminal (`git add`) or in LazyGit (`<leader>gg`, `<Space>`).
2. Press `<leader>ac` to run Commit.
3. Read the generated conventional commit message.
4. Copy it into your commit command in the terminal.

Expected result: message follows conventional commit format and describes your actual staged changes.

### Scenario 7 - Optimize Selected Code

Practice area:

```ts
function findDuplicates(arr: number[]): number[] {
  const duplicates: number[] = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i])
      }
    }
  }
  return duplicates
}
```

Step-by-step:
1. Select all lines of the function with `V` then `8j`.
2. Press `<leader>ao` to run Optimize.
3. Read the explanation of the performance tradeoff (O(n²) → O(n) with a Set).
4. Decide whether to apply — check if the tradeoff matches your constraints.

Expected result: optimization comes with an explanation, not just a code replacement.

## Real-World Drill

Do this sequence on a real source file:

1. Open a changed file with `<leader><space>`.
2. Use `gd` to jump to a definition, return with `<C-o>`.
3. Use `gr` to find references to a symbol.
4. Select the most important function with `V` and `j` movements.
5. Press `<leader>ar` to review it for correctness.
6. Apply one small fix manually from the findings.
7. Press `<leader>ac` to generate a commit message (stage changes first).
8. Review the message and use it in your commit.

## Troubleshooting / Verify With Which-Key

- If `<leader>aa` does nothing, check `:Lazy` for `CopilotChat`.
- If custom prompts (`<leader>ae`, `<leader>ar`, etc.) are missing, check `lua/plugins/ai.lua`.
- If Copilot is not authenticated, run `:Copilot auth` and follow the device login flow.
- Search `<leader>sk` for `Copilot` or `Chat` to verify all mappings are registered.
- If output is too broad, narrow the visual selection and re-run.
- Treat all AI output as a draft — verify with LSP diagnostics and read the diff before applying.
