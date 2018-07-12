import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: true,
      loginStatus: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        {
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal">
            <button onClick={this.closeModal}>close</button>
            <Button color="secondary" onClick={this.closeModal}>
              Sign Up
            </Button>
            <h2 ref={subtitle => (this.subtitle = subtitle)}>Sign In</h2>

            <form>
              username
              <input />
              password
              <input />
              <Button color="primary">OK</Button>
            </form>
          </Modal>
        }
      </div>
    );
  }
}

export default SignIn;
