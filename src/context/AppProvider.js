import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const [apiData, setApiData] = useState([]);

  const { makeFetch } = useFetch();

  useEffect(() => {
    const fetch = async () => {
      const data = await makeFetch();
      return setApiData(data.results);
    };
    fetch();
  }, []);

  const values = { apiData };

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
