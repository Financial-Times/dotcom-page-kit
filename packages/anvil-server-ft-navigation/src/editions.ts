import { TNavEdition, TNavEditions } from '@financial-times/anvil-types-navigation'

const availableEditions: TNavEdition[] = [
  {
    id: 'uk',
    name: 'UK',
    url: '/'
  },
  {
    id: 'international',
    name: 'International',
    url: '/'
  }
]

const editionIDs = availableEditions.map((edition) => edition.id)

export function isEdition(editionID: string): boolean {
  return editionIDs.includes(editionID)
}

export function getEditions(currentEdition: string): TNavEditions {
  return {
    current: availableEditions.find((edition) => edition.id === currentEdition),
    others: availableEditions.filter((edition) => edition.id !== currentEdition)
  }
}
