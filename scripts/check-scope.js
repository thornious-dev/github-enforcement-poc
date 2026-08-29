import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const contract = fs.readFileSync(path.resolve(".github/task-contract.yml"), "utf8");
const sections = (label) => {
  const match = contract.match(new RegExp(`${label}:\\n((?:\\s+- .+\\n?)*)`));
  return match ? [...match[1].matchAll(/^\s*-\s*(.+)$/gm)].map((m) => m[1]) : [];
};
const allowed = sections("allowed_paths");
const forbidden = sections("forbidden_paths");
const changed =
  process.argv.slice(2).length > 0
    ? process.argv.slice(2)
    : execSync("git diff --name-only HEAD^..HEAD", { encoding: "utf8" })
        .split("\n")
        .filter(Boolean);

const matches = (pattern, file) => {
  if (pattern.endsWith("/**")) return file.startsWith(pattern.slice(0, -3));
  return file === pattern;
};

const outOfScope = changed.filter(
  (file) =>
    !allowed.some((pattern) => matches(pattern, file)) ||
    forbidden.some((pattern) => matches(pattern, file))
);
if (outOfScope.length) {
  console.error(`Out of scope: ${outOfScope.join(", ")}`);
  process.exit(1);
}

console.log("scope: PASS");
