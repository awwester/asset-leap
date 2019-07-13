import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

import AssetForm from 'components/forms/Asset';

class AssetModal extends React.Component {
  render() {
    const { asset, ...rest } = this.props;
    return (
      <Modal { ...rest } className="asset-modal">
        <ModalBody>
          <AssetForm asset={asset} />
        </ModalBody>
      </Modal>
    );
  }
}

export default AssetModal;
