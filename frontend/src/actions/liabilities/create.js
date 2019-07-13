import axios from 'axios';
import config from 'config';

export const CREATE_LIABILITY_START = 'CREATE_LIABILITY_START';
const createAssetStart = () => ({ type: CREATE_LIABILITY_START });

export const CREATE_LIABILITY_SUCCESS = 'CREATE_LIABILITY_SUCCESS';
const createAssetSuccess = (data) => ({ type: CREATE_LIABILITY_SUCCESS, data });

export const CREATE_LIABILITY_FAILURE = 'CREATE_LIABILITY_FAILURE';
const createAssetFailure = (error) => ({ type: CREATE_LIABILITY_FAILURE, error });

export default (payload) => (dispatch) => {
  dispatch(createAssetStart());
  const url = `${config.apiUrl}liabilities/`;

  return axios.post(url, payload).then(
    (success) => dispatch(createAssetSuccess(success.data)),
    (error) => dispatch(createAssetFailure('Error creating liability.'))
  );
};
