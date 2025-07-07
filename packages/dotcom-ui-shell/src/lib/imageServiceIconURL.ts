import querystring from 'querystring'

function imageServiceIconURL(image: string, size: number, format = 'png'): string {
  const serviceURL = 'https://images.ft.com/v3/image/raw/'

  const serviceParameters = {
    source: 'page-kit',
    format: format,
    width: size,
    height: size
  }

  // Do not add width and height if format is svg because svg files scale automatically
  if (format === 'svg') {
    delete serviceParameters.width
    delete serviceParameters.height
  }

  const queryString = querystring.stringify(serviceParameters)

  return `${serviceURL}${encodeURIComponent(image)}?${queryString}`
}

export default imageServiceIconURL
