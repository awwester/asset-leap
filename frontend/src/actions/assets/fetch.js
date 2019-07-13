import axios from 'axios';
import config from 'config';

export const FETCH_ASSETS_START = 'FETCH_ASSETS_START';
const fetchAssetsStart = () => ({ type: FETCH_ASSETS_START });

export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS';
const fetchAssetsSuccess = data => ({ type: FETCH_ASSETS_SUCCESS, data });

export const FETCH_ASSETS_FAILURE = 'FETCH_ASSETS_FAILURE';
const fetchAssetsFailure = () => ({ type: FETCH_ASSETS_FAILURE });

export default () => dispatch => {
  dispatch(fetchAssetsStart());
  const url = `${config.apiUrl}assets/`;

  return axios.get(url)
    .then(
      success => dispatch(fetchAssetsSuccess(success.data)),
      error => dispatch(fetchAssetsFailure())
    );
};
