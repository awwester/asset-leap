import React from 'react';
import { Row, Col } from 'reactstrap';

import DashboardContainer from 'components/dashboard/Container';
import WorthRow from 'components/worth/Row';
import './style.scss'

export default ({ items, category, type }) => {
  // Title section that appears for assets and liabilties summing up all the items.
  if (items.length === 0)
    return null;

  const sum = items.map(asset => asset.value).reduce((prev, curr) => prev + curr, 0);

  return (
    <DashboardContainer className="worth-type-container">
      <h4 className="asset-type-name">{category} {type}</h4>
      {items.map((item) => <WorthRow key={item.id} item={item} />)}
      <Row className="asset-type-footer pt-3 px-3">
        <Col><strong>Total</strong></Col>
        <Col><strong>${sum}</strong></Col>
        <Col />
      </Row>
    </DashboardContainer>
  )
}
