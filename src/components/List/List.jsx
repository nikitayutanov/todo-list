import './List.css';
import * as selectors from '../../selectors';
import { useSelector } from 'react-redux';
import Task from '../Task/Task';
import Controls from '../Controls/Controls';

const isAnyTaskEditingSelector = (state) => state.isAnyTaskEditing;
const {
  selectFilteredTasks,
  selectCurrentFilter,
  selectSearchQuery,
} = selectors;

function List({ tasks }) {
  const filteredTasks = useSelector(selectFilteredTasks);
  const currentFilter = useSelector(selectCurrentFilter);
  const searchQuery = useSelector(selectSearchQuery);
  const isAnyTaskEditing = useSelector(isAnyTaskEditingSelector);

  const getSearchedTasks = (tasksToSearch = tasks) => {
    return tasksToSearch.filter((task) => task.text.includes(searchQuery));
  };

  const getVisibleTasks = () => {
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
    <>
      {visibleTasks.length ? (
        <ul className="tasks">
          {visibleTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              isAnyTaskEditing={isAnyTaskEditing}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-message">{getEmptyMessage()}</p>
      )}
      <Controls isAnyTaskEditing={isAnyTaskEditing} />
    </>
  );
}

export default List;
