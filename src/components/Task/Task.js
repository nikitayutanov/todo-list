import './Task.css';

function Task({ text }) {
  return (
    <div className="task">
      <input type="checkbox" className="task__checkbox" />
      <div className="task__text-wrapper">
        <p className="task__text">{text}</p>
      </div>
      <div className="task__buttons">
        <button className="task__button task__button--edit"></button>
        <button className="task__button task__button--delete"></button>
      </div>
    </div>
  );
}

export default Task;
