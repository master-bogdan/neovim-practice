# Chapter 13 - Advanced Editing Patterns

## Goal

Master block visual mode, batch editing across files, marks, folds, and plugin-driven workflows (trouble.nvim, edgy.nvim, mini.map, nvim-bqf) to handle complex multi-file editing tasks efficiently.

## Mental Model

These patterns share a theme: operating on many things at once or navigating a large codebase without losing context.

```text
Block visual   = same edit on many lines simultaneously
Marks          = personal bookmarks across files
Folds          = hide what you do not need right now
Batch editing  = one command applied to many files
Trouble/Edgy   = structured views of diagnostics and panels
Mini.map       = bird's-eye view of the current buffer
```

### When To Use Each Pattern — Decision Framework

| Situation | Best tool | Why |
|-----------|-----------|-----|
| Add/remove the same prefix or suffix on adjacent lines | Block visual `<C-v>` | One insert affects all selected lines |
| Jump between diagnostics across the project | Trouble `<leader>xX` | Filterable, previewable list |
| Rename a constant across 10+ files | Quickfix + `:cdo` | Applies a substitution to every match |
| Keep three key locations reachable instantly | Marks `mA`, `mB`, `mC` | Global marks survive file switches |
| Read a 500-line file without scrolling through irrelevant code | Folds `zM` then `zo` | Hide everything except the focus area |
| Understand file structure at a glance | Mini.map `<leader>um` | Shows diagnostics and search hits visually |
| Manage sidebar panels during a workflow | Edgy `<leader>ue` | Consistent panel layout without manual splits |

## Keymaps

Block visual mode:
- `<C-v>` - enter block visual mode
- `I` - insert at the left edge of the block on every selected line
- `A` - append at the right edge of the block on every selected line
- `d` / `x` - delete the selected block (column delete)
- `r<char>` - replace every character in the block with `<char>`
- `c` - change the block (delete and enter insert mode, applies to all lines on `<Esc>`)
- `$` - extend block selection to end of each line (ragged right edge)
- `gv` - reselect the previous block selection

Trouble.nvim:
- `<leader>xx` - document diagnostics (current file)
- `<leader>xX` - workspace diagnostics (all files)
- `<leader>xL` - location list
- `<leader>xQ` - quickfix list in trouble
- `<leader>cs` - symbols outline (via trouble)
- `]q` / `[q` - next/previous quickfix item
- `]d` / `[d` - next/previous diagnostic

Quickfix and batch operations:
- `:copen` - open quickfix window
- `:cclose` - close quickfix window
- `:cnext` / `:cprev` - next/prev quickfix entry
- `:cdo {cmd}` - run command on each quickfix entry
- `:cfdo {cmd}` - run command on each file in quickfix (once per file)
- `:args {pattern}` - populate the arglist
- `:argdo {cmd}` - run command on each file in arglist
- `:wall` - write all modified buffers

nvim-bqf (better quickfix):
- `o` - open item and close quickfix
- `<CR>` - open item
- `p` - toggle preview window for current item
- `zf` - fuzzy filter quickfix entries
- `zn` - create new quickfix list
- `<Tab>` - toggle sign for multi-select

Edgy.nvim:
- `<leader>ue` - toggle edgy window management
- Panels are configured per-position (left, bottom, right)
- Edgy auto-manages: neo-tree, trouble, outline, terminal, help

Mini.map:
- `<leader>um` - toggle minimap
- Minimap shows: cursor position, viewport area, diagnostics, search highlights
- Click in minimap to jump (if mouse enabled)

Marks:
- `m{a-z}` - set local mark (buffer-scoped)
- `m{A-Z}` - set global mark (file + position, survives buffer switches)
- `'{mark}` - jump to the line of mark
- `` `{mark} `` - jump to exact position of mark
- `:marks` - list all marks
- `:delmarks {mark}` - delete a mark
- `'{` / `'}` - jump to start/end of last changed text
- `` `. `` - jump to position of last edit
- `''` - jump to position before last jump

Folds:
- `za` - toggle fold under cursor
- `zo` - open one fold under cursor
- `zc` - close one fold under cursor
- `zO` - open all folds under cursor recursively
- `zC` - close all folds under cursor recursively
- `zR` - open all folds in the file
- `zM` - close all folds in the file
- `zj` - move to next fold
- `zk` - move to previous fold
- `[z` - go to start of current open fold
- `]z` - go to end of current open fold

## Common Workflows

Block insert a prefix:

