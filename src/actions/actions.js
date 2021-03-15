import * as types from '../constants.js';

const {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETION,
  EDIT_TASK,
  CHANGE_TASK,
  CLEAR_TASKS,
  SET_SEARCH_QUERY,
  CLEAR_CURRENT_SEARCH,
  SET_CURRENT_FILTER,
  RESET_CURRENT_FILTER,
  TOGGLE_TASK_EDITING,
} = types;

export const addTask = (text) => {
  const id = Date.now();

  return {
    type: ADD_TASK,
    payload: { text, id },
  };
};

export const removeTask = (id) => ({
  type: REMOVE_TASK,
  payload: id,
});

export const toggleTaskCompletion = (id) => ({
  type: TOGGLE_TASK_COMPLETION,
  payload: id,
});

export const editTask = (id) => ({
  type: EDIT_TASK,
  payload: id,
});

export const changeTask = (text, id) => ({
  type: CHANGE_TASK,
  payload: { text, id },
});

export const clearTasks = () => ({
  type: CLEAR_TASKS,
});

export const setSearchQuery = (text) => ({
  type: SET_SEARCH_QUERY,
  payload: text,
});

export const clearCurrentSearch = () => ({
  type: CLEAR_CURRENT_SEARCH,
});

export const setCurrentFilter = (value) => ({
  type: SET_CURRENT_FILTER,
  payload: value,
});

export const resetCurrentFilter = () => ({
  type: RESET_CURRENT_FILTER,
});

export const toggleTaskEditing = () => ({
  type: TOGGLE_TASK_EDITING,
});
