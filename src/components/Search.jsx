import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Search() {
  const { handleFilterName,
    colunmsSearch,
    handleColunmsSearch,
    operator,
    handleOperatorSearch,
    numberValue,
    handleNumberValueSearch,
    handleFilterClick,
  } = useContext(AppContext);

  return (
    <div>
      <h1>Projeto Star Wars</h1>
      <input
        type="text"
        name="search"
        // value={ value }
        data-testid="name-filter"
        onChange={ (event) => handleFilterName(event.target.value) }
      />
      <br />

      <label htmlFor="column-input">
        Coluna
        <select
          type="select"
          id="column-input"
          value={ colunmsSearch }
          data-testid="column-filter"
          onChange={ (event) => handleColunmsSearch(event.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="operator-input">
        Operador
        <select
          type="select"
          id="operator-input"
          value={ operator }
          data-testid="comparison-filter"
          onChange={ (event) => handleOperatorSearch(event.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <input
        type="number"
        name="value-number"
        id="value-number"
        value={ numberValue }
        data-testid="value-filter"
        onChange={ (event) => handleNumberValueSearch(event.target.value) }
      />

      <button
        type="button"
        id="button-filter"
        data-testid="button-filter"
        onClick={ () => handleFilterClick() }
      >
        Filtrar

      </button>

    </div>
  );
}

export default Search;
