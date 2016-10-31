import React from 'react'
import { Link } from 'react-router'

export const Header = () => (
  <div className="ui fixed inverted menu">
    <div className="ui container">
      <a href="#" className="header item">
        Kadequart
      </a>
      <Link to="/" className="item">Home</Link>
      <Link to="/dashboard" className="item">Dashboard</Link>
      <Link to="/login" className="item">Log In</Link>
      <Link to="/signup" className="item">Sign Up</Link>
    </div>
  </div>
)

export default Header
