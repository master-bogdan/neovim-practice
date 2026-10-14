# Chapter 12 - GitHub Workflows With Octo

## Goal

Review pull requests, browse issues, leave comments, and manage GitHub workflows without leaving the editor.

## Mental Model

Octo loads GitHub PRs and issues as buffers. You read and write using normal Neovim editing — you can comment by entering Insert mode and writing, approve with a command, and navigate diff hunks with standard keys. The goal is to do your entire code review cycle inside the editor where you can also use LSP, search, and CopilotChat alongside it.

## Prerequisites

- GitHub CLI (`gh`) must be authenticated: run `gh auth status` in terminal to verify.
- If not authenticated: open terminal with `<leader>ft`, run `gh auth login`, follow the prompts, press `<C-\><C-n>` to exit terminal mode.
- The `util.octo` extra must be enabled (it is in your config).

## Keymaps

Opening Octo:
- `:Octo pr list` - list open PRs for current repo
- `:Octo pr search` - search PRs by query
- `:Octo issue list` - list open issues
- `:Octo issue create` - create a new issue (opens interactive buffer for title, body, labels)
- `:Octo pr create` - create a new PR
- `:Octo pr checkout` - checkout the PR branch locally
- `:Octo pr merge` - merge a PR (squash, rebase, or merge commit)

Inside an Octo PR or issue buffer:
- `<leader>po` - open in browser
- `<leader>pc` - add comment
- `<leader>pa` - add assignee
- `<leader>pl` - add label
- `<leader>pm` - add milestone
- `<leader>pr` - add reviewer
- `<leader>pv` - mark as ready for review
- `<leader>pd` - convert to draft
- `<leader>ps` - submit review
- `<C-b>` - open in browser

PR review actions:
- `<leader>va` - approve review
- `<leader>vr` - request changes
- `<leader>vc` - comment review
- `<leader>vs` - submit review

Navigation inside PR diff:
- `]q` - next change / hunk
- `[q` - previous change / hunk
- `<Enter>` - open file at that change

Thread and comment actions:
- `<leader>ca` - add comment to a thread
- `<leader>cd` - delete comment
- `<leader>ce` - edit comment
- `<leader>cr` - react with emoji
- `<Space><Space>` - toggle resolved state on a thread

Buffer navigation:
- `:Octo actions` - show all available Octo actions for current buffer
- `q` - close Octo buffer

## Common Workflows

List and open a PR:

```text
:Octo pr list<Enter>
j/k                 navigate PRs
<Enter>                open PR as a buffer
```

Review a PR diff:

```text
:Octo pr list<Enter>
<Enter>                open PR
<leader>pc          open the Files Changed section or navigate to it
]q                  jump to next diff hunk
[q                  jump to previous hunk
<leader>ca          add an inline review comment
<leader>vs          submit review when done
```

Approve a PR:

```text
Open the PR buffer
<leader>va          approve
<leader>vs          submit the review
```

Create a PR:

```text
Push your branch first via terminal or LazyGit
:Octo pr create<Enter>
Fill in title and description
<Enter>                submit
```

Checkout a PR branch locally:

```text
:Octo pr list<Enter>
<Enter>                open PR
:Octo pr checkout<Enter>
```

## Practice Scenarios

### Scenario 1 - Verify Octo Is Working

Step-by-step:
1. Press `<leader>ft` to open the terminal.
2. Run `gh auth status` and press `<Enter>` — confirm you are authenticated.
3. Press `<C-\><C-n>` to exit terminal mode, press `<leader>ft` to close terminal.
4. Run `:Octo pr list<Enter>` in command mode — a list of open PRs should appear.

Expected result: PR list loads. If not, authentication is the issue.

### Scenario 2 - Open And Read A PR

Prerequisites: your repo has at least one open PR.

Step-by-step:
1. Run `:Octo pr list<Enter>`.
2. Press `j`/`k` to move through the list.
3. Press `<Enter>` to open a PR as a buffer.
4. Read the description — it renders as a Neovim buffer.
5. Scroll with `<C-d>` and `<C-u>`.
6. Press `q` to close.

Expected result: you read the full PR description including comments in the editor.

### Scenario 3 - Navigate PR Diff Hunks

