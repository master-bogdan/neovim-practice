# Chapter 3 - Search, Replace, And Navigation

## Goal

Find targets through search, project pickers, and quickfix/location lists instead of manually scanning files.

## Mental Model

There are three search levels:

```text
Current line: f, F, t, T
Current buffer: /, ?, *, #
Project or workspace: LazyVim search pickers, grep, diagnostics, symbols
```

Use the smallest search scope that gets you to the target.

## Keymaps

Buffer search:
- `/pattern` - search forward
- `?pattern` - search backward
- `n` - next match
- `N` - previous match
- `*` - search word under cursor forward
- `#` - search word under cursor backward
- `<Esc>` - escape and clear search highlight in LazyVim
- `<leader>ur` - redraw / clear search highlight / diff update

Substitute:
- `:s/foo/bar` - replace first match on current line
- `:s/foo/bar/g` - replace all matches on current line
- `:%s/foo/bar/g` - replace all matches in file
- `:%s/foo/bar/gc` - replace all matches with confirmation
- `:s//bar/` - replace last searched pattern on current line
- `:%s//bar/g` - replace last searched pattern in file
- Visual selection then `:s/foo/bar/g` - replace only selected lines

LazyVim search and pickers:
- `<leader><space>` - find files in root
- `<leader>/` - grep root
- `<leader>sg` - grep root
- `<leader>sG` - grep cwd
- `<leader>sw` - search visual selection or word in root
- `<leader>sW` - search visual selection or word in cwd
- `<leader>sb` - buffer lines
- `<leader>sB` - grep open buffers
- `<leader>sj` - jumps
- `<leader>sm` - marks
- `<leader>sq` - quickfix list
- `<leader>sl` - location list
- `[q` - previous quickfix item
- `]q` - next quickfix item

Help search:
- `<leader>sh` - help pages
- `<leader>sk` - keymaps
- `<leader>sC` - commands

## Common Workflows

Search within a file:

```text
/request_status
n
N
```

Replace a repeated word:

```text
:%s/pending/queued/gc
```

Search project text:

```text
<leader>sg
type the symbol, string, or error message
open a result
```

Search only open buffers:

```text
<leader>sB
```

## Practice Scenarios

### Scenario 1 - Find A Specific Occurrence In A Larger Log

Find the third `pending` transition, then move backward to the second one.

Practice area:

```text
10:01 request req_1 changed draft -> pending
10:02 request req_2 changed queued -> retrying
10:03 request req_3 changed draft -> pending
10:04 request req_4 changed pending -> published
10:05 request req_5 changed draft -> pending
10:06 request req_6 changed failed -> retrying
10:07 request req_7 changed pending -> cancelled
```

Required moves: `/pending`, `n`, `n`, then `N`.

Expected result: cursor lands on the third `pending`, then returns to the second.

### Scenario 2 - Search Backward To The Cause In Notes

Start at the bottom. Search backward to the earlier cache key assignment, then search backward again to the heading.

Practice area:

```text
# Investigation

cache_key = object_schema:room:42
cache_ttl = 300

The first request generated a fresh value.
The second request used the same cache key.
The third request returned a stale result.

Conclusion: stale result returned because the cache key ignored the participant id.
```

Required moves: `?cache_key`, then `?Investigation`.

Expected result: cursor lands on the cause, then the section heading.

### Scenario 3 - Follow A Repeated Symbol

Put the cursor on the first `variableName`, then jump through the other occurrences.

Practice area:

```ts
const variableName = input.variableName
const displayName = formatVariableName(variableName)
if (!variableName) throw new Error("missing variableName")
return resolveVariable(variableName, displayName)
```

Required moves: `*`, `n`, `n`, `n`, then `N`.

Expected result: you can move forward and backward through the same symbol.

### Scenario 4 - Search A Mixed Document

Search for `retry`, move through all matches, then clear highlight.

Practice area:

```md
## Release Checklist

- retry failed sync jobs
- check retry_count in metrics
- confirm users do not see retry-only messages

Notes:
The word retry appears in prose too, not only in code.
```

Required moves: `/retry`, `n`, `n`, `n`, then `<Esc>` or `<leader>ur`.

Expected result: you can search across headings, checklist items, and prose.

### Scenario 5 - Replace A Status On One Line Only

Practice area:

```text
pending pending pending # only this line changes
pending should stay on this line
pending should also stay on this line
```

Required move: run `:s/pending/queued/g` only on the first line.

Expected result:

```text
queued queued queued # only this line changes
pending should stay on this line
pending should also stay on this line
```

### Scenario 6 - Reuse The Last Search In Substitute

Search for `summary_status`, then replace it with `report_status` without retyping the search pattern.

Practice area:

```ts
const summary_status = getSummaryStatus()
const next_summary_status = normalize(summary_status)
```

Required moves: `/summary_status`, then `:s//report_status/` on the first line.

Expected result:

```ts
const report_status = getSummaryStatus()
const next_summary_status = normalize(summary_status)
```

### Scenario 7 - Replace Only In A Selected Range

Only the first two routes moved from `api` to `service`.

Practice area:

```text
api/users
api/rooms
api/internal-debug
api/local-only
```

Required moves: select the first two lines with `V`, then run `:s/api/service/g`.

Expected result:

```text
service/users
service/rooms
api/internal-debug
api/local-only
```

### Scenario 8 - Replace A Path With A Safer Delimiter

The old docs path changed. Replace only the path prefix.

Practice area:

```text
old/path/to/summary.md
old/path/to/cache.md
old/path/to/retry-notes.md
```

Required move: use a non-slash delimiter, for example `:%s#old/path/to#new/docs#g`.

Expected result:

```text
new/docs/summary.md
new/docs/cache.md
new/docs/retry-notes.md
```

### Scenario 9 - Confirm Each Replacement

Replace `task` with `story`, but reject the replacement in `task_runner`.

Practice area:

```text
task list
task owner
task_runner config
task status
```

Required move: use `:%s/task/story/gc`.

Expected result:

```text
story list
story owner
task_runner config
story status
```

### Scenario 10 - Search The Workbook Like A Project

Use LazyVim project grep to find every chapter that mentions diagnostics.

Practice area:

```text
<leader>sg
diagnostic
```

Expected result: picker shows matches across chapter files, not just the current buffer.

## Real-World Drill

1. Open a project.
2. Use `<leader>sg` to find a function or error message.
3. Open a result.
4. Use `/` to find a smaller target inside the file.
5. Use `:%s/foo/bar/gc` on a safe scratch file.
6. Open quickfix or location list with `<leader>sq` or `<leader>sl`.
7. Move with `[q` and `]q`.

## Troubleshooting / Verify With Which-Key

- If `<leader>sg` does not exist, use `<leader>sk` and search for `Grep`.
- If replace syntax is hard with paths, use another delimiter: `:%s#old/path#new/path#g`.
- If you accidentally replace too much, press `u`.
- If search highlight stays visible, press `<Esc>` or `<leader>ur`.
