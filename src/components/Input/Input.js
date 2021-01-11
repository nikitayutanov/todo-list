import './Input.css';

function Input() {
  return (
    <section class="form-section">
      <form class="form">
        <input type="text" class="form__input" />
        <input type="submit" class="form__button" value="ADD" />
      </form>
    </section>
  );
}

export default Input;
