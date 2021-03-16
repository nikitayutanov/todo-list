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
  const { text, id, isCompleted, isEditing } = task;

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
    dispatch(toggleTaskCompletion(id));
  };

  const handleDeleteButtonClick = () => {
    dispatch(removeTask(id));

    if (isEditing) {
      dispatch(toggleTaskEditing());
    }
  };

  const handleEditButtonClick = () => {
    if (!isEditing && !isAnyTaskEditing) {
      setTextareaText(text);
      dispatch(editTask(id));
      dispatch(toggleTaskEditing());
    } else if (isEditing && textareaText.trim()) {
      dispatch(changeTask(textareaText, id));
      dispatch(toggleTaskEditing());
      setTextareaText('');
    }

    focusTextarea();
  };

  useLayoutEffect(resizeTextarea, []);

  return (
    <li className={isCompleted ? 'task task--completed' : 'task'}>
      <input
        type="checkbox"
        className="task__checkbox"
        onChange={handleCompleteButtonClick}
        checked={isCompleted}
        disabled={isEditing}
      />
      <div className="task__text-wrapper">
        <textarea
          rows="1"
          className="task__text"
          value={isEditing ? textareaText : text}
          ref={textareaRef}
          onChange={handleTextareaChange}
          readOnly={!isEditing}
        ></textarea>
      </div>
      <div className="task__buttons">
        <button
          className="task__button task__button--edit"
          onClick={handleEditButtonClick}
          disabled={isCompleted}
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
