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
      isDeleting: false,
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

  componentWillReceiveProps(newProps, oldProps) {
    const { deleteSuccess } = newProps.transactions;
    const { isDeleting } = this.state;

    if(isDeleting) {
      if(deleteSuccess) {
        this.setState({isDeleting: false});
        this.close();
      }
    }
  }

  handleDeleteClick = () => {
    if(this.transaction) {
      this.setState({isDeleting: true});
      this.props.deleteTransaction(this.transaction.id);
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
