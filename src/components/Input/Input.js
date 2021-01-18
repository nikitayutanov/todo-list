import './Input.css';
import { useState } from 'react';

function Input(props) {
  const { onSubmit } = props;
  const [inputText, setInputText] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    setInputText(value);
  };

  return (
    <section className="form-section">
      <form
        className="form"
        onSubmit={(e) => onSubmit(e, inputText, setInputText)}
      >
        <input
          type="text"
          className="form__input"
          value={inputText}
          onChange={handleInputChange}
          autoFocus
        />
        <input type="submit" className="form__button" value="ADD" />
      </form>
    </section>
  );
}

export default Input;
