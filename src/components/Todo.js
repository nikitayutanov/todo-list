import './Todo.css';
import Heading from './Heading/Heading';
import Input from './Input/Input';
import List from './List/List';

function Todo() {
  return (
    <div class="todo">
      <Heading />
      <Input />
      <List />
    </div>
  );
}

export default Todo;
