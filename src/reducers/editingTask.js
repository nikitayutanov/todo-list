import * as types from '../constants';

const { START_TASK_EDITING, SET_EDITING_TEXT, STOP_TASK_EDITING } = types;

const initialState = {
  id: '',
  text: '',
};

function editingTaskReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case START_TASK_EDITING: {
      const { id, text } = payload;
      return { id, text };
    }

    case SET_EDITING_TEXT:
      return { ...state, text: payload };

    case STOP_TASK_EDITING:
      return initialState;

    default:
      return state;
  }
}

export default editingTaskReducer;
