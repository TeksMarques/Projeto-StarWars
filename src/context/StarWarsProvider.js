import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planetsList, getPlanetsList] = useState([]);
  const [inputFilter, getInputFilter] = useState([]);

  useEffect(() => {
    const Api = async () => {
      const url = await fetch('https://swapi.dev/api/planets');
      const { results } = await url.json();
      const final = results.filter((e) => delete e.residents);
      getPlanetsList(final);
    };
    Api();
  }, []);

  const handleInputFilter = ({ target: { value } }) => {
    getInputFilter(value);
  };

  const planets = useMemo(() => (
    { planetsList, inputFilter, handleInputFilter }), [planetsList, inputFilter]);
  return (
    <StarWarsContext.Provider value={ planets }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;

export default StarWarsProvider;
