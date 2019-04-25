const serviceURL = 'https://www.ft.com/__origami/service/image/v2/images/raw/'

function imageServiceIconURL(image: string, size: number): string {
  const queryString = ['source=update-logos', `width=${size}`, `height=${size}`, 'format=png']
  return `${serviceURL}${encodeURIComponent(image)}?${queryString.join('&')}`
}

export default imageServiceIconURL
