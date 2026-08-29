import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("contract exists and is machine readable", () => {
  const text = fs.readFileSync(".github/task-contract.yml", "utf8");
  assert.match(text, /task_id:/);
  assert.match(text, /allowed_paths:/);
  assert.match(text, /forbidden_paths:/);
  assert.match(text, /acceptance:/);
});
