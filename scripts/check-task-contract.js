import fs from "node:fs";
import path from "node:path";

const contractPath = path.resolve(".github/task-contract.yml");
const text = fs.readFileSync(contractPath, "utf8");
const required = ["task_id:", "allowed_paths:", "forbidden_paths:", "acceptance:"];
const missing = required.filter((token) => !text.includes(token));

if (missing.length) {
  console.error(`Missing required contract fields: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("contract: PASS");
