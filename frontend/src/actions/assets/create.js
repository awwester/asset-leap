import axios from 'axios';
import config from 'config';

export const CREATE_ASSET_START = 'CREATE_ASSET_START';
const createAssetStart = () => ({ type: CREATE_ASSET_START });

export const CREATE_ASSET_SUCCESS = 'CREATE_ASSET_SUCCESS';
const createAssetSuccess = data => ({ type: CREATE_ASSET_SUCCESS, data });

export const CREATE_ASSET_FAILURE = 'CREATE_ASSET_FAILURE';
const createAssetFailure = () => ({ type: CREATE_ASSET_FAILURE });

export default (payload) => dispatch => {
  dispatch(createAssetStart());
  const url = `${config.apiUrl}assets/`;

  return axios.post(url, payload)
    .then(
      success => dispatch(createAssetSuccess(success.data)),
      error => dispatch(createAssetFailure())
    );
};
