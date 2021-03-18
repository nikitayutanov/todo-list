import { combineReducers } from 'redux';
import tasksReducer from './tasks';
import currentFilterReducer from './currentFilter';
import searchQueryReducer from './searchQuery';
import editingTaskReducer from './editingTask';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  currentFilter: currentFilterReducer,
  searchQuery: searchQueryReducer,
  editingTask: editingTaskReducer,
});

export default rootReducer;
