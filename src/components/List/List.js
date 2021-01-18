import './List.css';
import Task from '../Task/Task';

function List(props) {
  const { tasks, toggleTaskCompletion, toggleTaskEditing, removeTask } = props;

  return (
    <section className="tasks-section">
      <ul className="tasks">
        {tasks.length ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskEditing={toggleTaskEditing}
              removeTask={removeTask}
            />
          ))
        ) : (
          <p className="empty-message">You don't have any tasks atm.</p>
        )}
      </ul>
    </section>
  );
}

export default List;
