import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { showModal } from 'actions/general/modals';

import './style.scss';

class ItemRow extends React.Component {
  // Render the values and functionality for a given item or liability.
  render() {
    const { item } = this.props;
    return (
      <Row className="item-row mb-0 p-3">
        <Col>
          <strong className="mr-4">{item.name}</strong>
        </Col>
        <Col>${item.value}</Col>
        <Col>
          <div className="float-right">
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="edit-item-icon"
              onClick={() => this.props.showModal('item', { item })}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

ItemRow.propTypes = {
  item: PropTypes.object.isRequired
}

export default connect(null, { showModal })(ItemRow);
