import './Controls.css';

function Controls(props) {
  const {
    filterButtons,
    setFilterButtons,
    clearTasks,
    clearCurrentSearch,
  } = props;

  const handleFilterButtonClick = ({ target: { value } }) => {
    clearCurrentSearch();
    setFilterButtons((prevButtons) =>
      prevButtons.map((prevButton) =>
        prevButton.text === value
          ? { ...prevButton, isChecked: true }
          : { ...prevButton, isChecked: false }
      )
    );
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
              htmlFor={`filter-button--${filterButton.text}`}
            >
              {filterButton.text}
            </label>
            <input
              type="radio"
              name="filter-buttons"
              className="filter-button__radio"
              id={`filter-button--${filterButton.text}`}
              value={filterButton.text}
              checked={filterButton.isChecked}
              onChange={handleFilterButtonClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Controls;
