import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/age-calculator']

export default function AgeCalculatorPage() {
  return <ToolPage tool={tool} />
}
