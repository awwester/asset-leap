import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import WorthTypeContainer from 'components/worth/TypeContainer';
import DashboardHeader from 'components/dashboard/Header';
import { getUniqueTypes } from 'utils/worthItems';

class DetailStatementContainer extends React.Component {
  render() {
    const { statement } = this.props;
    const { assets, liabilities } = statement;

    const renderAssetGroups = () => {
      return getUniqueTypes(assets).map(assetType => {
        return (
          <WorthTypeContainer
            key={assetType}
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
                <FontAwesomeIcon icon={faArrowLeft} /> All Statements
              </Button>
            </DashboardHeader>
          </Col>
        </Row>

        <h4>
          {moment(statement.date).format("LL")}
          <span className="float-right">Total worth $100,000</span>
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
  statement: PropTypes.object.isRequired
}

export default withRouter(DetailStatementContainer);
