import { TNavAction } from '@financial-times/dotcom-types-navigation'

export function getSubscribeAction(): TNavAction {
  return {
    id: 'subscribe',
    name: 'Subscribe for full access',
    url: '/products?segmentId=4526c036-7527-ab37-9a29-0b0403fa0b5f'
  }
}
