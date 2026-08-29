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
5. Enforce the rule for administrators too.
6. Require resolved conversations.

One-account rule intent:

- every merge requires a pull request and all four deterministic checks
- high-risk contract, workflow, runner, and package-script changes require an explicit owner instruction before merge
- do not enable required approvals: GitHub cannot let the sole account approve its own PR

For a multi-account repository, enable required Code Owner review and use `CODEOWNERS` to make high-risk paths require an independent reviewer.

If GitHub rulesets are available, use them to protect `main` and require the same checks.
