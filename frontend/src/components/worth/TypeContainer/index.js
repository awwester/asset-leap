import React from 'react';
import { Row, Col } from 'reactstrap';

import DashboardContainer from 'components/dashboard/Container';
import WorthRow from 'components/worth/Row';
import './style.scss'

export default ({ items, category, type }) => {
  // Render a full section of asset or liability type.
  if (items.length === 0)
    return null;

  const sum = items.map(asset => asset.value).reduce((prev, curr) => prev + curr, 0);

  return (
    <div className="worth-type-container">
      <DashboardContainer>
        <h4 className="worth-type-name">{type} {category}</h4>
        {items.map((item) => <WorthRow key={item.id} item={item} category={category} />)}
        <Row className="worth-type-footer pt-3 px-3">
          <Col sm={6}><strong>Total</strong></Col>
          <Col sm={4}><strong>${sum}</strong></Col>
          <Col sm={2} />
        </Row>
      </DashboardContainer>
    </div>
  );
}
