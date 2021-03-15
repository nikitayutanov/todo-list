import { SET_SEARCH_QUERY, CLEAR_CURRENT_SEARCH } from '../constants';

const initialState = '';

function searchQueryReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_QUERY:
      return payload;
    case CLEAR_CURRENT_SEARCH: 
      return initialState;
    default:
      return state;
  }
}

export default searchQueryReducer;
