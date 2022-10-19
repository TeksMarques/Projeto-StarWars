import React from 'react';
import './App.css';
import FilterName from './components/FilterName';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <FilterName />
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
