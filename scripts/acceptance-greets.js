import { greet } from "../src/app.js";

if (greet("thornious-dev") !== "Hello, thornious-dev!") {
  console.error("Greeting behavior is incomplete.");
  process.exit(1);
}

console.log("greeting acceptance: PASS");
