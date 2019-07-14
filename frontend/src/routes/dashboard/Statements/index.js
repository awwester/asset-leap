import React from 'react';
import { connect } from 'react-redux';
import { Button, Container } from 'reactstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

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
      return (
        <div>
          <DashboardContainer>
            hello
          </DashboardContainer>
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

const mapStateToProps = ({ statements }) => ({ statements });
export default connect(mapStateToProps)(StatementsRoute);
