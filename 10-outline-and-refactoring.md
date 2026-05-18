# Chapter 10 - Outline And Refactoring

## Goal

Use the code outline to navigate large files by structure, and use refactoring.nvim to extract, inline, and rename code safely — without manual selection or search-replace.

## Mental Model

The outline is a structural table of contents for the current file. Use it when LSP `gd` and `/` search are not enough — when you want to see the full shape of a file at a glance. Refactoring is for structural edits that go beyond rename: extracting a block into a function, extracting a variable from an expression, or inlining something back. These operations use the AST, not text matching, so they are safer than manual edits.

## Keymaps

Outline:
- `<leader>cs` - toggle the code outline sidebar
- Inside the outline panel:
  - `j`/`k` - move up/down through symbols
  - `<Enter>` - jump to symbol in file
  - `<Esc>` or `q` - close outline
  - `o` - fold/unfold a symbol group
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
