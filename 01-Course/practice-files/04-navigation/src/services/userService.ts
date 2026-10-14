import type { CreateUserInput, User } from "../types/user"

const users = new Map<string, User>()

export function createUser(input: CreateUserInput): User {
  const user = { id: String(users.size + 1), ...input }
  users.set(user.id, user)
  return user
}

export function findUser(id: string): User | undefined {
  return users.get(id)
}
