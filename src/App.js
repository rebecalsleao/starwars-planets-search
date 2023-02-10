import React from 'react';
import Search from './components/Search';
import Table from './components/Table';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <div>
      <Search />
      <Table />
      <AppProvider />
    </div>
  );
}

export default App;
