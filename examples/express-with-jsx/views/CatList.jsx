import React from 'react'

export default ({ data }) => (
  <dl className="CatList">
    {data.map(({ breed, photo }) => (
      <React.Fragment key={`cat-${breed}`}>
        <dt className="CatList-name">{breed}</dt>
        <dd className="CatList-content">
          <img className="CatList-photo" src={photo} alt={`A good ${breed}`} />
        </dd>
      </React.Fragment>
    ))}
  </dl>
)
