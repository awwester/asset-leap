import axios from 'axios';
import config from 'config';

export const FETCH_WORTH_ITEMS_START = 'FETCH_WORTH_ITEMS_START';
const fetchAssetsStart = () => ({ type: FETCH_WORTH_ITEMS_START });

export const FETCH_WORTH_ITEMS_SUCCESS = 'FETCH_WORTH_ITEMS_SUCCESS';
const fetchAssetsSuccess = data => ({ type: FETCH_WORTH_ITEMS_SUCCESS, data });

export const FETCH_WORTH_ITEMS_FAILURE = 'FETCH_WORTH_ITEMS_FAILURE';
const fetchAssetsFailure = () => ({ type: FETCH_WORTH_ITEMS_FAILURE });

export default () => (dispatch) => {
  dispatch(fetchAssetsStart());
  const url = `${config.apiUrl}worth-items/`;

  return axios.get(url).then(
    success => dispatch(fetchAssetsSuccess(success.data)),
    error => dispatch(fetchAssetsFailure('Error fetching assets.'))
  );
};
