import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/sip-calculator']

export default function SipCalculatorPage() {
  return <ToolPage tool={tool} />
}
