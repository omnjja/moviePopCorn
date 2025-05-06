import React from 'react'

const Search = ({ setQuery, query, setSearch }) => {
  function handleSearch(e) {
    setQuery(e.target.value);
    setSearch(false);
  }
    return (
        <input
          className="search"
          type="text"
          name=""
          placeholder="search ..."
          value={query}
          onChange={(e) => handleSearch(e)}
        />
      );
}

export default Search
