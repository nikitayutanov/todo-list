import { SET_CURRENT_FILTER, RESET_CURRENT_FILTER } from '../constants';

const initialState = 'all';

function currentFilterReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_FILTER:
      return payload;
    case RESET_CURRENT_FILTER: 
      return initialState;
    default:
      return state;
  }
}

export default currentFilterReducer;
