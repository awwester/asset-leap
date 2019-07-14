import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog, faDollarSign, faHouseDamage, faLock, faChartLine } from '@fortawesome/free-solid-svg-icons';

import fetchWorthItems from 'actions/worthItems/fetch';
import fetchStatements from 'actions/statements/fetch';
import logoutUser from 'actions/auth/logout';
import StatementsRoute from './Statements';
import AssetsRoute from './Assets';
import LiabilitiesRoute from './Liabilities';
import './style.scss';

class DashboardRouter extends React.Component {
  componentDidMount() {
    // Require authentication for the dashboard.
    const { history } = this.props;
    if (!this.props.session.token) history.push('/');
    if (history.location.pathname === '/dashboard') history.push('/dashboard/statements');

    this.loadInitialData();
  }

  loadInitialData = () => {
    this.props.fetchWorthItems();
    this.props.fetchStatements();
  }

  logout = () => {
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="dashboard-route">
        <section className="sidenav-section">
          <div className="dashboard-header text-center my-3">
            <FontAwesomeIcon icon={faFrog} size="4x" />
          </div>
          <nav className="sidenav">
            <section className="menu-section">
              <NavLink exact to="/dashboard/statements">
                <FontAwesomeIcon icon={faChartLine} /> Statements
              </NavLink>
              <NavLink exact to="/dashboard/assets">
                <FontAwesomeIcon icon={faDollarSign} /> Assets
              </NavLink>
              <NavLink exact to="/dashboard/liabilities">
                <FontAwesomeIcon icon={faHouseDamage} /> Liabilities
              </NavLink>
              <Link to="/" onClick={this.logout}>
                <FontAwesomeIcon icon={faLock} /> Logout
              </Link>
            </section>
          </nav>
        </section>

        <section className="sidenav-layout-content">
          <Switch>
            <Route exact path="/dashboard/statements" component={StatementsRoute} />
            <Route exact path="/dashboard/assets" component={AssetsRoute} />
            <Route exact path="/dashboard/liabilities" component={LiabilitiesRoute} />
          </Switch>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ session }) => ({ session });
export default connect(mapStateToProps, {
  logoutUser, fetchWorthItems, fetchStatements
})(DashboardRouter);
