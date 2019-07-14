import axios from 'axios';
import config from 'config';

export const FETCH_STATEMENTS_START = 'FETCH_STATEMENTS_START';
const fetchStatementsStart = () => ({ type: FETCH_STATEMENTS_START });

export const FETCH_STATEMENTS_SUCCESS = 'FETCH_STATEMENTS_SUCCESS';
const fetchStatementsSuccess = data => ({ type: FETCH_STATEMENTS_SUCCESS, data });

export const FETCH_STATEMENTS_FAILURE = 'FETCH_STATEMENTS_FAILURE';
const fetchStatementsFailure = () => ({ type: FETCH_STATEMENTS_FAILURE });

export default () => (dispatch) => {
  dispatch(fetchStatementsStart());
  const url = `${config.apiUrl}statements/`;

  return axios.get(url).then(
    success => dispatch(fetchStatementsSuccess(success.data)),
    error => dispatch(fetchStatementsFailure('Error fetching statements.'))
  );
};
