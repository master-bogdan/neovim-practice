// OBJECTIVE: Master yanky.nvim paste-cycling and yank history
//
// Tasks:
//   1. Yank line 30 (the "first" string): yy
//   2. Yank line 31 (the "second" string): yy
//   3. Yank line 32 (the "third" string): yy
//   4. Paste below line 40: p
//      → you get "third" (most recent yank)
//   5. Cycle backward through yank history: <C-p>
//      → changes to "second"
//   6. Cycle again: <C-p>
//      → changes to "first"
//   7. Cycle forward: <C-n>
//      → back to "second"
//   8. Open yank history picker: <leader>p
//      → select any previous yank from the list
//   9. Yank a word from line 50 into register "a": "ayiw
//   10. Paste from register "a" somewhere else: "ap
//       (named registers are separate from yank ring)
//
// Key insight: After ANY paste (p or P), you can immediately cycle with
// <C-p> / <C-n> to swap what was pasted. This eliminates the need to
// re-yank if you pasted the wrong thing.
//
// TIMING: Expert 30s | Proficient 60s | Learning 120s

// === YANK THESE (one at a time, in order) ===
const first = "I was yanked first"
const second = "I was yanked second"
const third = "I was yanked third"

// === PASTE TARGETS (paste below each comment, then cycle) ===

// Paste here and cycle to get "first":


// Paste here and cycle to get "second":


// Paste here — use <leader>p to pick from history:


// === ADVANCED: Multiple yanks in sequence ===

// Yank each of these words individually, then reconstruct a sentence below:
const word1 = "Neovim"
const word2 = "makes"
const word3 = "editing"
const word4 = "effortless"

// Reconstruct "Neovim makes editing effortless" by pasting from yank history:
// (Use <leader>p to pick each word, or p then <C-p>/<C-n> to cycle)


// === REPLACE WITHOUT CLOBBERING ===
// Problem: when you paste over a visual selection, the replaced text goes into
// the default register, clobbering what you wanted to paste again.
// Solution: use "0p to paste from the yank register (always holds last yank)
//           or use <leader>P (yanky put-before from history)

const source = "correct value"
const target1 = "WRONG"
const target2 = "ALSO WRONG"
const target3 = "STILL WRONG"

// Task: yank "correct value", then paste it over target1, target2, target3
// WITHOUT losing "correct value" from your register.
// Method 1: yiw on source, then viw on target1 → "0p, repeat on target2/3
// Method 2: yiw on source, then viw on target1 → p, then <C-p> to restore, repeat