Step-by-step:
1. Open a PR with `:Octo pr list<Enter>` and `<Enter>`.
2. Navigate to the diff section (scroll down or search with `/Files changed`).
3. Press `]q` to jump to the next hunk.
4. Press `[q` to jump back.
5. Press `<Enter>` on a hunk to open the file at that change.

Expected result: you can review all changed hunks without using the mouse.

### Scenario 4 - Leave An Inline Review Comment

Step-by-step:
1. Open a PR and navigate to a diff hunk with `]q`.
2. Press `<leader>ca` to add a comment at the current position.
3. Press `i` to enter Insert mode.
4. Type your comment.
5. Press `<Esc>`.
6. Press `<leader>ca` or `:Octo comment add<Enter>` to submit the comment.

Expected result: comment appears in the PR thread.

### Scenario 5 - Approve A PR

Step-by-step:
1. Open a PR you have reviewed.
2. Press `<leader>va` to approve.
3. Press `<leader>vs` to submit the review.

Expected result: PR is marked as approved on GitHub.

### Scenario 6 - Request Changes

Step-by-step:
1. Open a PR where changes are needed.
2. Add a comment explaining what needs to change: `<leader>ca`, `i`, type, `<Esc>`.
3. Press `<leader>vr` to mark as requesting changes.
4. Press `<leader>vs` to submit.

Expected result: PR is marked as "Changes requested" on GitHub.

### Scenario 7 - Browse Issues

Step-by-step:
1. Run `:Octo issue list<Enter>`.
2. Press `j`/`k` to navigate.
3. Press `<Enter>` to open an issue.
4. Read the thread.
5. Press `<leader>ca` to add a comment if needed.
6. Press `q` to close.

Expected result: you can read and comment on issues without opening the browser.

### Scenario 8 - Use Octo With CopilotChat

Step-by-step:
1. Open a PR with `:Octo pr list<Enter>` and `<Enter>`.
2. Read the PR description and diff.
3. Open a changed file by pressing `<Enter>` on a diff hunk.
4. Select the changed function with `V` and `j`.
5. Press `<leader>ar` to ask CopilotChat to review it.
6. Read the review findings.
7. Go back to the PR buffer with `<leader>,`.
8. Leave a comment with `<leader>ca` that summarizes your review findings.

Expected result: AI review informs your GitHub review comment, all inside the editor.

### Scenario 9 - Create An Issue From Neovim

Step-by-step:
1. Run `:Octo issue create<Enter>`.
2. An interactive buffer opens with fields for title and body.
3. Move to the title line, press `i`, type a descriptive title (e.g., "Bug: API returns 500 on empty payload").
4. Move to the body section, press `i`, write a markdown description:
   - Describe the bug: what you expected vs what happened.
   - Include code blocks with triple backticks for reproduction steps.
   - Add any relevant error messages.
5. Press `<Esc>` when done editing.
6. To add labels, run `:Octo label add<Enter>` and select from the list (e.g., "bug").
7. Save and submit the issue by writing the buffer: `:w<Enter>`.

Practice: while coding, if you hit an unexpected error in a dependency or your own code, immediately file it with `:Octo issue create` without switching to the browser.

Expected result: a new issue appears on GitHub with your title, markdown body, and labels.

### Scenario 10 - Full PR Review Checklist

A structured approach to reviewing a PR thoroughly inside Octo:

Step-by-step:
1. Open the PR: `:Octo pr list<Enter>`, navigate with `j`/`k`, press `<Enter>`.
2. **Read the description** — scroll with `<C-d>`/`<C-u>` to understand the purpose and context.
3. **Check the file list for scope** — look at how many files are changed and whether the scope matches the PR title. Run `:Octo pr files<Enter>` or scroll to the file list.
4. **Navigate each changed file** — press `]q` to jump to the first hunk, then continue with `]q` through all hunks. For each file, ask: does this change make sense?
5. **Leave inline comments on concerns** — position cursor on a problematic line, press `<leader>ca`, enter Insert mode with `i`, type your concern, press `<Esc>`.
6. **Check for missing tests** — look at the file list for `*_test.*` or `*.spec.*` files. If the PR adds a new API endpoint but no test file is in the diff, note this in a comment.
7. **Approve or request changes**:
   - If everything looks good: `<leader>va` to approve, then `<leader>vs` to submit.
   - If changes are needed: `<leader>vr` to request changes, then `<leader>vs` to submit.

Practice: review a PR that adds a new API endpoint. Verify it has input validation, error handling, and a corresponding test file.

