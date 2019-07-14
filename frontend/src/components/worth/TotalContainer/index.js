import React from 'react';
import { Row, Col } from 'reactstrap';
import currency from 'utils/currency';
import './style.scss'

export default ({ worthItems, category }) => {
  // Title section that appears for assets and liabilties summing up all the items.
  if (worthItems.length === 0)
    return null;

  const worthTotal = worthItems
    .map(worthItem => worthItem.value)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <Row className="worth-total-container text-center my-5">
      <Col>
        <h2>Total {category} <strong>{currency(worthTotal)}</strong></h2>
      </Col>
    </Row>
  );
}
