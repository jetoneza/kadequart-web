import React from 'react';
import { Link } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {},
    }
  }

  isDataValid = () => {
    const { username, password } = this.state;

    let errors = {};
    let isValid = true;

    if(!username) {
      errors.username = 'Username is required!';
      isValid = false;
    }

    if(!password) {
      errors.password = 'Password is required!';
      isValid = false;
    }

    this.setState({errors});

    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if(this.isDataValid()) {
      this.props.login(this.state);
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { loginErrors, loggingIn } = this.props.auth;
    const { errors } = this.state;

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
            <div className={`field ${errors.username ? 'error' : ''}`}>
              {errors.username && <label>{errors.username}</label>}
              <div className="ui right icon input">
                <i className="spy icon"></i>
                <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onChange}/>
              </div>
            </div>
            <div className={`field ${errors.password ? 'error' : ''}`}>
              {errors.password && <label>{errors.password}</label>}
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
