import './Todo.css';
import { useRef, useState } from 'react';
import Heading from './Heading/Heading';
import Input from './Input/Input';
import List from './List/List';

function Todo() {
  const [inputText, setInputText] = useState('');
  const [textareaText, setTextareaText] = useState('');
  const [tasks, setTasks] = useState([]);

  const isAnyTaskEditing = useRef(false);

  const handleInputChange = ({ target: { value } }) => {
    setInputText(value);
  };

  const handleTextareaChange = ({ target: { value } }) => {
    setTextareaText(value);
  };

  const addTask = (e) => {
    e.preventDefault();

    if (inputText) {
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

  const changeTask = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id
          ? { ...task, text: textareaText, isEditing: false }
          : prevTask
      )
    );

    isAnyTaskEditing.current = false;
  };

  const toggleTaskEditing = (task) => {
    if (!task.isEditing && !isAnyTaskEditing.current) {
      setTextareaText(task.text);
      editTask(task);
    } else if (task.isEditing && isAnyTaskEditing.current) {
      changeTask(task);
      setTextareaText('');
    }
  };

  return (
    <div className="todo">
      <Heading />
      <Input
        value={inputText}
        onChange={handleInputChange}
        onSubmit={addTask}
      />
      <List
        tasks={tasks}
        textareaText={textareaText}
        handleTextareaChange={handleTextareaChange}
        toggleTaskCompletion={toggleTaskCompletion}
        toggleTaskEditing={toggleTaskEditing}
        removeTask={removeTask}
      />
    </div>
  );
}

export default Todo;
