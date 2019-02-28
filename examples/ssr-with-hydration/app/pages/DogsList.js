import React from 'react'

export default {
  title: 'Dogs',
  description: 'The dogs list page',
  component: DogsListPage,
  getInitialProps: async () => ({
    breeds: await fetchDogBreeds()
  }),
  getDependencies: async () => ({
    Page: (await import('../components/Page')).default
  })
}

function DogsListPage({ breeds, Page }) {
  return (
    <Page>
      <Page.Header>
        <h1>Dog Breeds</h1>
      </Page.Header>
      <Page.Body>
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
      </Page.Body>
    </Page>
  )
}

DogsListPage.defaultProps = {
  breeds: []
}

function fetchDogBreeds() {
  return fetch('https://dog.ceo/api/breeds/list/all')
    .then((response) => response.json())
    .then((result) => Object.keys(result.message))
}
