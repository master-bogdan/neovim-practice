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

### Search and Replace Decision Tree

Pick the right tool based on what you need:

```text
Single occurrence             -> /pattern + cgn
All occurrences, same text    -> :%s/old/new/g
Selective (some but not all)  -> cgn + . to repeat (n to skip one)
Across project files          -> <leader>sg + :cdo s/old/new/g | update
Pattern-based line operations -> :g/pattern/command
Within a specific range       -> :{range}s/old/new/g
```

## Keymaps

Buffer search:
- `/pattern` - search forward
- `?pattern` - search backward
- `n` - next match
- `N` - previous match
- `*` - search word under cursor forward (adds `\<word\>` boundaries)
- `#` - search word under cursor backward (adds `\<word\>` boundaries)
- `gn` - select next search match (visual motion)
- `cgn` - change next search match
- `dgn` - delete next search match
- `.` after `cgn` - repeat the change on the next match
- `<Esc>` - escape and clear search highlight in LazyVim
- `<leader>ur` - redraw / clear search highlight / diff update

Search modifiers:
- `\c` - force case-insensitive inside a search pattern (e.g. `/\cerror`)
- `\C` - force case-sensitive inside a search pattern (e.g. `/\CError`)

Substitute:
- `:s/foo/bar` - replace first match on current line
- `:s/foo/bar/g` - replace all matches on current line
- `:%s/foo/bar/g` - replace all matches in file
- `:%s/foo/bar/gc` - replace all matches with confirmation
- `:s//bar/` - replace last searched pattern on current line
- `:%s//bar/g` - replace last searched pattern in file
- `:{range}s/foo/bar/g` - replace within a specific line range
- Visual selection then `:s/foo/bar/g` - replace only selected lines

Global commands:
- `:g/{pattern}/{cmd}` - execute command on every line matching pattern
- `:v/{pattern}/{cmd}` - execute command on every line NOT matching pattern
- `:g/pattern/d` - delete all matching lines
- `:g/pattern/t$` - copy all matching lines to end of file

Quickfix batch operations:
- `:vimgrep /pattern/ **/*` - populate quickfix list from a pattern across files
- `:cdo {cmd}` - run a command on each quickfix entry
- `:cfdo {cmd}` - run a command on each quickfix file (once per file)

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
- `<leader>sq` - show the existing quickfix list in a picker; it does not create entries
- `<leader>sl` - location list
- `[q` - previous quickfix item
- `]q` - next quickfix item
- `:cclose<Enter>` - close the native quickfix window
- `q` or `<Esc>` - close the `<leader>sq` quickfix picker

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

### Setup For Inline Practice Areas

Do not run searches, `:%s`, `:g`, or `:v` commands directly in this chapter file. The headings, instructions, and expected results contain the same words as the examples.

For every scenario with an inline `Practice area`:

1. Copy only the contents inside the fenced code block.
2. Run `:enew<Enter>` to open an empty buffer.
3. Press `p` to paste the copied practice text.
4. Perform the scenario in that isolated buffer.
5. Run `:bwipeout!<Enter>` when finished, then return to the chapter.

When a scenario says “start at the first line,” it means the first line of this isolated practice buffer.

### Scenario 1 - Find A Specific Occurrence In A Larger Log

Find the third transition into `pending`, then move backward to the second one.

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

Steps:

1. Start at the beginning of the first log line.
2. Press `/draft -> pending<Enter>` to find the first transition into `pending`.
3. Press `n` to jump to the second transition into `pending`.
4. Press `n` again to jump to the third transition into `pending`.
5. Press `N` to move backward to the second transition.

Required moves: `/draft -> pending`, `n`, `n`, then `N`.

Expected result: cursor lands on the third transition into `pending`, then returns to the second.

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

Steps:

1. Start on the `Conclusion` line at the bottom of the note.
2. Press `?cache_key<Enter>` to search backward to the earlier assignment.
3. Press `?Investigation<Enter>` to search backward again to the heading.

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

Steps:

