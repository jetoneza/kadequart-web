import React from 'react'
import Header from 'components/Header'

export const CoreLayout = ({ children }) => (
  <div className='core-layout'>
    <Header />
    <div className="main-content">
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
