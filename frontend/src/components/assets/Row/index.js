import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { showModal } from 'actions/general/modals';

import './style.scss';

class AssetRow extends React.Component {
  render() {
    const { asset } = this.props;
    return (
      <Row className="asset-row mb-0 p-3">
        <Col>
          <strong className="mr-4">{asset.name}</strong>
        </Col>
        <Col>${asset.value}</Col>
        <Col>
          <div className="float-right">
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="edit-asset-icon"
              onClick={() => this.props.showModal('asset', { asset })}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

AssetRow.propTypes = {
  asset: PropTypes.object.isRequired
}

export default connect(null, { showModal })(AssetRow);