1. Start on the standalone `variableName` in the first line.
2. Press `*` to search forward for the same symbol.
3. Press `n` three times to visit later occurrences.
4. Press `N` to move back to the previous occurrence.

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

Steps:

1. Start at the `## Release Checklist` heading.
2. Press `/retry<Enter>` to land on the first checklist match.
3. Press `n` three times to move through later matches.
4. Press `<Esc>` or `<leader>ur` to clear the search highlight.

Required moves: `/retry`, `n`, `n`, `n`, then `<Esc>` or `<leader>ur`.

Expected result: you can search across headings, checklist items, and prose.

### Scenario 5 - Replace A Status On One Line Only

Practice area:

```text
pending pending pending # only this line changes
pending should stay on this line
pending should also stay on this line
```

Steps:

1. Start on the first line of the practice area.
2. Run `:s/pending/queued/g`.
3. Check that the command did not use `%` and did not include a visual range.

Required move: `:s/pending/queued/g` on the first line only.

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

Steps:

1. Start at the beginning of the first line.
2. Press `/summary_status<Enter>` to set the last search pattern.
3. Run `:s//report_status/` while still on the first line.
4. Leave the second line unchanged.

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

Steps:

1. Start on the first route line.
2. Press `V` to begin linewise visual selection.
3. Press `j` to include the second line.
4. Type `:s/api/service/g<Enter>`; Vim prefixes the command with the selected range.

Required moves: `V`, `j`, then `:s/api/service/g`.

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

Steps:

1. Put the cursor anywhere in the practice buffer.
2. Run `:%s#old/path/to#new/docs#g`.
3. Use `#` as the delimiter so the slashes in the path do not need escaping.

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

Steps:

1. Put the cursor anywhere in the practice buffer.
2. Run `:%s/task/story/gc`.
3. Answer `y` for `task list`.
4. Answer `y` for `task owner`.
5. Answer `n` for the `task` inside `task_runner`.
6. Answer `y` for `task status`.

Required move: `:%s/task/story/gc`, then confirm with `y`, `y`, `n`, `y`.

Expected result:

```text
story list
story owner
task_runner config
story status
```

### Scenario 10 - Search The Workbook Like A Project

Use LazyVim project grep to find every chapter that mentions diagnostics.

Command sequence:

```text
<leader>sg
diagnostic
```

Steps:

1. While this chapter file is open, run `:cd %:p:h<Enter>` to set Neovim's working directory to the repository root.
2. Press `<leader>sg`.
3. Type `diagnostic` and wait for results.
4. Verify matches appear in chapter files such as `06-lsp-diagnostics-formatting.md` and `11-full-workflow-drills.md`.

Expected result: picker shows matches across chapter files, not just the current buffer.

### Scenario 11 - The cgn Workflow

The most powerful search-and-replace method for selective changes. Search for `oldHandler`, use `cgn` to change the first match to `newHandler`, then press `.` to repeat on the next match or `n` to skip one.

Practice area:

```ts
const oldHandler = createOldHandler()
app.use("/login", oldHandler)
app.use("/logout", oldHandler)
app.use("/health", oldHandler)  // keep this one unchanged
app.use("/signup", oldHandler)
app.use("/reset", oldHandler)
app.use("/debug", oldHandler)   // keep this one unchanged
app.use("/verify", oldHandler)
```

Required moves:
1. `/oldHandler` to search for the pattern (or position cursor on `oldHandler` and press `*`).
2. `cgn` to select and change the first match — type `newHandler`, then press `<Esc>`.
3. `.` to repeat the change on the next match.
4. `.` again on the third match.
5. `n` to skip the fourth match (health — keep it).
6. `.` to change the fifth match.
7. `.` to change the sixth match.
8. `n` to skip the seventh match (debug — keep it).
9. `.` to change the eighth match.

Expected result:

```ts
const newHandler = createOldHandler()
app.use("/login", newHandler)
app.use("/logout", newHandler)
app.use("/health", oldHandler)  // keep this one unchanged
app.use("/signup", newHandler)
app.use("/reset", newHandler)
app.use("/debug", oldHandler)   // keep this one unchanged
app.use("/verify", newHandler)
```

