import React from 'react';
import { Link } from 'react-router';

class Signup extends React.Component {
  render() {
    return (
      <div className="signup-page">
        <div className="ui raised wide segment form-wrapper">
          <form className="ui small form">
            <div className="field">
              <div className="ui right icon input">
                <i className="spy icon"></i>
                <input type="text" name="username" placeholder="Username" />
              </div>
            </div>
            <div className="field">
              <div className="ui right icon input">
                <i className="mail icon"></i>
                <input type="email" name="email" placeholder="Email" />
              </div>
            </div>
            <div className="field">
              <div className="ui right icon input">
                <i className="lock icon"></i>
                <input type="password" name="password" placeholder="Password" />
              </div>
            </div>
            <div className="field">
              <div className="ui right icon input">
                <i className="lock icon"></i>
                <input type="password" name="confirm-password" placeholder="Confirm Password" />
              </div>
            </div>
            <div className="ui stackable grid">
              <div className="nine wide column">
                <div className="ui small blue submit button">Sign Up</div>
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
