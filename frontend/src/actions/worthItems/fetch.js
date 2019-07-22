import axios from 'axios';
import config from 'config';

export const FETCH_WORTH_ITEMS_START = 'FETCH_WORTH_ITEMS_START';
const fetchWorthItemsStart = () => ({ type: FETCH_WORTH_ITEMS_START });

export const FETCH_WORTH_ITEMS_SUCCESS = 'FETCH_WORTH_ITEMS_SUCCESS';
const fetchWorthItemsSuccess = data => ({ type: FETCH_WORTH_ITEMS_SUCCESS, data });

export const FETCH_WORTH_ITEMS_FAILURE = 'FETCH_WORTH_ITEMS_FAILURE';
const fetchWorthItemsFailure = () => ({ type: FETCH_WORTH_ITEMS_FAILURE });

export default () => (dispatch) => {
  dispatch(fetchWorthItemsStart());
  const url = `${config.apiUrl}worth-items/active/`;

  return axios.get(url).then(
    success => dispatch(fetchWorthItemsSuccess(success.data)),
    error => dispatch(fetchWorthItemsFailure('Error fetching assets.'))
  );
};
