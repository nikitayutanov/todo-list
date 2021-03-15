import './Task.css';
import * as actions from '../../actions/actions';
import { useState, useLayoutEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const {
  removeTask,
  toggleTaskCompletion,
  editTask,
  changeTask,
  toggleTaskEditing,
} = actions;

function Task({ task, isAnyTaskEditing }) {
  const [textareaText, setTextareaText] = useState('');
  const dispatch = useDispatch();
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

  const handleCompleteButtonClick = () => {
    dispatch(toggleTaskCompletion(task.id));
  };

  const handleDeleteButtonClick = () => {
    dispatch(removeTask(task.id));

    if (task.isEditing) {
      dispatch(toggleTaskEditing());
    }
  };

  const handleEditButtonClick = () => {
    if (!task.isEditing && !isAnyTaskEditing) {
      setTextareaText(task.text);
      dispatch(editTask(task.id));
      dispatch(toggleTaskEditing());
    } else if (task.isEditing && textareaText.trim()) {
      dispatch(changeTask(textareaText, task.id));
      dispatch(toggleTaskEditing());
      setTextareaText('');
    }

    focusTextarea();
  };

  useLayoutEffect(resizeTextarea, []);

  return (
    <li className={task.isCompleted ? 'task task--completed' : 'task'}>
      <input
        type="checkbox"
        className="task__checkbox"
        onChange={handleCompleteButtonClick}
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
          onClick={handleDeleteButtonClick}
        ></button>
      </div>
    </li>
  );
}

export default Task;
