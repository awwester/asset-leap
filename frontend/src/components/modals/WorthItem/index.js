import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

import WorthItemForm from 'components/forms/WorthItem';

class AssetModal extends React.Component {
  render() {
    const { item, ...rest } = this.props;
    return (
      <Modal { ...rest } className="asset-modal">
        <ModalBody>
          <WorthItemForm asset={item} />
        </ModalBody>
      </Modal>
    );
  }
}

export default AssetModal;
