export interface AnyObject {
  [key: string]: any
}

export interface AnvilConfig {
  plugins: string[]
  settings: AnyObject
}
