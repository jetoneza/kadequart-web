import React from 'react';
import { Modal } from 'semantic-ui-react';

const ModalHeader = Modal.Header;
const ModalContent = Modal.Content;

class NoteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }

    this.notes = null;
  }

  setNotes = (notes) => {
    this.notes = notes;
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
          Notes
        </ModalHeader>
        <ModalContent>
          {this.notes}
        </ModalContent>
      </Modal>
    );
  }
}

export default NoteModal;

