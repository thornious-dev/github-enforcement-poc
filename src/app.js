export function greet(name) {
  const trimmed = String(name ?? "").trim();
  return trimmed ? `Hello, ${trimmed}!` : "Hello, world!";
}
