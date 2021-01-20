import './List.css';
import { Fragment } from 'react';
import Task from '../Task/Task';
import Controls from '../Controls/Controls';

function List(props) {
  const { tasks, toggleTaskCompletion, toggleTaskEditing, removeTask } = props;

  return (
    <section className="tasks-section">
      {tasks.length ? (
        <Fragment>
          <ul className="tasks">
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                toggleTaskCompletion={toggleTaskCompletion}
                toggleTaskEditing={toggleTaskEditing}
                removeTask={removeTask}
              />
            ))}
          </ul>
          <Controls />
        </Fragment>
      ) : (
        <p className="empty-message">You don't have any tasks atm.</p>
      )}
    </section>
  );
}

export default List;
