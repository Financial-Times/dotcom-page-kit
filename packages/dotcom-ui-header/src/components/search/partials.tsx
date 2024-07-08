import React from 'react'

const Search = ({ instance }) => {
  return (
    <div
      id={`o-header-search-${instance}`}
      className={`o-header__row o-header__search o-header__search--${instance}`}
      data-trackable="header-search"
      data-o-header-search>
      <div className="o-header__container">
        <form
          className="o-header__search-form"
          action="/search"
          role="search"
          aria-label="Site search"
          data-n-topic-search
          data-n-topic-search-categories="concepts,equities"
          data-n-topic-search-view-all>
          <label
            htmlFor={`o-header-search-term-${instance}`}
            className="o-header__search-term o-forms-field o-forms-field--optional">
            <span className="o-forms-title o-header__visually-hidden">
              <span className="o-forms-title__main">
                Search the <abbr title="Financial Times">FT</abbr>
              </span>
            </span>
            <span className="o-forms-input o-forms-input--text o-forms-input--suffix">
              <input
                className="o-header__search-term"
                id={`o-header-search-term-${instance}`}
                name="q"
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                data-trackable="search-term"
                data-n-topic-search-input
                placeholder="Search for stories, topics or securities"
              />
              <button className="o-header__search-submit" type="submit">
                Search
              </button>
              <button
                className="o-header__search-close o--if-js"
                type="button"
                aria-controls={`o-header-search-${instance}`}
                title="Close search bar"
                data-trackable="close">
                <span className="o-header__visually-hidden">Close search bar</span>
              </button>
            </span>
          </label>
        </form>
      </div>
    </div>
  )
}

export { Search }
