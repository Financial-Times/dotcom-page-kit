import { TNavAction } from '@financial-times/dotcom-types-navigation'

const availableActions: TNavAction[] = [
  { id: 'subscribe', name: 'Subscribe for full access', url: '/products?' }
]

export function getActions(): TNavAction[] {
  return availableActions
}
