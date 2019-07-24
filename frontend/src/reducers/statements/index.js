import { FETCH_STATEMENTS_START,FETCH_STATEMENTS_SUCCESS, FETCH_STATEMENTS_FAILURE
       } from 'actions/statements/fetch';
import { CREATE_STATEMENTS_START,CREATE_STATEMENTS_SUCCESS, CREATE_STATEMENTS_FAILURE
       } from 'actions/statements/create';
import { DELETE_STATEMENT_START } from 'actions/statements/delete';

const initialState = {
  data: [],
  isLoading: false,
  error: ''
}

export default (state = initialState, action) => {
  let newData = state.data;

  switch (action.type) {
    case FETCH_STATEMENTS_START:
    case CREATE_STATEMENTS_START:
      return { ...state, isLoading: true, error: '' };
    case DELETE_STATEMENT_START:
      newData = newData.filter((statement) => statement.id !== action.statementId);
      return { ...state, data: newData };
    case FETCH_STATEMENTS_SUCCESS:
      return { ...state, isLoading: false, data: action.data };
    case CREATE_STATEMENTS_SUCCESS:
      // Add the new date sorted by date.
      newData = [ action.data, ...state.data ].sort(
        (a,b) => new Date(b.date) - new Date(a.date)
      );
      return { ...state, isLoading: false, data: newData };
    case FETCH_STATEMENTS_FAILURE:
    case CREATE_STATEMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
