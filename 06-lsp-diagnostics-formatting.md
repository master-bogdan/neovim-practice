# Chapter 6 - LSP, Diagnostics, And Formatting

## Goal

Use LazyVim as a full IDE: jump to definitions, inspect types, rename symbols across files, run code actions, navigate diagnostics, format code automatically, and debug when the language server does not attach.

## Mental Model

LSP is a client-server protocol. Neovim is the client. Each language has its own server (tsserver, gopls, pyright, lua_ls, etc.). LazyVim provides unified keymaps that dispatch to whatever server is attached. No server attached means no intelligence — you must verify attachment first.

The pipeline has three layers:

```text
Language Server (analysis, diagnostics, navigation, refactoring)
        |
conform.nvim (formatting via external tools: prettier, gofmt, rustfmt)
        |
nvim-lint (extra linting beyond what the LSP provides)
```

Diagnostics come from the language server and from nvim-lint. Formatting comes from conform.nvim (not from the LSP, unless you configure it that way). Understanding which layer owns what behavior is the key to debugging problems.

Check attachment:

```vim
:LspInfo          " which servers are attached to the current buffer
:ConformInfo      " which formatters are configured and available
:checkhealth      " overall Neovim health including LSP, treesitter, etc.
```

## Keymaps

LSP navigation:
- `gd` - go to definition
- `gD` - go to declaration
- `gr` - references (all usages of the symbol)
- `gI` - go to implementation
- `gy` - go to type definition
- `K` - hover documentation
- `gK` - signature help (parameter info)
- `<C-k>` - signature help in Insert mode

Code actions and refactoring:
- `<leader>ca` - code action (context-dependent fixes and refactors)
- `<leader>cr` - rename symbol (across all files)
- `<leader>cR` - rename file
- `<leader>co` - organize imports
- `<leader>cc` - run codelens
- `<leader>cC` - refresh and display codelens
- `<leader>cA` - source action

Diagnostics:
- `]d` - next diagnostic (any severity)
- `[d` - previous diagnostic
- `]e` - next error
- `[e` - previous error
- `]w` - next warning
- `[w` - previous warning
- `<leader>cd` - line diagnostics (floating window)
- `<leader>sd` - diagnostics picker (all files)
- `<leader>sD` - buffer diagnostics picker
- `<leader>xx` - diagnostics in Trouble panel
- `<leader>xX` - buffer diagnostics in Trouble panel

Formatting and tools:
- `<leader>cf` - format document (via conform.nvim)
- `<leader>cF` - format injected languages
- `<leader>uf` - toggle auto-format on save
- `<leader>cm` - open Mason (install/manage servers and tools)
- `<leader>cl` - show LspInfo

Inlay hints:
- `<leader>uh` - toggle inlay hints (shows inferred types, parameter names inline)

Symbols:
- `<leader>ss` - document symbols (fuzzy search current file symbols)
- `<leader>sS` - workspace symbols (fuzzy search all project symbols)
- `<leader>cs` - symbols in Trouble or outline panel

## Common Workflows

Understand a symbol deeply:

```text
K               hover to read type and docs
gd              jump to where it is defined
gr              find every place it is used
gy              jump to the type itself (for typed languages)
<C-o>           return to where you started
```

Fix a diagnostic:

```text
]d              jump to the next diagnostic
<leader>cd      read the full error message
<leader>ca      see available code actions (auto-import, quick fix, etc.)
```

Rename safely across the project:

```text
Put cursor on the symbol
<leader>cr      enter the new name
Confirm         all references across files are updated
```

Format and lint:

```text
<leader>cf      format the current buffer (conform.nvim calls prettier/gofmt/etc.)
<leader>uf      toggle auto-format on save if you want manual control
```

Debug missing LSP:

```text
:LspInfo        check if a server is attached
:Mason          install a missing server
:ConformInfo    check if a formatter is configured
:checkhealth    look for errors in the LSP or treesitter sections
```

## Practice Scenarios

### Scenario 1 - Verify LSP Attachment

Open a TypeScript file and confirm the language server is running.

Practice area — create or open a file with this content:

