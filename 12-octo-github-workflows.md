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
- `:Octo issue create` - create a new issue
- `:Octo pr create` - create a new PR
- `:Octo pr checkout` - checkout the PR branch locally

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
- `<CR>` - open file at that change

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
:Octo pr list<CR>
j/k                 navigate PRs
<CR>                open PR as a buffer
```

Review a PR diff:

```text
:Octo pr list<CR>
<CR>                open PR
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
:Octo pr create<CR>
Fill in title and description
<CR>                submit
```

Checkout a PR branch locally:

```text
:Octo pr list<CR>
<CR>                open PR
:Octo pr checkout<CR>
```

## Practice Scenarios

### Scenario 1 - Verify Octo Is Working

Step-by-step:
1. Press `<leader>ft` to open the terminal.
2. Run `gh auth status` and press `<CR>` — confirm you are authenticated.
3. Press `<C-\><C-n>` to exit terminal mode, press `<leader>ft` to close terminal.
4. Run `:Octo pr list<CR>` in command mode — a list of open PRs should appear.

Expected result: PR list loads. If not, authentication is the issue.

### Scenario 2 - Open And Read A PR

Prerequisites: your repo has at least one open PR.

Step-by-step:
1. Run `:Octo pr list<CR>`.
2. Press `j`/`k` to move through the list.
3. Press `<CR>` to open a PR as a buffer.
4. Read the description — it renders as a Neovim buffer.
5. Scroll with `<C-d>` and `<C-u>`.
6. Press `q` to close.

Expected result: you read the full PR description including comments in the editor.

### Scenario 3 - Navigate PR Diff Hunks

Step-by-step:
1. Open a PR with `:Octo pr list<CR>` and `<CR>`.
2. Navigate to the diff section (scroll down or search with `/Files changed`).
3. Press `]q` to jump to the next hunk.
4. Press `[q` to jump back.
5. Press `<CR>` on a hunk to open the file at that change.

Expected result: you can review all changed hunks without using the mouse.

### Scenario 4 - Leave An Inline Review Comment

Step-by-step:
1. Open a PR and navigate to a diff hunk with `]q`.
2. Press `<leader>ca` to add a comment at the current position.
3. Press `i` to enter Insert mode.
4. Type your comment.
5. Press `<Esc>`.
6. Press `<leader>ca` or `:Octo comment add<CR>` to submit the comment.

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
1. Run `:Octo issue list<CR>`.
2. Press `j`/`k` to navigate.
3. Press `<CR>` to open an issue.
4. Read the thread.
5. Press `<leader>ca` to add a comment if needed.
6. Press `q` to close.

Expected result: you can read and comment on issues without opening the browser.

### Scenario 8 - Use Octo With CopilotChat

Step-by-step:
1. Open a PR with `:Octo pr list<CR>` and `<CR>`.
2. Read the PR description and diff.
3. Open a changed file by pressing `<CR>` on a diff hunk.
4. Select the changed function with `V` and `j`.
5. Press `<leader>ar` to ask CopilotChat to review it.
6. Read the review findings.
7. Go back to the PR buffer with `<leader>,`.
8. Leave a comment with `<leader>ca` that summarizes your review findings.

Expected result: AI review informs your GitHub review comment, all inside the editor.

## Real-World Drill

Do this sequence for a real PR in one of your repositories:

1. Run `:Octo pr list<CR>`.
2. Open a PR with `<CR>`.
3. Read the description by scrolling with `<C-d>`.
4. Navigate to the diff with `]q`.
5. Jump through all hunks with `]q`, reading each one.
6. Open one changed file with `<CR>`.
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
