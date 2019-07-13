import { combineReducers } from 'redux';

import SessionAuthReducer from './session/auth';
import SessionUserReducer from './session/user';
import ModalReducer from './general/modals';
import AssetReducer from './assets'

const rootReducer = combineReducers({
  session: SessionAuthReducer,
  user: SessionUserReducer,
  modal: ModalReducer,
  assets: AssetReducer,
});

export default rootReducer;
