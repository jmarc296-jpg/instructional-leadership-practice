const fs = require("fs")
const path = require("path")

function scan(dir, matches = []) {
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      if (
        item.startsWith("_archive") ||
        item === "node_modules" ||
        item === ".next" ||
        item === "archive-routes"
      ) continue

      scan(fullPath, matches)
    }

    if (item.endsWith(".ts") || item.endsWith(".tsx")) {
      const content = fs.readFileSync(fullPath, "utf8")

      if (
        content.includes("mock-data") ||
        content.includes("mockData") ||
        content.includes("const ") && content.includes("value:")
      ) {
        matches.push(fullPath)
      }
    }
  }

  return matches
}

const matches = scan(process.cwd())

console.log("\n=== MOCK DATA DEPENDENCIES ===\n")

matches.forEach(file => console.log(file))

console.log(`\nMock Dependencies Found: ${matches.length}\n`)

