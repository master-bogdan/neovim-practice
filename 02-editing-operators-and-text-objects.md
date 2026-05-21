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

### When To Use Macros vs Dot vs Substitute

- `.` (dot repeat): same single edit repeated at different locations
- `q{reg}`: multi-step edit repeated identically across many targets
- `:s` / `:%s`: pattern-based text transformation across lines or the whole file
- `cgn`: change next search match (hybrid approach — make one edit, then `.` repeats on the next match)

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

Macros:
- `q{a-z}` - record macro into register (press `q` again to stop recording)
- `@{a-z}` - play macro from register
- `@@` - repeat last macro
- `{count}@{a-z}` - play macro N times (e.g. `5@a` plays register `a` five times)

Registers:
- `"` - register prefix (type before `y`, `d`, `c`, `p`)
- `"` + register + operator - use specific register (e.g. `"byiw` yanks word into register `b`)
- `"ayy` - yank current line into register `a`
- `"ap` - paste from register `a`
- `"_d{motion}` - delete into black hole register (does not overwrite yank)
- `"+y{motion}` - yank to system clipboard
- `:registers` - view all registers (numbered 0-9, named a-z, special +, _, %)

Delete/change to search pattern:
- `d/{pattern}` - delete from cursor to the next match of {pattern} (exclusive)
- `c/{pattern}` - change from cursor to the next match of {pattern} (exclusive, enters Insert mode)

Case manipulation:
- `~` - toggle case of character under cursor and advance
- `g~{motion}` - toggle case over motion (e.g. `g~w` toggles case of word)
- `gU{motion}` - uppercase over motion (e.g. `gUiw` uppercases word)
- `gu{motion}` - lowercase over motion (e.g. `guap` lowercases paragraph)

Insert mode shortcuts:
- `<C-u>` - delete from cursor to start of line (insert mode)
- `<C-w>` - delete word backward (insert mode)
- `<C-o>` - execute one Normal mode command then return to Insert mode

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
1. Put cursor on `status` in `request_status` (left side): `fst` or `/request_status<Enter>`
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
1. Put cursor inside `"debug_mode"`: `/debug_mode<Enter>`
2. Press `di"` to delete inside quotes, then `X` to remove the comma before it, then `x` if a comma follows
3. Or select including comma: press `v`, select `, "debug_mode"`, press `d`
4. For the second line, find `"debug_fetch"`: `/debug_fetch<Enter>`, select `, "debug_fetch"` with `v` then `f"`, press `d`
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
1. Put cursor inside `"room created"` on line 1: `/room created<Enter>`
2. Press `ci"`, type `sync queued`, press `<Esc>`
3. Move to line 2, put cursor inside `'room created'`: `j/room<Enter>`
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
1. Put cursor inside the first call's arguments: `/publishVariable<Enter>`, then `f(`
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
5. Now on line 3, put cursor on `only`: `f o` or `/only<Enter>`
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

### Scenario 12 - Recording And Playing Macros

Record a macro that transforms a plain variable declaration into an exported typed const, then replay it on multiple lines.

Practice area:

```ts
let name = "alice"
let name = "bob"
let name = "carol"
let name = "dave"
let name = "eve"
let name = "frank"
```

Step-by-step:
1. Put cursor on line 1: `gg`
2. Start recording into register `a`: `qa`
3. Go to beginning of line: `0`
4. Change `let` to `export const`: `cw` then type `export const`, press `<Esc>`
5. Move to the variable name: `w`
6. Uppercase the word: `gUiw`
7. Move to end of `=` area, go to the space before the value: `f=`
8. Insert type annotation before `=`: `i: string `, press `<Esc>`
9. Move down one line: `j`
10. Stop recording: `q`
11. Replay the macro 5 times for the remaining lines: `5@a`

Expected result:

```ts
export const NAME: string = "alice"
export const NAME: string = "bob"
export const NAME: string = "carol"
export const NAME: string = "dave"
export const NAME: string = "eve"
export const NAME: string = "frank"
```

### Scenario 13 - Registers Deep Dive

Understand how numbered registers, named registers, and special registers work to prevent losing yanked text.

Practice area:

```ts
const important = "keep this value"
const trash = "delete me"
const target = ""
```

Step-by-step:
1. Put cursor on `"keep this value"`: `/keep<Enter>`
2. Yank inside quotes into named register `a`: `"ayi"`
3. Move to line 2: `j`
4. Delete the entire line (this goes into `"1` numbered register): `dd`
5. Check registers to see the state: `:registers` then press `q` to close
   - Register `a` still holds `keep this value`
   - Register `1` holds the deleted line
   - Register `0` holds the last yank (also `keep this value`)
6. Move cursor inside the empty quotes on `target`: `f"`then `l`
7. Paste from named register `a`: `"ap`

Expected result:

```ts
const important = "keep this value"
const target = "keep this value"
```

