import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/pound-to-kg-converter']

export default function PoundToKgConverterPage() {
  return <ToolPage tool={tool} />
}
