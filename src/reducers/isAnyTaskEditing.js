import { TOGGLE_TASK_EDITING } from '../constants';

const initialState = false;

function isAnyTaskEditingReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case TOGGLE_TASK_EDITING:
      return !state;
    default:
      return state;
  }
}

export default isAnyTaskEditingReducer;
