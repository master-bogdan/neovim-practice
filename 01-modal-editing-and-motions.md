# Chapter 1 - Modal Editing And Motions

## Goal

Move deliberately in Normal mode and enter Insert mode only when you are ready to change text.

## Mental Model

LazyVim is still Neovim. Most power comes from the Vim grammar:

```text
operator + motion or text object
```

Before editing quickly, learn to land on the exact target. Avoid holding `h` or `l` for long distances. Use words, lines, search, and Flash.

### Choosing The Right Motion — Decision Framework

| Situation | Best motion | Why |
|-----------|-------------|-----|
| Target is on the same line, known character | `f` / `t` | Fewest keystrokes for inline targets |
| Target is visible on screen, 2-char target | `s` (Flash) | One jump, no scrolling |
| Target is anywhere in the buffer, pattern/regex needed | `/` search | Reaches beyond the visible viewport |
| You already visited the target recently | `<C-o>` / `<C-i>` | Retrace previous jumps without remembering line numbers |

## Keymaps

Core modes:
- `i` - insert before cursor
- `a` - insert after cursor
- `I` - insert at first non-space character on the line
- `A` - insert at end of line
- `o` - open new line below
- `O` - open new line above
- `<Esc>` - return to Normal mode
- `v` - Visual character mode
- `V` - Visual line mode
- `<C-v>` - Visual block mode

Cursor basics:
- `h` - left
- `j` - down
- `k` - up
- `l` - right
- `w` - next word
- `b` - previous word
- `e` - end of word
- `W` - next whitespace-separated WORD
- `B` - previous whitespace-separated WORD
- `E` - end of whitespace-separated WORD
- `0` - first column
- `^` - first non-space character
- `$` - end of line
- `gg` - top of file
- `G` - bottom of file
- `{count}G` - go to line number
- `%` - matching pair when on a bracket

Line character search:
- `f<char>` - jump forward to character
- `F<char>` - jump backward to character
- `t<char>` - jump forward until before character
- `T<char>` - jump backward until after character
- `;` - repeat last `f`, `F`, `t`, or `T`
- `,` - repeat in the opposite direction

Sentence and paragraph motion:
- `(` - sentence backward
- `)` - sentence forward
- `{` - paragraph backward
- `}` - paragraph forward

Jump list:
- `<C-o>` - jump back in jump list
- `<C-i>` - jump forward in jump list

Scroll positioning:
- `zt` - scroll current line to top
- `zz` - scroll current line to center
- `zb` - scroll current line to bottom

LazyVim / plugin motion:
- `s` - Flash jump to visible target
- `S` - Flash Treesitter select (syntactic node)
- `<C-d>` - half-page down
- `<C-u>` - half-page up
- `<C-f>` - page down
- `<C-b>` - page up

## Common Workflows

Move by words:

```text
Use w/b/e for normal prose and identifiers.
Use W/B/E when punctuation should be ignored as part of a larger token.
```

Move inside a line:

```text
Use f, t, F, T when the target is visible on the same line.
Repeat with ; and reverse with ,.
```

Jump with Flash:

```text
Press s, type target letters, then choose the label.
Use this when the target is visible but far away.
```

## Practice Scenarios

### Scenario 1 - Navigate A Dense Status Block

Start at the beginning of the first line. Reach these targets without holding `h` or `l`: `status`, `retry_count`, `stale`, `published`, then `failed`.

Practice area:

```text
request_id=req_42 status=pending retry_count=3 cache_state=stale owner=sync-worker
request_id=req_43 status=published retry_count=0 cache_state=fresh owner=api-worker
request_id=req_44 status=failed retry_count=5 cache_state=expired owner=cron-worker
```

Required moves: use `w`, `W`, `b`, `e`, `j`, and `k`. Use `0` to reset at the start of a line when you overshoot.

Expected result: you can stop exactly on each field name and each value.

### Scenario 2 - Read Several Function Calls

Start on the `r` in `renderSummary`. Move to the opening parenthesis, visit each comma in the first call, jump to the second call, and repeat.

Practice area:

```ts
renderSummary("draft title", room.participants, { retry: true, source: "cron" })
publishSummary(room.id, summary.status, { notify: true, audit: false })
cacheSummary(room.id, summary.value, cacheOptions.defaultTtl)
```

Required moves: combine `t(`, `f,`, `;`, `,`, `j`, `0`, `w`, and `b`.

Expected result: you can inspect call shape and argument boundaries without entering Insert mode.

### Scenario 3 - Inspect Indentation In A Nested Block

Start anywhere in the block. For each line, visit the physical first column, the first non-space character, and the end of the line.

Practice area:

```ts
function normalizeVariable(rawValue: unknown) {
  if (rawValue == null) {
    return ""
  }
  return String(rawValue).trim()
}
```

Required moves: `0`, `^`, `$`, `j`, and `k`.

Expected result: you can distinguish column 1, indentation, and line end on multiple indentation depths.

