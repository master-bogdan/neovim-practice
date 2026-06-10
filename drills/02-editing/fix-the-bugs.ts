// OBJECTIVE: Fix all bugs using editing operators (c, d, r, ~, gu, gU)
// Do NOT use backspace or delete key. Use only vim operators.
//
// Tasks:
//   1. Change `"pening"` to `"pending"` using r (replace char) → rp on the first char
//   2. Change `"COMPLETED"` to `"completed"` using gu (lowercase operator) → guiw
//   3. Change `userid` to `userId` using ~ (toggle case) on the 'i'
//   4. Delete the duplicate `return return` using dw on the second `return`
//   5. Change `=> {}` to `=> void` using ct} then type void
//   6. Swap `(b, a)` to `(a, b)` — try deleting `b`, moving after `a`, then p
//   7. Remove the extra spaces in `name :   string` using f: then spacing edits
//   8. Change `functoin` to `function` using xp (transpose chars) on 'oi'
//   9. Uppercase the constant `max_retries` to `MAX_RETRIES` using gUiw
//   10. Delete everything inside the parentheses of `calculate(a, b, c, d)` using di(
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
// DEFAULT_STATUS: "pending"
// FINAL_STATUS: "completed"
// getTask: t.userId
// getFirstTask: return tasks[0]
// Callback: () => void
// findByStatus: compare(a, b)
// User.name: name: string
// processTask: function processTask
// max_retries: MAX_RETRIES
// calculate: calculate()
