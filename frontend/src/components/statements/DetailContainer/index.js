import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import WorthTypeContainer from 'components/worth/TypeContainer';
import DashboardHeader from 'components/dashboard/Header';
import { showModal } from 'actions/general/modals';
import { getUniqueTypes } from 'utils/worthItems';
import formatCurrency from 'utils/currency';

class DetailStatementContainer extends React.Component {
  /* Show the details of a single statement. */
  
  deleteStatement = () => {
    const { statement } = this.props;
    this.props.showModal('deleteStatement', { statement });
  }

  render() {
    const { statement, disableEdit } = this.props;
    const { assets, liabilities } = statement;

    const renderAssetGroups = () => {
      return getUniqueTypes(assets).map(assetType => {
        return (
          <WorthTypeContainer
            key={assetType}
            disableEdit={disableEdit}
            worthItems={assets.filter(asset => asset.type === assetType)}
            type={assetType}
          />
        );
      });
    };

    const renderLiabilityGroups = () => {
      return getUniqueTypes(liabilities).map(liabilityType => {
        return (
          <WorthTypeContainer
            key={liabilityType}
            disableEdit={disableEdit}
            worthItems={liabilities.filter(liab => liab.type === liabilityType)}
            type={liabilityType}
          />
        );
      });
    };

    return (
      <div className="detail-statement">
        <Row>
          <Col>
            <DashboardHeader>
              <Button color="link" onClick={() => this.props.history.push("/dashboard/statements")}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/> All Statements
              </Button>
              <Button
                outline
                color="secondary"
                onClick={this.deleteStatement}
                className="float-right"
              >
                Delete
              </Button>
            </DashboardHeader>
          </Col>
        </Row>

        <h4>
          {moment(statement.date).format("LL")}
          <span className="float-right">Total worth {formatCurrency(statement.total)}</span>
        </h4>

        <Row>
          <Col>{renderAssetGroups()}</Col>
          <Col>{renderLiabilityGroups()}</Col>
        </Row>
      </div>
    );
  }
}

DetailStatementContainer.propTypes = {
  statement: PropTypes.object.isRequired,
  disableEdit: PropTypes.bool
}

const ConnectedComponent = connect(null, { showModal })(DetailStatementContainer);
export default withRouter(ConnectedComponent);
