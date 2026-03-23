import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/loan-calculator']

export default function LoanCalculatorPage() {
  return <ToolPage tool={tool} />
}
