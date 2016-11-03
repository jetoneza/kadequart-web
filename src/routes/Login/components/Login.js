import React from 'react';
import { Link } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.login(this.state);
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { loginErrors, loggingIn } = this.props.auth;

    return (
      <div className="login-page">
        <div className="ui raised wide segment form-wrapper">
          <form className={`ui small form ${loggingIn ? 'loading' : ''} ${loginErrors.length != 0 ? 'error' : ''}`} onSubmit={this.handleSubmit}>
            <div className="ui error message">
              <div className="header">Something is wrong!</div>
              <ul className="list">
                {loginErrors.map((error, key) => {
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
                <i className="lock icon"></i>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
              </div>
            </div>
            <div className="ui stackable grid">
              <div className="nine wide column">
                <button type="submit" className="ui small blue submit button">Log In</button>
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