### Scenario 4 - Jump Through Structured Text

Start at the first character of each line. Visit separators with character search, then reverse direction.

Practice area:

```text
user_id,request_status,request_type,retry_count,summary_status
room_id:42;owner:sync-worker;status:queued;priority:high
alpha | beta | gamma | delta | epsilon
```

Required moves: `f,`, `;`, `,`, `f:`, `f;`, `f|`, `F|`, and `0`.

Expected result: cursor lands on exact separators across comma, colon, semicolon, and pipe formats.

### Scenario 5 - Choose Between Word And WORD In Real Text

Move through each line twice: once with `w`, then again with `W`. Notice which one is better for prose, paths, identifiers, and CLI flags.

Practice area:

```text
object_schema.variable_value resolver-cache-key
object_schema.variable_value resolver-cache-key
Open /Users/bogdan/Projects/neovimclass/README.md before editing.
Run npm --workspace=sheets-api test -- --runInBand before pushing.
The reviewer said: "rename request_status, not request.status".
```

Required moves: use `w` on one pass and `W` on another pass.

Expected result: you feel the difference between punctuation-aware word movement and whitespace-only WORD movement.

### Scenario 6 - Move Through A Markdown Note

Start at the top of the note. Jump to the checklist markers, the link label, the URL, and the final sentence.

Practice area:

```md
## Review Notes

- [ ] Confirm the cache key includes the room id.
- [ ] Check whether retries stop after five failures.
- [ ] Update [LazyVim docs](https://www.lazyvim.org/keymaps) references.

The next pass should focus on fewer keystrokes and cleaner recovery.
```

Required moves: use `j`, `w`, `f[`, `f]`, `f(`, `t)`, `$`, and `gg`.

Expected result: you can navigate Markdown structure without treating it like code.

### Scenario 7 - Use Flash Instead Of Repeated Motions

From the start of the block, jump directly to `request_type`, then `summary_status`, then `retry_count`, then `user_name`.

Practice area:

```text
user_id user_name request_status request_type retry_count summary_status cache_state owner_name
room_id room_name participant_status participant_type participant_count export_status
```

Required moves: use `s` and choose the Flash label.

Expected result: you reach distant visible targets in one jump.

### Scenario 8 - Jump Between Known Locations

Open this file with line numbers enabled. Jump to the `Practice Scenarios` heading, then to the `Real-World Drill` heading, then back to the top.

```text
:set number
```

Required moves: `{count}G`, `gg`, search with `/Real-World`.

Expected result: you can move by known line number and by search target.

### Scenario 9 - Navigate A Paragraph Without Code Clues

Start at the beginning of the paragraph. Reach `careful`, `without`, `nearest`, and `habit` using word motions and search.

Practice area:

```text
Good editor practice is careful and quiet. The point is to reach the right place without dragging the cursor across every character. When the nearest useful target is visible, jump to it. When the target is not visible, search for it. Accuracy becomes a habit before speed becomes useful.
```

Required moves: combine `w`, `b`, `e`, `/nearest`, `n`, and `0`.

Expected result: you can navigate prose as confidently as code.

### Scenario 10 - Recover After Overshooting

Deliberately overshoot each target once, then recover with the opposite motion.

Practice area:

```text
alpha beta gamma delta epsilon zeta eta theta
```

Required moves: use `w` too many times, recover with `b`; use `f` too far with `;`, recover with `,`.

Expected result: recovery becomes automatic instead of frustrating.

### Scenario 11 - Jump List Navigation

Start at the top of the practice area. Make several jumps using `gd`, `/`, and `G`. Then retrace your steps with `<C-o>` and move forward again with `<C-i>`.

Practice area:

```ts
const MAX_RETRIES = 5

interface CacheEntry {
  key: string
  value: unknown
  ttl: number
}

function buildCacheKey(roomId: string, suffix: string): string {
  return `${roomId}:${suffix}`
}

function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  if (retries <= 0) {
    throw new Error("Max retries exceeded")
  }
  return fetch(url).catch(() => fetchWithRetry(url, retries - 1))
}

function invalidateCache(entry: CacheEntry): void {
  if (entry.ttl <= 0) {
    delete globalCache[entry.key]
  }
}

const globalCache: Record<string, CacheEntry> = {}
```

Steps:

1. Place cursor on `MAX_RETRIES` in `fetchWithRetry` and press `gd` to jump to its definition at the top.
2. Press `/CacheEntry<CR>` to search for `CacheEntry` — you land on the interface.
3. Press `G` to jump to the bottom of the file.
4. Press `/invalidateCache<CR>` to jump to that function.
5. Now press `<C-o>` — you return to the bottom (`G` position).
6. Press `<C-o>` again — you return to `CacheEntry`.
7. Press `<C-o>` again — you return to `MAX_RETRIES` definition.
8. Press `<C-i>` — you move forward to `CacheEntry`.
9. Press `<C-i>` again — you move forward to the bottom.