```text
<C-v> to start block visual
Select lines with j (or {count}j)
I to insert
Type prefix text
<Esc> — all lines get the prefix
```

Block append a suffix:

```text
<C-v> to start block visual
Select lines with j
$ to extend to end of each line
A to append
Type suffix text
<Esc> — all lines get the suffix
```

Grep to quickfix to batch replace:

```text
<leader>sg (telescope grep) → search for pattern
<C-q> to send all results to quickfix
:cdo s/old/new/g | update
```

Set and use global marks for multi-file navigation:

```text
mA — mark current position as global A
Navigate to another file
mB — mark that position as global B
'A — jump back to file A at mark
'B — jump back to file B at mark
```

## Practice Scenarios

### Scenario 1 - Add `export` To Multiple Function Declarations

Add the `export` keyword before each function using block visual insert.

Practice area:

```ts
function createUser(name: string): User {
function deleteUser(id: string): void {
function updateUser(id: string, data: Partial<User>): User {
function findUser(query: UserQuery): User | null {
function listUsers(filter: Filter): User[] {
function countUsers(): number {
function validateUser(data: unknown): boolean {
function serializeUser(user: User): string {
```

Step-by-step:
1. Place cursor on column 1 of the first `function` line
2. Enter block visual: `<C-v>`
3. Select down 7 lines: `7j`
4. Insert at left edge: `I`
5. Type `export ` (with trailing space)
6. Press `<Esc>`

Expected result:

```ts
export function createUser(name: string): User {
export function deleteUser(id: string): void {
export function updateUser(id: string, data: Partial<User>): User {
export function findUser(query: UserQuery): User | null {
export function listUsers(filter: Filter): User[] {
export function countUsers(): number {
export function validateUser(data: unknown): boolean {
export function serializeUser(user: User): string {
```

### Scenario 2 - Add Trailing Commas To List Items

Each item in a Go slice literal needs a trailing comma.

Practice area:

```go
var regions = []string{
	"us-east-1"
	"us-west-2"
	"eu-west-1"
	"eu-central-1"
	"ap-southeast-1"
	"ap-northeast-1"
}
```

Step-by-step:
1. Place cursor on the `"us-east-1"` line
2. Enter block visual: `<C-v>`
3. Select down 5 lines: `5j`
4. Move to end of each line: `$`
5. Append after: `A`
6. Type `,`
7. Press `<Esc>`

Expected result:

```go
var regions = []string{
	"us-east-1",
	"us-west-2",
	"eu-west-1",
	"eu-central-1",
	"ap-southeast-1",
	"ap-northeast-1",
}
```

### Scenario 3 - Column Delete To Remove Line Numbers

Remove pasted line numbers from a block of code.

Practice area:

```text
01: func main() {
02: 	fmt.Println("hello")
03: 	fmt.Println("world")
04: 	os.Exit(0)
05: }
```

Step-by-step:
1. Place cursor on column 1 of the first line (`0`)
2. Enter block visual: `<C-v>`
3. Select down 4 lines: `4j`
4. Select 4 characters right to cover `01: `: `3l`
5. Delete: `d`

Expected result:

```text
func main() {
	fmt.Println("hello")
	fmt.Println("world")
	os.Exit(0)
}
```

### Scenario 4 - Block Replace To Align Operators

Replace misaligned assignment characters with aligned ones.

Practice area:

```python
name = "alice"
age = 30
email = "alice@example.com"
role = "admin"
active = True
```

Step-by-step:
1. Use block visual to select the `=` column across all 5 lines:
   - Place cursor on the `=` in the first line: `f=`
   - Enter block visual: `<C-v>`
   - Select down 4 lines: `4j`