```ts
// file: practice.ts
interface User {
  id: number;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}

const admin: User = { id: 1, name: "Admin", email: "admin@example.com" };
console.log(greetUser(admin));
```

Steps:
1. Open the file in Neovim.
2. Run `:LspInfo` (or press `<leader>cl`).
3. Look for the attached client — it should say something like `ts_ls` or `typescript-language-server`.
4. If nothing is attached, run `:Mason` (`<leader>cm`) and install `typescript-language-server`.

Expected result: you see at least one client attached to the buffer with the filetype `typescript`.

### Scenario 2 - Go To Definition And Return

Navigate to where a function or type is defined, then return.

Using the same practice file above:

1. Put cursor on `User` in the line `const admin: User = ...`.
2. Press `gd`.
3. Cursor jumps to the `interface User` declaration.
4. Press `<C-o>` to return to the previous location.
5. Put cursor on `greetUser` in the `console.log(greetUser(admin))` line.
6. Press `gd`.
7. Cursor jumps to the function definition.
8. Press `<C-o>` to return.

Expected result: `gd` takes you to the definition and `<C-o>` brings you back. The jump list tracks every navigation.

### Scenario 3 - Find All References

Find everywhere a symbol is used.

Practice area:

```ts
// file: references-practice.ts
interface Config {
  timeout: number;
  retries: number;
}

function createConfig(): Config {
  return { timeout: 3000, retries: 3 };
}

function applyConfig(config: Config): void {
  console.log(`Timeout: ${config.timeout}`);
  console.log(`Retries: ${config.retries}`);
}

const defaultConfig = createConfig();
applyConfig(defaultConfig);
```

Steps:
1. Put cursor on `Config` (the interface name).
2. Press `gr`.
3. A picker opens showing every location where `Config` appears.
4. Press `j`/`k` to move through results.
5. Press `<Enter>` to jump to a specific reference.
6. Press `<C-o>` to return.

Expected result: you see all usages — the interface declaration, the return type annotation, and the parameter type annotation.

### Scenario 4 - Hover, Signature Help, And Type Definition

Inspect types without leaving the current location.

Practice area:

```ts
// file: hover-practice.ts
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
const filtered = numbers.filter((n) => n > 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

Steps:
1. Put cursor on `map` in `numbers.map(...)`.
2. Press `K` — hover shows the full signature of `Array.prototype.map`.
3. Press `K` again (or scroll) to read more documentation if available.
4. Put cursor on `doubled`.
5. Press `gy` — jumps to the type definition of `number[]`.
6. Press `<C-o>` to return.
7. Put cursor inside the parentheses of `.reduce(`.
8. Press `gK` — signature help shows which parameter you are on.

Expected result: `K` shows documentation, `gy` navigates to the type, and `gK` shows parameter context.

### Scenario 5 - Code Actions (Auto-Import, Quick Fix)

Use code actions to fix errors automatically.

Practice area:

```ts
// file: code-actions-practice.ts
// Imagine 'path' is not imported yet

function getConfigPath(): string {
  return path.join(__dirname, "config.json");
}

// Imagine this has an unused variable warning
const unusedVariable = 42;

export function main() {
  const result = getConfigPath();
  console.log(result);
}
```

Steps:
1. Open the file. The LSP should report an error on `path` (not defined).
2. Put cursor on `path`.
3. Press `<leader>ca` — a menu appears with options like "Add missing import" or "Install @types/path".
4. Select the import action and press `<Enter>`.
5. The import statement is added at the top of the file.
6. Now put cursor on `unusedVariable`.
7. Press `<leader>ca` — options might include "Remove unused variable" or "Prefix with underscore".
8. Select the appropriate fix.

Expected result: code actions vary by context. The LSP offers fixes relevant to the diagnostic at the cursor position.

### Scenario 6 - Rename Symbol Across Files

Rename a symbol and have the LSP update all references.

Practice area — two files:

```ts
// file: types.ts
export interface ApiResponse {
  statusCode: number;
  body: string;
}
```

```ts
// file: handler.ts
import { ApiResponse } from "./types";

function handleResponse(response: ApiResponse): void {
  if (response.statusCode === 200) {
    console.log(response.body);
  }
}
```

Steps:
1. Open `types.ts`.
2. Put cursor on `ApiResponse`.
3. Press `<leader>cr`.
4. Type the new name: `HttpResponse`.
5. Press `<Enter>`.
6. Open `handler.ts` — the import and all usages now say `HttpResponse`.

Expected result: the rename propagates across file boundaries. The LSP handles finding and updating all references.

### Scenario 7 - Navigate Diagnostics

Jump between errors and warnings efficiently.

Practice area:

```go
// file: practice.go
package main

import (
    "fmt"
    "os"
)

func main() {
    x := 42
    y := "hello"
    fmt.Println(x + y)  // type mismatch error
    
    f, err := os.Open("file.txt")
    fmt.Println(f)       // err not used — warning or error
}
```

Steps:
1. Open the file. Diagnostics should appear (squiggly underlines or signs in the gutter).
2. Press `]d` — cursor jumps to the first diagnostic.
3. Press `<leader>cd` — floating window shows the full error message.
4. Press `]d` again — jumps to the next diagnostic.
5. Press `]e` — jumps to the next error (skipping warnings).
6. Press `[e` — jumps back to the previous error.
7. Press `[d` — jumps back to the previous diagnostic of any severity.

Expected result: `]d`/`[d` hits everything, `]e`/`[e` filters to errors only, `]w`/`[w` filters to warnings only.

### Scenario 8 - Trouble.nvim Panel vs Inline Diagnostics

Compare two ways of viewing diagnostics.

Steps:
1. Open a file with several diagnostics.
2. View inline: diagnostics show as virtual text at the end of lines and signs in the gutter.
3. Press `<leader>xx` — Trouble panel opens at the bottom showing all workspace diagnostics.
4. Press `j`/`k` to navigate within Trouble.
5. Press `<Enter>` to jump to the diagnostic location in the buffer.
6. Press `<leader>xX` — switch to buffer-only diagnostics.
7. Press `q` to close Trouble.

Alternatives comparison:

```text
Inline diagnostics    — quick glance, no context switch, but clutters the buffer
Trouble panel         — full list, sortable, searchable, covers the whole project
<leader>sd            — Telescope/Snacks picker, one-shot search then dismiss
quickfix (:copen)     — traditional Vim list, works without plugins
```

Expected result: you understand when each view is most useful. Trouble for sustained review, inline for quick awareness, picker for targeted search.

### Scenario 9 - Formatting With conform.nvim

Format code manually and observe auto-format on save.

Practice area:

```ts
// file: messy.ts (intentionally ugly formatting)
const    x=1;const y   =   2;
function  add (a:number,b:number){return a+b}
const result=add(x,y); console.log(     result    );
```

Steps:
1. Open the file.
2. Run `:ConformInfo` — verify that `prettier` (or your configured formatter) is listed and available.
3. Press `<leader>cf` — the file reformats to proper style.
4. Undo with `u` to return to the messy state.
5. Press `<leader>uf` — this toggles auto-format on save. The status line or a notification confirms the state.
6. Save with `:w` — if auto-format is enabled, the file formats on save automatically.
7. Press `<leader>uf` again to re-enable auto-format if you disabled it.

Expected result: `<leader>cf` formats immediately. Auto-format on save runs the same formatter transparently.

### Scenario 10 - Inlay Hints

Toggle inlay hints to see inferred types and parameter names.

Practice area:

```ts
// file: inlay-practice.ts
function createPair(first: string, second: number) {
  return { first, second };
}

const pair = createPair("hello", 42);
const items = [1, 2, 3].map((x) => x * 2);
const config = { timeout: 3000, retries: 5 };
```

Steps:
1. Open the file.
2. Press `<leader>uh` — inlay hints appear as ghost text showing:
   - Return type of `createPair` (e.g., `: { first: string; second: number }`)
   - Type of `pair` (e.g., `: { first: string; second: number }`)
   - Type of `items` (e.g., `: number[]`)
   - Parameter names at call sites (e.g., `first:` and `second:` before arguments)
3. Press `<leader>uh` again to hide the hints.

Expected result: inlay hints reveal what the type system infers without requiring explicit annotations. Toggle them off when they clutter your view.

### Scenario 11 - Go To Implementation

Jump past the interface to the actual implementation.

Practice area:

```ts
// file: implementation-practice.ts
interface Logger {
  log(message: string): void;
  error(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
  error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }
}

class FileLogger implements Logger {
  log(message: string): void {
    // write to file
  }
  error(message: string): void {
    // write to file
  }
}

function createLogger(): Logger {
  return new ConsoleLogger();
}
```

Steps:
1. Put cursor on `Logger` in the `function createLogger(): Logger` return type.
2. Press `gd` — jumps to the interface declaration.
3. Press `<C-o>` to return.
4. Press `gI` — shows implementations of `Logger` (ConsoleLogger, FileLogger).
5. Select one from the picker to jump to it.

Expected result: `gd` goes to the interface (the type), `gI` goes to the concrete implementations. This distinction matters when working with abstractions.

### Scenario 12 - Python Diagnostics And Formatting

Work with pyright and a Python formatter.

Practice area:

```python
# file: practice.py
from typing import Optional

def   process_data( items:list[str],   limit:Optional[int]=None)->list[str]:
    result=[]
    for item in items:
        if  len(item)>limit:
            result.append( item.upper() )
    return result

def main():
    data = ["hello","world","python","neovim"]
    processed = process_data(data, "ten")  # wrong type for limit
    unused = 42
    print(processed)
```

Steps:
1. Open the file. Pyright should report:
   - Type error: `"ten"` is not `Optional[int]`
   - Possibly: unused variable `unused`
   - Possibly: `limit` could be `None` (unsafe `>` comparison)
2. Press `]e` to jump to the first error.
3. Press `<leader>cd` to read the full diagnostic message.
4. Press `<leader>ca` to see if a quick fix is available.
5. Press `<leader>cf` to format — black or ruff-format cleans up the spacing.
6. Run `:ConformInfo` to see which Python formatter is active.

Expected result: you can identify type errors via diagnostics, attempt quick fixes, and format independently. The LSP handles analysis while conform.nvim handles formatting.

### Scenario 13 - Go Diagnostics And Formatting

Work with gopls.

Practice area:

```go
// file: practice.go
package main

import (
	"fmt"
	"strings"
)

func processNames(names []string) []string {
	var result []string
	for _, name := range names {
		upper := strings.ToUpper(name)
		result = append(result, upper)
	}
	return result
}

func main() {
	names := []string{"alice", "bob", "charlie"}
	processed := processNames(names)
	fmt.Println(processed)

	unused := "this triggers a diagnostic"
}
```

Steps:
1. Open the file. Gopls should report: `unused declared and not used`.
2. Press `]e` to jump to the error.
3. Press `K` on `processNames` to see its signature documentation.
4. Press `gd` on `strings.ToUpper` to jump into the standard library.
5. Press `<C-o>` to return.
6. Press `<leader>cf` — gofmt formats the file (tabs, spacing, etc.).
7. Gopls also runs `goimports` to add/remove imports automatically if configured.

Expected result: Go's tooling is strict. Unused variables are errors, not warnings. Formatting is deterministic via gofmt.

### Scenario 14 - Reading :LspInfo And :ConformInfo Output

Understand what these diagnostic commands tell you.

Steps:
1. Open any file with LSP support.
2. Run `:LspInfo`. Read the output:
   - `Attached clients` — which servers are connected to this buffer
   - `Client: ts_ls (id: 1)` — the server name and internal ID
   - `root_dir` — the project root the server is using (important for monorepos)
   - `filetypes` — which file types this server handles
   - `cmd` — the actual command Neovim runs to start the server
3. Run `:ConformInfo`. Read the output:
   - `Formatters for this buffer` — what will run when you press `<leader>cf`
   - `Available` vs `Unavailable` — whether the binary exists in PATH
   - `Will run` — the order formatters execute (first match wins or runs in sequence)
4. If a formatter shows as unavailable, install it (e.g., `npm install -g prettier`).

Expected result: you can diagnose "why isn't formatting working" and "why doesn't go-to-definition work" by reading these outputs.

### Scenario 15 - When LSP Does Not Attach (Debugging)

Understand why LSP might not work and how to fix it.

Common causes and solutions:

```text
Problem                          | Diagnosis                    | Fix
---------------------------------|------------------------------|-----------------------------
No server installed              | :LspInfo shows nothing       | :Mason, install the server
Wrong filetype detected          | :set filetype?               | :set filetype=typescript
No root directory found          | :LspInfo shows wrong root    | Add tsconfig.json or go.mod
Server crashed                   | :LspLog shows errors         | :LspRestart
Node version mismatch            | Server fails to start        | Update node, check :LspLog
File opened before server ready  | No diagnostics yet           | Wait, or :LspRestart
```

Steps:
1. Open a file where LSP seems broken (no hover, no diagnostics).
2. Run `:LspInfo` — check if any client is attached.
3. If not, run `:Mason` and check if the appropriate server is installed.
4. Run `:LspLog` to check for server errors.
5. Run `:LspRestart` to attempt reattachment.
6. Check `:set filetype?` to confirm Neovim detected the filetype correctly.
7. Run `:checkhealth` and look for issues in the LSP section.

Expected result: you have a systematic debugging approach instead of guessing.

## Real-World Drill

Perform this complete sequence on a real project with TypeScript or Go files:

1. Open a source file that imports from other project files.
2. Run `:LspInfo` to confirm the server is attached.
3. Put cursor on an imported function and press `K` to read its documentation.
4. Press `gd` to jump to its definition in another file.
5. In the definition file, put cursor on the function name and press `gr` to find all callers.
6. Pick one reference and press `<Enter>` to jump to it.
7. Press `<C-o>` twice to return to the original file.
8. Press `]d` to jump to the first diagnostic in the file.
9. Press `<leader>cd` to read the full message.
10. Press `<leader>ca` to see available fixes — apply one if appropriate.
11. Put cursor on a variable name and press `<leader>cr` to rename it.
12. Type the new name and confirm. Check that references in other files updated.
13. Press `<leader>cf` to format the file.
14. Run `:ConformInfo` to see which formatter ran.
15. Press `<leader>uh` to toggle inlay hints on.
16. Observe the ghost text showing inferred types.
17. Press `<leader>uh` again to toggle hints off.
18. Press `<leader>xx` to open Trouble with all workspace diagnostics.
19. Navigate Trouble with `j`/`k`, jump to an issue with `<Enter>`.
20. Press `q` to close Trouble.

## Alternatives And Choices

```text
Task                    | Primary               | Alternative
------------------------|-----------------------|----------------------------------
Find definition         | gd                    | <leader>ss (symbol search in file)
Find references         | gr                    | <leader>sS (workspace symbol search)
View diagnostics        | ]d / [d               | <leader>xx (Trouble panel)
Diagnostics list        | <leader>sd            | :copen (quickfix list)
Format                  | <leader>cf            | :!prettier % (manual shell command)
Symbols overview        | <leader>ss            | <leader>cs (Trouble outline)
Inlay type info         | <leader>uh (hints)    | K (hover one symbol at a time)
```

## Troubleshooting / Verify With Which-Key

- If `gd` does nothing: run `:LspInfo` — likely no server is attached.
- If no server is installed: open Mason with `<leader>cm` and install it.
- If formatting fails: run `:ConformInfo` — the formatter binary may not be in PATH.
- If auto-format on save is annoying: toggle with `<leader>uf`.
- If inlay hints do not appear: the server may not support them, or toggle with `<leader>uh`.
- If rename does not update other files: the LSP may not have indexed the project yet — wait or run `:LspRestart`.
- If `:checkhealth` shows treesitter errors: run `:TSInstall <language>` for missing parsers.
- If diagnostics are stale after editing: some servers are slow — save the file to trigger a re-check.
- If mappings differ from this guide: search `<leader>sk` for `definition`, `diagnostic`, `format`, `rename`, or `trouble`.
- If the server crashes repeatedly: check `:LspLog` for stack traces. The server binary might need updating via Mason.