Required moves: `gd`, `/`, `G`, `<C-o>`, `<C-i>`.

Expected result: you can freely retrace and replay your jump history without remembering line numbers.

### Scenario 12 - Screen Positioning After Jumps

After jumping to a target with Flash or search, use `zt`, `zz`, or `zb` to reposition the viewport so the target line is comfortable to read in context.

Practice area (imagine this block is embedded deep in a 500-line file):

```ts
// --- line 180 ---
function processQueue(queue: Task[]): void {
  for (const task of queue) {
    if (task.status === "pending") {
      executeTask(task)
    }
  }
}

// --- line 220 ---
function executeTask(task: Task): void {
  const result = task.handler(task.payload)
  if (result.success) {
    task.status = "done"
  } else {
    task.status = "failed"
    scheduleRetry(task)
  }
}

// --- line 260 ---
function scheduleRetry(task: Task): void {
  if (task.retryCount < MAX_RETRIES) {
    task.retryCount++
    task.status = "pending"
    queue.push(task)
  }
}
```

Steps:

1. From the top of the file, press `/processQueue<CR>` to jump to that function.
2. Press `zz` to center the function signature on screen — now you see context above and below.
3. Press `/scheduleRetry<CR>` to jump to the retry function.
4. Press `zt` to push it to the top of the screen — you can now read the full function body below.
5. Press `<C-o>` to return to `processQueue`.
6. Press `zb` to push it to the bottom — you can now see everything that came before it.

Required moves: `/`, `zz`, `zt`, `zb`, `<C-o>`.

Expected result: you control where the target sits on screen after each jump, giving yourself the best reading context.

### Scenario 13 - Sentence And Paragraph Motions

Navigate a prose document using sentence and paragraph motions instead of line-by-line movement.

Practice area:

```md
## Architecture Overview

The system uses an event-driven approach. Each incoming request is placed on a queue.
Workers consume tasks from the queue in order. Failed tasks are retried up to five times.

## Deployment

The service runs in three regions. Each region has its own cache layer.
Invalidation messages propagate across regions within two seconds. Monitoring
dashboards track cache hit rates per region.

## Security

All endpoints require authentication. Tokens expire after one hour.
Refresh tokens are rotated on each use. Rate limiting applies per client ID.
```

Steps:

1. Place cursor at the top of the block.
2. Press `)` repeatedly — the cursor jumps forward one sentence at a time: "Each incoming request...", "Workers consume...", "Failed tasks...".
3. Press `(` to go back one sentence.
4. Press `}` — the cursor jumps to the blank line after the first paragraph (past "Architecture Overview" content).
5. Press `}` again — you land after the "Deployment" paragraph.
6. Press `{` — you jump back to the start of the "Deployment" paragraph.
7. Press `{` again — you return to the start of "Architecture Overview" content.

Required moves: `(`, `)`, `{`, `}`.

Expected result: you can skip entire sentences or paragraphs in one keystroke, which is much faster than repeated `j` or `w` in prose-heavy files.

### Scenario 14 - Flash Treesitter Mode

Use `S` (Flash Treesitter select) to select syntactic nodes. Each successive press of `;` (or the label for the parent node) expands the selection to a larger containing node.

Practice area:

```ts
function calculateDiscount(order: Order): number {
  if (order.total > 100) {
    const rate = order.membership === "premium" ? 0.2 : 0.1
    const discount = order.total * rate
    if (discount > 50) {
      return 50
    }
    return discount
  }
  return 0
}

function applyDiscount(order: Order): Order {
  const discount = calculateDiscount(order)
  return {
    ...order,
    total: order.total - discount,
    appliedDiscount: discount,
  }
}
```

Steps:

1. Place cursor inside the expression `order.total * rate`.
2. Press `S` — Flash highlights selectable treesitter nodes. Labels appear on syntactic boundaries.
3. Select the label for the innermost expression `order.total * rate` — it becomes visually selected.
4. Press `S` again (or expand) — the selection grows to the full statement `const discount = order.total * rate`.
5. Expand again — the selection grows to the inner `if` block body.
6. Expand again — the selection covers the entire `if (order.total > 100) { ... }` block.
7. Expand once more — the entire function body is selected.

Required moves: `S`, node label selection, expansion.

Expected result: you can select precisely scoped syntactic regions (expression, statement, block, function) without manually positioning `v` and motions.

## Real-World Drill

Open a source file and perform this without using the mouse:

1. Jump to the top with `gg`.
2. Search visually for a function name.
3. Use `s` to jump to it.
4. Move to an argument with `f(` or `t,`.
5. Move to the next function with `/function_name_fragment`.
6. Return to the top with `gg`.

## Troubleshooting / Verify With Which-Key

- If `s` does not trigger Flash, run `<leader>sk` and search for `Flash`.
- If a terminal consumes `<Esc>`, press `<C-\><C-n>` first.
- If search highlights are distracting, use `<Esc>` or `<leader>ur` in LazyVim to clear highlight.
