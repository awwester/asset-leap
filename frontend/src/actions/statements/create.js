import axios from 'axios';
import config from 'config';

export const CREATE_STATEMENTS_START = 'CREATE_STATEMENTS_START';
const createStatementsStart = () => ({ type: CREATE_STATEMENTS_START });

export const CREATE_STATEMENTS_SUCCESS = 'CREATE_STATEMENTS_SUCCESS';
const createStatementsSuccess = data => ({ type: CREATE_STATEMENTS_SUCCESS, data });

export const CREATE_STATEMENTS_FAILURE = 'CREATE_STATEMENTS_FAILURE';
const createStatementsFailure = () => ({ type: CREATE_STATEMENTS_FAILURE });

export default (payload) => (dispatch) => {
  dispatch(createStatementsStart());
  const url = `${config.apiUrl}statements/`;

  return axios.post(url, payload).then(
    success => dispatch(createStatementsSuccess(success.data)),
    error => dispatch(createStatementsFailure('Error createing statements.'))
  );
};
