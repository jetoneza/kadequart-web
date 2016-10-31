import React from 'react'
import { Link } from 'react-router'

export const Header = () => (
  <div className="ui secondary fixed menu inverted">
    <div className="ui container">
      <a href="#" className="header item">
        Kadequart
      </a>
      <div className="right menu">
        <Link to="/" className="ui item">Logout</Link>
      </div>
    </div>
  </div>
)

export default Header
