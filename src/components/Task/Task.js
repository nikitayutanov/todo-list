import './Task.css';
import { useState, useEffect, useRef } from 'react';

function Task(props) {
  const { task, toggleTaskCompletion, toggleTaskEditing, removeTask } = props;
  const [textareaText, setTextareaText] = useState('');
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    textareaRef.current.style.height = `auto`;
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const focusTextarea = () => {
    const pos = textareaRef.current.value.length;
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(pos, pos);
  };

  const handleTextareaChange = ({ target: { value } }) => {
    setTextareaText(value);
    resizeTextarea();
  };

  const handleEditButtonClick = () => {
    toggleTaskEditing(task, textareaText, setTextareaText);
    focusTextarea();
  };

  useEffect(resizeTextarea, []);

  return (
    <li className={task.isCompleted ? 'task task--completed' : 'task'}>
      <input
        type="checkbox"
        className="task__checkbox"
        onChange={() => toggleTaskCompletion(task)}
        checked={task.isCompleted}
        disabled={task.isEditing}
      />
      <div className="task__text-wrapper">
        <textarea
          rows="1"
          className="task__text"
          value={task.isEditing ? textareaText : task.text}
          ref={textareaRef}
          onChange={handleTextareaChange}
          readOnly={!task.isEditing}
        ></textarea>
      </div>
      <div className="task__buttons">
        <button
          className="task__button task__button--edit"
          onClick={handleEditButtonClick}
          disabled={task.isCompleted}
        ></button>
        <button
          className="task__button task__button--delete"
          onClick={() => removeTask(task)}
        ></button>
      </div>
    </li>
  );
}

export default Task;
