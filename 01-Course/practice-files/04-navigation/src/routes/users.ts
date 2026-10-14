import { createUser, findUser } from "../services/userService"

export function handleCreateUser(name: string, email: string) {
  return createUser({ name, email })
}

export function handleGetUser(id: string) {
  return findUser(id)
}
