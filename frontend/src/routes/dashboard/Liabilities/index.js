import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Row, Col } from 'reactstrap';

import { showModal } from 'actions/general/modals';
import DashboardHeader from 'components/dashboard/Header';
import WorthTypeContainer from 'components/worth/TypeContainer';
import WorthTotalContainer from 'components/worth/TotalContainer';
import EmptyItemsContainer from 'components/worth/EmptyItemsContainer';
import './style.scss';

class LiabilitiesRoute extends React.Component {
  render() {
    const liabilityData = this.props.liabilities.data;

    const renderEmptyLiabilities = () => {
      if (liabilityData.length === 0)
        return <EmptyItemsContainer />
    }

    const renderLiabilities = (liabilityType) => {
      const liabilities = liabilityData.filter(liability => liability.type === liabilityType);
      if (liabilities.length === 0) return null;

      return (
        <Col md={6} sm={12}>
          <WorthTypeContainer items={liabilities} category="liabilities" type={liabilityType} />
        </Col>
      );
    }

    return (
      <Container className="liabilities-route p-4">
        <DashboardHeader>
          <Button
            color="primary"
            outline
            onClick={() => this.props.showModal("liability")}
          >
            Create Liability
          </Button>
        </DashboardHeader>
        {renderEmptyLiabilities()}
        <WorthTotalContainer items={liabilityData} category="liabilities" />
        <Row>
          {renderLiabilities('current')}
          {renderLiabilities('non-current')}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ liabilities }) => ({ liabilities });
export default connect(mapStateToProps, { showModal })(LiabilitiesRoute);
