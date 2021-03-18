import './Controls.css';
import * as actions from '../../actions/actions';
import * as selectors from '../../selectors';
import { useSelector, useDispatch } from 'react-redux';

const filterButtons = ['all', 'active', 'done'];
const {
  clearCurrentSearch,
  setCurrentFilter,
  clearTasks,
  stopTaskEditing,
} = actions;
const {
  selectCurrentFilter,
  selectSearchQuery,
  selectIsAnyTaskEditing,
} = selectors;

function Controls() {
  const currentFilter = useSelector(selectCurrentFilter);
  const searchQuery = useSelector(selectSearchQuery);
  const isAnyTaskEditing = useSelector(selectIsAnyTaskEditing);
  const dispatch = useDispatch();

  const handleClearButtonClick = () => {
    if (isAnyTaskEditing) {
      dispatch(stopTaskEditing());
    }

    dispatch(clearTasks());
  };

  const handleFilterButtonClick = ({ target: { value } }) => {
    if (searchQuery) {
      dispatch(clearCurrentSearch());
    }

    dispatch(setCurrentFilter(value));
  };

  return (
    <section className="controls">
      <button className="clear-button" onClick={handleClearButtonClick}>
        Clear
      </button>
      <div className="filter-buttons">
        {filterButtons.map((filterButton, index) => (
          <div className="filter-button" key={index}>
            <label
              className="filter-button__label"
              htmlFor={`filter-button--${filterButton}`}
            >
              {filterButton}
            </label>
            <input
              type="radio"
              name="filter-buttons"
              className="filter-button__radio"
              id={`filter-button--${filterButton}`}
              value={filterButton}
              checked={filterButton === currentFilter}
              onChange={handleFilterButtonClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Controls;
