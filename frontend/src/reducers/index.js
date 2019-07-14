import { combineReducers } from 'redux';

import SessionAuthReducer from './session/auth';
import SessionUserReducer from './session/user';
import ModalReducer from './general/modals';
import WorthItemReducer from './worthItems';
import StatementReducer from './statements';

const rootReducer = combineReducers({
  session: SessionAuthReducer,
  user: SessionUserReducer,
  modal: ModalReducer,
  worthItems: WorthItemReducer,
  statements: StatementReducer,
});

export default rootReducer;
