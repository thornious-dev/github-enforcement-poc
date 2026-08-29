import test from "node:test";
import assert from "node:assert/strict";
import { greet } from "../src/app.js";

test("greets a named person", () => {
  assert.equal(greet("Ada"), "Hello, Ada!");
});

test("greets the world when blank", () => {
  assert.equal(greet(""), "Hello, world!");
});
