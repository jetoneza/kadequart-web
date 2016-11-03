import React from 'react';
import { Link } from 'react-router';

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.signup(this.state);
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { signUpErrors, signingUp } = this.props.auth;

    return (
      <div className="signup-page">
        <div className="ui raised wide segment form-wrapper">
          <form className={`ui small form ${signingUp ? 'loading' : ''} ${signUpErrors.length != 0 ? 'error' : ''}`} onSubmit={this.handleSubmit}>
            <div className="ui error message">
              <div className="header">Something is wrong!</div>
              <ul className="list">
                {signUpErrors.map((error, key) => {
                  return <li key={key}>{error.message}</li>
                })}
              </ul>
            </div>
            <div className="field">
              <div className="ui right icon input">
                <i className="spy icon"></i>
                <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onChange}/>
              </div>
            </div>
            <div className="field">
              <div className="ui right icon input">
                <i className="mail icon"></i>
                <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
              </div>
            </div>
            <div className="field">
              <div className="ui right icon input">
                <i className="lock icon"></i>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
              </div>
            </div>
            <div className="field">
              <div className="ui right icon input">
                <i className="lock icon"></i>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChange}/>
              </div>
            </div>
            <div className="ui stackable grid">
              <div className="nine wide column">
                <button type="submit" className="ui small blue submit button">Sign Up</button>
              </div>
              <div className="seven wide column login-link">
                <Link to="/login">Login here.</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
