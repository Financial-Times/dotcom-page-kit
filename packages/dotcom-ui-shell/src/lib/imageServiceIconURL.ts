import querystring from 'querystring'

function imageServiceIconURL(image: string, size: number, format: string): string {
  const serviceURL = 'https://www.ft.com/__origami/service/image/v2/images/raw/'

  const queryString = querystring.stringify({
    source: 'update-logos',
    width: size,
    height: size,
    format: format || 'png'
  })

  return `${serviceURL}${encodeURIComponent(image)}?${queryString}`
}

export default imageServiceIconURL
