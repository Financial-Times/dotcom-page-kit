export default class DataEmbedStore {
  private data: any;

  constructor(data: any) {
    this.data = Object.freeze(data)
  }

  get(key: string) {
    return this.data.hasOwnProperty(key) ? this.data[key] : undefined
  }

  getAll() {
    return this.data
  }
}
