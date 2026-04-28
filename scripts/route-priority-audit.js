const coreRoutes = [
  "/",
  "/executive-command-center",
  "/talent-review",
  "/talent-decisions",
  "/development-prescriptions/[id]",
  "/leader-learning-hub",
  "/simulation-room",
  "/impact-dashboard"
]

const fs = require("fs")
const path = require("path")

const appDir = path.join(process.cwd(), "app")

function scan(dir, routes = []) {
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
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

const nonCore = routes.filter(route => !coreRoutes.includes(route))

console.log("\n=== NON-CORE ROUTES TO REVIEW ===\n")

nonCore.sort().forEach(route => console.log(route))

console.log(`\nRoutes To Review: ${nonCore.length}\n`)
