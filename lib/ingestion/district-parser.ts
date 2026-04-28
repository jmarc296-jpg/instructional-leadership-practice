import Papa from "papaparse"

export function parseDistrictCSV(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cleaned = results.data.map((row: any) => ({
          leaderName: row.leaderName || row.name || "",
          role: row.role || "",
          school: row.school || "",
          retentionRisk: row.retentionRisk || "Low",
          readinessScore: Number(row.readinessScore || 0),
          vacancyRisk: row.vacancyRisk || "Low"
        }))

        resolve(cleaned)
      },
      error: (error) => reject(error)
    })
  })
}
