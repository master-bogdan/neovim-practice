import { createUser, findUser } from "../services/userService"

const user = createUser({ name: "Ada", email: "ada@example.com" })

if (findUser(user.id)?.email !== "ada@example.com") {
  throw new Error("user lookup failed")
}
