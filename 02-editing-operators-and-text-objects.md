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
- `r<char>` - replace one character
- `d{motion}` - delete by motion
- `c{motion}` - change by motion
- `y{motion}` - yank by motion
- `D` - delete to end of line
- `C` - change to end of line
- `dd` - delete current line
- `cc` - change current line
- `yy` - yank current line
- `p` - paste after or below
- `P` - paste before or above
- `u` - undo
- `<C-r>` - redo
- `.` - repeat last change

Registers:
- `"` - register prefix
- `"ayy` - yank current line into register `a`
- `"ap` - paste from register `a`
- `"_d{motion}` - delete into black hole register
- `"+y` - yank to system clipboard when clipboard integration is available
- `:registers` - inspect registers

Text objects:
- `iw` - inner word
- `aw` - a word including spacing
- `i"` - inside double quotes
- `a"` - around double quotes
- `i'` - inside single quotes
- `a'` - around single quotes
- `i(` / `a(` - inside / around parentheses
- `i[` / `a[` - inside / around brackets
- `i{` / `a{` - inside / around braces
- `ip` / `ap` - inner / around paragraph

Visual mode:
- `v` - characterwise visual
- `V` - linewise visual
- `<C-v>` - blockwise visual
- `>` - indent selection
- `<` - unindent selection
- `gv` - reselect previous visual selection

## Common Workflows

Change a word:

```text
Put cursor anywhere in the word, press ciw, type replacement, press Esc.
```

Change a string:

```text
Put cursor inside quotes, press ci", type replacement, press Esc.
```

Preserve your yank while deleting:

```text
Yank the important text, then use "_d... for disposable deletes.
```

Repeat a structured edit:

```text
Make one edit, move to the next similar target, press .
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

Required move: put the cursor on the wrong character, then use `r<char>`.

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

Required move: land on `status`, then use `cw` or `ciw`.

Expected result:

```ts
const request_state = payload.request_status
const previous_state = payload.previous_status
const final_state = payload.final_status
```

### Scenario 3 - Remove Debug Entries From A Mixed List

Remove only debug-related entries and leave valid punctuation.

Practice area:

```ts
const enabledFeatures = ["sync", "debug_mode", "history"]
const enabledJobs = ["fetch", "debug_fetch", "publish", "debug_publish"]
```

Required move: put the cursor inside `debug_mode`, then use a text object and one cleanup edit if needed.

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

Required move: use `ci"`, `ci'`, and the closest useful text object for backticks.

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

Required move: put the cursor inside the call arguments, then use `ci(`.

Expected result:

```ts
publishVariableUpdate(payload)
queueVariableSync(syncJob)
trackAuditEvent(auditEvent)
```

### Scenario 6 - Edit A Markdown Checklist

Complete the first item, remove the obsolete item, and change the final item from code-only practice to mixed practice.

Practice area:

```md
- [ ] Verify mappings with which-key
- [ ] Remove this obsolete reminder
- [ ] Practice only code examples
```

Required moves: use `r`, `dd`, and a word or text-object change such as `cw` or `ciw`.

Expected result:

```md
- [x] Verify mappings with which-key
- [ ] Practice mixed examples
```

### Scenario 7 - Preserve A Yank While Deleting Junk

You need to copy the clean config line, remove temporary lines, and paste the clean line below the target.

Practice area:

```env
OBJECT_SCHEMA_SYNC=true
temporary_debug_flag=true
TEMP_LOG_LEVEL=trace
COPY_TARGET_HERE=
```

Required moves: `yy`, `"_dd`, `"_dd`, then `p`.

Expected result:

```env
OBJECT_SCHEMA_SYNC=true
COPY_TARGET_HERE=
OBJECT_SCHEMA_SYNC=true
```

### Scenario 8 - Align Repeated Lines With Visual Block Mode

Three code lines and one prose line need the same comment prefix. Add it with one block edit instead of separate inserts.

Practice area:

```text
await syncVariables()
await refreshCache()
await publishEvent()
manual check before deploy
```

Required moves: `<C-v>`, select the first column of all four lines, `I`, type `// `, then `<Esc>`.

Expected result:

```text
// await syncVariables()
// await refreshCache()
// await publishEvent()
// manual check before deploy
```

### Scenario 9 - Repeat A Structured Change

Every quoted status changed from `draft` to `queued`. Do the first edit completely, then repeat the change for the remaining lines.

Practice area:

```ts
setStatus("draft")
setStatus("draft")
setStatus("draft")
assertStatus("draft")
```

Required moves: use `ci"` once, then move to the next strings and use `.`.

Expected result:

```ts
setStatus("queued")
setStatus("queued")
setStatus("queued")
assertStatus("queued")
```

### Scenario 10 - Use Text Objects In Prose

Clean up this paragraph without selecting with the mouse.

Practice area:

```text
The editor should feel "slow and careful" at first. Practice becomes deliberate (not frantic) when each edit has a clear target.
```

Required moves: change inside quotes with `ci"`, change `deliberate` with `ciw`, and remove the parenthetical note with `da(`.

Expected result:

```text
The editor should feel "precise" at first. Practice becomes automatic when each edit has a clear target.
```

## Real-World Drill

Open a code file and do this:

1. Change one string with `ci"`.
2. Change one function argument with `ci(` or a smaller object.
3. Yank one line into register `a` with `"ayy`.
4. Delete a temporary word using `"_dw`.
5. Paste register `a` elsewhere with `"ap`.
6. Undo with `u`, then redo with `<C-r>`.

## Troubleshooting / Verify With Which-Key

- `:registers` shows what was yanked or deleted.
- If system clipboard does not work, check `:checkhealth clipboard`.
- If a text object feels surprising, inspect whether the cursor is inside or outside the object.
- Use `<leader>s"` in stock LazyVim to open a register picker when available.
