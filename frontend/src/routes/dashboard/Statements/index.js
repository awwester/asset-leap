import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Container, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import LoadButton from 'components/buttons/LoadButton';
import WorthTypeContainer from 'components/worth/TypeContainer'
import DashboardHeader from 'components/dashboard/Header';
import DashboardContainer from 'components/dashboard/Container';
import './style.scss';

class StatementsRoute extends React.Component {
  state = {
    createMode: false,
    statementDate: moment().startOf('month').format('YYYY-MM-DD')
  };

  createStatement = () => {
    this.setState({ createMode: false });
    toast('Statement created');
  }

  render() {
    const dateIsValid = moment(this.state.statementDate, 'YYYY-MM-DD', true).isValid();
    const formattedDate = moment(this.state.statementDate, "YYYY-MM-DD", true).format('LL')

    const renderCreateStatement = () => {
      // Return section for the user to create a new statement.
      const renderAssetGroups = () => {
        const uniqueAssetTypes = [...new Set(this.props.assets.map(obj => obj.type)) ];
        return uniqueAssetTypes.map(assetType => {
          return <WorthTypeContainer
            key={assetType}
            worthItems={this.props.assets.filter(asset => asset.type === assetType)}
            type={assetType}
          />
        });
      };

      const renderLiabilityGroups = () => {
        const uniqueLiabilityTypes = [...new Set(this.props.liabilities.map(obj => obj.type)) ];
        return uniqueLiabilityTypes.map(liabilityType => {
          return <WorthTypeContainer
            key={liabilityType}
            worthItems={this.props.liabilities.filter(liab => liab.type === liabilityType)}
            type={liabilityType}
          />
        });
      };

      return (
        <div className="statements-section">
          <Row className="my-2">
            <Col>
              <Label className="mr-4">Statement Date</Label>
              <Input
                className="date-input"
                placeholder="YYYY-MM-DD"
                value={this.state.statementDate}
                onChange={ev => this.setState({ statementDate: ev.target.value })}
              />
            </Col>
          </Row>
          <Row>
            <Col>{renderAssetGroups()}</Col>
            <Col>{renderLiabilityGroups()}</Col>
          </Row>
          <div className="button-container text-center mt-4">
            <Button
              className="mr-4"
              color="link"
              onClick={() => this.setState({ createMode: false })}
            >
              Cancel
            </Button>
            <LoadButton
              color="primary"
              onClick={this.createStatement}
              width={350}
              isLoading={false}
              disabled={!dateIsValid}
            >
              { dateIsValid ?
               `Create Statement for ${formattedDate}` :
               "Enter valid date (YYYY-MM-DD)"
             }
            </LoadButton>
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
      <div className="statements-route">
        <Container className="p-4">
          {renderStatementsHeader()}
          {renderStatementsContent()}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ statements, worthItems }) => ({
  statements,
  assets: worthItems.data.filter(item => item.category === 'asset'),
  liabilities: worthItems.data.filter(item => item.category === 'liability'),
});
export default connect(mapStateToProps)(StatementsRoute);
