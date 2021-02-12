import './List.css';
import { Fragment, useState } from 'react';
import Task from '../Task/Task';
import Controls from '../Controls/Controls';

function List(props) {
  const {
    tasks,
    toggleTaskCompletion,
    toggleTaskEditing,
    removeTask,
    clearTasks,
    clearCurrentSearch,
  } = props;
  const [filterButtons, setFilterButtons] = useState([
    { text: 'all', isChecked: true },
    { text: 'active', isChecked: false },
    { text: 'done', isChecked: false },
  ]);
  const [textareaText, setTextareaText] = useState('');

  const getVisibleTasks = () => {
    const currentFilter = filterButtons.filter((button) => button.isChecked)[0]
      .text;

    switch (currentFilter) {
      case 'active':
        return tasks.filter((task) => !task.isCompleted);
      case 'done':
        return tasks.filter((task) => task.isCompleted);
      default:
        return tasks;
    }
  };

  const getEmptyMessage = () => {
    const currentFilter = filterButtons.filter((button) => button.isChecked)[0]
      .text;

    switch (currentFilter) {
      case 'active':
        return "There's no active tasks.";
      case 'done':
        return "There's no completed tasks.";
      default:
        return 'No tasks matching your search.';
    }
  };

  return (
    <Fragment>
      {getVisibleTasks().length ? (
        <ul className="tasks">
          {getVisibleTasks().map((task) => (
            <Task
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskEditing={toggleTaskEditing}
              removeTask={removeTask}
              textareaText={textareaText}
              setTextareaText={setTextareaText}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-message">{getEmptyMessage()}</p>
      )}
      <Controls
        filterButtons={filterButtons}
        setFilterButtons={setFilterButtons}
        clearTasks={clearTasks}
        clearCurrentSearch={clearCurrentSearch}
      />
    </Fragment>
  );
}

export default List;
