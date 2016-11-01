import React from 'react';
import { Modal } from 'semantic-ui-react';
import TransactionForm from './TransactionForm';

const ModalHeader = Modal.Header;
const ModalContent = Modal.Content;
const ModalActions = Modal.Actions;

class ConfirmDeleteModal extends React.Component {
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

  handleDeleteClick = () => {
    if(this.transaction) {
      const data = {
        id: this.transaction.id
      };

      console.log(data);

      //TODO handle delete
      this.close();
    }
  }

  render() {
    const { open } = this.state;

    return (
      <Modal size="small" open={open} onClose={this.close}>
        <ModalHeader>
          Delete Transaction
        </ModalHeader>
        <ModalContent>
          Are you sure you want to delete this transaction?
        </ModalContent>
        <ModalActions>
          <div className="ui negative button" onClick={this.close}>
            No
          </div>
          <div className="ui positive right labeled icon button" onClick={this.handleDeleteClick}>
            Yes
            <i className="checkmark icon"></i>
          </div>
        </ModalActions>
      </Modal>
    );
  }
}

export default ConfirmDeleteModal;