2. All `=` characters are selected. This confirms alignment (if any line's `=` is in a different column, the selection will look offset — indicating misalignment to fix)
3. To add padding before `=`, use `I` and type a space if needed

### Scenario 5 - Trouble.nvim Diagnostic Workflow

Navigate and fix diagnostics across a TypeScript project.

Practice area (imagine these errors exist in your project):

```text
src/auth.ts:12  error  Type 'string' is not assignable to type 'number'
src/auth.ts:45  warn   'token' is declared but never used
src/cache.ts:8  error  Property 'ttl' does not exist on type 'Config'
src/queue.ts:23 error  Cannot find name 'Priority'
```

Step-by-step:
1. Open workspace diagnostics: `<leader>xX`
   - Trouble opens in the bottom panel (managed by edgy)
   - Diagnostics are grouped by file and severity
2. Navigate within trouble: `j`/`k` to move, `<CR>` to jump to location
3. Filter to errors only: type `/error` within trouble to narrow down
4. Jump to first error: `<CR>` on the item
5. Fix the issue in the source file
6. Return to trouble: `<C-o>` or `<leader>xX`
7. Move to next diagnostic: `]d` (works without trouble open too)
8. Close trouble when done: `q` inside the trouble window

When to use trouble vs raw quickfix:
- Trouble: diagnostics, LSP references, filterable, better UI
- Raw quickfix (`:copen`): grep results, batch `:cdo` operations, scripted workflows
- nvim-bqf: use `p` in quickfix to preview without jumping, `zf` to fuzzy-filter entries

### Scenario 6 - Edgy.nvim Panel Management

Set up an efficient layout for a code review session.

Step-by-step:
1. Open file explorer on the left: `<leader>e` (neo-tree)
   - Edgy pins it to the left sidebar automatically
2. Open symbols outline: `<leader>cs`
   - Edgy places it in the right sidebar
3. Open trouble diagnostics: `<leader>xX`
   - Edgy places it in the bottom panel
4. Toggle all edgy panels off: `<leader>ue`
   - All sidebars and bottom panels hide, giving you full-screen editor
5. Toggle back: `<leader>ue`
   - All panels restore to their configured positions
6. Focus between panels: `<C-h>`, `<C-l>`, `<C-j>`, `<C-k>` (standard window navigation)

Layout presets (mental model):
- Coding: neo-tree left + outline right, no bottom panel
- Reviewing: neo-tree left + trouble bottom (diagnostics visible while reading)
- Debugging: terminal bottom + trouble bottom (stacked via edgy)
- Focus: `<leader>ue` to hide everything, then `<leader>uz` (zen mode) for distraction-free

### Scenario 7 - Mini.map For Large File Navigation

Use the minimap to orient yourself in a 500+ line file.

Step-by-step:
1. Open a large file (e.g., a generated types file or a long module)
2. Toggle minimap: `<leader>um`
   - A narrow column appears on the right showing the file compressed
   - Your viewport is highlighted as a bright band
   - Diagnostic errors appear as colored marks (red for error, yellow for warning)
   - Search highlights appear when you have an active `/` search
3. Visually scan the minimap for clusters of red marks — these are areas with errors
4. Jump to that region using `{count}G` or search
5. When working on a focused section, minimap helps you remember where you are in the file
6. Hide minimap when not needed: `<leader>um` (toggle off)

When mini.map is useful:
- Files over 200 lines where you lose spatial orientation
- Scanning for diagnostic clusters before diving in
- Seeing how much of the file has search matches

When to hide it:
- Small files where the minimap takes proportionally too much space
- Pair programming (screen real estate matters)
- Split views (already constrained width)

### Scenario 8 - Multi-File Batch Replace Via Quickfix

Rename a constant `MAX_RETRIES` to `MAX_ATTEMPTS` across the entire project.

Step-by-step:
1. Grep for the constant: `<leader>sg` → type `MAX_RETRIES` → Enter
2. Review matches in Telescope results
3. Send all results to quickfix: `<C-q>` (sends all telescope results to quickfix)
4. Quickfix opens with nvim-bqf enhancements:
   - Press `p` to preview each entry without leaving quickfix
   - Press `zf` to fuzzy-filter if you want to exclude some matches
5. Run batch substitution: `:cdo s/MAX_RETRIES/MAX_ATTEMPTS/g | update`
   - `:cdo` runs the command on each quickfix entry (each line with a match)
   - `| update` saves each modified buffer
6. Verify: `<leader>sg` → type `MAX_RETRIES` → should return zero results
7. Check for any remaining references: `<leader>sg` → type `MAX_ATTEMPTS` → confirm all renamed

Alternative with `:cfdo` (once per file, not per entry):
```vim
:cfdo %s/MAX_RETRIES/MAX_ATTEMPTS/g | update
```
Use `:cfdo` when you want a global file-wide replace rather than per-match precision.

### Scenario 9 - Add Import Statement To Multiple Files

Add `import { Logger } from './logger'` to 6 files that use `Logger` but lack the import.

Step-by-step:
1. Find files that use Logger: `<leader>sg` → type `Logger`
2. Note which files are missing the import (check the top of each file)
3. Build the arglist: `:args src/auth.ts src/cache.ts src/queue.ts src/worker.ts src/retry.ts src/metrics.ts`
4. Run argdo to add the import at line 1:
   ```vim
   :argdo 0put='import { Logger } from \"./logger\"' | update
   ```
   - `0put=` inserts text above line 1
   - `| update` saves
5. Verify by opening each file or searching again

Alternative using a macro on quickfix:
1. `:copen` to open quickfix from a previous search
2. Record a macro: `qa`
3. Open the file: `<CR>`
4. Go to top: `gg`
5. Open line above: `O`
6. Type the import: `import { Logger } from './logger'`
7. Press `<Esc>`, save: `:w<CR>`
8. Return to quickfix: `<C-o><C-o>` then `:cnext<CR>`
9. Stop recording: `q`
10. Replay: `5@a`

### Scenario 10 - Marks For Multi-File Navigation

You are editing three related files. Set global marks for instant jumps.

Practice area (simulate with any three files):

```text
File 1: src/types.ts     (interface definitions)
File 2: src/service.ts   (business logic)
File 3: src/handler.ts   (HTTP handler)
```

Step-by-step:
1. Open `src/types.ts`, navigate to the key interface
2. Set global mark A: `mA`
3. Open `src/service.ts`, navigate to the main function
4. Set global mark B: `mB`
5. Open `src/handler.ts`, navigate to the handler
6. Set global mark C: `mC`
7. Now from anywhere, jump instantly:
   - `'A` — lands on the interface in types.ts
   - `'B` — lands on the function in service.ts
   - `'C` — lands on the handler in handler.ts
8. View all marks: `:marks`
9. Delete a mark when done: `:delmarks A`

Local marks (`m{a-z}`) for within a single file:
1. In a long file, mark the function you keep returning to: `ma`
2. Mark the test at the bottom: `mb`
3. Jump between them: `'a`, `'b`
4. Use `` `a `` for exact column position (not just line)

Special marks:
- `` `. `` — position of last edit (extremely useful after scrolling away)
- `''` — position before last jump (like a one-level `<C-o>`)
- `'{` / `'}` — start/end of last changed or yanked text

### Scenario 11 - Folds For Focus

Collapse irrelevant code to focus on a specific function in a large file.

Practice area:

```ts
import { Database } from './db'
import { Logger } from './logger'
import { Config } from './config'

interface UserQuery {
  id?: string
  email?: string
  role?: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date
}

// You want to focus ONLY on this function:
function findUser(db: Database, query: UserQuery): User | null {
  const filters = Object.entries(query).filter(([_, v]) => v !== undefined)
  if (filters.length === 0) {
    return null
  }
  const whereClause = filters.map(([k, v]) => `${k} = '${v}'`).join(' AND ')
  return db.query(`SELECT * FROM users WHERE ${whereClause}`)[0] ?? null
}

function createUser(db: Database, data: Omit<User, 'id' | 'createdAt'>): User {
  const id = crypto.randomUUID()
  const createdAt = new Date()
  const user = { ...data, id, createdAt }
  db.insert('users', user)
  return user
}

function deleteUser(db: Database, id: string): void {
  db.delete('users', { id })
}

function updateUser(db: Database, id: string, data: Partial<User>): User {
  db.update('users', { id }, data)
  return findUser(db, { id })!
}
```

Step-by-step:
1. Open the file — treesitter folding is enabled by default in LazyVim
2. Close all folds: `zM`
   - Every function, interface, and import block collapses to one line each
   - You see the file structure at a glance
3. Navigate to `findUser`: `j` / `k` or `/findUser`
4. Open just that fold: `zo`
   - Only `findUser` is expanded; everything else stays collapsed
5. Read and edit `findUser` with full focus
6. When done, open everything back: `zR`

Fold navigation:
- `zj` — jump to the next fold (useful for scanning collapsed structure)
- `zk` — jump to the previous fold
- `[z` — go to the top of the current open fold
- `]z` — go to the bottom of the current open fold

### Scenario 12 - Combine Block Visual With Column Alignment

Add type annotations to multiple Go struct fields.

Practice area:

```go
type Config struct {
	Host     string
	Port     int
	Database string
	Username string
	Password string
	SSLMode  string
	MaxConns int
	Timeout  int
}
```

Goal: Add `json:"fieldname"` tags to each field using block visual append.

Step-by-step:
1. Place cursor on the `Host` line
2. Enter block visual: `<C-v>`
3. Select down 7 lines to cover all fields: `7j`
4. Move to end of each line: `$`
5. Append: `A`
6. Type a space then a backtick: ` \``
7. Press `<Esc>`
   - All lines now have a trailing backtick (this is partial — you still need per-line content)

For truly different content per line, use a macro instead:
1. Place cursor on the `Host` line: `/Host<CR>`
2. Start recording: `qa`
3. Go to end of line: `A`
4. Type the tag: `` `json:"host"` ``
5. Move down: `<Esc>j`
6. Stop recording: `q`
7. For subsequent lines, manually adjust (or use a smarter macro with word yank)

### Scenario 13 - Quickfix With nvim-bqf Preview

Use nvim-bqf features to efficiently review grep results before batch editing.

Step-by-step:
1. Search for a pattern: `<leader>sg` → type `TODO` → Enter
2. Send to quickfix: `<C-q>`
3. In the quickfix window (nvim-bqf active):
   - `j`/`k` — navigate entries
   - `p` — toggle preview (shows the file context without jumping)
   - `<Tab>` — mark/unmark entries for later filtering
   - `zf` — open fuzzy filter, type to narrow results
   - `zn` — create a new quickfix list from marked items
   - `<CR>` — jump to the entry
4. After reviewing and filtering, run `:cdo` only on the filtered set:
   ```vim
   :cdo s/TODO/DONE/g | update
   ```

### Scenario 14 - Recording A Macro On Quickfix Results

Apply a complex multi-step edit to every location found via grep.

Practice area (imagine these are spread across files):

```ts
// file: src/auth.ts
const logger = console.log

// file: src/cache.ts
const logger = console.log

// file: src/queue.ts
const logger = console.log
```

Goal: Replace `console.log` with `Logger.getInstance()` at each location.

Step-by-step:
1. Grep for `const logger = console.log`: `<leader>sg`
2. Send to quickfix: `<C-q>`
3. In quickfix, go to first entry: `gg`
4. Jump to it: `<CR>`
5. Record macro: `qa`
6. Change from `=` to end of line: `f=lC Logger.getInstance()`
7. Save the file: `<Esc>:w<CR>`
8. Go to next quickfix entry: `:cnext<CR>`
9. Stop recording: `q`
10. Replay for remaining entries: `10@a` (use a count larger than remaining entries — macro stops at end)

### Scenario 15 - Using `:cdo` vs `:cfdo`

Understand the difference with a practical example.

Scenario: You searched for `fetchData` and got these quickfix entries:

```text
src/api.ts:10:   const result = fetchData(url)
src/api.ts:25:   return fetchData(endpoint)
src/worker.ts:8: await fetchData(queue.url)
src/test.ts:15:  mock(fetchData)
src/test.ts:30:  expect(fetchData).toHaveBeenCalled()
```

Using `:cdo` (runs once per quickfix entry = 5 times):
```vim
:cdo s/fetchData/requestData/g | update
```
- Runs on line 10 of api.ts
- Runs on line 25 of api.ts
- Runs on line 8 of worker.ts
- Runs on line 15 of test.ts
- Runs on line 30 of test.ts

Using `:cfdo` (runs once per file = 3 times):
```vim
:cfdo %s/fetchData/requestData/g | update
```
- Runs `%s` on entire api.ts (catches both lines and any other occurrences)
- Runs `%s` on entire worker.ts
- Runs `%s` on entire test.ts

When to use which:
- `:cdo` — when you want precise control (only the matched lines)
- `:cfdo` — when you want to replace ALL occurrences in each file (even lines not in quickfix)

### Scenario 16 - Terraform Block Editing With Block Visual

Add a `tags` attribute to multiple Terraform resource blocks simultaneously.

Practice area:

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
}

