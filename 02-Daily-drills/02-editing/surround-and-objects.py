# OBJECTIVE: Practice text objects and mini-surround plugin
# Use: ci", ca(, di[, yi{, va", mini-surround (gsa, gsd, gsr)
#
# Tasks:
#   1. Change "hello world" to "goodbye world" using ci" then typing
#   2. On `result = calculate(x, y, z)`, delete the args including parens using da(
#   3. On `items`, yank just the text inside [] brackets using yi[
#   4. On `name = alice`, surround `alice` with double quotes using gsaiw"
#   5. On `path`, change the surrounding '' to `` using gsr'`
#   6. On `wrapped`, delete the surrounding () using gsd(
#   7. Select the `process_user` body using vip
#   8. In `config`, change the dict value for "status" using ci" on "active"
#   9. In `message`, delete everything inside each f-string brace using di{
#   10. On `numbers`, wrap the entire list [1, 2, 3] with tuple() using visual select then gsa
#
# TIMING: Expert 40s | Proficient 75s | Learning 150s


greeting = "hello world"
result = calculate(x, y, z)
items = ["first", "second", "third"]

name = alice
path = '/home/user/documents'
wrapped = (unnecessary_parens)

def process_user(user: dict) -> dict:
    validated = validate(user)
    enriched = enrich(validated)
    return enriched


config = {"status": "active", "retries": 3}

message = f"Processing user {user.name} with id {user.id}"

numbers = [1, 2, 3]


# EXPECTED after all edits:
# greeting: "goodbye world"
# result: result = calculate
# items: yanked "first", "second", "third" to a register
# name: name = "alice"
# path: path = `/home/user/documents`
# wrapped: wrapped = unnecessary_parens
# config: "status": "inactive"  (or whatever you chose)
# message: f"Processing user {} with id {}"  (cleared brace contents)
# numbers: tuple([1, 2, 3])
