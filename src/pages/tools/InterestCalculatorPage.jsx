import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/interest-calculator']

export default function InterestCalculatorPage() {
  return <ToolPage tool={tool} />
}
