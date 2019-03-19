import React from 'react'
import Layout from '@financial-times/anvil-ui-ft-layout'

export default {
  title: 'Dog',
  description: 'The dog page',
  component: DogImagesPage,
  getInitialProps: async ({ req }) => ({
    breed: req.params.breed,
    breedImages: await fetchDogImages(req.params.breed)
  }),
  getDependencies: async () => ({
    PageNavigation: (await import('../components/PageNavigation')).default
  })
}

function fetchDogImages(breed) {
  return fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then((response) => response.json())
    .then((result) => result.message)
}

function DogImagesPage({ breed, breedImages, PageNavigation }) {
  return (
    <Layout header={<PageNavigation />} headerAfter={<h1>Dog Breeds</h1>}>
      <p>Images of {breed}:</p>
      {breedImages.map((img) => (
        <img id="dogImage" src={img} key={img} />
      ))}
    </Layout>
  )
}
