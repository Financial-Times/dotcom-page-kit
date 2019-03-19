import React from 'react'
import Layout from '@financial-times/anvil-ui-ft-layout'

export default {
  title: 'Dogs',
  description: 'The dogs list page',
  component: DogsListPage,
  getInitialProps: async () => ({
    breeds: await fetchDogBreeds()
  }),
  getDependencies: async () => ({
    PageNavigation: (await import('../components/PageNavigation')).default
  })
}

DogsListPage.defaultProps = {
  breeds: []
}

function fetchDogBreeds() {
  return fetch('https://dog.ceo/api/breeds/list/all')
    .then((response) => response.json())
    .then((result) => Object.keys(result.message))
}

function DogsListPage({ breeds, PageNavigation }) {
  return (
    <Layout header={<PageNavigation />} headerAfter={<h1>Dog Breeds</h1>}>
      <p>A list of dog breeds:</p>
      <ul>
        {breeds.map((breed) => (
          <li key={breed}>
            <a id={`${breed}Link`} href={`/dogs/${breed}`}>
              {breed}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
