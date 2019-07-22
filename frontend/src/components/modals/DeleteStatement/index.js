import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalFooter, ModalBody } from 'reactstrap';
import moment from 'moment';
import { toast } from 'react-toastify';

import ModalCancelButton from 'components/buttons/ModalCancelButton';
import deleteStatement from 'actions/statements/delete';

class DeleteStatementModal extends React.Component {
  // Confirmation modal to delete a statement.

  getDisplayDate = () => moment(this.props.statement.date).format("LL")

  deleteStatement = () => {
    this.props.deleteStatement(this.props.statement.id);
    toast(`Statement for ${this.getDisplayDate()} deleted`);
    this.props.history.push("/dashboard/statements");
    this.props.toggle();
  }

  render() {
    const { worthItem, category, deleteStatement, ...rest } = this.props;
    return (
      <Modal { ...rest } className="asset-modal">
        <ModalBody>
          <p>You are about to delete the statement for <strong>{this.getDisplayDate()}</strong>. If you want it back you'll need to recreate it.</p>
          <p>Are you sure you want to delete it?</p>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton />
          <Button color="danger" onClick={this.deleteStatement}>Yes, delete it</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const ConnectedComponent = connect(null, { deleteStatement })(DeleteStatementModal);
export default withRouter(ConnectedComponent);
