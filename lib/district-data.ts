export type SchoolRiskProfile = {
  id: number;
  schoolName: string;
  riskScore: number;
  riskLevel: "Low" | "Moderate" | "High" | "Critical";
  primaryIssue: string;
  principalStatus: string;
};

export const districtPortfolio = [
  {
    id: 1,
    schoolName: "School 01",
    riskScore: 92,
    riskLevel: "Critical",
    primaryIssue: "Weak DDI Execution",
    principalStatus: "High Risk"
  },
  {
    id: 2,
    schoolName: "School 02",
    riskScore: 84,
    riskLevel: "High",
    primaryIssue: "Low Walkthrough Frequency",
    principalStatus: "Moderate Risk"
  },
  {
    id: 3,
    schoolName: "School 03",
    riskScore: 76,
    riskLevel: "High",
    primaryIssue: "Teacher Retention Decline",
    principalStatus: "High Risk"
  },
  {
    id: 4,
    schoolName: "School 04",
    riskScore: 61,
    riskLevel: "Moderate",
    primaryIssue: "Weak Feedback Quality",
    principalStatus: "Moderate Risk"
  },
  {
    id: 5,
    schoolName: "School 05",
    riskScore: 45,
    riskLevel: "Low",
    primaryIssue: "Stable",
    principalStatus: "Low Risk"
  }
];
