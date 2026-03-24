import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/salary-calculator']

export default function SalaryCalculatorPage() {
  return <ToolPage tool={tool} />
}
