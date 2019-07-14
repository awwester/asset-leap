import { FETCH_LIABILITIES_START,FETCH_LIABILITIES_SUCCESS, FETCH_LIABILITIES_FAILURE } from 'actions/liabilities/fetch';
import { CREATE_LIABILITY_START, CREATE_LIABILITY_SUCCESS, CREATE_LIABILITY_FAILURE } from 'actions/liabilities/create';
import { UPDATE_LIABILITY_START, UPDATE_LIABILITY_SUCCESS, UPDATE_LIABILITY_FAILURE } from 'actions/liabilities/update';
import { DELETE_LIABILITY_START } from 'actions/liabilities/delete';

const initialState = {
  data: [],
  isLoading: false,
  error: ''
}

export default (state = initialState, action) => {
  // data that should be manipulated and replaced in the data.
  let newData = state.data;
  switch (action.type) {
    case FETCH_LIABILITIES_START:
    case CREATE_LIABILITY_START:
    case UPDATE_LIABILITY_START:
      return { ...state, isLoading: true, error: '' };
    case DELETE_LIABILITY_START:
      newData = newData.filter((liability) => liability.id !== action.liabilityId)
      return { ...state, data: newData };
    case FETCH_LIABILITIES_SUCCESS:
      return { ...state, isLoading: false, data: action.data };
    case CREATE_LIABILITY_SUCCESS:
      return { ...state, isLoading: false, data: [ ...state.data, action.data ] };
    case UPDATE_LIABILITY_SUCCESS:
      newData = newData.map((liability) => {
        return liability.id === action.data.id ? action.data : liability;
      });
      return { ...state, isLoading: false, data: newData };
    case UPDATE_LIABILITY_FAILURE:
    case FETCH_LIABILITIES_FAILURE:
    case CREATE_LIABILITY_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
