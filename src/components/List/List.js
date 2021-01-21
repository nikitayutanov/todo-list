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
  } = props;
  const [textareaText, setTextareaText] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  const getTasks = () => {
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
    switch (currentFilter) {
      case 'active':
        return "There's no active tasks.";
      case 'done':
        return "There's no completed tasks.";
      default:
        return 'Oops..';
    }
  };

  const visibleTasks = getTasks();
  const emptyMessage = getEmptyMessage();

  return (
    <section className="tasks-section">
      {tasks.length ? (
        <Fragment>
          {visibleTasks.length ? (
            <ul className="tasks">
              {visibleTasks.map((task) => (
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
            <p className="empty-message">{emptyMessage}</p>
          )}
          <Controls
            setCurrentFilter={setCurrentFilter}
            clearTasks={clearTasks}
          />
        </Fragment>
      ) : (
        <p className="empty-message empty-message--main">
          You don't have any tasks atm.
        </p>
      )}
    </section>
  );
}

export default List;
