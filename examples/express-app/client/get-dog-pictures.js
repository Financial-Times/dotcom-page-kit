const defaults = {
  breeds: []
}

export default class GetDogPictures {
  constructor(options) {
    this.options = { ...defaults, ...options }
    this.cache = new Map()
  }

  async andPutThemIn(target) {
    try {
      const images = await Promise.all(this.options.breeds.map((breed) => this.fetch(breed)))

      images.forEach((image, i) => {
        target.innerHTML += this.render(this.options.breeds[i], image)
      })
    } catch (error) {
      console.error('Looks like we failed there, sorry...', error) // eslint-disable-line no-console
    }
  }

  async fetch(breed) {
    if (this.cache.has(breed)) {
      return this.cache.get(breed)
    }

    const url = `https://dog.ceo/api/breed/${breed}/images/random`
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()

      if (data.status === 'success' && typeof data.message === 'string') {
        return this.cache.set(breed, data.message).get(breed)
      } else {
        throw Error(`Oh deary! The API response for ${breed} looks to be invalid.`)
      }
    } else {
      throw Error(`Oh no! Could not get ${breed}, the API returned a ${response.status}.`)
    }
  }

  render(breed, url) {
    return `<img src="${url}" alt="A nice ${breed}">`
  }
}
