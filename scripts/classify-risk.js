import fs from "node:fs";

const args = process.argv.slice(2);
const fileIndex = args.indexOf("--file");
const changed =
  fileIndex >= 0
    ? fs.readFileSync(args[fileIndex + 1], "utf8").split("\n").filter(Boolean)
    : args;
if (!changed.length) {
  console.error("Usage: node scripts/classify-risk.js <changed-path>...");
  process.exit(1);
}

const protectedPrefixes = [
  ".github/task-contract.yml",
  ".github/workflows/",
  "scripts/",
  "package.json",
];
const lowRiskPrefixes = ["src/", "test/", "docs/", "README.md"];

const highRisk = changed.some((file) =>
  protectedPrefixes.some((prefix) => file === prefix || file.startsWith(prefix))
);

const unknown = changed.some(
  (file) => !lowRiskPrefixes.some((prefix) => file === prefix || file.startsWith(prefix))
);

if (highRisk || unknown) {
  console.log("risk: high");
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, "level=high\n");
  process.exit(0);
}

console.log("risk: low");
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, "level=low\n");
