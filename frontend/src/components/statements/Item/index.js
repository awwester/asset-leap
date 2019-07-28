import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import currency from 'utils/currency';
import './style.scss';

export default ({ statement, previousStatement, onClick }) => {
  let absoluteChange = null;
  if (previousStatement)
    absoluteChange = Math.abs(statement.total - previousStatement.total)

  const renderChange = () => {
    if (!previousStatement)
      return <Col />;
    else if (parseInt(statement.total) >= parseInt(previousStatement.total))
      return (
        <Col>
          <FontAwesomeIcon icon={faChevronUp} className="mr-2 worth-up" />
          {currency(absoluteChange)}
        </Col>
      );
    else
      return (
        <Col>
          <FontAwesomeIcon icon={faChevronDown} className="mr-2 worth-down" />
          {currency(absoluteChange)}
        </Col>
      );
  };

  return (
    <Row onClick={onClick} className="statement-item-row mb-0 p-3">
      <Col>{moment(statement.date).format("LL")}</Col>
      <Col>{currency(statement.total || 0)}</Col>
      {renderChange()}
    </Row>
  );
}
