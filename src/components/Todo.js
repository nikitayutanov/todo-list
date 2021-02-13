import './Todo.css';
import { useRef, useState } from 'react';
import Heading from './Heading/Heading';
import Input from './Input/Input';
import List from './List/List';

const initFilterButtons = [
  { text: 'all', isChecked: true },
  { text: 'active', isChecked: false },
  { text: 'done', isChecked: false },
];

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [filterButtons, setFilterButtons] = useState(initFilterButtons);
  const [searchQuery, setSearchQuery] = useState('');

  const isAnyTaskEditing = useRef(false);

  const currentFilter = filterButtons.find((button) => button.isChecked).text;

  const clearCurrentSearch = () => {
    if (searchQuery) {
      setSearchQuery('');
    }
  };

  const resetCurrentFilter = () => {
    if (currentFilter !== 'all') {
      setFilterButtons(initFilterButtons);
    }
  };

  const addTask = (inputText) => {
    const task = {
      text: inputText,
      id: Date.now(),
      isCompleted: false,
      isEditing: false,
    };

    clearCurrentSearch();
    resetCurrentFilter();
    setTasks((prevTasks) => [...prevTasks, ...[task]]);
  };

  const removeTask = (task) => {
    setTasks((prevTasks) =>
      prevTasks.filter((prevTask) => prevTask.id !== task.id)
    );

    if (task.isEditing) {
      isAnyTaskEditing.current = false;
    }
  };

  const toggleTaskCompletion = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id
          ? { ...task, isCompleted: !task.isCompleted }
          : prevTask
      )
    );
  };

  const editTask = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id ? { ...task, isEditing: true } : prevTask
      )
    );

    isAnyTaskEditing.current = true;
  };

  const changeTask = (task, textareaText) => {
    if (textareaText.trim()) {
      setTasks((prevTasks) =>
        prevTasks.map((prevTask) =>
          prevTask.id === task.id
            ? { ...task, text: textareaText, isEditing: false }
            : prevTask
        )
      );

      isAnyTaskEditing.current = false;
    }
  };

  const toggleTaskEditing = (task, textareaText, setTextareaText) => {
    if (!task.isEditing && !isAnyTaskEditing.current) {
      setTextareaText(task.text);
      editTask(task);
    } else if (task.isEditing && isAnyTaskEditing.current) {
      changeTask(task, textareaText);
      setTextareaText('');
    }
  };

  const clearTasks = () => {
    setTasks([]);

    if (isAnyTaskEditing.current) {
      isAnyTaskEditing.current = false;
    }
  };

  const getFilteredTasks = () => {
    switch (currentFilter) {
      case 'active':
        return tasks.filter((task) => !task.isCompleted);
      case 'done':
        return tasks.filter((task) => task.isCompleted);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  const searchTasks = (inputText) => {
    if (!filteredTasks.length) {
      resetCurrentFilter();
    }

    setSearchQuery(inputText);
  };

  return (
    <div className="todo">
      <Heading />
      <Input addTask={addTask} searchTasks={searchTasks} />
      <section className="tasks-section">
        {tasks.length ? (
          <List
            tasks={tasks}
            filterButtons={filterButtons}
            setFilterButtons={setFilterButtons}
            filteredTasks={filteredTasks}
            currentFilter={currentFilter}
            toggleTaskCompletion={toggleTaskCompletion}
            toggleTaskEditing={toggleTaskEditing}
            removeTask={removeTask}
            clearTasks={clearTasks}
            clearCurrentSearch={clearCurrentSearch}
            searchQuery={searchQuery}
          />
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
