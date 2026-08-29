# GitHub setup recipe

Apply these repo settings once in GitHub:

1. Protect `main`.
2. Require pull requests before merge.
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
- task contract changes are always human-reviewed
- workflow changes are always human-reviewed

If GitHub rulesets are available, use them to protect `main` and require the same checks.
