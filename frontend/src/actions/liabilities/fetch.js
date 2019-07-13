import axios from 'axios';
import config from 'config';

export const FETCH_LIABILITIES_START = 'FETCH_LIABILITIES_START';
const fetchAssetsStart = () => ({ type: FETCH_LIABILITIES_START });

export const FETCH_LIABILITIES_SUCCESS = 'FETCH_LIABILITIES_SUCCESS';
const fetchAssetsSuccess = data => ({ type: FETCH_LIABILITIES_SUCCESS, data });

export const FETCH_LIABILITIES_FAILURE = 'FETCH_LIABILITIES_FAILURE';
const fetchAssetsFailure = () => ({ type: FETCH_LIABILITIES_FAILURE });

export default () => (dispatch) => {
  dispatch(fetchAssetsStart());
  const url = `${config.apiUrl}liabilities/`;

  return axios.get(url).then(
    success => dispatch(fetchAssetsSuccess(success.data)),
    error => dispatch(fetchAssetsFailure('Error fetching liabilities.'))
  );
};
