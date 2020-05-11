export default class DataEmbedStore {
  private data

  constructor(data) {
    this.data = Object.freeze(data)
  }

  get(key: string) {
    return this.data.hasOwnProperty(key) ? this.data[key] : undefined
  }

  getAll() {
    return this.data
  }
}