resource "aws_instance" "api" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.small"
}

resource "aws_instance" "worker" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.medium"
}
```

For this kind of edit (adding multi-line content), a macro is better than block visual:

Step-by-step:
1. Search for the closing brace pattern: `/^}<CR>`
2. Record macro: `qa`
3. Open a line above: `O`
4. Type the tags block:
   ```
     tags = { Name = "managed" }
   ```
5. Press `<Esc>`
6. Jump to next closing brace: `n`
7. Stop recording: `q`
8. Replay: `2@a`

Expected result:

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  tags = { Name = "managed" }
}

resource "aws_instance" "api" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.small"
  tags = { Name = "managed" }
}

resource "aws_instance" "worker" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.medium"
  tags = { Name = "managed" }
}
```

## Mini.hipatterns (Inline Highlights for TODO/FIXME/NOTE)

Mini.hipatterns highlights keywords like TODO, FIXME, HACK, NOTE directly in your buffer with distinct colors. This makes scanning a file for actionable comments instant.

### What gets highlighted

- `TODO` — yellow/orange highlight — something to implement
- `FIXME` — red highlight — broken code that needs fixing
- `HACK` — orange highlight — workaround that should be cleaned up
- `NOTE` — blue highlight — important context for future readers
- `#rrggbb` hex colors — shows the actual color inline (useful in CSS/theme files)

