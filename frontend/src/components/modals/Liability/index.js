import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

import LiabilityForm from 'components/forms/Liability';

class LiabilityModal extends React.Component {
  render() {
    const { item, ...rest } = this.props;
    return (
      <Modal { ...rest } className="liability-modal">
        <ModalBody>
          <LiabilityForm liability={item} />
        </ModalBody>
      </Modal>
    );
  }
}

export default LiabilityModal;
