import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Container, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import createStatement, { CREATE_STATEMENTS_SUCCESS } from 'actions/statements/create';
import StatementItem from 'components/statements/Item';
import LoadButton from 'components/buttons/LoadButton';
import WorthTypeContainer from 'components/worth/TypeContainer'
import DashboardHeader from 'components/dashboard/Header';
import DashboardContainer from 'components/dashboard/Container';
import Loading from 'components/Loading';
import { getUniqueTypes } from 'utils/worthItems';
import './style.scss';

class StatementsRoute extends React.Component {
  state = {
    createMode: false,
    statementDate: moment().startOf('month').format('YYYY-MM-DD')
  };

  createStatement = async () => {
    const action = await this.props.createStatement({ date: this.state.statementDate });
    if (action.type === CREATE_STATEMENTS_SUCCESS) {
      this.setState({ createMode: false });
      return toast('Statement created');
    }

    return toast('Error creating statement');
  }

  render() {
    if (this.props.statements.isLoading)
      return <Loading />;

    const dateIsValid = moment(this.state.statementDate, "YYYY-MM-DD", true).isValid();
    const formattedDate = moment(this.state.statementDate, "YYYY-MM-DD", true).format("LL")

    const renderCreateStatement = () => {
      // Return section for the user to create a new statement.
      const renderAssetGroups = () => {
        return getUniqueTypes(this.props.assets).map(assetType => {
          return (
            <WorthTypeContainer
              key={assetType}
              worthItems={this.props.assets.filter(asset => asset.type === assetType)}
              type={assetType}
            />
          );
        });
      };

      const renderLiabilityGroups = () => {
        return getUniqueTypes(this.props.liabilities).map(liabilityType => {
          return (
            <WorthTypeContainer
              key={liabilityType}
              worthItems={this.props.liabilities.filter(liab => liab.type === liabilityType)}
              type={liabilityType}
            />
          );
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
              isLoading={this.props.statements.isLoading}
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


      return (
        <DashboardContainer>
          {this.props.statements.data.map(statement => {
            return (
              <StatementItem
                key={statement.id}
                statement={statement}
                onClick={() => this.props.history.push(`/dashboard/statements/${statement.id}`)}
              />
            );
          })}
        </DashboardContainer>
      )
    }

    const renderStatementsContent = () => {
      return this.state.createMode ? renderCreateStatement() : renderStatements();
    };

    const renderStatementsHeader = () => {
      if (this.state.createMode) return null;

      if (this.state.detailStatement)
        return (
          <DashboardHeader>
            <Button color="link" onClick={() => this.setState({ detailStatement: null })}>
              Cancel
            </Button>
          </DashboardHeader>
        );

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
export default connect(mapStateToProps, { createStatement })(StatementsRoute);
