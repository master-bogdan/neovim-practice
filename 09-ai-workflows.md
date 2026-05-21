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
- `<leader>ax` - clear chat history (reset context) — use when responses feel stale or context-polluted
- `<leader>aq` - quick chat (ask without opening full window) — for fast one-off questions inline

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

### Scenario 8 - Chaining AI Requests (Review, Fix, Test)

Practice area:

```ts
function getItemsInRange(items: string[], start: number, end: number): string[] {
  const result: string[] = []
  for (let i = start; i <= end; i++) {
    result.push(items[i])
  }
  return result
}
// Bug: if end >= items.length, this accesses undefined indices (off-by-one)
```

Step-by-step:
1. Select the function (including the comment) with `V` then `6j`.
2. Press `<leader>ar` to run Review. Read the finding — it should flag the out-of-bounds access.
3. Keep the same selection active (re-select with `gv` if needed).
4. Press `<leader>af` to run Fix. Read the suggested fix — it should add a bounds check or clamp `end`.
5. Apply the fix manually (e.g., change the loop condition to `i <= Math.min(end, items.length - 1)`).
6. Re-select the fixed function with `V` and `j` movements.
7. Press `<leader>at` to run Tests. Read generated tests — expect edge cases for `end` beyond array length.
8. Copy the tests into your test file and verify they pass.

Expected result: the full chain review, fix, test resolves the bug from discovery to verified fix without leaving the editor.

### Scenario 9 - Whole Buffer vs Visual Selection Context

Practice area (imagine this is a full module with multiple functions):

```ts
// utils/math.ts
export function add(a: number, b: number): number {
  return a + b
}

export function multiply(a: number, b: number): number {
  return a * b
}

export function factorial(n: number): number {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}
```

Step-by-step — targeted question with selection:
1. Put cursor on the `factorial` function.
2. Press `V` then `3j` to select only `factorial`.
3. Press `<leader>ae` to run Explain.
4. Observe: the explanation focuses solely on recursion, base case, and stack depth.

Step-by-step — architectural question with whole buffer:
1. Press `<Esc>` to clear the visual selection.
2. Without selecting anything, press `<leader>ar` to run Review on the whole buffer.
3. Observe: the review covers the module as a whole — missing error handling in `factorial` for negative numbers, whether the module cohesion makes sense, etc.

When to use each:
- **Visual selection** — targeted questions about a specific function, block, or expression.
- **Whole buffer** — architectural questions, module-level review, or when you want cross-function analysis.

Expected result: you see concretely that selection narrows the response and whole-buffer broadens it.

### Scenario 10 - Quick Chat For Fast Questions

Practice area:

```ts
function memoize<T extends (...args: string[]) => unknown>(fn: T): T {
  const cache = new Map<string, unknown>()
  return function (...args: Parameters<T>) {
    const key = args.join(",")
    if (cache.has(key)) return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  } as T
}

function binarySearch(arr: number[], target: number): number {
  let lo = 0, hi = arr.length - 1
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1
    if (arr[mid] === target) return mid
    else if (arr[mid] < target) lo = mid + 1
    else hi = mid - 1
  }
  return -1
}

function throttle(fn: () => void, limit: number): () => void {
  let inThrottle = false
  return function () {
    if (!inThrottle) {
      fn()
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
```

Step-by-step:
1. Put cursor inside `memoize`. Press `<leader>aq`. Type: `What does this function do in one sentence?` Submit.
2. Read the inline response — it should be short and precise.
3. Put cursor inside `binarySearch`. Press `<leader>aq`. Type: `What is the time complexity?` Submit.
4. Read the response — expect O(log n).
5. Put cursor inside `throttle`. Press `<leader>aq`. Type: `How does this differ from debounce?` Submit.
6. Read the response — expect an explanation about immediate execution vs delayed execution.

Expected result: quick chat answers appear fast without opening a full panel, suitable for micro-questions during coding.

### Scenario 11 - When NOT To Trust AI Suggestions

Practice area:

```ts
// Scenario A: Ask for optimization of this function
function removeDuplicateObjects(arr: { id: number; name: string }[]): { id: number; name: string }[] {
  return arr.filter((item, index, self) =>
    index === self.findIndex((t) => t.id === item.id)
  )
}

// Scenario B: A function using a project-specific utility
import { validateSchema } from "../internal/validator"

function processPayload(data: unknown): boolean {
  return validateSchema(data, "user-profile-v2")
}
```

Step-by-step — verify optimization suggestions:
1. Select `removeDuplicateObjects` with `V` then `3j`.
2. Press `<leader>ao` to run Optimize.
3. Read the suggestion carefully. Common AI mistakes here:
   - May suggest using `structuredClone` or `Array.from(new Set(...))` which does not work for objects.
   - May suggest a library function like `_.uniqBy` without knowing if lodash is in your project.
4. **Verify**: check if the suggested API exists by using `gd` (go to definition) or `:help` on any suggested function. Check your `package.json` for suggested libraries.

Step-by-step — hallucinated function signatures:
1. Select `processPayload` and the import with `V` then `4j`.
2. Press `<leader>ae` to run Explain.
3. The AI may describe `validateSchema` with invented parameters or behavior because it cannot see the internal module.
4. **Verify**: use `gd` on `validateSchema` to jump to its actual definition. Compare the real signature with what the AI described.

