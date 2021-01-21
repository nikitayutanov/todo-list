import './Todo.css';
import { useRef, useState } from 'react';
import Heading from './Heading/Heading';
import Input from './Input/Input';
import List from './List/List';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const isAnyTaskEditing = useRef(false);

  const addTask = (e, inputText, setInputText) => {
    e.preventDefault();

    if (inputText.trim()) {
      const task = {
        text: inputText,
        id: Date.now(),
        isCompleted: false,
        isEditing: false,
      };

      setTasks((prevTasks) => [...prevTasks, ...[task]]);
      setInputText('');
    }
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

  return (
    <div className="todo">
      <Heading />
      <Input onSubmit={addTask} />
      <List
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
        toggleTaskEditing={toggleTaskEditing}
        removeTask={removeTask}
        clearTasks={clearTasks}
      />
    </div>
  );
}

export default Todo;
