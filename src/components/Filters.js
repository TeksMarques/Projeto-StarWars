import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];
function Filters() {
  const { inputFilter,
    handleInputFilter,
    quantity,
    quantityForm,
    getQuantity,
    getQuantityForm,
    column,
    columns,
    Filtro,
  } = useContext(StarWarsContext);
  return (
    <form>
      <input
        type="text"
        name="input-text"
        value={ inputFilter }
        onChange={ handleInputFilter }
        data-testid="name-filter"
      />
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ columns }
      >
        {OPTIONS.map((e) => (
          <option key={ e } value={ e }>
            {e}
          </option>
        ))}
      </select>

      <select
        value={ quantityForm }
        onChange={ getQuantityForm }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ quantity }
        onChange={ getQuantity }
      />

      <button type="button" data-testid="button-filter" onClick={ Filtro }>
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
