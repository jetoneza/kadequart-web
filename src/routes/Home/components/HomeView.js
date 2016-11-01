import React from 'react'
import { Link } from 'react-router';

export const HomeView = () => (
  <div className="home-page">
    <div className="introduction">
      <h1 className="ui inverted header">
        <span className="library">
          Kadequart
        </span>
        <span className="tagline">
          A simple credits tracker
        </span>
      </h1>
      <div className="ui hidden divider"></div>
      <Link to="/login" className="ui huge inverted download button">
        Start Tracking
      </Link>
      <Link to="/signup" className="ui huge inverted basic button">
        Create An Account
      </Link>
    </div>
  </div>
)

export default HomeView