Why this matters: deleting text normally overwrites the unnamed register (`""`), which makes pasting a previous yank impossible without named registers or yanky.nvim. Named registers (`"a`-`"z`) survive any number of intermediate deletes. The `"0` register always holds the last yank (not delete), which is another way to solve this.

### Scenario 14 - Delete And Change To Search Pattern

Use `d/{pattern}` and `c/{pattern}` to delete or change up to a known marker in the buffer.

Practice area:

```ts
function processData() {
  const garbage = "remove everything from here"
  const moreGarbage = null
  function innerHelper() {
    return true
  }
  return finalResult
}
```

Step-by-step:
1. Put cursor on the `c` of `const garbage`: `/const garbage<Enter>`
2. Delete from cursor up to (but not including) `function innerHelper`: `d/function inner<Enter>`
   - This removes `const garbage...` and `const moreGarbage...` lines and any whitespace between
3. Now try `c/{pattern}`: undo with `u`, put cursor on `"remove`: `f"`
4. Change from `"remove` up to the next closing paren: `c/)<Enter>`
5. Type `"cleaned"`, press `<Esc>`

Expected result (after step 2):

```ts
function processData() {
  function innerHelper() {
    return true
  }
  return finalResult
}
```

Expected result (after steps 4-5, from original):

```ts
function processData() {
  const garbage = "cleaned")
  const moreGarbage = null
  function innerHelper() {
    return true
  }
  return finalResult
}
```

### Scenario 15 - Case Manipulation

Use case-toggle operators to fix inconsistent casing in a file.

Practice area:

```ts
const userName = "alice"
const TEMP_value = 42
const MyComponent = "button"
const ALLUPPER = true
const alllower = false
```

Step-by-step:
1. Put cursor on `userName`: `/userName<Enter>`
2. Uppercase the entire word: `gUiw` (result: `USERNAME`)
3. Undo: `u`
4. Toggle the case of just the `u`: move cursor to `u`, press `~` (result: `UserName`)
5. Move to `TEMP_value` on line 2: `j0w`
6. Lowercase the whole word: `guiw` (result: `temp_value`)
7. Undo: `u`
8. Uppercase just the second part: put cursor on `v` in `value`, press `gUw` (result: `TEMP_VALUE`)
9. Move to `ALLUPPER` on line 4: `/ALLUPPER<Enter>`
10. Lowercase it: `guiw` (result: `allupper`)
11. Move to `alllower` on line 5: `j0w`
12. Uppercase it: `gUiw` (result: `ALLLOWER`)
13. Toggle entire word case: `g~iw` (result: `alllower` again since all caps become all lower)

Key combinations to remember:
- `gUiw` - uppercase a word
- `guiw` - lowercase a word
- `g~iw` - toggle case of a word
- `gUap` - uppercase a paragraph
- `guap` - lowercase a paragraph
- `~` - toggle single character

### Scenario 16 - Insert Mode Shortcuts

Practice efficient text editing without leaving Insert mode unnecessarily.

Practice area:

```ts
const wrongVariable = "this whole line needs retyping"
const anotherMistake = "just the last word is wrogn"
```

Step-by-step:
1. Put cursor on line 1 and enter insert mode at end: `A`
2. Delete back to line start (clear the value you just typed): `<C-u>`
   - The line content before cursor is deleted; you remain in Insert mode
3. Type the replacement: `const correctVariable = "fixed"`, press `<Esc>`
4. Move to line 2, enter insert mode at the end: `jA`
5. Delete just the last word (`wrogn`): `<C-w>`
6. Type the corrected word: `wrong`, press `<Esc>`
7. Now practice `<C-o>` — enter insert mode: `A`
8. Without leaving insert mode, jump to beginning of line: `<C-o>0`
   - You executed one Normal mode command (`0`) and returned to Insert mode
9. Press `<Esc>` when done

When to stay in Insert mode:
- Fixing a typo in the word you just typed: `<C-w>` then retype
- Clearing a line to start over: `<C-u>`
- Need one quick Normal command (like saving, scrolling, or jumping): `<C-o>{cmd}`
- Faster than: `<Esc>`, command, `i` (3 keystrokes vs 2)

Expected result:

```ts
const correctVariable = "fixed"
const anotherMistake = "just the last word is wrong"
```

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
11. Record a macro that adds a prefix to a line, replay it with `5@a`.
12. Delete to a search pattern with `d/pattern`.
13. Uppercase a word with `gUiw`, then lowercase it back with `guiw`.
14. In Insert mode, delete a word with `<C-w>` and use `<C-o>` for one Normal command.

## Troubleshooting / Verify With Which-Key

- `:registers` shows what was yanked or deleted.
- If system clipboard does not work, check `:checkhealth clipboard`.
- If a text object feels surprising, check whether the cursor is inside or outside the object.
- If `gsa`/`gsd`/`gsr` do nothing, verify `mini-surround` extra is enabled with `:LazyExtras`.
- If `<C-p>`/`<C-n>` after paste does nothing, verify `yanky` extra is enabled with `:LazyExtras`.
- Search `<leader>sk` for `surround` or `yank` to verify mappings.
