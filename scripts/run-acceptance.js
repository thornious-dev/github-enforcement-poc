import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const contractCheck = spawnSync("node", ["scripts/check-task-contract.js"], { stdio: "inherit" });
if (contractCheck.status !== 0) {
  console.error("Task contract is invalid: NOT-RUN");
  process.exit(1);
}

const contract = fs.readFileSync(path.resolve(".github/task-contract.yml"), "utf8");
const commands = contract
  .split("\n")
  .filter((line) => line.trim().startsWith("command:"))
  .map((line) => line.split("command:")[1].trim());

if (!commands.length) {
  console.error("No acceptance commands found.");
  process.exit(1);
}

let failed = false;
for (const command of commands) {
  const result = spawnSync(command, { shell: true, stdio: "inherit" });
  const status = result.status ?? 1;
  if (status === 0) {
    console.log(`${command}: PASS`);
  } else if (status === 2) {
    console.log(`${command}: NOT-RUN`);
    failed = true;
  } else {
    console.log(`${command}: FAIL`);
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
