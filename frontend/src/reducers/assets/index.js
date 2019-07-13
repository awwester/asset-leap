import { FETCH_ASSETS_START,FETCH_ASSETS_SUCCESS, FETCH_ASSETS_FAILURE } from 'actions/assets/fetch';
import { CREATE_ASSET_START, CREATE_ASSET_SUCCESS, CREATE_ASSET_FAILURE } from 'actions/assets/create';

const initialState = {
  data: [],
  isLoading: false,
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSETS_START:
    case CREATE_ASSET_START:
      return { ...state, isLoading: true, error: '' };
    case FETCH_ASSETS_SUCCESS:
      return { ...state, isLoading: false, data: action.data };
    case CREATE_ASSET_SUCCESS:
      return { ...state, isLoading: false, data: [ ...state.data, action.data ] };
    case FETCH_ASSETS_FAILURE:
    case CREATE_ASSET_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
