# Chapter 2 - Editing Operators And Text Objects

## Goal

Think in operator plus target, then edit whole words, strings, function calls, blocks, and paragraphs without manual selection.

## Mental Model

Vim editing is composable:

```text
d + w  = delete word
c + i + " = change inside quotes
y + a + ( = yank around parentheses
```

Operators say what to do. Motions and text objects say what to do it to.

## Keymaps

Operators and edits:
- `x` - delete character under cursor
- `X` - delete character before cursor
- `r<char>` - replace one character in place, stay in Normal mode
- `d{motion}` - delete by motion
- `c{motion}` - change by motion (deletes then enters Insert mode)
- `y{motion}` - yank by motion
- `D` - delete from cursor to end of line
- `C` - change from cursor to end of line
- `dd` - delete current line
- `cc` - change current line
- `yy` - yank current line
- `p` - paste after cursor / below current line
- `P` - paste before cursor / above current line
- `u` - undo
- `<C-r>` - redo
- `.` - repeat last change

Registers:
- `"` - register prefix (type before `y`, `d`, `c`, `p`)
- `"ayy` - yank current line into register `a`
- `"ap` - paste from register `a`
- `"_d{motion}` - delete into black hole register (does not overwrite yank)
- `"+y{motion}` - yank to system clipboard
- `:registers` - inspect all registers

Text objects (combine with operators: `d`, `c`, `y`, `v`):
- `iw` - inner word (no surrounding whitespace)
- `aw` - a word including trailing whitespace
- `i"` - inside double quotes
- `a"` - around double quotes including the quotes
- `i'` - inside single quotes
- `a'` - around single quotes including the quotes
- `` i` `` - inside backticks
- `` a` `` - around backticks including the backticks
- `i(` / `a(` - inside / around parentheses
- `i[` / `a[` - inside / around brackets
- `i{` / `a{` - inside / around braces
- `ip` / `ap` - inner / around paragraph

Visual mode:
- `v` - characterwise visual
- `V` - linewise visual
- `<C-v>` - blockwise visual
- `>` - indent selection (stay in Visual with `gv` to repeat)
- `<` - unindent selection
- `gv` - reselect previous visual selection

mini-surround (adds/changes/removes surrounding pairs):
- `gsa{motion}{char}` - add surround around motion (e.g. `gsaiw"` surrounds word with `"`)
- `gsd{char}` - delete surround (e.g. `gsd"` removes surrounding `"`)
- `gsr{old}{new}` - replace surround (e.g. `gsr"'` changes `"` to `'`)
- `gsf{char}` - find next surrounding character to the right
- `gsF{char}` - find next surrounding character to the left
- `gsh{char}` - highlight surrounding character

yanky (yank ring — navigate paste history after `p` or `P`):
- `p` - paste (same as default, but yanky tracks history)
- `P` - paste before (same as default)
- `<C-p>` - after pasting, cycle to previous yank in ring
- `<C-n>` - after pasting, cycle to next yank in ring
- `<leader>p` - open yank history picker

## Common Workflows

Change a word:

```text
Put cursor anywhere in the word
ciw
Type replacement
<Esc>
```

Change a string:

```text
Put cursor anywhere inside the quotes
ci"
Type replacement
<Esc>
```

Surround a word with quotes:

```text
Put cursor anywhere in the word
gsaiw"
```

Remove surrounding parentheses:

```text
Put cursor anywhere inside ( )
gsd(
```

Change surrounding quotes from double to single:

```text
Put cursor inside "text"
gsr"'
```

Preserve your yank while deleting:

```text
Yank the important text first with yy or y{motion}
Then use "_d{motion} for disposable deletes
```

Paste previous yank if you accidentally overwrote:

```text
p
<C-p>   <- cycles back through yank ring
```

Repeat a structured edit:

```text
Make one edit
Move to the next similar target
.
```

## Practice Scenarios

### Scenario 1 - Fix Several Typos Without Entering Insert Mode

Each line has one wrong character. Fix each one without entering Insert mode.

Practice area:

```text
const status = "pendong"
const mode = "archove"
const level = "warnong"
```

Step-by-step:
1. Put cursor on `o` in `pendong` — press `f` then `o` to jump: `fo`
2. Press `r` then `i` to replace: `ri`
3. Move to next line: `j`
4. Press `fo` to jump to `o` in `archove`, then `ri`
5. Move to next line: `j`
6. Press `fo` to jump to `o` in `warnong`, then `ri`

