# GitHub setup recipe

Apply these repo settings once in GitHub:

1. Protect `main`.
2. Require pull requests before merge.
   - Require at least one approval.
   - Require approval from Code Owners.
   - Dismiss stale approvals when new commits are pushed.
3. Require these checks:
   - `scope`
   - `acceptance`
   - `regression`
   - `risk`
4. Block force pushes.
5. Require linear history only if your team wants it.
6. Enable auto-merge only for low-risk changes.

Suggested rule intent:

- low-risk code changes may auto-merge after all checks pass
- task contract, workflow, runner, and package-script changes are always human-reviewed through `CODEOWNERS`
- `risk` reports high risk without failing by itself; the required Code Owner approval is what routes those changes to a human

`CODEOWNERS` uses `@thornious-dev`, the connected GitHub owner. If policy review should belong to a smaller group, replace it with an existing organization team such as `@thornious-dev/release-owners` before enabling the rule.

If GitHub rulesets are available, use them to protect `main` and require the same checks.
