import './Controls.css';
import { useState } from 'react';

function Controls(props) {
  const { setCurrentFilter, clearTasks } = props;
  const [filterButtons, ,] = useState(['all', 'active', 'done']);

  const handleFilterButtonClick = ({ target: { value } }) => {
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
              defaultChecked={index === 0 ? true : false}
              onChange={handleFilterButtonClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Controls;
