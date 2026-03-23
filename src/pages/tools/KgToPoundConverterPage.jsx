import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/kg-to-pound-converter']

export default function KgToPoundConverterPage() {
  return <ToolPage tool={tool} />
}
