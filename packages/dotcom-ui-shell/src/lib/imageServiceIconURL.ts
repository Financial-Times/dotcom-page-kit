import querystring from 'querystring'

function imageServiceIconURL(image: string, size: number, format = 'png'): string {
  const serviceURL = 'https://www.ft.com/__origami/service/image/v2/images/raw/'

  const serviceParameters = {
    source: 'update-logos',
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
