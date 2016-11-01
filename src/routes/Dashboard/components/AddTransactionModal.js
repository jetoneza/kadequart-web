import React from 'react';
import { Modal } from 'semantic-ui-react';
import AddTransactionForm from './AddTransactionForm';

const ModalHeader = Modal.Header;
const ModalContent = Modal.Content;
const ModalActions = Modal.Actions;

class AddTransactionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  open = () => {
    this.setState({open: true});
  }

  close = () => {
    this.setState({open: false});
  }

  render() {
    const { open } = this.state;

    return (
      <Modal size="small" open={open} onClose={this.close}>
        <ModalHeader>
          Add New Transaction
        </ModalHeader>
        <ModalContent>
          <AddTransactionForm closeModal={this.close}/>
        </ModalContent>
      </Modal>
    );
  }
}

export default AddTransactionModal;
