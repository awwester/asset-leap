import { FETCH_WORTH_ITEMS_START,FETCH_WORTH_ITEMS_SUCCESS, FETCH_WORTH_ITEMS_FAILURE } from 'actions/worthItems/fetch';
import { CREATE_WORTH_ITEM_START, CREATE_WORTH_ITEM_SUCCESS, CREATE_WORTH_ITEM_FAILURE } from 'actions/worthItems/create';
import { UPDATE_WORTH_ITEM_START, UPDATE_WORTH_ITEM_SUCCESS, UPDATE_WORTH_ITEM_FAILURE } from 'actions/worthItems/update';
import { DELETE_WORTH_ITEM_START } from 'actions/worthItems/delete';

const initialState = {
  data: [],
  isLoading: false,
  error: ''
}

export default (state = initialState, action) => {
  // data that should be manipulated and replaced in the data.
  let newData = state.data;
  switch (action.type) {
    case FETCH_WORTH_ITEMS_START:
    case CREATE_WORTH_ITEM_START:
    case UPDATE_WORTH_ITEM_START:
      return { ...state, isLoading: true, error: '' };
    case DELETE_WORTH_ITEM_START:
      newData = newData.filter((asset) => asset.id !== action.assetId)
      return { ...state, data: newData };
    case FETCH_WORTH_ITEMS_SUCCESS:
      return { ...state, isLoading: false, data: action.data };
    case CREATE_WORTH_ITEM_SUCCESS:
      return { ...state, isLoading: false, data: [ ...state.data, action.data ] };
    case UPDATE_WORTH_ITEM_SUCCESS:
      newData = newData.map((asset) => {
        return asset.id === action.data.id ? action.data : asset;
      });
      return { ...state, isLoading: false, data: newData };
    case UPDATE_WORTH_ITEM_FAILURE:
    case FETCH_WORTH_ITEMS_FAILURE:
    case CREATE_WORTH_ITEM_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
