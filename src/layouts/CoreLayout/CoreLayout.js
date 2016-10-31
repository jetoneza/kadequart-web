import React from 'react'
import Header from 'components/Header'
import 'styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='core-layout'>
    <Header />
    <div className="main-content ui main container">
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
