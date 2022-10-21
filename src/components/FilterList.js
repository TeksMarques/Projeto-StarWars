import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterList() {
  const { filtersNumerics } = useContext(StarWarsContext);
  return (
    <ul>
      {
        filtersNumerics.map(({ column, comparison, value }, index) => (
          <li data-testid="filter" key={ index }>
            {`${column} ${comparison} ${value}`}
            <button type="button" data-testid="button-remove">
              Remover
            </button>
          </li>
        ))
      }
    </ul>
  );
}

export default FilterList;
