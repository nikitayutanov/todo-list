import { combineReducers } from 'redux';
import tasksReducer from './tasks';
import currentFilterReducer from './currentFilter';
import searchQueryReducer from './searchQuery';
import isAnyTaskEditingReducer from './isAnyTaskEditing';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  currentFilter: currentFilterReducer,
  searchQuery: searchQueryReducer,
  isAnyTaskEditing: isAnyTaskEditingReducer,
});

export default rootReducer;
