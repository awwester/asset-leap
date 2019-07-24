import React from 'react'
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import Loading from 'components/Loading';
import StatementDetail from 'components/statements/DetailContainer';

class StatementDetailRoute extends React.Component {
  // Route that shows a single statement's details.
  render() {
    if (this.props.statements.isLoading)
      return <Loading />

    const detail = this.props.statements.data.find(statement => {
      return statement.id.toString() === this.props.match.params.id
    });

    return (
      <div className="statement-detail-route">
        <Container className="p-4">
          <StatementDetail disableEdit statement={detail} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ statements }) => ({ statements });
export default connect(mapStateToProps)(StatementDetailRoute);
