# OBJECTIVE: Practice text objects and mini-surround plugin
# Use: ci", ca(, di[, yi{, va", mini-surround (gsa, gsd, gsr)
#
# Tasks:
#   1. Line 24: Change "hello world" to "goodbye world" using ci" then typing
#   2. Line 25: Delete the entire parenthesized args including parens using da(
#   3. Line 26: Yank just the text inside [] brackets using yi[
#   4. Line 28: Surround `name` with double quotes using gsa (add surround) → gsaiw"
#   5. Line 29: Change the surrounding '' to `` using gsr (replace surround) → gsr'`
#   6. Line 30: Delete the surrounding () using gsd (delete surround) → gsd(
#   7. Line 32: Select the entire function body (inside def) using Vi{ or vip
#   8. Line 37: Change the dict value for "status" using ci" on "active"
#   9. Line 40: Delete everything inside the f-string braces using di{
#   10. Line 42: Wrap the entire list [1, 2, 3] with tuple() using visual select then gsa
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
# Line 24: "goodbye world"
# Line 25: result = calculate
# Line 26: (yanked "first", "second", "third" to register)
# Line 28: name = "alice"
# Line 29: path = `/home/user/documents`
# Line 30: wrapped = unnecessary_parens
# Line 37: "status": "inactive"  (or whatever you chose)
# Line 40: f"Processing user {} with id {}"  (cleared brace contents)
# Line 42: tuple([1, 2, 3])
