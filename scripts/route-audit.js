const fs = require("fs")
const path = require("path")

const appDir = path.join(process.cwd(), "app")

function scan(dir, routes = []) {
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      if (item.startsWith("_archive")) {
        continue
      }

      scan(fullPath, routes)
    }

    if (item === "page.tsx") {
      const route = fullPath
        .replace(appDir, "")
        .replace("\\page.tsx", "")
        .replace(/\\/g, "/") || "/"

      routes.push(route || "/")
    }
  }

  return routes
}

const routes = scan(appDir)

console.log("\n=== LEADSHARPER ROUTE AUDIT ===\n")

routes
  .sort()
  .forEach(route => console.log(route))

console.log(`\nTotal Routes: ${routes.length}\n`)

