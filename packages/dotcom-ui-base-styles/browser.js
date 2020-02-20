import oTypography from 'o-typography'

// Polyfill for :focus-visible https://github.com/WICG/focus-visible
// NOTE: v5 of this polyfill is not yet supported by o-normalise
// https://github.com/WICG/focus-visible/pull/196/files
// https://github.com/Financial-Times/o-normalise/issues/41
import 'focus-visible'

export function init() {
  oTypography.init()
}
