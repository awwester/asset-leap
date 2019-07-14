import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Container } from 'reactstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import WorthTypeContainer from 'components/worth/TypeContainer'
import DashboardHeader from 'components/dashboard/Header';
import DashboardContainer from 'components/dashboard/Container';

class StatementsRoute extends React.Component {
  state = {
    createMode: false
  };

  createStatement = () => {
    this.setState({ createMode: false });
    toast('Statement created');
  }

  render() {
    const renderCreateStatement = () => {
      // Return section for the user to create a new statement.
      const renderAssetGroups = () => {
        const uniqueAssetTypes = [...new Set(this.props.assets.map(obj => obj.type)) ];
        return uniqueAssetTypes.map(assetType => {
          return <WorthTypeContainer
            worthItems={this.props.assets.filter(asset => asset.type === assetType)}
            type={assetType}
          />
        });
      };

      const renderLiabilityGroups = () => {
        const uniqueLiabilityTypes = [...new Set(this.props.liabilities.map(obj => obj.type)) ];
        return uniqueLiabilityTypes.map(liabilityType => {
          return <WorthTypeContainer
            worthItems={this.props.liabilities.filter(liab => liab.type === liabilityType)}
            type={liabilityType}
          />
        });
      };

      return (
        <div className="statements-section">
          <h3 className="text-center m-5">Total worth: $300,000</h3>
          <Row>
            <Col>{renderAssetGroups()}</Col>
            <Col>{renderLiabilityGroups()}</Col>
          </Row>
          <div className="button-container text-right mt-4">
            <Button color="link" onClick={() => this.setState({ createMode: false })}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.createStatement}>
              Create Statement
            </Button>
          </div>
        </div>
      );
    };

    const renderStatements = () => {
      if (this.props.statements.data.length === 0)
        return (
          <DashboardContainer>
            <FontAwesomeIcon icon={faExclamationCircle} className="warning-icon" />
            You don't have any statements yet.
          </DashboardContainer>
        );

      return <div>Hello</div>;
    }

    const renderStatementsContent = () => {
      return this.state.createMode ? renderCreateStatement() : renderStatements();
    };

    const renderStatementsHeader = () => {
      if (this.state.createMode) return null;

      return (
        <DashboardHeader className="text-right">
          <Button color="primary" outline onClick={() => this.setState({ createMode: true })}>
            Create Statement
          </Button>
        </DashboardHeader>
      );
    }

    return (
      <Container className="statements-route p-4">
        {renderStatementsHeader()}
        {renderStatementsContent()}
      </Container>
    )
  }
}

const mapStateToProps = ({ statements, worthItems }) => ({
  statements,
  assets: worthItems.data.filter(item => item.category === 'asset'),
  liabilities: worthItems.data.filter(item => item.category === 'liability'),
});
export default connect(mapStateToProps)(StatementsRoute);
