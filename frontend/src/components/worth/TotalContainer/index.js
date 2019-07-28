import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import currency from 'utils/currency';
import './style.scss'

class WorthTotalContainer extends React.Component {
  render() {
    const { worthItems, category } = this.props;

    // Title section that appears for assets and liabilties summing up all the items.
    if (worthItems.length === 0)
      return null;

    const worthTotal = worthItems
      .map(worthItem => worthItem.value)
      .reduce((prev, curr) => prev + curr, 0);

    return (
      <Row className="worth-total-container text-center my-5">
        <Col>
          <h2>Total {category} {currency(worthTotal)}</h2>
        </Col>
      </Row>
    );
  }
}

WorthTotalContainer.propTypes = {
  category: PropTypes.string.isRequired,
  worthItems: PropTypes.array,
};

export default WorthTotalContainer;