Red flags to watch for:
- AI suggests a function/method that does not appear in your type definitions.
- AI suggests a package you have not installed.
- AI suggests a deprecated API (check your project's TypeScript version).
- AI gives confident advice about internal code it has never seen.

Expected result: you develop the habit of verifying AI output against LSP, types, and actual source — treating suggestions as hypotheses, not facts.

## Mental Model: When To Use Each Prompt

| Prompt | When to use | Example situation |
|--------|-------------|-------------------|
| `Explain` | Understanding unfamiliar code | Onboarding to a new codebase, reviewing a PR from a teammate, encountering a pattern you have not seen before |
| `Review` | Checking for bugs, security issues, code smells | Before approving a PR, after writing a complex function, when code feels fragile |
| `Fix` | When LSP shows a diagnostic you do not understand | Red underline with a cryptic TypeScript error, a lint rule you have not encountered |
| `Tests` | After writing a function, before committing | You wrote a utility and want coverage before pushing, or you want to understand edge cases |
| `Commit` | After staging changes, before writing message | You have a clean diff staged and want a conventional commit message that describes the why |
| `Optimize` | When profiling shows a bottleneck, not premature optimization | A function shows up in profiling, a loop is visibly O(n^2), or you hit a performance regression |

Key principle: do NOT use `Optimize` on code that is not proven slow. Premature optimization makes code harder to read for no measurable benefit. Use `Review` first to find real problems, then `Optimize` only on confirmed bottlenecks.

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

## Inline Copilot Completions

Beyond CopilotChat, you also have inline ghost text completions that appear as you type. These are faster for small suggestions — single lines, function signatures, or boilerplate.

### Keymaps

- `<Tab>` - accept the full ghost text suggestion
- `<M-]>` - cycle to next suggestion (Alt + ])
- `<M-[>` - cycle to previous suggestion (Alt + [)
- `<C-]>` - dismiss the current suggestion
- `<M-Right>` - accept next word only (partial accept)
- `<M-l>` - accept next line only (partial accept)

### When To Use Inline vs CopilotChat

| Situation | Tool |
|-----------|------|
| Completing a function signature | Inline (Tab) |
| Writing boilerplate (imports, types) | Inline (Tab) |
| Generating a whole function from a comment | Inline, then review |
| Explaining existing code | CopilotChat (`<leader>ae`) |
| Reviewing for bugs | CopilotChat (`<leader>ar`) |
| Generating tests from implementation | CopilotChat (`<leader>at`) |

### Practice Scenario — Partial Accept Workflow

Practice area:

```ts
// Type this function signature, then use partial accept to control the completion:
function parseConfig(raw: string): Config {
  // After typing this line, Copilot will suggest the body.
  // Instead of accepting everything:
  // 1. Press <M-Right> to accept one word at a time
  // 2. Press <M-l> to accept one line at a time
  // 3. Review as you go — reject with <C-]> if the suggestion diverges
}

// Type a comment, let Copilot suggest the implementation:
// sort users by score descending, return top 5
```

Step-by-step:
1. Open a new `.ts` file and type `function parseConfig(`
2. Observe the ghost text suggestion appearing (dimmed text)
3. Press `<M-Right>` to accept just the next word
4. Press `<M-Right>` again to accept another word
5. Press `<M-l>` to accept the rest of the current line
6. If the next line suggestion is wrong, press `<C-]>` to dismiss
7. Press `<M-]>` to cycle to an alternative suggestion
8. When satisfied, press `<Tab>` to accept the full remaining suggestion

### Practice Scenario — Comment-Driven Completions

```ts
// Write a comment describing what you want, then let Copilot generate:

// validate email format and return boolean

// fetch user by id, throw if not found

// retry a promise up to 3 times with exponential backoff
```

Step-by-step:
1. Type the comment `// validate email format and return boolean`
2. Press `Enter` to go to a new line
3. Wait for ghost text to appear (the function implementation)
4. Review the suggestion — check for correctness
5. Press `<Tab>` to accept if it looks right
6. If not, press `<M-]>` to see alternatives
7. Repeat for the other two comments

Key principle: treat inline completions as drafts. Always read before accepting. Partial accept (`<M-Right>`) is your best tool for maintaining control while still getting speed benefits.

## Troubleshooting / Verify With Which-Key

- If `<leader>aa` does nothing, check `:Lazy` for `CopilotChat`.
- If custom prompts (`<leader>ae`, `<leader>ar`, etc.) are missing, check `lua/plugins/ai.lua`.
- If Copilot is not authenticated, run `:Copilot auth` and follow the device login flow.
- Search `<leader>sk` for `Copilot` or `Chat` to verify all mappings are registered.
- If output is too broad, narrow the visual selection and re-run.
- Treat all AI output as a draft — verify with LSP diagnostics and read the diff before applying.
- **AI suggests code that doesn't compile** — after applying any AI suggestion, check for LSP diagnostics (`]d` to jump to errors). Run the type checker (`:!npx tsc --noEmit`) to verify. Never trust that generated code compiles until LSP confirms zero errors.
- **Context is stale** — if responses reference code you already changed or seem confused about current state, press `<leader>ax` to clear chat history and reset context. Then re-select the fresh code and ask again.
- **Response is too generic** — select a smaller, more specific code block instead of whole files. A 5-line selection produces more actionable output than a 200-line buffer. Add a specific question in the prompt rather than relying only on the prompt template.
