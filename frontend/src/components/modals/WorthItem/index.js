import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

import WorthItemForm from 'components/forms/WorthItem';

class AssetModal extends React.Component {
  render() {
    const { worthItem, category, ...rest } = this.props;
    return (
      <Modal { ...rest } className="asset-modal">
        <ModalBody>
          <WorthItemForm worthItem={worthItem} category={category} />
        </ModalBody>
      </Modal>
    );
  }
}

export default AssetModal;
