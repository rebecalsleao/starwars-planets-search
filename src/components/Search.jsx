import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Search() {
  const {
    handleFilterName,
    colunmsSearch,
    handleColunmsSearch,
    operator,
    handleOperatorSearch,
    numberValue,
    handleNumberValueSearch,
    handleFilterClick,
    options,
    handleRemoveAllClick,
    filters,
    handleRemoveOneClick,
  } = useContext(AppContext);

  const showFilters = () => {
    if (filters.length > 0) {
      return (
        filters.map((filter, index) => (
          <section
            key={ index }
            data-testid="filter"
          >
            <div>
              {filter.colunmsSearch}
              {filter.operator}
              {filter.numberValue}
            </div>
            <button
              type="button"
              id={ index }
              onClick={ handleRemoveOneClick }
            >
              Limpar
            </button>
          </section>
        ))
      );
    }
  };

  return (
    <div>
      <h1>Projeto Star Wars</h1>
      <input
        type="text"
        name="search"
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
          { options.map((option, index) => (
            <option key={ index } value={ option }>{ option }</option>
          )) }
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
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ (event) => handleRemoveAllClick(event) }
      >
        Remover Filtros
      </button>
      { showFilters() }

    </div>
  );
}

export default Search;
