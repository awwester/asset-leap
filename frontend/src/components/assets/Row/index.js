import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { showModal } from 'actions/general/modals';

import './style.scss';

class AssetRow extends React.Component {
  render() {
    const { asset } = this.props;
    return (
      <div className="asset-row mb-0 p-3">
        <strong className="mr-4">{asset.name}</strong> ${asset.value}
        <div className="float-right">
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="edit-asset-icon"
            onClick={() => this.props.showModal('asset', { asset })}
          />
        </div>
      </div>
    );
  }
}

AssetRow.propTypes = {
  asset: PropTypes.object.isRequired
}

export default connect(null, { showModal })(AssetRow);
