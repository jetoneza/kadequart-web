import React from 'react';
import { Modal } from 'semantic-ui-react';
import TransactionForm from './TransactionForm';

const ModalHeader = Modal.Header;
const ModalContent = Modal.Content;

class TransactionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }

    this.transaction = null;
  }

  setTransaction = (transaction) => {
    this.transaction = transaction;
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
          {!this.transaction ? 'Add New' : 'Edit'} Transaction
        </ModalHeader>
        <ModalContent>
          <TransactionForm closeModal={this.close} transaction={this.transaction} {...this.props}/>
        </ModalContent>
      </Modal>
    );
  }
}

export default TransactionModal;
