import { FETCH_ASSETS_START,FETCH_ASSETS_SUCCESS, FETCH_ASSETS_FAILURE } from 'actions/assets/fetch';
import { CREATE_ASSET_START, CREATE_ASSET_SUCCESS, CREATE_ASSET_FAILURE } from 'actions/assets/create';
import { UPDATE_ASSET_START, UPDATE_ASSET_SUCCESS, UPDATE_ASSET_FAILURE } from 'actions/assets/update';
import { DELETE_ASSET_START } from 'actions/assets/delete';

const initialState = {
  data: [],
  isLoading: false,
  error: ''
}

export default (state = initialState, action) => {
  // data that should be manipulated and replaced in the data.
  let newData = state.data;
  switch (action.type) {
    case FETCH_ASSETS_START:
    case CREATE_ASSET_START:
    case UPDATE_ASSET_START:
      return { ...state, isLoading: true, error: '' };
    case DELETE_ASSET_START:
      newData = newData.filter((asset) => asset.id !== action.assetId)
      return { ...state, data: newData };
    case FETCH_ASSETS_SUCCESS:
      return { ...state, isLoading: false, data: action.data };
    case CREATE_ASSET_SUCCESS:
      return { ...state, isLoading: false, data: [ ...state.data, action.data ] };
    case UPDATE_ASSET_SUCCESS:
      newData = newData.map((asset) => {
        return asset.id === action.data.id ? action.data : asset;
      });
      return { ...state, isLoading: false, data: newData };
    case UPDATE_ASSET_FAILURE:
    case FETCH_ASSETS_FAILURE:
    case CREATE_ASSET_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