### Workflow: Scan A File For Action Items

Step-by-step:
1. Open any source file with TODO/FIXME comments
2. Notice the keywords are highlighted immediately — no search needed
3. Use `/TODO` or `/FIXME` to jump between them
4. Combine with `:g/TODO/` to list all action items:
   ```vim
   :g/TODO\|FIXME\|HACK/
   ```
   This prints all matching lines as a quick review
5. To collect them into quickfix for project-wide review:
   ```vim
   :vimgrep /TODO\|FIXME/ **/*.ts
   ```
   Then navigate with `]q` / `[q`

### Workflow: Hex Color Preview

When editing theme files or CSS:
1. Open a file with hex color values (e.g., `#ff6b6b`, `#4ecdc4`)
2. Notice each hex code shows its actual color as a background highlight
3. This is purely visual — no keymaps needed
4. Useful for Tailwind config, CSS custom properties, or Lua theme definitions

### Practice Scenario — Find And Fix All TODOs

Practice area:

```ts
// TODO: add input validation
function processOrder(data: unknown) {
  // HACK: casting to any because schema is not defined yet
  const order = data as any

  // FIXME: this crashes when items array is empty
  const total = order.items.reduce((sum: number, i: any) => sum + i.price, 0)

  // NOTE: tax calculation depends on user's country, hardcoded for now
  const tax = total * 0.2

  // TODO: send confirmation email after processing
  return { total, tax }
}
```

