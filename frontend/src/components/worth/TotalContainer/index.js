import React from 'react';
import { Row, Col } from 'reactstrap';

import './style.scss'

export default ({ items, category }) => {
  // Title section that appears for assets and liabilties summing up all the items.
  if (items.length === 0)
    return null;

  const worthTotal = items
    .map(item => item.value)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <Row className="worth-total-container text-center my-5">
      <Col>
        <h2>Total {category} <strong>${worthTotal}</strong></h2>
      </Col>
    </Row>
  );
}
