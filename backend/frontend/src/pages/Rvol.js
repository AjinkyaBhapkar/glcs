import React from 'react'
import Navbar from '../components/Navbar'
import RvolTable from '../components/RvolTable'


const Rvol = () => {
    return (
        <div className=' '>
            <Navbar/>
            <h3 className=' text-3xl text-zinc-300 lg:py-5 py-2 text-center font-mono'>RVol Screener</h3>
        <div className='lg:grid grid-cols-4   '>
            <RvolTable tf="5" />
            <RvolTable tf="15" />
            <RvolTable tf="60" />
            <RvolTable tf="240" />
            <RvolTable tf="d" />
        </div>
        </div>
    )
}

export default Rvol
