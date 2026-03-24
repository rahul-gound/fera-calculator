import ToolPage from '../../components/ToolPage'
import { toolsByPath } from '../../data/tools'

const tool = toolsByPath['/cm-to-feet-converter']

export default function CmToFeetConverterPage() {
  return <ToolPage tool={tool} />
}
