import axios from 'axios';
import config from 'config';

export const CREATE_WORTH_ITEM_START = 'CREATE_WORTH_ITEM_START';
const createAssetStart = () => ({ type: CREATE_WORTH_ITEM_START });

export const CREATE_WORTH_ITEM_SUCCESS = 'CREATE_WORTH_ITEM_SUCCESS';
const createAssetSuccess = (data) => ({ type: CREATE_WORTH_ITEM_SUCCESS, data });

export const CREATE_WORTH_ITEM_FAILURE = 'CREATE_WORTH_ITEM_FAILURE';
const createAssetFailure = (error) => ({ type: CREATE_WORTH_ITEM_FAILURE, error });

export default (payload) => (dispatch) => {
  dispatch(createAssetStart());
  const url = `${config.apiUrl}worth-items/`;

  return axios.post(url, payload).then(
    (success) => dispatch(createAssetSuccess(success.data)),
    (error) => dispatch(createAssetFailure('Error creating asset.'))
  );
};
