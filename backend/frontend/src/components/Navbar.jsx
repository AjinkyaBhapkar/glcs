import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [menu, setMenu] = useState('')

  return (<>

    <nav className=' flex items-center h-8 bg-red-300 m-2'>

      <NavLink className={`lg:px-6 px-4  font-sans font-light text-xl`} to={'/'}>Trader's Toolkit</NavLink>
      <button onClick={() => setMenu(prev => (prev === "hidden") ? "" : "hidden")} className=' lg:hidden ml-auto px-4'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
      </button>

      <ul className={`lg:flex lg:flex-row lg:relative lg:w-1/2 lg:top-0   absolute flex top-8 right-0 bg-red-300  flex-col justify-end  w-40  ml-auto  lg:${menu} ${(menu=="hidden")? "":"hidden"} `}>
        <li className='lg:border-none border hover:font-bold border-red-400 w-32 text-center'>

          <NavLink className={` font-sans text-sm items-baseline `} to={'/rvol'}>RVol screener</NavLink>
        </li>
        <li className='lg:border-none border hover:font-bold border-red-400 w-32 text-center'>
          <NavLink className={` font-sans text-sm items-baseline `} to={'/charts'}>Lightweight Charts</NavLink>

        </li>
        <li className='lg:border-none border hover:font-bold border-red-400 w-32 text-center'>

          <NavLink className={` font-sans text-sm items-baseline `} to={'/charts2'}>Tradingview Charts</NavLink>
        </li>
        <li className='lg:border-none border hover:font-bold border-red-400 w-32 text-center'>

          <NavLink className={` font-sans text-sm items-baseline `} to={'/contact'}>Contact us</NavLink>
        </li>

      </ul>




    </nav>

  </>
  )
}

export default Navbar
