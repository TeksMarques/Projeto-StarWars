import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

const options = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function StarWarsProvider({ children }) {
  const [planetsList, getPlanetsList] = useState([]);
  const [planetFiltro, getplanetFilterLister] = useState([]);
  const [inputFilter, getInputFilter] = useState('');
  const [column, setColumn] = useState('population');
  const [quantity, setQuantity] = useState(0);
  const [quantityForm, setQuantityForm] = useState('maior que');
  const [filtersNumerics, setNumerics] = useState([]);
  const [optionsNumerics, setOptionsNumerics] = useState(options);

  const columns = ({ target: { value } }) => {
    setColumn(value);
  };

  const getQuantity = ({ target: { value } }) => {
    setQuantity(value);
  };

  const getQuantityForm = ({ target: { value } }) => {
    setQuantityForm(value);
  };

  const Filtro = () => {
    if (quantityForm === 'maior que') {
      const final = planetsList.filter((e) => +e[column] > +quantity);
      getPlanetsList(final);
    }
    if (quantityForm === 'menor que') {
      const final = planetsList.filter((e) => +e[column] < +quantity);
      getPlanetsList(final);
    }
    if (quantityForm === 'igual a') {
      const final = planetsList.filter((e) => +e[column] === +quantity);
      getPlanetsList(final);
    }

    setNumerics([...filtersNumerics,
      { column, comparison: quantityForm, value: quantity }]);
    const filter = optionsNumerics.filter((e) => e !== column);
    setOptionsNumerics(filter);
    setColumn(filter[0]);
  };

  useEffect(() => {
    const Api = async () => {
      const url = await fetch('https://swapi.dev/api/planets');
      const { results } = await url.json();
      const final = results.filter((e) => delete e.residents);
      getPlanetsList(final);
      getplanetFilterLister(final);
    };
    Api();
  }, []);

  const handleInputFilter = ({ target: { value } }) => {
    getInputFilter(value);
  };

  const removeAllFilters = () => {
    setNumerics([]);
    setOptionsNumerics(options);
    getPlanetsList(planetFiltro);
  };

  const planets = useMemo(
    () => (
      { planetsList,
        inputFilter,
        handleInputFilter,
        column,
        columns,
        quantity,
        quantityForm,
        getQuantity,
        getQuantityForm,
        Filtro,
        filtersNumerics,
        optionsNumerics,
        removeAllFilters,
      }),
    [planetsList, inputFilter, column, quantity, quantityForm, filtersNumerics],
  );
  return (
    <StarWarsContext.Provider value={ planets }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default StarWarsProvider;

// feito com ajuda do Felipe Lima e Vinicius Campos//
