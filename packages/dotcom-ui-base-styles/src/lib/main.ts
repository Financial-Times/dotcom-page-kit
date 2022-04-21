import { debounce, throttle } from '@financial-times/o-utils'
import cookieStore from './cookies'
import perfMark from './perf-mark'
import ascii from './to-ascii'

const getSpoorNumber = () => {
  let spoorId = cookieStore.get('spoor-id').replace(/-/g, '')
  spoorId = spoorId.substring(spoorId.length - 12, spoorId.length) // Don't overflow the int
  return parseInt(spoorId, 16)
}

const $ = function (sel, ctx) {
  return (ctx || document).querySelector(sel)
}

const $$ = function (sel, ctx) {
  return [].slice.call((ctx || document).querySelectorAll(sel))
}

const uuid = function uuid(a) {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : // @ts-ignore
      ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid)
}

const broadcast = function (name, data, bubbles = true) {
  const rootEl = Element.prototype.isPrototypeOf(this) ? this : document.body
  let event

  try {
    event = new CustomEvent(name, { bubbles: bubbles, cancelable: true, detail: data })
  } catch (e) {
    event = new CustomEvent(name, { bubbles: true, cancelable: true, detail: data })
  }
  rootEl.dispatchEvent(event)
}

const sampleUsers = (pct, seed) => {
  if (!seed) {
    throw new Error('sampleUsers needs a seed string to be passed in as the second parameter')
  }
  const seedAsNumber = seed.split('').reduce((num, str, i) => num + Math.pow(2, i) * str.charCodeAt(0), 0)
  return (getSpoorNumber() + seedAsNumber) % 100 < pct
}

const createToggler = ({ flag = true, callback }) => {
  return () => {
    if (typeof callback === 'function') {
      callback({ flag })
    }
    flag = !flag
    return flag
  }
}

export {
  $,
  $$,
  debounce,
  throttle,
  uuid,
  ascii,
  broadcast,
  perfMark,
  sampleUsers,
  cookieStore,
  createToggler
}
