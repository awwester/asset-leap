import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class DashboardHeader extends React.Component {
  render() {
    return (
      <div className={`dashboard-header mb-4 ${this.props.className || ""}`}>
        {this.props.children}
      </div>
    );
  }
}

DashboardHeader.propTypes = {
  className: PropTypes.string
}

export default DashboardHeader;
