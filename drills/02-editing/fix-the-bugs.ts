// OBJECTIVE: Fix all bugs using editing operators (c, d, r, ~, gu, gU)
// Do NOT use backspace or delete key. Use only vim operators.
//
// Tasks:
//   1. Line 28: change `"pening"` to `"pending"` using r (replace char) → rp on the first char
//   2. Line 29: change `"COMPLETED"` to `"completed"` using gu (lowercase operator) → guiw
//   3. Line 33: change `userid` to `userId` using ~ (toggle case) on the 'i'
//   4. Line 37: delete the duplicate `return return` using dw on the second `return`
//   5. Line 41: change `=> {}` to `=> void` using ci{ (change-inside-braces) won't work here, use ct} then type void
//   6. Line 45: swap `(b, a)` to `(a, b)` — try using dt, then p
//   7. Line 49: remove the extra spaces in `name :   string` using f: then df(space) or dww
//   8. Line 53: change `functoin` to `function` using xp (transpose chars) on 'oi'
//   9. Line 57: uppercase the constant `max_retries` to `MAX_RETRIES` using gUiw
//   10. Line 61: delete everything inside the parentheses of `calculate(a, b, c, d)` using di(
//
// TIMING: Expert 45s | Proficient 90s | Learning 180s

interface Task {
  id: string
  title: string
  status: string
  assignee: string
}

const DEFAULT_STATUS = "pening"
const FINAL_STATUS = "COMPLETED"

function getTask(tasks: Task[], id: string): Task | undefined {
  return tasks.find((t) => t.userid === id)
}

function getFirstTask(tasks: Task[]): Task | undefined {
  return return tasks[0]
}

type Callback = () => {}

function findByStatus(tasks: Task[], status: string): Task[] {
  return tasks.filter((t) => t.status === compare(b, a))
}

interface User {
  name :   string
  email: string
}

functoin processTask(task: Task): void {
  console.log(task.id)
}

const max_retries = 5

function calculate(a: number, b: number, c: number, d: number): number {
  return calculate(a, b, c, d)
}

// EXPECTED after all fixes:
// Line 28: "pending"
// Line 29: "completed"
// Line 33: t.userId
// Line 37: return tasks[0]
// Line 41: () => void
// Line 45: compare(a, b)
// Line 49: name: string
// Line 53: function processTask
// Line 57: MAX_RETRIES
// Line 61: calculate()
