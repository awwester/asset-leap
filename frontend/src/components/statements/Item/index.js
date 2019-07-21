import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

import currency from 'utils/currency';
import './style.scss';

export default ({ statement, onClick }) => {
  return (
    <Row className="statement-item-row mb-0 p-3">
      <Col>{moment(statement.date).format("LL")}</Col>
      <Col>{currency(statement.total || 0)}</Col>
      <Col>
        <FontAwesomeIcon
          className="edit-item-icon"
          icon={faEye}
          onClick={onClick}
        />
      </Col>
    </Row>
  );
}
