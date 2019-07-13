import React from 'react';
import { Button, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import DashboardHeader from 'components/dashboard/Header';
import DashboardContainer from 'components/dashboard/Container';

class StatementsRoute extends React.Component {
  render() {
    return (
      <Container className="statements-route p-4">
        <DashboardHeader>
          <Button color="primary" outline>Create Statement</Button>
        </DashboardHeader>
        <DashboardContainer>
          <FontAwesomeIcon icon={faExclamationCircle} className="warning-icon" />
          You don't have any statements yet.
        </DashboardContainer>
      </Container>
    )
  }
}

export default StatementsRoute;
