export function generatePrescription(risk: string) {
  const prescriptions = {
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
