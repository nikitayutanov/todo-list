import './List.css';
import { Fragment, useState, useLayoutEffect } from 'react';
import Task from '../Task/Task';
import Controls from '../Controls/Controls';

function List(props) {
  const {
    tasks,
    visibleTasks,
    setVisibleTasks,
    toggleTaskCompletion,
    toggleTaskEditing,
    removeTask,
    clearTasks,
    getMatchingTasks,
    clearCurrentSearch,
    searchQuery,
  } = props;
  const [textareaText, setTextareaText] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  const addTasksToVisible = () => {
    const addAllTasksToVisible = () => {
      setVisibleTasks(tasks);
    };

    const addActiveTasksToVisible = () => {
      setVisibleTasks(tasks.filter((task) => !task.isCompleted));
    };

    const addCompletedTasksToVisible = () => {
      setVisibleTasks(tasks.filter((task) => task.isCompleted));
    };

    const matchVisibleTasksToSearch = () => {
      if (searchQuery.current) {
        setVisibleTasks((prevTasks) =>
          getMatchingTasks(prevTasks, searchQuery.current)
        );
      }
    };

    switch (currentFilter) {
      case 'active':
        addActiveTasksToVisible();
        break;
      case 'done':
        addCompletedTasksToVisible();
        break;
      default:
        addAllTasksToVisible();
    }

    matchVisibleTasksToSearch();
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

  useLayoutEffect(addTasksToVisible, [tasks, currentFilter]);

  return (
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
        <p className="empty-message">{getEmptyMessage()}</p>
      )}
      <Controls
        setCurrentFilter={setCurrentFilter}
        clearTasks={clearTasks}
        clearCurrentSearch={clearCurrentSearch}
      />
    </Fragment>
  );
}

export default List;
