import { FETCH_STATEMENTS_START,FETCH_STATEMENTS_SUCCESS, FETCH_STATEMENTS_FAILURE
       } from 'actions/statements/fetch';
import { CREATE_STATEMENTS_START,CREATE_STATEMENTS_SUCCESS, CREATE_STATEMENTS_FAILURE
       } from 'actions/statements/create';

const initialState = {
  data: [],
  isLoading: false,
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATEMENTS_START:
    case CREATE_STATEMENTS_START:
      return { ...state, isLoading: true, error: '' };
    case FETCH_STATEMENTS_SUCCESS:
    case CREATE_STATEMENTS_SUCCESS:
      return { ...state, isLoading: false, data: action.data };
    case FETCH_STATEMENTS_FAILURE:
    case CREATE_STATEMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
