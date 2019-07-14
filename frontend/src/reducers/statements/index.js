import { FETCH_STATEMENTS_START,FETCH_STATEMENTS_SUCCESS, FETCH_STATEMENTS_FAILURE
       } from 'actions/statements/fetch';

const initialState = {
  data: [],
  isLoading: false,
  error: ''
}

export default (state = initialState, action) => {
  // data that should be manipulated and replaced in the data.
  let newData = state.data;
  switch (action.type) {
    case FETCH_STATEMENTS_START:
      return { ...state, isLoading: true, error: '' };
    case FETCH_STATEMENTS_SUCCESS:
      return { ...state, isLoading: false, data: action.data };
    case FETCH_STATEMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