Step-by-step:
1. Open the file — TODO, FIXME, HACK, NOTE are all visibly highlighted in different colors
2. Press `/FIXME` to jump to the critical issue first
3. Fix the bug (add empty array check)
4. Press `/TODO` to jump to the next action item
5. Use `:g/TODO\|FIXME\|HACK/` to list remaining items and plan your work

## Real-World Drill

Perform this sequence in a real project without looking anything up:

1. Set global mark A on a type definition: `mA`
2. Set global mark B on a function that uses that type: `mB`
3. Jump between them: `'A`, `'B`
4. Collapse all folds: `zM`, then open just the function you care about: `zo`
5. Use `<leader>sg` to grep for a pattern, send to quickfix with `<C-q>`
6. Preview results in quickfix with `p` (nvim-bqf)
7. Run a batch replace: `:cdo s/old/new/g | update`
8. Open trouble workspace diagnostics: `<leader>xX`
9. Jump to an error, fix it, return to trouble
10. Use block visual to add a prefix to 5 lines: `<C-v>`, `4j`, `I`, type prefix, `<Esc>`
11. Toggle minimap: `<leader>um` — note where diagnostics cluster
12. Toggle all edgy panels: `<leader>ue`
13. Use `` `. `` to jump back to your last edit location
14. Open all folds: `zR`

## Troubleshooting / Verify With Which-Key

- If block visual insert only appears on the first line, ensure you pressed `<Esc>` (not `<C-c>`) — `<C-c>` cancels the multi-line insert.
- If trouble does not open, verify the plugin is loaded: `:Lazy` then search for `trouble`.
- If `<leader>xX` does nothing, check `<leader>sk` and search for `trouble` to find the actual mapping.
- If edgy panels appear in unexpected positions, check `:lua print(vim.inspect(require("edgy").config))` for the layout config.
- If minimap does not appear, verify mini.map extra is enabled: `:LazyExtras` and search for `mini.map`.
- If `:cdo` gives "no more items" immediately, ensure the quickfix list is populated (`:copen` to check).
- If nvim-bqf preview does not work, ensure the plugin is loaded: `:Lazy` then search for `bqf`.
- If marks disappear after closing Neovim, global marks (uppercase) persist in ShaDa file — verify `:set shada` includes `!` or the `'` option is set.
- If folds are not auto-created, ensure treesitter is configured for the filetype: `:set foldmethod?` should show `expr` and `:set foldexpr?` should reference treesitter.
- If `<C-q>` in Telescope does not send to quickfix, verify you are in normal mode within Telescope (press `<Esc>` first if in insert mode within the picker).
