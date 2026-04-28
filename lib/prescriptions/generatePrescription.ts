type RiskLevel =
  | "Immediate Intervention"
  | "High Risk"
  | "Moderate Risk"
  | "Low Risk";

export function generatePrescription(risk: RiskLevel) {
  const prescriptions: Record<RiskLevel, string[]> = {
    "Immediate Intervention": [
      "Weekly executive coaching",
      "Instructional walkthrough calibration",
      "90-day performance plan"
    ],
    "High Risk": [
      "Bi-weekly coaching",
      "Talent management support"
    ],
    "Moderate Risk": [
      "Monthly leadership development"
    ],
    "Low Risk": [
      "Promotion pathway planning"
    ]
  };

  return prescriptions[risk] || [];
}
