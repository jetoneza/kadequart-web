import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ModalHeader = Modal.Header;
const ModalContent = Modal.Content;
const ModalDescription = Modal.Description;

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <div className="ui inverted segment">
      <button className="ui inverted button">Standard</button>
      <button className="ui inverted red button">Red</button>
      <button className="ui inverted orange button">Orange</button>
      <button className="ui inverted yellow button">Yellow</button>
      <button className="ui inverted olive button">Olive</button>
      <button className="ui inverted green button">Green</button>
      <button className="ui inverted teal button">Teal</button>
      <button className="ui inverted blue button">Blue</button>
      <button className="ui inverted violet button">Violet</button>
      <button className="ui inverted purple button">Purple</button>
      <button className="ui inverted pink button">Pink</button>
      <button className="ui inverted brown button">Brown</button>
      <button className="ui inverted grey button">Grey</button>
      <button className="ui inverted black button">Black</button>
    </div>
    <Modal trigger={<Button>Show Modal</Button>}>
    <ModalHeader>Select a Photo</ModalHeader>
    <ModalContent image>
      <Image wrapped size='medium' src='http://semantic-ui.com/images/avatar2/large/rachel.png' />
      <ModalDescription>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </ModalDescription>
    </ModalContent>
  </Modal>
    <img
      alt='This is a duck, because Redux!'
      className={classes.duck}
      src={DuckImage} />
  </div>
)

export default HomeView