Why this works: `cgn` combines "change" with "select next match". After the first change, `.` repeats both the selection and the replacement text. This is faster than `:%s` with confirm because you stay in normal mode and use muscle memory (`.` and `n`).

### Scenario 12 - Batch Operations With :cdo

Use `<leader>sg` to grep the real files in `drills/03-search-replace/cdo-api/`, send the results to quickfix, then run a substitute command on every quickfix entry.

Practice files:

```text
drills/03-search-replace/cdo-api/users.ts

drills/03-search-replace/cdo-api/rooms.ts

drills/03-search-replace/cdo-api/billing.ts
```

Required moves:
1. While this chapter file is open, run `:cd %:p:h<Enter>` to set the working directory to the repository root.
2. Press `<leader>sg`. In the search box, type `cdo_`, then `endpoint`, then `_v1` as one continuous search term.
3. Verify the picker shows the three files under `drills/03-search-replace/cdo-api/`.
4. Press `<Esc>` to enter picker Normal mode, then press `<C-q>` to send all three results to quickfix.
5. Run `:copen<Enter>` to verify the quickfix entries.
6. Run `:cdo s#/api/v1/#/api/v2/#g | update` to replace each matched endpoint and save the files.
7. Close the native quickfix window with `:cclose<Enter>`.
8. After checking the result, reset the drill with `:cfdo %s#/api/v2/#/api/v1/#g | update`.

If `<leader>sg` reports no matches, confirm Neovim’s working directory is the repository root with `:pwd`.

Expected result:

```text
-- file: drills/03-search-replace/cdo-api/users.ts
endpoint path becomes "/api/v2/users"

-- file: drills/03-search-replace/cdo-api/rooms.ts
endpoint path becomes "/api/v2/rooms"

-- file: drills/03-search-replace/cdo-api/billing.ts
endpoint path becomes "/api/v2/billing"
```

Why this works: `<leader>sg` finds the real files, `<C-q>` explicitly populates quickfix, and `:cdo` runs the substitute on each quickfix entry. The `| update` saves each file after the change.

### Scenario 13 - Global Commands (:g and :v)

Use `:g` to act on every matching line and `:v` to act on every non-matching line.

Practice area:

```ts
import { format } from "date-fns"
import { z } from "zod"

export function validateInput(data: unknown) {
  console.log("validateInput called", data)
  const schema = z.object({ name: z.string() })
  // TODO: add email validation
  const result = schema.safeParse(data)
  console.log("parse result:", result)
  if (!result.success) {
    // TODO: return structured errors
    console.log("validation failed")
    throw new Error("invalid input")
  }
  // old: return data
  // old: return null
  return result.data
}

export function formatDate(ts: number) {
  console.log("formatDate called", ts)
  // TODO: handle timezone
  return format(new Date(ts), "yyyy-MM-dd")
}
```

Required moves (practice each independently):

Reset to a fresh copy of the practice area before each command. These four commands produce different destructive results and are not meant to run sequentially on one copy.

1. Delete all console.log lines: `:g/console\.log/d`
2. Delete all commented-out old code: `:g/\/\/ old:/d`
3. Copy all TODO lines to end of file: `:g/TODO/t$`
4. Keep only export lines (delete everything else): `:v/export/d`

Expected result after step 1 (delete console.logs):

```ts
import { format } from "date-fns"
import { z } from "zod"

export function validateInput(data: unknown) {
  const schema = z.object({ name: z.string() })
  // TODO: add email validation
  const result = schema.safeParse(data)
  if (!result.success) {
    // TODO: return structured errors
    throw new Error("invalid input")
  }
  // old: return data
  // old: return null
  return result.data
}

export function formatDate(ts: number) {
  // TODO: handle timezone
  return format(new Date(ts), "yyyy-MM-dd")
}
```

