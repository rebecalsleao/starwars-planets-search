import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const filtersOptionsColumns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const [apiData, setApiData] = useState([]);
  const [apiQuery, setApiQuery] = useState([]);
  const [colunmsSearch, setColunmsSearch] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [numberValue, setNumberValue] = useState(0);
  const [options, setOptions] = useState(filtersOptionsColumns);
  const [filters, setFilters] = useState([]);

  const { makeFetch } = useFetch();

  useEffect(() => {
    const fetch = async () => {
      const data = await makeFetch();
      setApiData(data.results);
      setApiQuery(data.results);
    };
    fetch();
  }, []);

  const handleFilterName = (name) => {
    const filterApi = apiData
      .filter((element) => element.name.toLowerCase().includes(name.toLowerCase()));
    setApiQuery(filterApi);
  };

  const handleColunmsSearch = (value) => {
    setColunmsSearch(value);
  };

  const handleOperatorSearch = (value) => {
    setOperator(value);
  };

  const handleNumberValueSearch = (value) => {
    setNumberValue(value);
  };

  const handleFilterClick = () => {
    switch (operator) {
    case 'maior que': {
      const biggerFilter = apiQuery.filter((planet) => (
        Number(planet[colunmsSearch]) > numberValue
      ));
      setApiQuery(biggerFilter);
      const optionsColumnsArray = options.filter((option) => option !== colunmsSearch);
      setOptions(optionsColumnsArray);
      setColunmsSearch(optionsColumnsArray[0]);
      setFilters([...filters, { colunmsSearch, operator, numberValue }]);
      break;
    }
    case 'menor que': {
      const smallerFilter = apiQuery.filter((planet) => (
        Number(planet[colunmsSearch]) < numberValue
      ));
      setApiQuery(smallerFilter);
      const optionsColumnsArray = options.filter((option) => option !== colunmsSearch);
      setOptions(optionsColumnsArray);
      setColunmsSearch(optionsColumnsArray[0]);
      setFilters([...filters, { colunmsSearch, operator, numberValue }]);
      break;
    }
    case 'igual a': {
      const equalFilter = apiQuery.filter((planet) => (
        Number(planet[colunmsSearch]) === Number(numberValue)
      ));
      setApiQuery(equalFilter);
      const optionsColumnsArray = options.filter((option) => option !== colunmsSearch);
      setOptions(optionsColumnsArray);
      setColunmsSearch(optionsColumnsArray[0]);
      setFilters([...filters, { colunmsSearch, operator, numberValue }]);
      break;
    }
    default:
      break;
    }
  };

  const handleRemoveAllClick = () => {
    setOptions(filtersOptionsColumns);
    setColunmsSearch(filtersOptionsColumns[0]);
    setFilters([]);
    setApiQuery(apiData);
  };

  const handleRemoveOneClick = (event) => {
    const indexToRemove = event.target.id;
    let newFilters = [];
    if (filters.length > 1) {
      newFilters = [...filters];
      newFilters.splice(indexToRemove, 1);
      setFilters(newFilters);
    } else {
      setFilters(newFilters);
    }

    const arrayFinal = [];
    apiData.forEach((data) => {
      const planetsFilterList = [];
      newFilters.forEach((filter) => {
        let passedThisFilter = false;
        if (filter.operator === 'maior que') {
          passedThisFilter = +data[filter.colunmsSearch]
           > +filter.numberValue;
        } else if (filter.operator === 'menor que') {
          passedThisFilter = +data[filter.colunmsSearch]
           < +filter.numberValue;
        } else {
          passedThisFilter = +data[filter.colunmsSearch]
          === +filter.numberValue;
        }

        planetsFilterList.push(passedThisFilter);
      });

      const thereIsFalseFilter = planetsFilterList.some(
        (filter) => filter === false,
      );
      if (!thereIsFalseFilter) {
        arrayFinal.push(data);
      }
    });

    setApiQuery(arrayFinal);
  };

  const values = {
    apiData,
    apiQuery,
    handleFilterName,
    colunmsSearch,
    handleColunmsSearch,
    operator,
    handleOperatorSearch,
    numberValue,
    handleNumberValueSearch,
    handleFilterClick,
    options,
    filters,
    handleRemoveAllClick,
    handleRemoveOneClick,
  };

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default AppProvider;
