import './Controls.css';
import { useState } from 'react';

function Controls(props) {
  const {
    currentFilter,
    setCurrentFilter,
    clearTasks,
    clearCurrentSearch,
  } = props;
  const [filterButtons, ,] = useState(['all', 'active', 'done']);

  const handleFilterButtonClick = ({ target: { value } }) => {
    clearCurrentSearch();
    setCurrentFilter(value);
  };

  return (
    <section className="controls">
      <button className="clear-button" onClick={clearTasks}>
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
              checked={filterButton === currentFilter ? true : false}
              onChange={handleFilterButtonClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Controls;
