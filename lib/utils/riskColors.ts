export function getRiskColor(level: 'LOW' | 'MEDIUM' | 'HIGH') {
  if (level === 'HIGH') return 'text-red-600'
  if (level === 'MEDIUM') return 'text-orange-500'
  return 'text-green-600'
}
