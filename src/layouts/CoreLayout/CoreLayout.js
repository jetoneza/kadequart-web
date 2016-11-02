import React from 'react'
import HeaderContainer from 'containers/HeaderContainer'
import 'styles/core.scss'

export const CoreLayout = ({ children, location }) => (
  <div className='core-layout'>
    <HeaderContainer location={location}/>
    <div className="main-content">
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
