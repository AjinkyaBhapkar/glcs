import React from 'react'
import { useState } from 'react'
import './navbar.css'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  const[show,setShow]=useState('no')
  const collapse=()=>{setShow(prev=>(prev==='no')?'yes':'no')}
  const[show2,setShow2]=useState('no')
  const collapse2=()=>{setShow2(prev=>(prev==='no')?'yes':'no')}
  return (<>

    <div className='navbar-container'>
    
      <div className='logo'><NavLink to={'/'}>Trader's Toolkit</NavLink></div>
      <div className='hamburger'>
        <button id='hamburger' onClick={collapse}>Menu</button>

      </div>
      <div className='nav-links'>
        <ul>
          
        <li onClick={collapse2}>Charts
        <ul className={`${show2} drop  `}>
        <NavLink to={'/charts'}>V 1.0</NavLink>
        <NavLink to={'/charts2'}>V 2.0</NavLink>
          
        </ul>
        </li>
          <NavLink to={'/contact'}>Contact us</NavLink>
          
          
        </ul>
      </div>
      
    </div>
    <div className={`drop-down ${show}`}>
      <ul>
        <li>Charts
        <ul className='nested-nav-links'>
        <NavLink to={'/charts'}>V 1.0</NavLink>
        <NavLink to={'/charts2'}>V 2.0</NavLink>
          
        </ul>
        </li>
      
      <NavLink to={'/contact'}>Contact us</NavLink>
        
      </ul>
    </div>
  </>
  )
}

export default Navbar
