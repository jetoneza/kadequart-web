import React from 'react'
import { Link } from 'react-router'

export const Header = ({ location }) => (
  <div className="ui secondary fixed menu inverted main-header">
    <div className="ui container">
      <Link to="/" className="header item">KDQ</Link>
      <div className="right menu">
        { location.pathname == '/dashboard' && <Link to="/" className="ui item">Logout</Link> }
        { location.pathname == '/' &&
          <div className="item">
            <Link to="/login" className="ui inverted basic button">Log In</Link>
          </div>
        }
        { (location.pathname == '/login' || location.pathname == '/signup') &&
          <Link to="/" className="ui item">Home</Link>
        }
      </div>
    </div>
  </div>
)

export default Header
