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
- a simple risk classifier
- GitHub Actions workflows that wire the checks together

If a change is out of scope, weakens acceptance criteria, or leaves behavior unfinished, the gates should fail before merge.
