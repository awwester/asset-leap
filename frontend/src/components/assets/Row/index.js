import React from 'react';
import PropTypes from 'prop-types';

class AssetRow extends React.Component {
  render() {
    const { asset } = this.props;
    return (
      <p><strong className="mr-4">{asset.name}</strong> ${asset.value}</p>
    );
  }
}

AssetRow.propTypes = {
  asset: PropTypes.object.isRequired
}

export default AssetRow;
