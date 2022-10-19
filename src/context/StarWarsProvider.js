import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planetsList, getPlanetsList] = useState([]);
  const [inputFilter, getInputFilter] = useState('');
  const [column, setColumn] = useState('population');
  const [quantity, setQuantity] = useState(0);
  const [quantityForm, setQuantityForm] = useState('maior que');

  const columns = ({ target: { value } }) => {
    setColumn(value);
  };

  const getQuantity = ({ target: { value } }) => {
    setQuantity(value);
  };

  const getQuantityForm = ({ target: { value } }) => {
    setQuantityForm(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  };

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
        Filtro }),
    // eslint-disable-next-line function-paren-newline
    [planetsList, inputFilter, column, quantity, quantityForm]);
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
