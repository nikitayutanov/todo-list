import './Todo.css';
import { useSelector } from 'react-redux';
import Heading from './Heading/Heading';
import Input from './Input/Input';
import List from './List/List';

const selectTasks = (state) => state.tasks;

function Todo() {
  const tasks = useSelector(selectTasks);

  return (
    <div className="todo">
      <Heading />
      <Input tasks={tasks} />
      <section className="tasks-section">
        {tasks.length ? (
          <List tasks={tasks} />
        ) : (
          <p className="empty-message empty-message--main">
            You don't have any tasks atm.
          </p>
        )}
      </section>
    </div>
  );
}

export default Todo;
