import React from "react";

function SearchEngine({ query, setQuery, search }) {
 
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(e); 
    }
  };

  return (
    <div className="SearchEngine">
      <input
        type="text"
        className="city-search"
        placeholder="Enter city name"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        onKeyDown={handleKeyDown} 
      />
      <button onClick={search}>
        <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
      </button>
    </div>
  );
}

export default SearchEngine;
