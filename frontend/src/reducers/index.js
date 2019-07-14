import { combineReducers } from 'redux';

import SessionAuthReducer from './session/auth';
import SessionUserReducer from './session/user';
import ModalReducer from './general/modals';
import WorthItemReducer from './worthItems';

const rootReducer = combineReducers({
  session: SessionAuthReducer,
  user: SessionUserReducer,
  modal: ModalReducer,
  worthItems: WorthItemReducer,
});

export default rootReducer;
