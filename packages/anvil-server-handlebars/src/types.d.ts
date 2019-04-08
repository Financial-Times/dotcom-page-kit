import { TemplateDelegate } from 'handlebars'

export type TRenderCallback = (error?: Error, output?: string) => any

export type TFilePaths = {
  [key: string]: string
}

export type TPartialTemplates = {
  [key: string]: TemplateDelegate
}
