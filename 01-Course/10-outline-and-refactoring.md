# Chapter 10 - Outline And Refactoring

## Goal

Use the code outline to navigate large files by structure, and use refactoring.nvim to extract, inline, and rename code safely — without manual selection or search-replace.

## Mental Model

The outline is a structural table of contents for the current file. Use it when LSP `gd` and `/` search are not enough — when you want to see the full shape of a file at a glance. Refactoring is for structural edits that go beyond rename: extracting a block into a function, extracting a variable from an expression, or inlining something back. These operations use the AST, not text matching, so they are safer than manual edits.

## Keymaps

Outline:
- `<leader>cs` - toggle the code outline sidebar (show/hide)
- Inside the outline panel:
  - `j`/`k` - move up/down through symbols
  - `<Enter>` - jump to symbol in file
  - `<Esc>` or `q` - close outline
  - `o` - fold/unfold symbols in outline (collapse/expand a symbol group)
  - `<C-l>` - move focus back to the editor window

Refactoring (from `refactoring.nvim` via the `editor.refactoring` extra):
- `<leader>re` - extract function (Visual mode: extracts selection into a new function)
- `<leader>rf` - extract to file (Visual mode: extracts selection into a new file)
- `<leader>rv` - extract variable (Visual mode: extracts selection into a named variable)
- `<leader>rI` - inline function (Normal mode: inlines the function under cursor)
- `<leader>ri` - inline variable (Normal mode: inlines the variable under cursor)
- `<leader>rb` - extract block (Normal mode: extracts a block into a function)
- `<leader>rB` - extract block to file (Normal mode: extracts block to new file)
- `<leader>rr` - select refactor (Normal or Visual mode: opens a picker of available refactors)

LSP rename (different from refactoring — renames all references):
- `<leader>cr` - rename symbol under cursor (LSP-aware, renames across files)

## Common Workflows

Get an overview of a large file:

```text
Open a file with many functions or types
<leader>cs          outline sidebar opens
j/k                 navigate symbols
<Enter>                jump to a symbol
<C-l>               return to editor
```

Extract a repeated expression into a variable:

```text
Select the expression in Visual mode (v or V)
<leader>rv          prompts for variable name
type the name
<Enter>
```

Extract a block of logic into a function:

```text
Select the lines to extract in Visual mode (V then j/k)
<leader>re          prompts for function name
type the name
<Enter>
```

Inline a variable that is only used once:

```text
Put cursor on the variable declaration
<leader>ri          inlines the variable where it is used
```

Browse available refactors without memorizing:

```text
Position cursor or make a visual selection
<leader>rr          opens a picker showing all valid refactors at this location
```

## Practice Scenarios

### Scenario 1 - Open And Navigate The Outline

Practice area — open any file in your config or this repo that has multiple functions.

Step-by-step:
1. Open a file with at least 3 functions: `<leader><space>`, then type a filename.
2. Press `<leader>cs` to toggle the outline.
3. Press `j`/`k` to move through symbols in the outline.
4. Press `<Enter>` to jump to a symbol.
5. Press `<C-l>` to return focus to the editor.
6. Press `<leader>cs` again to close the outline.

Expected result: you can see the full symbol structure and jump directly to any function.

### Scenario 2 - Jump To A Deeply Nested Symbol

Practice area:

```ts
class UserService {
  private cache: Map<string, User> = new Map()

  async getUser(id: string): Promise<User> {
    if (this.cache.has(id)) return this.cache.get(id)!
    const user = await db.findUser(id)
    this.cache.set(id, user)
    return user
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = await this.getUser(id)
    const updated = { ...user, ...data }
    await db.saveUser(updated)
    this.cache.set(id, updated)
    return updated
  }

  clearCache(): void {
    this.cache.clear()
  }
}
```

Step-by-step:
1. Copy the practice area into a `.ts` file or use a real TypeScript file.
2. Press `<leader>cs` to open the outline.
3. Use `j`/`k` to find `updateUser`.
4. Press `<Enter>` to jump to it.
5. Press `o` to fold/unfold the class group.

Expected result: the outline lets you jump directly to `updateUser` without scrolling.

### Scenario 3 - Extract A Variable

Practice area:

```ts
function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}
```

Step-by-step:
1. Put cursor on `cents / 100` expression.
2. Press `v` to enter visual mode.
3. Select `cents / 100` (use `e`, `w`, or `l` to extend selection).
4. Press `<leader>rv` to extract variable.
5. Type `dollars` as the variable name and press `<Enter>`.

Expected result:

```ts
function formatPrice(cents: number): string {
  const dollars = cents / 100
  return `$${dollars.toFixed(2)}`
}
```

### Scenario 4 - Extract A Function

Practice area:

```ts
async function processOrder(orderId: string) {
  const order = await db.getOrder(orderId)
  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = total * 0.08
  const finalAmount = total + tax
  await db.updateOrder(orderId, { total: finalAmount })
  return finalAmount
}
```

Step-by-step:
1. Put cursor on line `const total = ...`.
2. Press `V` to enter linewise visual.
3. Press `2j` to select down through `const finalAmount = total + tax`.
4. Press `<leader>re` to extract function.
5. Type `calculateTotal` as the function name and press `<Enter>`.

