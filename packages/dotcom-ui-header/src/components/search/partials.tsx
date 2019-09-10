import React from 'react'

const Search = ({ appContext }) => {
  return (
    <div
      id={`o-header-search-${appContext}`}
      className={`o-header__row o-header__search o-header__search--${appContext}`}
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
          <label className="o-header__visually-hidden" htmlFor={`o-header-search-term-${appContext}`}>
            Search the <abbr title="Financial Times">FT</abbr>
          </label>
          <input
            className="o-header__search-term"
            id={`o-header-search-term-${appContext}`}
            name="q"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-trackable="search-term"
            placeholder="Search the FT"
            data-n-topic-search-input
          />
          <button className="o-header__search-submit" type="submit" data-trackable="search-submit">
            Search
          </button>
          <button
            className="o-header__search-close o--if-js"
            type="button"
            aria-controls={`o-header-search-${appContext}`}
            title="Close search bar"
            data-trackable="close">
            <span className="o-header__visually-hidden">Close search bar</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export { Search }
