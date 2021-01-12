import './List.css';
import Task from '../Task/Task';

function List({ tasks }) {
  return (
    <section className="tasks-section">
      {tasks.length ? (
        tasks.map((task) => <Task text={task.text} key={task.id} />)
      ) : (
        <p className="empty-message">You don't have any tasks atm.</p>
      )}
    </section>
  );
}

export default List;
