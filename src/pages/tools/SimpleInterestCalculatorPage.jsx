import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/simple-interest-calculator']

export default function SimpleInterestCalculatorPage() {
  return <ToolPage tool={tool} />
}
