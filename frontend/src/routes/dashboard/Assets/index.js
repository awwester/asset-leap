import React from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { showModal } from 'actions/general/modals';
import DashboardHeader from 'components/dashboard/Header';
import DashboardContainer from 'components/dashboard/Container';

class AssetsRoute extends React.Component {
  render() {
    return (
      <Container className="assets-route p-4">
        <DashboardHeader>
          <Button
            color="primary"
            outline
            onClick={() => this.props.showModal('asset')}
          >
            Create Asset
          </Button>
        </DashboardHeader>
        <DashboardContainer>
          <FontAwesomeIcon icon={faExclamationCircle} className="warning-icon" />
          You don't have any assets yet.
        </DashboardContainer>
      </Container>
    )
  }
}

export default connect(null, { showModal })(AssetsRoute);
