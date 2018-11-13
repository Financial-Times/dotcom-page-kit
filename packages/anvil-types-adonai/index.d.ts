export interface Amender {
  (hook: string, value: any): any
}

export interface OptionalAmender {
  amend?: Amender
}
