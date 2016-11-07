import React from 'react'
import HeaderContainer from 'containers/HeaderContainer'
import FlashMessage from 'components/FlashMessage'
import 'styles/core.scss'

export const CoreLayout = ({ children, location }) => (
  <div className='core-layout'>
    <HeaderContainer location={location}/>
    <FlashMessage />
    <div className="main-content">
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
