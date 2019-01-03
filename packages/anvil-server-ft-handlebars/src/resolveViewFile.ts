import path from 'path'

export default function(view: string): string {
  if (!path.isAbsolute(view)) {
    view = path.join(this.options.directory, this.options.viewsDirectory, view)
  }

  if (!view.endsWith(this.options.extname)) {
    view += this.options.extname
  }

  return view
}
