import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import DashboardContainer from 'components/dashboard/Container';

export default ({ category }) => {
  return (
    <DashboardContainer>
      <FontAwesomeIcon icon={faExclamationCircle} className="warning-icon" />
      You don't have any {category} yet.
    </DashboardContainer>
  );
}
