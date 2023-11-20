'use client'
import { useEffect } from 'react'
import oHeader from '@financial-times/o-header/main'

export const ExampleClientOnly = () => {
  // eslint-disable-next-line no-console
  console.log('Hey, thanks for looking :)', document)
  useEffect(() => {
    // Make the DOM aware that JS is enabled
    // N.B. This is bad practice but necessary for Origami compatibility
    const headerElement = document.querySelector('header')
    headerElement?.removeAttribute('data-o-cheader--no-js')
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'))
    }
    const headerEl = document.querySelector('.o-header')
    new oHeader(headerEl)
    document.addEventListener('DOMContentLoaded', function () {
      document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'))
    })
  }, [])
  return <div>Client side code only, check your console!</div>
}
