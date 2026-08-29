# Demo scenarios

## Pass

- change `src/app.js`
- add or update a matching test in `test/app.test.js`
- keep `.github/task-contract.yml` unchanged
- result: `scope`, `acceptance`, `regression`, and `risk` all pass; the change is low risk and can be auto-merge eligible after normal review policy is satisfied

## Drift

- change `fixtures/drift/out-of-scope.txt`
- result: `scope` fails

## Regression

- change `src/app.js` so `greet("Ada")` no longer returns `Hello, Ada!`
- result: `regression` fails

## Stub

- leave `scripts/acceptance-stub.js` as the only implementation for a new task
- result: acceptance fails because unfinished behavior is not complete

## Contract weakening

- edit `.github/task-contract.yml` to remove an acceptance command
- result: `risk` reports high risk; in this one-account POC, merge requires an explicit repository-owner instruction

Task contracts may change only through this high-risk owner-decision path. A multi-account repository can enforce the same boundary with required Code Owner review.