Expected result: a thorough review with inline comments and a clear approve/request-changes decision, all without leaving Neovim.

### Scenario 11 - PR Creation To Merge Workflow

End-to-end lifecycle of a PR without leaving Neovim:

Step-by-step:
1. **Create a branch** — open terminal with `<leader>ft`, run `git checkout -b feat/my-feature`, press `<C-\><C-n>` and close terminal.
2. **Make changes and commit** — edit files, then open LazyGit with `<leader>gg`, stage files, write a commit message, press `c` to commit, press `q` to close.
3. **Push the branch** — open terminal with `<leader>ft`, run `git push -u origin feat/my-feature`, close terminal.
4. **Create the PR** — run `:Octo pr create<Enter>`. Fill in the title and description in the buffer that opens. Write with `:w<Enter>` to submit.
5. **Wait for CI** — run `:Octo pr checks<Enter>` to see CI status. Repeat after a minute if still pending.
6. **Mark ready for review** — if you created as draft, press `<leader>pv` to mark the PR as ready for review.
7. **Approve** — if self-merge is allowed and reviews pass, press `<leader>va` then `<leader>vs`.
8. **Merge** — run `:Octo pr merge<Enter>`. Choose squash, rebase, or merge commit when prompted.
9. **Clean up** — open terminal, run `git checkout main && git pull`, close terminal.

Expected result: the complete PR lifecycle from branch creation to merge happens inside the editor.

### Scenario 12 - Octo + Local Editing

Show how Octo diff view and local files relate — edit a file from a PR diff:

Step-by-step:
1. Open a PR: `:Octo pr list<Enter>`, select with `<Enter>`.
2. Navigate to a diff hunk with `]q`.
3. Press `<Enter>` on the hunk to open the file at that change.
4. You are now in the actual local file (if the branch is checked out). Confirm with `:echo expand('%')`.
5. Make your fix — press `i`, edit the code, press `<Esc>`.
6. Save with `:w<Enter>`.
7. Commit the fix — open LazyGit with `<leader>gg`, stage the file, commit with a message like "fix: address review comment", press `q`.
8. Push — open terminal with `<leader>ft`, run `git push`, close terminal.
9. Return to the PR buffer with `<leader>,` and select the Octo buffer.
10. The PR on GitHub now reflects your new commit. Refresh with `:e<Enter>` or reopen with `:Octo pr list`.

Practice: open a PR you own, find an issue in the diff, fix it locally, push, and confirm the PR updates.

Expected result: you see the PR diff, fix code in the actual file, push, and the PR updates — seamless flow between review and editing.

## Real-World Drill

Do this sequence for a real PR in one of your repositories:

1. Run `:Octo pr list<Enter>`.
2. Open a PR with `<Enter>`.
3. Read the description by scrolling with `<C-d>`.
4. Navigate to the diff with `]q`.
5. Jump through all hunks with `]q`, reading each one.
6. Open one changed file with `<Enter>`.
7. Use `gd` to inspect a definition from the diff.
8. Return with `<C-o>`.
9. Select the changed function with `V` and `j`.
10. Press `<leader>ar` to get an AI correctness review.
11. Go back to the PR buffer with `<leader>,`.
12. Leave an inline comment with `<leader>ca`.
13. Approve with `<leader>va` and submit with `<leader>vs`.

## Troubleshooting / Verify With Which-Key

- If `:Octo pr list` fails, run `gh auth status` in the terminal first.
- If the PR list is empty, make sure you are inside a git repo with a GitHub remote: `git remote -v`.
- Run `:Octo actions` inside any Octo buffer to see all available commands for that context.
- Search `<leader>sk` for `Octo` to see all registered keymaps.
- If comments fail to submit, check network connectivity and `gh` token scopes: `gh auth status`.
- `<leader>ca` conflicts with LSP code action inside Octo buffer — if pressing `<leader>ca` triggers LSP code actions instead of adding a comment, use `:Octo comment add<Enter>` explicitly when inside PR buffers.
- Can't see PR checks/CI status — run `:Octo pr checks<Enter>` to display the CI pipeline status (pass/fail/pending) for the current PR.
- PR description is too long to read in buffer — use `zR` to unfold all folds, or scroll with `<C-d>`/`<C-u>`. You can also search within the buffer with `/keyword`.
