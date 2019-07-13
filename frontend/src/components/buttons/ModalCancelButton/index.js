import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { hideModal } from 'actions/general/modals';

class ModalCancelButton extends React.Component {
  render() {
    return <Button color="link" type="button" onClick={this.props.hideModal}>Cancel</Button>;
  }
};

export default connect(null, { hideModal })(ModalCancelButton);
