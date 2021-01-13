import './Task.css';

function Task({ task, onChange }) {
  return (
    <div className={task.isCompleted ? 'task task--completed' : 'task'}>
      <input
        type="checkbox"
        className="task__checkbox"
        onChange={() => onChange(task)}
      />
      <div className="task__text-wrapper">
        <p className="task__text">{task.text}</p>
      </div>
      <div className="task__buttons">
        <button className="task__button task__button--edit"></button>
        <button className="task__button task__button--delete"></button>
      </div>
    </div>
  );
}

export default Task;
