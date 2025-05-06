import React from 'react'
import Search from "./Search"

const Header = ({ setMovies, setQuery, query, len, setSearch }) => {
    return (
        <div className="header">
          <div className="logo">🎭 PopCorn</div>
          <Search setMovies={setMovies} setQuery={setQuery} query={query} setSearch={setSearch} />
          <div className="found">{`Found ${len ? len : 0} results`}</div>
        </div>
      );
}

export default Header
