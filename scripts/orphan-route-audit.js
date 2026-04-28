const fs = require("fs")
const path = require("path")

const appDir = path.join(process.cwd(), "app")

function scanRoutes(dir, routes = []) {
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      if (item.startsWith("_archive")) continue
      scanRoutes(fullPath, routes)
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

function scanFiles(dir, files = []) {
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      if (item.startsWith("_archive")) continue
      scanFiles(fullPath, files)
    }

    if (item.endsWith(".tsx") || item.endsWith(".ts")) {
      files.push(fullPath)
    }
  }

  return files
}

const routes = scanRoutes(appDir)
const files = scanFiles(process.cwd())

const strategicRoutes = [
  "/development-prescriptions/[id]",
  "/leader-profile/[id]",
  "/leader-learning-hub",
  "/evaluation-engine",
  "/evaluation-report",
  "/talent-decisions/bench-strength",
  "/talent-decisions/risk-alerts"
]
const orphaned = []

for (const route of routes) {
  let references = 0

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8")

    if (content.includes(`"${route}"`) || content.includes(`'${route}'`)) {
      references++
    }
  }

  if (references <= 1 && route !== "/" && !strategicRoutes.includes(route)) {
    orphaned.push(route)
  }
}

console.log("\n=== ORPHAN ROUTES ===\n")
orphaned.sort().forEach(route => console.log(route))
console.log(`\nPotential Orphans: ${orphaned.length}\n`)

