import './List.css';
import { Fragment, useState } from 'react';
import Task from '../Task/Task';
import Controls from '../Controls/Controls';

function List(props) {
  const {
    tasks,
    searchQuery,
    filterButtons,
    setFilterButtons,
    filteredTasks,
    currentFilter,
    toggleTaskCompletion,
    toggleTaskEditing,
    removeTask,
    clearTasks,
    clearCurrentSearch,
  } = props;

  const [textareaText, setTextareaText] = useState('');

  const getVisibleTasks = () => {
    const getSearchedTasks = (tasksToSearch = tasks) => {
      return tasksToSearch.filter((task) => task.text.includes(searchQuery));
    };

    if (searchQuery) {
      const searchedTasks = filteredTasks.length
        ? getSearchedTasks(filteredTasks)
        : getSearchedTasks();

      return searchedTasks;
    }

    return filteredTasks;
  };

  const getEmptyMessage = () => {
    switch (currentFilter) {
      case 'active':
        return "There's no active tasks.";
      case 'done':
        return "There's no completed tasks.";
      default:
        return 'No tasks matching your search.';
    }
  };

  const visibleTasks = getVisibleTasks();

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
        filterButtons={filterButtons}
        setFilterButtons={setFilterButtons}
        clearTasks={clearTasks}
        clearCurrentSearch={clearCurrentSearch}
      />
    </Fragment>
  );
}

export default List;
