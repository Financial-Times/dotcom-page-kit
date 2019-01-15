import viewEngine from './viewEngine'
import createRenderer, { CreateRendererOptions } from './createRenderer'

export function create(options: CreateRendererOptions) {
  return createRenderer(options)
}

export function engine(options: CreateRendererOptions) {
  return viewEngine(options)
}
