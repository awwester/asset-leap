import React from 'react';
import { Container, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import DashboardHeader from 'components/dashboard/Header';
import DashboardContainer from 'components/dashboard/Container';

class AssetsRoute extends React.Component {
  render() {
    return (
      <Container className="assets-route p-4">
        <DashboardHeader>
          <Button color="primary" outline>Create Asset</Button>
        </DashboardHeader>
        <DashboardContainer>
          <FontAwesomeIcon icon={faExclamationCircle} className="warning-icon" />
          You don't have any assets yet.
        </DashboardContainer>
      </Container>
    )
  }
}

export default AssetsRoute;
