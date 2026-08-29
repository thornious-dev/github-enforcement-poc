import fs from "node:fs";

const text = fs.readFileSync(".github/task-contract.yml", "utf8");
if (!text.includes("sample-task-001")) {
  console.error("Task contract was weakened or replaced.");
  process.exit(1);
}

console.log("contract acceptance: PASS");
