import './List.css';
import { Fragment, useState } from 'react';
import Task from '../Task/Task';
import Controls from '../Controls/Controls';

function List(props) {
  const { tasks, toggleTaskCompletion, toggleTaskEditing, removeTask } = props;
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

  return (
    <section className="tasks-section">
      {tasks.length ? (
        <Fragment>
          <ul className="tasks">
            {getTasks().map((task) => (
              <Task
                key={task.id}
                task={task}
                toggleTaskCompletion={toggleTaskCompletion}
                toggleTaskEditing={toggleTaskEditing}
                removeTask={removeTask}
              />
            ))}
          </ul>
          <Controls setCurrentFilter={setCurrentFilter} />
        </Fragment>
      ) : (
        <p className="empty-message">You don't have any tasks atm.</p>
      )}
    </section>
  );
}

export default List;
