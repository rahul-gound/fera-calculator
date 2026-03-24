import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/percentage-to-cgpa']

export default function PercentageToCgpaPage() {
  return <ToolPage tool={tool} />
}
