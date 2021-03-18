import './Task.css';
import * as actions from '../../actions/actions';
import * as selectors from '../../selectors';
import { useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const {
  selectEditingTaskId,
  selectEditingTaskText,
  selectIsAnyTaskEditing,
} = selectors;

const {
  removeTask,
  toggleTaskCompletion,
  changeTask,
  startTaskEditing,
  setEditingText,
  stopTaskEditing,
} = actions;

function Task({ task }) {
  const { text, id, isCompleted } = task;

  const editingTaskId = useSelector(selectEditingTaskId);
  const editingTaskText = useSelector(selectEditingTaskText);
  const isAnyTaskEditing = useSelector(selectIsAnyTaskEditing);
  const dispatch = useDispatch();
  const textareaRef = useRef(null);

  const isTaskEditing = id === editingTaskId;

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
    dispatch(setEditingText(value));
    resizeTextarea();
  };

  const handleCompleteButtonClick = () => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleDeleteButtonClick = () => {
    dispatch(removeTask(id));

    if (isAnyTaskEditing) {
      dispatch(stopTaskEditing());
    }
  };

  const handleEditButtonClick = () => {
    if (!isAnyTaskEditing) {
      dispatch(startTaskEditing(id, text));
      focusTextarea();
    } else if (isTaskEditing && editingTaskText.trim()) {
      dispatch(changeTask(id, editingTaskText));
      dispatch(stopTaskEditing());
    }
  };

  useLayoutEffect(resizeTextarea, []);

  return (
    <li className={isCompleted ? 'task task--completed' : 'task'}>
      <input
        type="checkbox"
        className="task__checkbox"
        onChange={handleCompleteButtonClick}
        checked={isCompleted}
        disabled={isTaskEditing}
      />
      <div className="task__text-wrapper">
        <textarea
          rows="1"
          className="task__text"
          value={isTaskEditing ? editingTaskText : text}
          ref={textareaRef}
          onChange={handleTextareaChange}
          readOnly={!isTaskEditing}
        ></textarea>
      </div>
      <div className="task__buttons">
        <button
          className="task__button task__button--edit"
          onClick={handleEditButtonClick}
          disabled={isCompleted || (isAnyTaskEditing && !isTaskEditing)}
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