Expected result: the selected lines move into a new `calculateTotal` function, and the original code calls it.

### Scenario 5 - Inline A Variable

Practice area:

```ts
function isExpired(timestamp: number): boolean {
  const now = Date.now()
  return timestamp < now
}
```

Step-by-step:
1. Put cursor on `const now = Date.now()`.
2. Press `<leader>ri` to inline the variable.

Expected result:

```ts
function isExpired(timestamp: number): boolean {
  return timestamp < Date.now()
}
```

### Scenario 6 - Browse Available Refactors With The Picker

Practice area — any code block works.

Step-by-step:
1. Select any expression or block in Visual mode with `V` and `j`.
2. Press `<leader>rr` to open the refactor picker.
3. Read what refactors are available for that selection.
4. Press `<Esc>` to cancel without applying.

Expected result: you discover what refactors are valid for any given selection without memorizing all commands.

### Scenario 7 - Rename A Symbol Across Files

This uses LSP rename, not refactoring.nvim — it renames all references project-wide.

Practice area — use a symbol from a real project file.

Step-by-step:
1. Put cursor on a function or variable name.
2. Press `<leader>cr` to start LSP rename.
3. A prompt appears with the current name pre-filled.
4. Type the new name.
5. Press `<Enter>` to apply — all references in all files update.
6. Press `<leader>sd` to check for any diagnostics that appeared after the rename.

Expected result: all usages of the symbol are renamed. No manual search-replace needed.

### Scenario 8 - Outline + LSP Rename Combo

Jump to a symbol via the outline, then rename it with LSP. Observe how the rename propagates across all references while the outline updates live.

Practice area:

```ts
class PaymentProcessor {
  private gateway: PaymentGateway

  constructor(gateway: PaymentGateway) {
    this.gateway = gateway
  }

  async processPayment(amount: number, currency: string): Promise<Receipt> {
    const validated = this.validateAmount(amount)
    return this.gateway.charge(validated, currency)
  }

  private validateAmount(amount: number): number {
    if (amount <= 0) throw new Error("Invalid amount")
    return Math.round(amount * 100) / 100
  }

  async refundPayment(receiptId: string): Promise<void> {
    const receipt = await this.gateway.getReceipt(receiptId)
    await this.gateway.refund(receipt)
  }
}

// In another file or below:
const processor = new PaymentProcessor(stripeGateway)
const receipt = await processor.processPayment(49.99, "USD")
await processor.refundPayment(receipt.id)
```

Step-by-step:
1. Open the file and press `<leader>cs` to open the outline.
2. Use `j`/`k` to navigate to `processPayment` in the outline.
3. Press `<Enter>` to jump to the method.
4. Press `<C-l>` to return focus to the editor — cursor is now on `processPayment`.
5. Put cursor on `processPayment` and press `<leader>cr` to start LSP rename.
6. Type `chargeCustomer` and press `<Enter>`.
7. Observe: all references (the method definition, the call site below, and any other files) update.
8. Press `<leader>cs` again — the outline now shows `chargeCustomer` instead of `processPayment`.

Expected result: the outline served as navigation to find the symbol, LSP rename updated every reference project-wide, and the outline reflects the new name immediately.

### Scenario 9 - Multi-File Refactoring

Extract a function, then discover it is needed in another file. Use LSP rename to change its name across the entire project. Use the outline to verify the change landed in all files.

Practice area — imagine two files:

File: `src/orders.ts`
```ts
async function processOrder(orderId: string) {
  const order = await db.getOrder(orderId)
  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = subtotal > 100 ? subtotal * 0.1 : 0
  const total = subtotal - discount
  await db.updateOrder(orderId, { total })
  return total
}
```

File: `src/invoices.ts`
```ts
import { calculateTotal } from "./orders"

async function generateInvoice(orderId: string) {
  const total = await calculateTotal(orderId)
  return { orderId, total, date: new Date() }
}
```

Step-by-step:
1. Open `src/orders.ts`.
2. Select the three lines computing `subtotal`, `discount`, and `total` using `V` then `2j`.
3. Press `<leader>re` to extract function. Name it `calculateTotal`.
4. Export the new function so other files can import it.
5. Open `src/invoices.ts` — it imports `calculateTotal`.
6. Decide the name should be `computeOrderTotal` instead.
7. Put cursor on `calculateTotal` in either file.
8. Press `<leader>cr` and type `computeOrderTotal`, press `<Enter>`.
9. Open both files and press `<leader>cs` in each — the outline shows `computeOrderTotal` in both.
10. Press `<leader>sd` to confirm no diagnostics (no broken references).

Expected result: the function was extracted, renamed across files, and the outline confirms the new name appears in both files with no broken imports.

### Scenario 10 - When Refactoring Fails

What happens when refactoring.nvim cannot parse the language or the selection is invalid. Practice handling errors and undoing gracefully.

Practice area:

```ts
function calculate(a: number, b: number): number {
  return a * (b + 2) / (a - b)
}
```

