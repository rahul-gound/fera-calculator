import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/gst-calculator']

export default function GstCalculatorPage() {
  return <ToolPage tool={tool} />
}