Expected result:

```ts
const status = "pending"
const mode = "archive"
const level = "warning"
```

### Scenario 2 - Change Identifier Segments In Context

Only the local names should change from `status` to `state`. Do not change the payload fields.

Practice area:

```ts
const request_status = payload.request_status
const previous_status = payload.previous_status
const final_status = payload.final_status
```

Step-by-step:
1. Put cursor on `status` in `request_status` (left side): `fst` or `/request_status<CR>`
2. Press `cw` to change forward word, type `state`, press `<Esc>`
3. Move to next line `j`, find `status` on left side, repeat with `.`
4. Repeat for third line

Expected result:

```ts
const request_state = payload.request_status
const previous_state = payload.previous_status
const final_state = payload.final_status
```

### Scenario 3 - Remove Debug Entries From A Mixed List

Remove only debug-related entries and leave valid punctuation intact.

Practice area:

```ts
const enabledFeatures = ["sync", "debug_mode", "history"]
const enabledJobs = ["fetch", "debug_fetch", "publish", "debug_publish"]
```

Step-by-step:
1. Put cursor inside `"debug_mode"`: `/debug_mode<CR>`
2. Press `di"` to delete inside quotes, then `X` to remove the comma before it, then `x` if a comma follows
3. Or select including comma: press `v`, select `, "debug_mode"`, press `d`
4. For the second line, find `"debug_fetch"`: `/debug_fetch<CR>`, select `, "debug_fetch"` with `v` then `f"`, press `d`
5. Repeat for `"debug_publish"` with `, "debug_publish"`: `v`, `f"`, `d`

Expected result:

```ts
const enabledFeatures = ["sync", "history"]
const enabledJobs = ["fetch", "publish"]
```

### Scenario 4 - Replace String Payloads In Different Formats

Replace only the human-readable message. Keep surrounding quote style and metadata intact.

Practice area:

```ts
notifyUser("room created", { roomId: 42, status: "pending" })
logger.info('room created', { roomId: 42, source: 'cron' })
const markdown = `room created`
```

