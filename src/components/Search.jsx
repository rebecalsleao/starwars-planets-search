import React, { useContext, useState } from 'react';
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
    handleButtonColunmsSort,
  } = useContext(AppContext);

  const [sortColumnsSelectValue, setSortColumnsSelectValue] = useState('population');
  const [sortOrder, setSortOrder] = useState('ASC');

  const handleSelectSortColunms = (event) => {
    setSortColumnsSelectValue(event);
  };

  const handleRadioSortColunms = (event) => {
    setSortOrder(event);
  };

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
              data-testid="btn-remove-one-click"
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

      <label htmlFor="column-sort">
        Ordenar
        <select
          type="select"
          id="column-sort"
          value={ sortColumnsSelectValue }
          data-testid="column-sort"
          onChange={ (event) => handleSelectSortColunms(event.target.value) }
        >
          { options.map((option, index) => (
            <option key={ index } value={ option }>{ option }</option>
          )) }
        </select>
      </label>

      <div data-testid="column-sort-asc-desc-button">
        <label htmlFor="input-radio-asc">
          Ascendente
          <input
            id="input-radio-asc"
            type="radio"
            name="radio-sort"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ (event) => handleRadioSortColunms(event.target.value) }
          />
        </label>
        <label htmlFor="input-radio-des">
          Descendente
          <input
            id="input-radio-des"
            type="radio"
            name="radio-sort"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ (event) => handleRadioSortColunms(event.target.value) }
          />
        </label>

        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleButtonColunmsSort(
            sortColumnsSelectValue,
            sortOrder,
          ) }
        >
          Ordenar
        </button>
      </div>

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
