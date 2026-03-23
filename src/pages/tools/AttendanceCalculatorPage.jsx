import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/attendance-calculator']

export default function AttendanceCalculatorPage() {
  return <ToolPage tool={tool} />
}
