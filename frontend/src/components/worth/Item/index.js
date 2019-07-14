import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { showModal } from 'actions/general/modals';
import currency from 'utils/currency';

import './style.scss';

class ItemRow extends React.Component {
  // Render the values and functionality for a given item or liability.
  render() {
    const { worthItem } = this.props;
    return (
      <Row className="item-row mb-0 p-3">
        <Col sm={6}>
          <span>{worthItem.name}</span>
        </Col>
        <Col sm={4}>{currency(worthItem.value)}</Col>
        <Col sm={2}>
          <div className="float-right">
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="edit-item-icon"
              onClick={() => this.props.showModal('worthItem', { worthItem })}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

ItemRow.propTypes = {
  worthItem: PropTypes.object.isRequired
}

export default connect(null, { showModal })(ItemRow);
