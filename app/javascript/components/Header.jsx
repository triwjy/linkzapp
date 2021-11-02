import React from 'react'
import './styles/Header.css'
import logo from '../../assets/images/logo.svg'

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="zcom-logo" height='100%' />
    </div>

  )
}

export default Header
