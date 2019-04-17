import React from 'react'

export default {
  title: 'Dog',
  description: 'The dog page',
  component: DogImagesPage,
  getInitialProps: async ({ req }) => ({
    breed: req.params.breed,
    breedImages: await fetchDogImages(req.params.breed)
  }),
  getDependencies: async () => ({
    Page: (await import('../components/Page')).default
  })
}

function DogImagesPage({ breed, breedImages, Page }) {
  return (
    <Page title="Dog breeds">
      <h1>Dog Breeds</h1>
      <p>Images of {breed}:</p>
      {breedImages.map((img) => (
        <img id="dogImage" src={img} key={img} />
      ))}
    </Page>
  )
}

function fetchDogImages(breed) {
  return fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then((response) => response.json())
    .then((result) => result.message)
}
