const changed = process.argv.slice(2);
if (!changed.length) {
  console.error("Usage: node scripts/classify-risk.js <changed-path>...");
  process.exit(1);
}

const highRiskPrefixes = [
  ".github/task-contract.yml",
  ".github/workflows/",
  "scripts/",
];

const highRisk = changed.some((file) =>
  highRiskPrefixes.some((prefix) => file === prefix || file.startsWith(prefix))
);

const unknown = changed.some((file) => file.startsWith("fixtures/risky/"));

if (highRisk || unknown) {
  console.log("risk: high");
  process.exit(2);
}

console.log("risk: low");
