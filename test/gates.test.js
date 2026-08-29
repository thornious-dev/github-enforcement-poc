import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

function run(command, args = []) {
  return spawnSync("node", [command, ...args], { encoding: "utf8" });
}

test("scope gate catches out-of-scope drift", () => {
  const result = run("scripts/check-scope.js", [".github/task-contract.yml"]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr || result.stdout, /Out of scope/);
});

test("risk gate marks contract changes as high risk", () => {
  const result = run("scripts/classify-risk.js", [".github/task-contract.yml"]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /risk: high/);
});

test("risk gate marks risky fixtures as high risk", () => {
  const result = run("scripts/classify-risk.js", ["fixtures/risky/contract-change.yml"]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /risk: high/);
});

test("risk gate treats unclassified paths as high risk", () => {
  const result = run("scripts/classify-risk.js", ["fixtures/regression/bad-output.txt"]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /risk: high/);
});

test("risk gate permits ordinary application changes", () => {
  const result = run("scripts/classify-risk.js", ["src/app.js", "test/app.test.js"]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /risk: low/);
});

test("acceptance gate blocks unfinished behavior", () => {
  const result = run("scripts/acceptance-stub.js");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr || result.stdout, /Stub behavior is not complete/);
});
