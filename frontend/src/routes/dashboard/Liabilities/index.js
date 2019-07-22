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
    const liabilityData = this.props.worthItems.data.filter(item => item.category === 'liability');
    const renderEmptyLiabilities = () => {
      if (liabilityData.length === 0)
        return <EmptyItemsContainer category="liabilities" />;
    }

    const renderLiabilities = (liabilityType) => {
      const liabilities = liabilityData.filter(liability => liability.type === liabilityType);
      if (liabilities.length === 0) return null;

      return (
        <Col md={6} sm={12}>
          <WorthTypeContainer
            worthItems={liabilities}
            category="liabilities"
            type={liabilityType}
          />
        </Col>
      );
    }

    return (
      <Container className="liabilities-route p-4">
        <DashboardHeader className="text-right">
          <Button
            color="primary"
            outline
            onClick={() => this.props.showModal("worthItem", { category: "liability" })}
          >
            Create Liability
          </Button>
        </DashboardHeader>
        {renderEmptyLiabilities()}
        <WorthTotalContainer
          worthItems={liabilityData}
          category="liabilities"
        />
        <Row>
          {renderLiabilities('current_liab')}
          {renderLiabilities('noncurrent_liab')}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ worthItems }) => ({ worthItems });
export default connect(mapStateToProps, { showModal })(LiabilitiesRoute);
