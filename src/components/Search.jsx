import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Search() {
  const { filterName, value } = useContext(AppContext);

  return (
    <div>
      <h1>Projeto Star Wars</h1>
      <input
        type="text"
        name="search"
        value={ value }
        data-testid="name-filter"
        onChange={ (event) => filterName(event.target.value) }
      />
    </div>
  );
}

export default Search;
