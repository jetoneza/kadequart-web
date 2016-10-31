import React from 'react'
import Header from 'components/Header'
import 'styles/core.scss'

export const CoreLayout = ({ children, location }) => (
  <div className='core-layout'>
    { location.pathname !== '/login' && <Header /> }
    <div className="main-content ui main container">
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
