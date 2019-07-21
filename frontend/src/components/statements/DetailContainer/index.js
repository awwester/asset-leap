import React from 'react';
import WorthTypeContainer from 'components/worth/TypeContainer';
import { Row, Col } from 'reactstrap';
import moment from 'moment';

import { getUniqueTypes } from 'utils/worthItems';

export default ({ statement, assets, liabilities }) => {
  // Render the assets and liabilities of a given statement.
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
