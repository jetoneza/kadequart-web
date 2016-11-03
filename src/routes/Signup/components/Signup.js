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
      errors: {},
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if(this.isDataValid()) {
      this.props.signup(this.state);
    }
  }

  isDataValid = () => {
    const { username, email, password, confirmPassword } = this.state;

    let errors = {};
    let isValid = true;

    if(!username) {
      errors.username = 'Username is required!';
      isValid = false;
    }

    if(!email) {
      errors.email = 'Email is required!';
      isValid = false;
    }

    if(!password) {
      errors.password = 'Password is required!';
      isValid = false;
    }

    if(!confirmPassword) {
      errors.confirmPassword = 'Password confirmation is required!';
      isValid = false;
    }

    if(password != confirmPassword) {
      errors.password = 'Passwords do not match!';
      isValid = false;
    }

    this.setState({errors});

    return isValid;
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { signUpErrors, signingUp } = this.props.auth;
    const { errors } = this.state;

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
            <div className={`field ${errors.username ? 'error' : ''}`}>
              {errors.username && <label>{errors.username}</label>}
              <div className="ui right icon input">
                <i className="spy icon"></i>
                <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onChange}/>
              </div>
            </div>
            <div className={`field ${errors.email ? 'error' : ''}`}>
              {errors.email && <label>{errors.email}</label>}
              <div className="ui right icon input">
                <i className="mail icon"></i>
                <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
              </div>
            </div>
            <div className={`field ${errors.password ? 'error' : ''}`}>
              {errors.password && <label>{errors.password}</label>}
              <div className="ui right icon input">
                <i className="lock icon"></i>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
              </div>
            </div>
            <div className={`field ${errors.confirmPassword ? 'error' : ''}`}>
              {errors.confirmPassword && <label>{errors.confirmPassword}</label>}
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
