import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { getUniqueTypes } from 'utils/worthItems';
import WorthTypeContainer from 'components/worth/TypeContainer';
import LoadButton from 'components/buttons/LoadButton';
import createStatement, { CREATE_STATEMENTS_SUCCESS } from 'actions/statements/create';
import DashboardHeader from 'components/dashboard/Header';
import './style.scss';

class StatementCreateRoute extends React.Component {
  /* Route for the user to create a new statement record. */

  state = {
    statementDate: moment().startOf('month').format('YYYY-MM-DD')
  };

  createStatement = async () => {
    const action = await this.props.createStatement({ date: this.state.statementDate });
    if (action.type === CREATE_STATEMENTS_SUCCESS) {
      toast('Statement created');
      return this.props.history.push('/dashboard/statements');
    }


    return toast('Error creating statement');
  }

  render() {
    const dateIsValid = moment(this.state.statementDate, "YYYY-MM-DD", true).isValid();
    const formattedDate = moment(this.state.statementDate, "YYYY-MM-DD", true).format("LL")

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
      <div className="statement-create-route">
        <Container className="p-4">
          <DashboardHeader>
            <Button color="link" onClick={() => this.props.history.push("/dashboard/statements")}>
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/> All Statements
            </Button>
          </DashboardHeader>

          <Row className="my-2">
            <Col className='text-center'>
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
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ statements, worthItems }) => ({
  statements,
  assets: worthItems.data.filter(item => item.category === 'asset'),
  liabilities: worthItems.data.filter(item => item.category === 'liability'),
});
export default connect(mapStateToProps, { createStatement })(StatementCreateRoute);
