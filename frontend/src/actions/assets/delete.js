import axios from 'axios';
import config from 'config';

export const DELETE_ASSET_START = 'DELETE_ASSET_START';
const deleteAssetStart = assetId => ({ type: DELETE_ASSET_START });

export const DELETE_ASSET_SUCCESS = 'DELETE_ASSET_SUCCESS';
const deleteAssetSuccess = () => ({ type: DELETE_ASSET_SUCCESS, data });

export const DELETE_ASSET_FAILURE = 'DELETE_ASSET_FAILURE';
const deleteAssetFailure = () => ({ type: DELETE_ASSET_FAILURE });

export default (assetId) => (dispatch) => {
  dispatch(deleteAssetStart(assetId));
  const url = `${config.apiUrl}assets/${assetId}/`;

  return axios.delete(url).then(
    success => dispatch(deleteAssetSuccess()),
    error => dispatch(deleteAssetFailure('Error deleting asset.'))
  );
};
