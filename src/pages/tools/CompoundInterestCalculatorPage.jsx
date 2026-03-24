import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/compound-interest-calculator']

export default function CompoundInterestCalculatorPage() {
  return <ToolPage tool={tool} />
}
