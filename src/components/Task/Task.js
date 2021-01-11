import './Task.css';

function Task() {
  return (
    <div class="task">
      <input type="checkbox" class="task__checkbox" />
      <div class="task__text-wrapper">
        <p class="task__text">Lorem ipsum, dolor sit amet.</p>
      </div>
      <div class="task__buttons">
        <button class="task__button task__button--edit"></button>
        <button class="task__button task__button--delete"></button>
      </div>
    </div>
  );
}

export default Task;
