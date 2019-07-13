import React from 'react';

import './style.scss';

export default (props) => {
  return (
    <div className="dashboard-container">
      {props.children}
    </div>
  )
}
