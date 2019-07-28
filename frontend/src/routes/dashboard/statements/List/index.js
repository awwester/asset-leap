import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import StatementItem from 'components/statements/Item';
import DashboardHeader from 'components/dashboard/Header';
import DashboardContainer from 'components/dashboard/Container';
import Loading from 'components/Loading';
import './style.scss';

class StatementsRoute extends React.Component {

  render() {
    if (this.props.statements.isLoading)
      return <Loading />;

    const renderStatements = () => {
      // Either render the statements or a container showing the user that there are no statements.
      if (this.props.statements.data.length === 0)
        return (
          <DashboardContainer>
            <FontAwesomeIcon icon={faExclamationCircle} className="warning-icon" />
            You don't have any statements yet.
          </DashboardContainer>
        );


      return (
        <DashboardContainer>
          <Row className="header-section p-3">
            <Col children="Date" />
            <Col children="Total" />
            <Col children="Change" />
          </Row>

          {this.props.statements.data.map(statement => {
            const statements = this.props.statements.data;
            const index = statements.findIndex(s => s.id === statement.id)
            let previousStatement = null;
            if (index < statements.length)
              previousStatement = statements[index + 1]

            return (
              <StatementItem
                key={statement.id}
                statement={statement}
                previousStatement={previousStatement}
                onClick={() => this.props.history.push(`/dashboard/statements/${statement.id}`)}
              />
            );
          })}
        </DashboardContainer>
      );
    }

    return (
      <div className="statements-route">
        <Container className="p-4">
          <DashboardHeader className="text-right">
            <Button
              color="primary"
              outline
              onClick={() => this.props.history.push("/dashboard/statements/create")}
              children="Create Statement"
            />
          </DashboardHeader>
          {renderStatements()}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ statements }) => ({ statements });
export default connect(mapStateToProps)(StatementsRoute);
