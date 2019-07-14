import axios from 'axios';
import config from 'config';

export const UPDATE_WORTH_ITEM_START = 'UPDATE_WORTH_ITEM_START';
const updateWorthItemStart = () => ({ type: UPDATE_WORTH_ITEM_START });

export const UPDATE_WORTH_ITEM_SUCCESS = 'UPDATE_WORTH_ITEM_SUCCESS';
const updateWorthItemSuccess = (data) => ({ type: UPDATE_WORTH_ITEM_SUCCESS, data });

export const UPDATE_WORTH_ITEM_FAILURE = 'UPDATE_WORTH_ITEM_FAILURE';
const updateWorthItemFailure = () => ({ type: UPDATE_WORTH_ITEM_FAILURE });

export default (worthItemId, payload) => (dispatch) => {
  dispatch(updateWorthItemStart(worthItemId));
  const url = `${config.apiUrl}worth-items/${worthItemId}/`;

  return axios.put(url, payload).then(
    success => dispatch(updateWorthItemSuccess(success.data)),
    error => dispatch(updateWorthItemFailure('Error deleting worthItem.'))
  );
};
