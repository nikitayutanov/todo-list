import './Input.css';
import { useState } from 'react';

function Input(props) {
  const { addTask, searchTasks } = props;
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState('add');

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
        case 'add':
          addTask(inputText);
          setInputText('');
          break;
        case 'search':
          searchTasks(inputText);
          break;
        default:
      }
    }
  };

  return (
    <section className="form-section">
      <form
        className="form"
        onSubmit={handleButtonClick}
      >
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
