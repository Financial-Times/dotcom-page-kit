const fontLabels = ['sans', 'sansBold', 'display', 'displayBold']

export const fontLoaderClassNames = fontLabels.reduce(
  (prev, fontLabel) => `${prev} o-typography--loading-${fontLabel}`.slice(1),
  ''
)