Why this works: `:g/pattern/d` means "on every line matching pattern, delete it." `:v` is the inverse — it matches lines that do NOT contain the pattern. `:g/pattern/t$` copies (`:t`) each matching line to the last line (`$`).

### Scenario 14 - Word Search With * And #

Position the cursor on a variable name and use `*` to find all occurrences with automatic word boundaries.

Practice area:

```ts
function processItem(item: Item) {
  const itemId = item.id
  const itemName = item.name
  logItem(item)
  if (isValidItem(item)) {
    saveItem(item)
  }
  return item
}
```

Required moves:
1. Place cursor on the standalone `item` (for example, the parameter name on line 1).
2. Press `*` to search forward — the cursor jumps to the next whole-word match of `item`.
3. Press `n` to continue forward through matches.
4. Press `N` to go backward.
5. Press `#` to reverse direction (search backward from current position).

Key difference from `/item`: pressing `*` searches for `\<item\>` which matches the whole word `item` but NOT `itemId` or `itemName`. A manual `/item` would match inside those longer words too.

Expected result: only standalone `item` occurrences are highlighted, not `itemId`, `itemName`, `logItem`, `isValidItem`, or `saveItem`.

### Scenario 15 - Case-Sensitive And Insensitive Search

Use `\c` and `\C` modifiers inside search patterns to control case matching regardless of your `ignorecase`/`smartcase` settings.

Practice area:

```ts
class ErrorHandler {
  handleError(error: Error) {
    const ERROR_CODE = "ERR_VALIDATION"
    console.error("An error occurred:", error.message)
    if (error instanceof TypeError) {
      return this.handleTypeError(error)
    }
    throw new Error(`Unhandled error: ${ERROR_CODE}`)
  }
}
```

Required moves:

1. `/\cerror` — finds ALL case variants: `Error`, `error`, `ERROR`, `handleError`, `TypeError`, etc.
2. Press `n` repeatedly to see every match regardless of case.
3. Now search `/\CError` — finds only exact case `Error` (capital E, lowercase rror).
4. Press `n` — skips `error`, `ERROR`, and matches only `Error`.
5. Try `/\CERROR` — finds only the all-caps `ERROR_CODE` and `ERROR` occurrences.

How `\c` and `\C` interact with settings:
- `ignorecase` makes all searches case-insensitive by default.
- `smartcase` makes searches case-sensitive if the pattern contains uppercase.
- `\c` anywhere in a pattern forces case-insensitive, overriding both settings.
- `\C` anywhere in a pattern forces case-sensitive, overriding both settings.

Expected result: `\c` matches 10+ occurrences of error/Error/ERROR, while `\C` with exact case matches only the specific variant you typed.

## Real-World Drill

1. Open a project.
2. Use `<leader>sg` to find a function or error message.
3. Before opening a result, press `<Esc>` to enter picker Normal mode, then press `<C-q>` to send all results to quickfix.
4. Press `<leader>sq` to view the populated quickfix list.
5. Press `<Enter>` on one quickfix result to open it.
6. Use `/` to find a smaller target inside the file.
7. Use `:%s/foo/bar/gc` only in a safe scratch buffer.
8. Move through the existing quickfix entries with `[q` and `]q`.
9. Close the quickfix picker with `q` or `<Esc>`. If you opened the native quickfix window with `:copen`, close it with `:cclose<Enter>`.

## Troubleshooting / Verify With Which-Key

- If `<leader>sg` does not exist, use `<leader>sk` and search for `Grep`.
- If replace syntax is hard with paths, use another delimiter: `:%s#old/path#new/path#g`.
- If you accidentally replace too much, press `u`.
- If search highlight stays visible, press `<Esc>` or `<leader>ur`.
- If `<leader>sq` reports `No results found for qflist`, the quickfix list is empty. Return to `<leader>sg`, search, press `<Esc>` to enter picker Normal mode, then press `<C-q>` before opening `<leader>sq`.
- To close quickfix: press `q` or `<Esc>` in the `<leader>sq` picker, or run `:cclose<Enter>` for the native `:copen` window.
