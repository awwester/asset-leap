import axios from 'axios';
import config from 'config';

export const DELETE_STATEMENT_START = 'DELETE_STATEMENT_START';
const deleteStatementStart = statementId => ({
  type: DELETE_STATEMENT_START,
  statementId
});

export const DELETE_STATEMENT_SUCCESS = 'DELETE_STATEMENT_SUCCESS';
const deleteStatementSuccess = () => ({ type: DELETE_STATEMENT_SUCCESS });

export const DELETE_STATEMENT_FAILURE = 'DELETE_STATEMENT_FAILURE';
const deleteStatementFailure = () => ({ type: DELETE_STATEMENT_FAILURE });

export default (statementId) => (dispatch) => {
  dispatch(deleteStatementStart(statementId));
  const url = `${config.apiUrl}statements/${statementId}/`;

  return axios.delete(url).then(
    success => dispatch(deleteStatementSuccess()),
    error => dispatch(deleteStatementFailure())
  );
};
