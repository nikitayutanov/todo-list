import './Input.css';

function Input({ value, onChange, onSubmit }) {
  return (
    <section className="form-section">
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          className="form__input"
          value={value}
          onChange={onChange}
          autoFocus
        />
        <input type="submit" className="form__button" value="ADD" />
      </form>
    </section>
  );
}

export default Input;
