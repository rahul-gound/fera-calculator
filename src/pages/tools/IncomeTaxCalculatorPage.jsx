import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/income-tax-calculator']

export default function IncomeTaxCalculatorPage() {
  return <ToolPage tool={tool} />
}
