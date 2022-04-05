import { TNavAction } from '@financial-times/dotcom-types-navigation'

const availableActions: TNavAction[] = [
  {
    id: 'subscribe',
    name: 'Subscribe for full access',
    url: '/products?segmentId=72adc702-369e-fc3e-1b5d-cacb5d193d80'
  }
]

export function getActions(): TNavAction[] {
  return availableActions
}
