import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/time-calculator']

export default function TimeCalculatorPage() {
  return <ToolPage tool={tool} />
}
