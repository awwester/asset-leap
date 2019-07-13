import axios from 'axios';
import config from 'config';

export const UPDATE_ASSET_START = 'UPDATE_ASSET_START';
const updateAssetStart = () => ({ type: UPDATE_ASSET_START });

export const UPDATE_ASSET_SUCCESS = 'UPDATE_ASSET_SUCCESS';
const updateAssetSuccess = (data) => ({ type: UPDATE_ASSET_SUCCESS, data });

export const UPDATE_ASSET_FAILURE = 'UPDATE_ASSET_FAILURE';
const updateAssetFailure = () => ({ type: UPDATE_ASSET_FAILURE });

export default (assetId, payload) => (dispatch) => {
  dispatch(updateAssetStart(assetId));
  const url = `${config.apiUrl}assets/${assetId}/`;

  return axios.put(url, payload).then(
    success => dispatch(updateAssetSuccess(success.data)),
    error => dispatch(updateAssetFailure('Error deleting asset.'))
  );
};
