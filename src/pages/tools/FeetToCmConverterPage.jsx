import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/feet-to-cm-converter']

export default function FeetToCmConverterPage() {
  return <ToolPage tool={tool} />
}
