import HandlebarsRenderer, { TOptions } from './HandlebarsRenderer'

export function create(options: TOptions): HandlebarsRenderer {
  return new HandlebarsRenderer(options)
}

export function engine(options: TOptions): HandlebarsRenderer['renderView'] {
  const instance = create(options)
  return instance.renderView.bind(instance)
}
