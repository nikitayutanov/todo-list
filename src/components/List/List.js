import './List.css';
import Task from '../Task/Task';

function List({ tasks, onChange, onClick }) {
  return (
    <section className="tasks-section">
      {tasks.length ? (
        tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            onChange={onChange}
            onClick={onClick}
          />
        ))
      ) : (
        <p className="empty-message">You don't have any tasks atm.</p>
      )}
    </section>
  );
}

export default List;