Step-by-step — partial expression (invalid selection):
1. Put cursor in the middle of `a * (b + 2`.
2. Press `v` and select only `* (b + 2` — an incomplete expression.
3. Press `<leader>rv` to try extracting a variable.
4. Observe: refactoring.nvim shows an error (e.g., "Could not find valid AST node" or "Invalid selection").
5. Press `<Esc>` to dismiss the error.

Step-by-step — unsupported filetype:
1. Open or create a `.txt` or `.csv` file.
2. Select some text with `V`.
3. Press `<leader>re` to try extracting a function.
4. Observe: refactoring.nvim reports that the filetype is not supported or no Treesitter parser is available.

Step-by-step — undo after a bad refactor:
1. If a refactor does apply but produces wrong results, press `u` immediately to undo.
2. If the refactor touched multiple files, use `:earlier 1f` in each affected file to restore the previous saved state.
3. Check diagnostics with `<leader>sd` to confirm everything is clean again.

Expected result: you know what errors look like, you do not panic, and you can undo any refactoring that goes wrong.

### Scenario 11 - Outline For Navigation vs Structure

Two different use cases for the outline: (a) jumping to a known symbol quickly, (b) understanding unfamiliar code structure. Practice both.

Practice area — use a real file from a project you work on, or use this example:

```ts
// A file you know well
export class Router {
  private routes: Route[] = []
  private middleware: Middleware[] = []

  use(middleware: Middleware): void { /* ... */ }
  get(path: string, handler: Handler): void { /* ... */ }
  post(path: string, handler: Handler): void { /* ... */ }
  put(path: string, handler: Handler): void { /* ... */ }
  delete(path: string, handler: Handler): void { /* ... */ }

  private match(method: string, path: string): Route | null { /* ... */ }
  private executeMiddleware(ctx: Context): Promise<void> { /* ... */ }

  async handle(req: Request): Promise<Response> { /* ... */ }
}
```

Step-by-step — navigation (known file, jump directly):
1. Open a file you are familiar with.
2. Press `<leader>cs` to open the outline.
3. You already know the function name — press `j`/`k` quickly to find `handle`.
4. Press `<Enter>` to jump. You are there in under 2 seconds.
5. Press `<C-l>` to return to the editor and continue working.

Step-by-step — structure (unknown file, build mental map):
1. Open a file you have never read before (from a dependency, a teammate's module, etc.).
2. Press `<leader>cs` to open the outline.
3. Do NOT jump yet — read the symbol list top to bottom.
4. Notice the hierarchy: classes, methods, exported functions, types.
5. Use `o` to fold/unfold groups — collapse implementation details, focus on the public API.
6. Identify the entry points (exported functions, `handle`, `main`, etc.).
7. Now jump to the entry point with `<Enter>` and start reading from there.

Expected result: for known files, the outline is a fast jump tool (like a bookmark). For unknown files, it is a map that reveals structure before you dive into details.

## Choosing Between Tools

When to use which tool for renaming, navigation, and understanding code:

**Renaming:**
- `<leader>cr` (LSP rename) — for renaming identifiers across the entire project. Use this for functions, variables, classes, types. It updates all references in all files.
- `<leader>re` / `<leader>rv` (refactoring.nvim extract) — for splitting logic into new functions or variables. Use this when you want to restructure code, not just rename it.

**Navigation:**
- `<leader>cs` (outline) — for structure overview of the current file. Best when you want to see all symbols at a glance or jump to a known function.
- `gd` (go to definition) — for jumping to a specific symbol's definition. Best when your cursor is already on a reference.
- `<leader>sf` / `<leader><space>` (telescope) — for fuzzy finding files or symbols across the project. Best when you know part of the name but not the file.

**Understanding:**
- `<leader>cs` (outline) — shows the hierarchy: what classes exist, what methods they have, what is exported.
- `K` (hover) — shows type information and documentation for the symbol under cursor.
- AI (Copilot Chat or similar) — explains logic, intent, and complex flows that types alone cannot reveal.

## Real-World Drill

Do this sequence on a real source file:

1. Open a large file (100+ lines) with `<leader><space>`.
2. Press `<leader>cs` to open the outline.
3. Navigate to a function you want to inspect with `j`/`k`, press `<Enter>`.
4. Press `<C-l>` to return to the editor.
5. Find a repeated expression — select it with `v`.
6. Press `<leader>rv` to extract it to a variable.
7. Find a block of 3–5 lines that belong together — select with `V` and `j`.
8. Press `<leader>re` to extract it to a function.
9. Rename the new function with `<leader>cr`.
10. Check diagnostics with `<leader>sd` to make sure nothing broke.

## Troubleshooting / Verify With Which-Key

- If `<leader>cs` does nothing, check `:Lazy` for `outline.nvim` or similar.
- If `<leader>re`/`<leader>rv` do nothing, check `:LazyExtras` for `editor.refactoring`.
- If the refactoring fails with a parser error, make sure the file's language has a Treesitter parser installed — run `:TSInstall <language>`.
- Search `<leader>sk` for `Outline`, `Extract`, `Inline`, or `Refactor` to verify mappings.
- `<leader>rr` (picker) is the safest way to discover available refactors — use it when unsure.
