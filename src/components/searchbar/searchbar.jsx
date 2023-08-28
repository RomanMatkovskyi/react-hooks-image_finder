import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearchBar = event => {
    setSearch(event.target.value);
  };

  const confirmSearch = event => {
    event.preventDefault();
    onSearch(search, 1);
    setSearch('');
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={confirmSearch}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          value={search}
          onChange={handleSearchBar}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;
