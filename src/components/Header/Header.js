import React from 'react'
import { Link } from 'react-router'

export const Header = () => (
  <div>
    <h1>Header</h1>
    <Link to="/">Home</Link>
    <br />
    <Link to="/dashboard">Dashboard</Link>
    <br />
    <Link to="/login">Log In</Link>
    <br />
    <Link to="/signup">Sign Up</Link>
  </div>
)

export default Header
