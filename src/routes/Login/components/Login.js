import React from 'react';
import { Link } from 'react-router';

class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
        <div className="ui raised wide segment form-wrapper">
          <form className="ui small form">
            <div className="field">
              <div className="ui right icon input">
                <i className="user icon"></i>
                <input type="text" name="username" placeholder="Username" />
              </div>
            </div>
            <div className="field">
              <div className="ui right icon input">
                <i className="lock icon"></i>
                <input type="password" name="password" placeholder="Password" />
              </div>
            </div>
            <div className="ui stackable grid">
              <div className="nine wide column">
                <div className="ui small blue submit button">Log In</div>
              </div>
              <div className="seven wide column signup-link">
                <Link to="/signup">Sign up here.</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
