import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/cgpa-to-percentage']

export default function CgpaToPercentagePage() {
  return <ToolPage tool={tool} />
}