Step-by-step:
1. Put cursor inside `"room created"` on line 1: `/room created<CR>`
2. Press `ci"`, type `sync queued`, press `<Esc>`
3. Move to line 2, put cursor inside `'room created'`: `j/room<CR>`
4. Press `ci'`, type `sync queued`, press `<Esc>`
5. Move to line 3, put cursor inside `` `room created` ``: `j`
6. Press `` ci` ``, type `sync queued`, press `<Esc>`

Expected result:

```ts
notifyUser("sync queued", { roomId: 42, status: "pending" })
logger.info('sync queued', { roomId: 42, source: 'cron' })
const markdown = `sync queued`
```

### Scenario 5 - Replace Function Arguments As One Unit

The functions should now receive prepared objects instead of inline arguments.

Practice area:

```ts
publishVariableUpdate(roomId, variableName, resolvedValue)
queueVariableSync(roomId, variableName, userId, retryCount)
trackAuditEvent("variable_sync", roomId, userId)
```

Step-by-step:
1. Put cursor inside the first call's arguments: `/publishVariable<CR>`, then `f(`
2. Press `ci(`, type `payload`, press `<Esc>`
3. Move to next line: `j`
4. Press `f(`, then `ci(`, type `syncJob`, press `<Esc>`
5. Move to next line: `j`
6. Press `f(`, then `ci(`, type `auditEvent`, press `<Esc>`

Expected result:

```ts
publishVariableUpdate(payload)
queueVariableSync(syncJob)
trackAuditEvent(auditEvent)
```

### Scenario 6 - Edit A Markdown Checklist

Complete the first item, remove the obsolete item, and change the final item.

Practice area:

```md
- [ ] Verify mappings with which-key
- [ ] Remove this obsolete reminder
- [ ] Practice only code examples
```

Step-by-step:
1. Put cursor on the space inside `[ ]` on line 1: `f<space>` after `[`
2. Press `r` then `x` to mark complete: `rx`
3. Move to line 2: `j`
4. Delete the entire line: `dd`
5. Now on line 3, put cursor on `only`: `f o` or `/only<CR>`
6. Press `cw`, type `mixed`, press `<Esc>`

Expected result:

```md
- [x] Verify mappings with which-key
- [ ] Practice mixed examples
```

### Scenario 7 - Preserve A Yank While Deleting Junk

Copy the clean config line, remove temporary lines, paste the clean line below the target.

Practice area:

```env
OBJECT_SCHEMA_SYNC=true
temporary_debug_flag=true
TEMP_LOG_LEVEL=trace
COPY_TARGET_HERE=
```

Step-by-step:
1. Put cursor on `OBJECT_SCHEMA_SYNC=true`: `gg`
2. Yank the line: `yy`
3. Move to `temporary_debug_flag`: `j`
4. Delete into black hole (does not replace yank): `"_dd`
5. Delete `TEMP_LOG_LEVEL`: `"_dd`
6. Now on `COPY_TARGET_HERE=`, paste below: `p`

Expected result:

```env
OBJECT_SCHEMA_SYNC=true
COPY_TARGET_HERE=
OBJECT_SCHEMA_SYNC=true
```

### Scenario 8 - Align Repeated Lines With Visual Block Mode

Add `// ` prefix to all four lines at once using one block insert.

Practice area:

```text
await syncVariables()
await refreshCache()
await publishEvent()
manual check before deploy
```

Step-by-step:
1. Put cursor on column 1 of `await syncVariables()`: `gg0`
2. Enter blockwise visual: `<C-v>`
3. Select down 3 lines to cover all four: `3j`
4. Go to Insert mode at the block start: `I`
5. Type `// ` (slash slash space)
6. Press `<Esc>` — the prefix appears on all lines

Expected result:

```text
// await syncVariables()
// await refreshCache()
// await publishEvent()
// manual check before deploy
```

### Scenario 9 - Repeat A Structured Change

Every quoted status changes from `draft` to `queued`. Do the first edit, then repeat.

Practice area:

```ts
setStatus("draft")
setStatus("draft")
setStatus("draft")
assertStatus("draft")
```

Step-by-step:
1. Put cursor inside the first `"draft"`: `f"`
2. Press `ci"`, type `queued`, press `<Esc>`
3. Move to next `"draft"`: `j` then `f"`
4. Press `.` to repeat
5. Repeat `j`, `f"`, `.` for remaining lines

Expected result:

```ts
setStatus("queued")
setStatus("queued")
setStatus("queued")
assertStatus("queued")
```

### Scenario 10 - Surround And Unwrap With mini-surround

Practice adding and removing surrounds without manual selection.

Practice area:

```ts
const label = hello
const wrapped = (already wrapped text)
const quoted = 'change these to double'
```

Step-by-step:
1. Put cursor on `hello`: `fh`
2. Surround the word with double quotes: `gsaiw"`
3. Move to line 2, put cursor inside `(already wrapped text)`: `j`
4. Remove the parentheses: `gsd(`
5. Move to line 3, put cursor inside `'change these to double'`: `j`
6. Change single quotes to double: `gsr'"`

Expected result:

```ts
const label = "hello"
const wrapped = already wrapped text
const quoted = "change these to double"
```

### Scenario 11 - Navigate Yank History With yanky

Practice recovering a previous yank after it was overwritten.

Step-by-step:
1. Yank line 1: `yy`
2. Move to line 2: `j`
3. Yank line 2 (overwrites the ring slot): `yy`
4. Move to a blank line below
5. Paste most recent yank: `p`
6. Cycle back to the previous yank (line 1): `<C-p>`
7. Open the full yank history picker: `<leader>p`

Expected result: you can recover any previously yanked text, not just the last one.

## Real-World Drill

Open a code file and do this sequence without looking anything up:

1. Change one string with `ci"`.
2. Change one function argument with `ci(`.
3. Surround a bare word with backticks using `gsaiw`` ` `` `.
4. Remove surrounding parentheses from an expression with `gsd(`.
5. Yank one line into register `a` with `"ayy`.
6. Delete a temporary word into the black hole register with `"_dw`.
7. Paste register `a` elsewhere with `"ap`.
8. Make an edit, move to a similar target, press `.`.
9. Undo with `u`, then redo with `<C-r>`.
10. Open yank history with `<leader>p` and inspect what is there.

## Troubleshooting / Verify With Which-Key

- `:registers` shows what was yanked or deleted.
- If system clipboard does not work, check `:checkhealth clipboard`.
- If a text object feels surprising, check whether the cursor is inside or outside the object.
- If `gsa`/`gsd`/`gsr` do nothing, verify `mini-surround` extra is enabled with `:LazyExtras`.
- If `<C-p>`/`<C-n>` after paste does nothing, verify `yanky` extra is enabled with `:LazyExtras`.
- Search `<leader>sk` for `surround` or `yank` to verify mappings.
