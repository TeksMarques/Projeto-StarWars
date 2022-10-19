import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Filters />
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
