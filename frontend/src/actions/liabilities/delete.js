import axios from 'axios';
import config from 'config';

export const DELETE_LIABILITY_START = 'DELETE_LIABILITY_START';
const deleteAssetStart = liabilityId => ({ type: DELETE_LIABILITY_START, liabilityId });

export const DELETE_LIABILITY_SUCCESS = 'DELETE_LIABILITY_SUCCESS';
const deleteAssetSuccess = () => ({ type: DELETE_LIABILITY_SUCCESS });

export const DELETE_LIABILITY_FAILURE = 'DELETE_LIABILITY_FAILURE';
const deleteAssetFailure = () => ({ type: DELETE_LIABILITY_FAILURE });

export default (liabilityId) => (dispatch) => {
  dispatch(deleteAssetStart(liabilityId));
  const url = `${config.apiUrl}liabilities/${liabilityId}/`;

  return axios.delete(url).then(
    success => dispatch(deleteAssetSuccess()),
    error => dispatch(deleteAssetFailure('Error deleting liability.'))
  );
};
