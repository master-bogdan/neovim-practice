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

Steps:

1. From column 1, press `w` three times to land on `status`.
2. Press `e` to inspect the end of `status`, then press `w` twice to land on `pending`.
3. Press `W` to jump to `retry_count=3`, then press `b` to return to `pending`.
4. Press `W` twice to land on `cache_state=stale`, then press `w` twice to land on `stale`.
5. Press `j` to move to the second line, then `0` to reset to column 1.
6. Press `w` five times to land on `published`.
7. Press `j`, then `0`, then `w` five times to land on `failed`.
8. Press `k` to return to `published`, then `j` to return to `failed`.

Required moves: `w`, `W`, `b`, `e`, `j`, `k`, and `0`.

Expected result: you can stop exactly on each field name and each value.

### Scenario 2 - Read Several Function Calls

Start on the `r` in `renderSummary`. Move to the opening parenthesis, visit each comma in the first call, jump to the second call, and repeat.

Practice area:

```ts
renderSummary("draft title", room.participants, { retry: true, source: "cron" })
publishSummary(room.id, summary.status, { notify: true, audit: false })
cacheSummary(room.id, summary.value, cacheOptions.defaultTtl)
```

Steps:

1. Start on the `r` in `renderSummary`.
2. Press `t(` to stop on the character before the opening parenthesis, then press `w` to enter the first argument.
3. Press `f,` to land on the first comma, then `;` to land on the second comma.
4. Press `,` to return to the first comma.
5. Press `j`, then `0`, to move to the start of `publishSummary`.
6. Press `t(`, then `w`, to enter the first argument.
7. Press `f,`, then `;`, to inspect both argument boundaries in the second call.
8. Press `b` to move back into the previous argument.

Required moves: `t(`, `f,`, `;`, `,`, `j`, `0`, `w`, and `b`.

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

Steps:

1. Start on the `f` in `function`.
2. Press `$` to visit the end of the function signature.
3. Press `j`, then `0`, to visit physical column 1 of the `if` line.
4. Press `^` to jump to the first non-space character on that line.
5. Press `$` to inspect the line end.
6. Press `j`, then `0`, then `^`, then `$` on the `return ""` line.
7. Press `k`, then `0`, then `^` to return to the `if` line indentation.

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

Steps:

1. Start at the first `u` in `user_id`.
2. Press `f,` to land on the first comma, then `;` twice to visit the next two commas.
3. Press `,` to reverse to the previous comma.
4. Press `j`, then `0`, to move to the start of the second line.
5. Press `f:` to land on the first colon, then `f;` to land on the first semicolon.
6. Press `j`, then `0`, to move to the start of the pipe-separated line.
7. Press `f|`, then `;` twice to visit later pipes.
8. Press `F|` to move backward to the previous pipe.

Required moves: `f,`, `;`, `,`, `f:`, `f;`, `f|`, `F|`, `j`, and `0`.

Expected result: cursor lands on exact separators across comma, colon, semicolon, and pipe formats.

### Scenario 5 - Choose Between Word And WORD In Real Text

Move through each line twice: once with `w`, then again with `W`. Notice which one is better for prose, paths, identifiers, and CLI flags.

Practice area:

```text
object_schema.variable_value resolver-cache-key
object_schema.variable_value resolver-cache-key
Open `README.md` from this repository before editing.
Run npm --workspace=sheets-api test -- --runInBand before pushing.
The reviewer said: "rename request_status, not request.status".
```

Guided passes:

1. On the first `object_schema.variable_value` line, use `w` repeatedly and notice how punctuation splits the identifier.
2. Press `j`, then `0`, to move to the second copy of the same line.
3. Use `W` repeatedly and notice that the dotted and dashed tokens stay whole.
4. On the path and CLI lines, repeat the same comparison: `w` exposes punctuation boundaries, while `W` moves by whitespace chunks.

Required moves: `w`, `W`, `j`, and `0`.

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

Steps:

1. Start on the first `#` in `## Review Notes`.
2. Press `j` twice to reach the first checklist item.
3. Press `f[` to land on `[`, then `f]` to land on `]`.
4. Press `j`, then `0`, then `f[`, then `f]` to inspect the second checklist marker.
5. Press `j`, then `0`, then `f[`, then `f]` to inspect the third checklist marker.
6. Press `f[`, then `f]`, to inspect the link label.
7. Press `f(` to land on the URL opening parenthesis.
8. Press `t)` to stop before the closing parenthesis, then `$` to inspect the end of the line.
9. Press `j` twice to reach the final sentence, then use `w` to move through its first few words.

Required moves: `j`, `w`, `f[`, `f]`, `f(`, `t)`, `$`, and `0`.

Expected result: you can navigate Markdown structure without treating it like code.

### Scenario 7 - Use Flash Instead Of Repeated Motions

From the start of the block, jump directly to `request_type`, then `summary_status`, then `retry_count`, then `user_name`.

Practice area:

