import axios from 'axios';
import config from 'config';

export const UPDATE_LIABILITY_START = 'UPDATE_LIABILITY_START';
const updateAssetStart = () => ({ type: UPDATE_LIABILITY_START });

export const UPDATE_LIABILITY_SUCCESS = 'UPDATE_LIABILITY_SUCCESS';
const updateAssetSuccess = (data) => ({ type: UPDATE_LIABILITY_SUCCESS, data });

export const UPDATE_LIABILITY_FAILURE = 'UPDATE_LIABILITY_FAILURE';
const updateAssetFailure = () => ({ type: UPDATE_LIABILITY_FAILURE });

export default (liabilityId, payload) => (dispatch) => {
  dispatch(updateAssetStart(liabilityId));
  const url = `${config.apiUrl}liabilities/${liabilityId}/`;

  return axios.put(url, payload).then(
    success => dispatch(updateAssetSuccess(success.data)),
    error => dispatch(updateAssetFailure('Error deleting liability.'))
  );
};
