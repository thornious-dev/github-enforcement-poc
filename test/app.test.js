import test from "node:test";
import assert from "node:assert/strict";
import { greet } from "../src/app.js";

test("greets a named person", () => {
  assert.equal(greet("Ada"), "Hello, Ada!");
});

test("greets the world when blank", () => {
  assert.equal(greet(""), "Hello, world!");
});

test("greets zero as a supplied name", () => {
  assert.equal(greet(0), "Hello, 0!");
});
