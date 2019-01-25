import * as React from 'react'

const Search: React.FC = () => {
  return (
    <div className="o-header__drawer-search">
      <form className="o-header__drawer-search-form" action="/search" role="search" aria-label="Site search">
        <label className="o-header__visually-hidden" htmlFor="o-header-drawer-search-term">
          Search the <abbr title="Financial Times">FT</abbr>
        </label>
        <input
          className="o-header__drawer-search-term"
          id="o-header-drawer-search-term"
          name="q"
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Search the FT"
        />
        <button className="o-header__drawer-search-submit" type="submit">
          <span className="o-header__visually-hidden">Search</span>
        </button>
      </form>
    </div>
  )
}

export default Search
