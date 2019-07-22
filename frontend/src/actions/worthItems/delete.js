import axios from 'axios';
import config from 'config';

export const DELETE_WORTH_ITEM_START = 'DELETE_WORTH_ITEM_START';
const deleteWorthItemStart = assetId => ({ type: DELETE_WORTH_ITEM_START, assetId });

export const DELETE_WORTH_ITEM_SUCCESS = 'DELETE_WORTH_ITEM_SUCCESS';
const deleteWorthItemSuccess = () => ({ type: DELETE_WORTH_ITEM_SUCCESS });

export const DELETE_WORTH_ITEM_FAILURE = 'DELETE_WORTH_ITEM_FAILURE';
const deleteWorthItemFailure = () => ({ type: DELETE_WORTH_ITEM_FAILURE });

export default (assetId) => (dispatch) => {
  dispatch(deleteWorthItemStart(assetId));
  const url = `${config.apiUrl}worth-items/${assetId}/`;

  return axios.delete(url).then(
    success => dispatch(deleteWorthItemSuccess()),
    error => dispatch(deleteWorthItemFailure('Error deleting asset.'))
  );
};
