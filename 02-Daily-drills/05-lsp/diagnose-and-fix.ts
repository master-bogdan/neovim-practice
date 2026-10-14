// OBJECTIVE: Use LSP features to navigate, diagnose, and fix this file
//
// Tasks:
//   1. Use `]d` to jump to each diagnostic (error/warning)
//   2. Use `<leader>cd` to read the diagnostic message
//   3. Use `gd` to go to the definition of `UserRole` (hover shows it's imported)
//   4. Use `gr` to find all references to `createUser`
//   5. Use `<leader>ca` to trigger code actions on the unused import
//   6. Use `<leader>cr` to rename `usr` to `user` across the file
//   7. Use `K` to hover over `Partial<User>` and read the expanded type
//   8. Use `gy` to go to the type definition of the return value
//   9. Use `<leader>cf` to format the file (fix the formatting issues)
//   10. Use `]d` / `[d` to verify no diagnostics remain
//
// NOTE: This file has intentional type errors. Open it in a TS project for LSP to work.
//
// TIMING: Expert 45s | Proficient 90s | Learning 180s

import { format } from "date-fns" // unused import — LSP will warn
import { z } from "zod"

type UserRole = "admin" | "member" | "guest"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  score: number
  createdAt: Date
}

// Bug 1: wrong return type annotation
function createUser(name: string, email: string): string {
  const usr: User = {
    id: crypto.randomUUID(),
    name,
    email,
    role: "member",
    score: 0,
    createdAt: new Date(),
  }
  return usr
}

// Bug 2: property doesn't exist
function promoteUser(usr: User): User {
  return {
    ...usr,
    role: "admin",
    promotedAt: new Date(), // 'promotedAt' does not exist on type 'User'
  }
}

// Bug 3: type mismatch in argument
function updateScore(usr: User, increment: string): User {
  return {
    ...usr,
    score: usr.score + increment, // can't add string to number
  }
}

// Bug 4: missing property in object literal
function createGuestUser(): User {
  return {
    id: crypto.randomUUID(),
    name: "Guest",
    email: "guest@example.com",
    // missing: role, score, createdAt
  }
}

// Formatting issues (inconsistent spacing)
function   validateEmail(email:string):boolean{
  const schema=z.string().email()
  const result=schema.safeParse(email)
return result.success
}

// Bug 5: accessing possibly undefined
function getTopUser(users: User[]): string {
  const sorted = users.sort((a, b) => b.score - a.score)
  return sorted[0].name // what if array is empty?
}
