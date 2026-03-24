import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/marks-percentage-calculator']

export default function MarksPercentageCalculatorPage() {
  return <ToolPage tool={tool} />
}
