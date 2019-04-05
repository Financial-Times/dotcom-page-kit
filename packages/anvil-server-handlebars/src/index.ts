import HandlebarsRenderer, { TOptions } from './HandlebarsRenderer'

export function create(options: TOptions) {
  return new HandlebarsRenderer(options)
}

export function engine(options: TOptions) {
  const instance = create(options)
  return instance.renderView.bind(instance)
}