```text
user_id user_name request_status request_type retry_count summary_status cache_state owner_name
room_id room_name participant_status participant_type participant_count export_status
```

Steps:

1. Start at the first `u` in `user_id`.
2. Press `s`, type a unique part of `request_type` such as `ty`, then choose the Flash label.
3. Press `s`, type a unique part of `summary_status` such as `su`, then choose the label.
4. Press `s`, type a unique part of `retry_count` such as `re`, then choose the label.
5. Press `s`, type a unique part of `user_name` such as `us`, then choose the label.

Required moves: `s` and the visible Flash labels.

Expected result: you reach distant visible targets in one jump.

### Scenario 8 - Jump Between Known Locations

Open this file with line numbers enabled. Jump to the `Practice Scenarios` heading, then to the `Real-World Drill` heading, then back to the top.

```text
:set number
```

Steps:

1. Run `:set number` so line numbers are visible.
2. Press `gg` to start from the top of the file.
3. Type the visible line number for `Practice Scenarios`, followed by `G`, to jump to that heading.
4. Press `/Real-World<Enter>` to jump to the `Real-World Drill` heading.
5. Press `gg` to return to the top.

Required moves: `gg`, `{count}G`, and `/Real-World`.

Expected result: you can move by known line number and by search target.

### Scenario 9 - Navigate A Paragraph Without Code Clues

Start at the beginning of the paragraph. Reach `careful`, `without`, `nearest`, and `habit` using word motions and search.

Practice area:

```text
Good editor practice is careful and quiet. The point is to reach the right place without dragging the cursor across every character. When the nearest useful target is visible, jump to it. When the target is not visible, search for it. Accuracy becomes a habit before speed becomes useful.
```

Steps:

1. Start on `Good`.
2. Press `w` four times to land on `careful`.
3. Press `e` to inspect the end of `careful`, then `b` to return to its start.
4. Press `/without<Enter>` to jump directly to `without`.
5. Press `/nearest<Enter>` to jump to `nearest`.
6. Press `/target<Enter>` to jump to the first later `target`, then press `n` to jump to the next `target`.
7. Press `/habit<Enter>` to jump to `habit`.
8. Press `0` to return to the start of the current line.

Required moves: `w`, `b`, `e`, `/without`, `/nearest`, `/target`, `n`, `/habit`, and `0`.

Expected result: you can navigate prose as confidently as code.

### Scenario 10 - Recover After Overshooting

Deliberately overshoot each target once, then recover with the opposite motion.

Practice area:

```text
alpha beta gamma delta epsilon zeta eta theta
```

Steps:

1. Start on `alpha`.
2. Press `w` four times so you overshoot `gamma` and land on `epsilon`.
3. Press `b` twice to recover back to `gamma`.
4. Press `0` to reset to the start of the line.
5. Press `ft` to land on the `t` in `beta`, then press `;` too many times to continue to later `t` matches.
6. Press `,` to move back to the previous `t`.

Required moves: `w`, `b`, `0`, `f`, `;`, and `,`.

Expected result: recovery becomes automatic instead of frustrating.

### Scenario 11 - Jump List Navigation

Start at the top of the practice area. Make several jumps using search and `G`. Then retrace your steps with `<C-o>` and move forward again with `<C-i>`.

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

1. Start on the first line of the practice area.
2. Press `/fetchWithRetry<Enter>` to jump to the retry function.
3. Press `/CacheEntry<Enter>` to jump to the `CacheEntry` reference in the `invalidateCache` signature.
4. Press `/^const globalCache<Enter>` to jump to the final line of the practice area.
5. Press `?buildCacheKey<Enter>` to jump backward to the helper function.
6. Now press `<C-o>` — you return to `globalCache`.
7. Press `<C-o>` again — you return to `CacheEntry`.
8. Press `<C-o>` again — you return to `fetchWithRetry`.
9. Press `<C-i>` — you move forward to `CacheEntry`.
10. Press `<C-i>` again — you move forward to `globalCache`.

Required moves: `/`, `?`, `<C-o>`, and `<C-i>`.

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

1. From the top of the file, press `/processQueue<Enter>` to jump to that function.
2. Press `zz` to center the function signature on screen — now you see context above and below.
3. Press `/scheduleRetry<Enter>` to jump to the retry function.
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
2. Use `/function<Enter>` to land on the first function declaration.
3. Use `s` to jump to another visible function name.
4. Move to its argument list with `f(`.
5. Move to an argument boundary with `t,` or `f,`.
6. Move to the next known function with `/function_name_fragment<Enter>`.
7. Use `<C-o>` to return to the previous function, then `gg` to return to the top.

## Troubleshooting / Verify With Which-Key

- If `s` does not trigger Flash, run `<leader>sk` and search for `Flash`.
- If a terminal consumes `<Esc>`, press `<C-\><C-n>` first.
- If search highlights are distracting, use `<Esc>` or `<leader>ur` in LazyVim to clear highlight.
