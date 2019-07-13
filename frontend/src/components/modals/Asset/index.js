import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

import AssetForm from 'components/forms/Asset';

class AssetModal extends React.Component {
  render() {
    const { ...rest } = this.props;
    return (
      <Modal { ...rest } className="asset-modal">
        <ModalBody>
          <AssetForm />
        </ModalBody>
      </Modal>
    );
  }
}

export default AssetModal;
