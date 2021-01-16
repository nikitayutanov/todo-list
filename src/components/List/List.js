import './List.css';
import Task from '../Task/Task';

function List({
  tasks,
  textareaText,
  handleTextareaChange,
  toggleTaskCompletion,
  toggleTaskEditing,
  removeTask,
}) {
  return (
    <section className="tasks-section">
      {tasks.length ? (
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            textareaText={textareaText}
            handleTextareaChange={handleTextareaChange}
            toggleTaskCompletion={toggleTaskCompletion}
            toggleTaskEditing={toggleTaskEditing}
            removeTask={removeTask}
          />
        ))
      ) : (
        <p className="empty-message">You don't have any tasks atm.</p>
      )}
    </section>
  );
}

export default List;
