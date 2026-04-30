import { DEMO_FLOW } from '../config/demoConfig'

export default function DemoRun() {
  return (
    <div>
      {DEMO_FLOW.map((component, i) => (
        <div key={i}>{component}</div>
      ))}
    </div>
  )
}
