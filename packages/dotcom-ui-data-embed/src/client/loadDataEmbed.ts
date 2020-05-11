export default function loadDataEmbed(id: string) {
  const dataEmbedElement = document.getElementById(id)

  let data = {}

  if (dataEmbedElement) {
    try {
      data = JSON.parse(dataEmbedElement.innerHTML)
    } catch (error) {
      console.error('Data embed error', error) // eslint-disable-line no-console
    }
  }

  return Object.freeze(data)
}
