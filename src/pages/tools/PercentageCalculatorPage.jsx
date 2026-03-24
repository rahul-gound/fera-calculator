import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/percentage-calculator']

export default function PercentageCalculatorPage() {
  return <ToolPage tool={tool} />
}
