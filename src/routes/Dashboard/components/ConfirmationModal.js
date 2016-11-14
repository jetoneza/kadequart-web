import React from 'react';
import { Modal } from 'semantic-ui-react';
import TransactionForm from './TransactionForm';
import { formatNumber, zeroPad } from 'utils/currency';

const ModalHeader = Modal.Header;
const ModalContent = Modal.Content;
const ModalActions = Modal.Actions;

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      isConfirming: false,
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
    const { confirmSuccess } = newProps.transactions;
    const { isConfirming } = this.state;

    if(isConfirming) {
      if(confirmSuccess) {
        this.setState({isConfirming: false});
        this.close();
      }
    }
  }

  handleConfirmClick = () => {
    if(this.transaction) {
      this.setState({isConfirming: true});
      this.props.confirmTransaction(this.transaction.id);
    }
  }

  render() {
    const { open } = this.state;

    return (
      <Modal size="small" open={open} onClose={this.close}>
        <ModalHeader>
          Confirm Transaction
        </ModalHeader>
        <ModalContent>
          {this.transaction && <table className="ui very basic table">
            <thead>
              <tr>
                <th>Transaction #</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{zeroPad(this.transaction.id, 8)}</td>
                <td>
                  <div className={`ui ${this.transaction.type.type === 'inflow' ? 'green' : 'red'} label`}>
                    {formatNumber(this.transaction.type.type === 'inflow' ? this.transaction.amount : (this.transaction.amount * -1), '')}
                  </div>
                </td>
                <td>
                  {this.transaction.type.name}
                </td>
                <td>{this.transaction.created_at}</td>
              </tr>
            </tbody>
          </table>}
          {this.transaction && ( this.transaction.notes && <div className="ui items">
            <div className="item">
              <div className="content">
                <div className="header">
                  Notes:
                </div>
                <div className="description">
                  <p>{this.transaction.notes}</p>
                  <br />
                </div>
              </div>
            </div>
          </div>)}
          Are you sure you want to confirm this transaction?
        </ModalContent>
        <ModalActions>
          <div className="ui negative button" onClick={this.close}>
            No
          </div>
          <div className="ui positive right labeled icon button" onClick={this.handleConfirmClick}>
            Yes
            <i className="checkmark icon"></i>
          </div>
        </ModalActions>
      </Modal>
    );
  }
}

export default ConfirmationModal;
