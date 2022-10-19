import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);

  useEffect(() => {
    const Api = async () => {
      const url = await fetch('https://swapi.dev/api/planets');
      const { results } = await url.json();
      const final = results.filter((e) => delete e.residents);
      setPlanetsList(final);
    };
    Api();
  }, []);

  const planets = useMemo(() => ({ planetsList }), [planetsList]);
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
