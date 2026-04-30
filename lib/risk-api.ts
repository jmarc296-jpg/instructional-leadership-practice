export async function fetchRiskAssessment(data: any) {
  const response = await fetch("/api/risk-engine", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}
