import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/emi-calculator']

export default function EmiCalculatorPage() {
  return <ToolPage tool={tool} />
}
