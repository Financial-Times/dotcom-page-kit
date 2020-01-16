import ReactDOMServer from 'react-dom/server'

import ComponentWithHbsOutput from '../../../views/components/ComponentWithHbsOutput.jsx'

export default function(options = {}) {
  const { handlebarsOutput } = options.hash

  return ReactDOMServer.renderToString(ComponentWithHbsOutput({ handlebarsOutput }))
}
