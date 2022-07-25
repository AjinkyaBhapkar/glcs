import React from 'react'
import { useState } from 'react'
import './navbar.css'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  const[show,setShow]=useState('no')
  const collapse=()=>{setShow(prev=>(prev==='no')?'yes':'no')}
  return (<>

    <div className='navbar-container'>
      <div className='logo'>Trader's Toolkit</div>
      <div className='hamburger'>
        <button id='hamburger' onClick={collapse}>Menu</button>

      </div>
      <div className='nav-links'>
        <ul>
          
          <NavLink to={'/charts'}><li className='link'>Charts</li></NavLink>
          <li>Contact us</li>
          <li>Login</li>
        </ul>
      </div>
      
    </div>
    <div className={`drop-down ${show}`}>
      <ul>
        <li>Products</li>
        <li>Contact us</li>
        <li>Login</li>
      </ul>
    </div>
  </>
  )
}

export default Navbar
