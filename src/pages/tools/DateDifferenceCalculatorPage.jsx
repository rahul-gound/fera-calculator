import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/date-difference-calculator']

export default function DateDifferenceCalculatorPage() {
  return <ToolPage tool={tool} />
}
