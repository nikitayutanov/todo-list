import './Todo.css';
import { useState } from 'react';
import Heading from './Heading/Heading';
import Input from './Input/Input';
import List from './List/List';

function Todo() {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleInputChange = ({ target: { value } }) => {
    setInputText(value);
  };

  const addTask = (e) => {
    e.preventDefault();

    if (inputText) {
      const task = {
        text: inputText,
        id: Date.now(),
      };

      setTasks((prevTasks) => [...prevTasks, ...[task]]);
      setInputText('');
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
      <List tasks={tasks} />
    </div>
  );
}

export default Todo;
