import React from 'react';
import { Row, Col } from 'reactstrap';

import DashboardContainer from 'components/dashboard/Container';
import WorthItem from 'components/worth/Item';
import currency from 'utils/currency';
import './style.scss'

export default ({ worthItems, type }) => {
  // Render a full section of asset or liability type.
  if (worthItems.length === 0)
    return null;

  const sum = worthItems.map(asset => asset.value).reduce((prev, curr) => prev + curr, 0);
  let itemTitle = ''
  switch (type) {
    case 'current_asset':
      itemTitle = "Current Assets"
      break;
    case 'fixed_asset':
      itemTitle = "Fixed Assets"
      break;
    case 'financial_asset':
      itemTitle = "Financial Assets"
      break;
    case 'current_liab':
      itemTitle = "Current Liabilities"
      break;
    case 'noncurrent_liab':
      itemTitle = "Noncurrent Liabilities"
      break;
    default:
      break;
  }

  return (
    <div className="worth-type-container">
      <DashboardContainer>
        <h4 className="worth-type-name mb-0">{itemTitle}</h4>
        {worthItems.map((worthItem) => <WorthItem key={worthItem.id} worthItem={worthItem} />)}
        <Row className="worth-type-footer pt-3 px-3">
          <Col sm={6}><strong>Total</strong></Col>
          <Col sm={4}><strong>{currency(sum)}</strong></Col>
          <Col sm={2} />
        </Row>
      </DashboardContainer>
    </div>
  );
}
