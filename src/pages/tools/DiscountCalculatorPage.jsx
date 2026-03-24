import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/discount-calculator']

export default function DiscountCalculatorPage() {
  return <ToolPage tool={tool} />
}
