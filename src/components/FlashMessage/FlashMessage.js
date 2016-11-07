import React from 'react';
import { connect } from 'react-redux';

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
    }
    this.isFlashMounted = true;
  }

  componentDidMount() {
    if(this.props.message) {
      this.hideMessage();
    }
  }

  componentWillReceiveProps(newProps, oldProps) {
    this.isFlashMounted = true;
    if(newProps.message) {
      this.hideMessage();
    }
  }

  componentWillUnmount() {
    this.isFlashMounted = false;
  }

  hideMessage() {
    this.setState({hide: false});
    setTimeout(() => {
      if(this.isFlashMounted) {
        this.setState({hide: true});
      }
    }, 4000);
  }

  getContent = (text) => {
    if(Array.isArray(text)) {
      return (
        <ul className="list">
          {text.map((value, key) => {
            return <li key={key}>{value}</li>
          })}
        </ul>
      );
    }

    return text;
  }

  render() {
    const { message } = this.props;
    return (
      <div className={`ui ${message ? message.type : ''} message flash-message ${!this.state.hide ? 'active' : ''}`}>
        {message && this.getContent(message.text)}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object,
}

function mapStateToProps(state) {
  return {
    message: state.app.flashMessage
  }
}

export default connect(mapStateToProps, {})(FlashMessage);
