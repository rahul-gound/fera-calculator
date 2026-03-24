import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/bmi-calculator']

export default function BmiCalculatorPage() {
  return <ToolPage tool={tool} />
}
