export function greet(name) {
  const trimmed = String(name || "").trim();
  return trimmed ? `Hi, ${trimmed}!` : "Hello, world!";
}
