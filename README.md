# GitHub Enforcement POC

This repo is a small test bed for a GitHub-only enforcement layer.

North star:

- agents do the work
- deterministic systems verify the work
- humans decide only what cannot safely be decided automatically

The repo keeps the moving parts boring on purpose:

- a machine-readable task contract
- deterministic scope checks
- deterministic acceptance checks
- a regression gate
- a conservative risk classifier
- GitHub Actions workflows that wire the checks together

Useful references:

- [GitHub setup recipe](docs/branch-protection.md)
- [Demo scenarios](docs/demo-scenarios.md)
- [Pull request template](.github/pull_request_template.md)

If a change is out of scope, weakens acceptance criteria, or leaves behavior unfinished, the gates should fail before merge.

## One-time GitHub setup

Apply these repo settings in GitHub so the checks actually enforce merge safety:

- Protect `main`
- Require pull requests before merge
- Require the `scope`, `acceptance`, `regression`, and `risk` checks
- Block force pushes
- Decide whether merge commits, squash, or rebase are allowed
- Enable auto-merge only if you want low-risk changes to merge after checks pass

## How the gates work

- `scope` rejects out-of-scope diffs
- `acceptance` runs every acceptance command from the task contract
- `regression` runs the repository test suite
- `risk` classifies only ordinary application, test, and documentation paths as low risk; protected and unknown paths are high risk

`CODEOWNERS` protects the contract, workflows, scripts, and package commands. Combined with required Code Owner review and stale-approval dismissal, an agent cannot lower its own bar in the same PR.

Task-contract changes are deliberately in scope so the next task can be defined through a PR. They are always high risk and require Code Owner review; normal code changes cannot use that route to self-approve.
