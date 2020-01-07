import ReactDOMServer from 'react-dom/server'

import ComponentWithHbsPartial from '../../../views/components/ComponentWithHbsPartial.jsx'

export default function(options = {}) {
  const handlebarsPartial = options.hash.partial

  return ReactDOMServer.renderToString(ComponentWithHbsPartial({ handlebarsPartial }))
}
