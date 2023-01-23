import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [apiQuery, setApiQuery] = useState([]);

  const { makeFetch } = useFetch();

  useEffect(() => {
    const fetch = async () => {
      const data = await makeFetch();
      setApiData(data.results);
      setApiQuery(data.results);
    };
    fetch();
  }, []);

  const filterName = (name) => {
    const filterApi = apiData
      .filter((element) => element.name.toLowerCase().includes(name.toLowerCase()));
    setApiQuery(filterApi);
  };

  const values = { apiData, apiQuery, filterName };

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
