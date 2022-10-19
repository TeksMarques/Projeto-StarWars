import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterName() {
  const { inputFilter, handleInputFilter } = useContext(StarWarsContext);
  return (
    <form>
      <input
        type="text"
        name="input-text"
        value={ inputFilter }
        onChange={ handleInputFilter }
        data-testid="name-filter"
      />
    </form>
  );
}

export default FilterName;
