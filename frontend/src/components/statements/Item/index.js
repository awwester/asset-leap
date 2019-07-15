import React from 'react';
import { Row, Col } from 'reactstrap';

import currency from 'utils/currency';

export default ({ statement }) => {
  return (
    <Row className="statement-item-row mb-0 p-3">
      <Col>{statement.date}</Col>
      <Col>{currency(statement.total || 0)}</Col>
    </Row>
  )
}
