import React from 'react';
import './App.css';
import FilterList from './components/FilterList';
import Filters from './components/Filters';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Filters />
        <FilterList />
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
