export default function loadClientEmbed(id: string) {
  const clientEmbedElement = document.getElementById(id)

  let data = {}

  if (clientEmbedElement) {
    try {
      data = JSON.parse(clientEmbedElement.innerHTML)
    } catch (error) {
      console.error('Client embed error', error) // eslint-disable-line no-console
    }
  }

  return Object.freeze(data)
}
