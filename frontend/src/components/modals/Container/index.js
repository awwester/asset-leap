import React from 'react';
import { connect } from 'react-redux';

import AssetModal from '../Asset';
import { hideModal } from 'actions/general/modals';

class ModalContainer extends React.Component {
  // class to handle rendering modals at the application level.

  modalComponents = {
    asset: AssetModal
  }

  render() {
    const modalState = this.props.modal;
    if (!modalState.modalType) return null;
    const SpecificModal = this.modalComponents[modalState.modalType];

    return (
      <SpecificModal
        {...modalState.modalProps}
        toggle={this.props.hideModal}
        isOpen
      />
    );
  }
}

const mapStateToProps = ({ modal }) => ({ modal });
export default connect(mapStateToProps, { hideModal })(ModalContainer);
