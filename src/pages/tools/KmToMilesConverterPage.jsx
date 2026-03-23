import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/km-to-miles-converter']

export default function KmToMilesConverterPage() {
  return <ToolPage tool={tool} />
}
