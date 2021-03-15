import './Input.css';
import * as actions from '../../actions/actions';
import * as selectors from '../../selectors';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const {
  addTask,
  clearCurrentSearch,
  resetCurrentFilter,
  setSearchQuery,
} = actions;

const {
  selectFilteredTasks,
  selectCurrentFilter,
  selectSearchQuery,
} = selectors;

function Input() {
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState('add');
  const filteredTasks = useSelector(selectFilteredTasks);
  const currentFilter = useSelector(selectCurrentFilter);
  const searchQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  const handleInputChange = ({ target: { value } }) => {
    setInputText(value);
  };

  const handleInputModeChange = ({ target: { value } }) => {
    setInputMode(value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (inputText.trim()) {
      switch (inputMode) {
        case 'add': {
          if (searchQuery) {
            dispatch(clearCurrentSearch());
          }
          if (currentFilter !== 'all') {
            dispatch(resetCurrentFilter());
          }

          dispatch(addTask(inputText));
          setInputText('');
          break;
        }

        case 'search': {
          if (!filteredTasks.length && currentFilter !== 'all') {
            dispatch(resetCurrentFilter());
          }

          dispatch(setSearchQuery(inputText));
          break;
        }

        default:
      }
    }
  };

  return (
    <section className="form-section">
      <form className="form" onSubmit={handleButtonClick}>
        <input
          type="text"
          className="form__input"
          value={inputText}
          onChange={handleInputChange}
          autoFocus
        />
        <input type="submit" className="form__button" value={inputMode} />
      </form>
      <div className="form-switch" onChange={handleInputModeChange}>
        <input
          type="radio"
          name="form-switch-buttons"
          className="form-switch__button"
          id="form-switch__button--add"
          value="add"
          defaultChecked
        />
        <input
          type="radio"
          name="form-switch-buttons"
          className="form-switch__button"
          id="form-switch__button--search"
          value="search"
        />
      </div>
    </section>
  );
}

export default Input;
