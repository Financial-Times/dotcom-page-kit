import React from 'react'

const Search = ({ instance }) => {
  const inputId = `o-header-search-term-${instance}`
  return (
    <div
      id={`o-header-search-${instance}`}
      className={`o-header__row o-header__search o-header__search--${instance}`}
      data-trackable="header-search"
      data-o-header-search
    >
      <div className="o-header__container">
        <form
          className="o-header__search-form"
          action="/search"
          role="search"
          aria-label="Site search"
          data-n-topic-search
        >
          <label htmlFor={inputId} className="o-header__search-term o-forms-field o-forms-field--optional">
            <span className="o-forms-title o-header__visually-hidden">
              <span className="o-forms-title__main">
                Search the <abbr title="Financial Times">FT</abbr>
              </span>
            </span>
            <span className="o-forms-input o-forms-input--text o-forms-input--suffix">
              <input
                id={inputId}
                name="q"
                type="search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="Search for stories, topics or securities"
                role="combobox"
                aria-controls={`suggestions-${inputId}`}
              />
              <button className="o-header__search-submit" type="submit">
                <span aria-hidden="true" className="o-header__search-icon"></span>
                <span>Search</span>
              </button>
              <button
                className="o-header__search-close o--if-js"
                type="button"
                aria-controls={`o-header-search-${instance}`}
                title="Close search bar"
                data-trackable="close"
              >
                <span className="o-header__visually-hidden">Close search bar</span>
                <span>Close</span>
              </button>
            </span>
          </label>
        </form>
      </div>
    </div>
  )
}

export { Search }
