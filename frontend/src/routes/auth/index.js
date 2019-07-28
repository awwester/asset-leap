import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog } from '@fortawesome/free-solid-svg-icons';

import LoginRoute from './Login';
import RegisterRoute from './Register';
import './style.scss';

class AuthRouter extends React.Component {
  render() {
    return (
      <div className="auth-route-container">
      <div className="icon-container">
        <FontAwesomeIcon icon={faFrog} className="auth-route-icon m-5" size="4x" />
      </div>
      <Switch>
        <Route path="/auth/login" component={LoginRoute} />
        <Route path="/auth/register" component={RegisterRoute} />
      </Switch>
      </div>
    );
  }
}


export default AuthRouter;
