import fs from "node:fs";
import path from "node:path";

const contractPath = path.resolve(".github/task-contract.yml");
const text = fs.readFileSync(contractPath, "utf8");
const required = ["task_id:", "allowed_paths:", "forbidden_paths:", "acceptance:"];
const missing = required.filter((token) => !text.includes(token));
const acceptanceNames = [...text.matchAll(/^\s*-\s*name:\s*(.+)$/gm)].map((m) => m[1].trim());
const duplicateNames = acceptanceNames.filter((name, index) => acceptanceNames.indexOf(name) !== index);

if (missing.length) {
  console.error(`Missing required contract fields: ${missing.join(", ")}`);
  process.exit(1);
}

if (!acceptanceNames.length) {
  console.error("At least one acceptance command is required.");
  process.exit(1);
}

if (duplicateNames.length) {
  console.error(`Duplicate acceptance names: ${[...new Set(duplicateNames)].join(", ")}`);
  process.exit(1);
}

console.log("contract: PASS");
