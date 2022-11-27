import React from 'react'
import LiveTable from '../components/LiveTable'
import Navbar from '../components/Navbar'
import Table from '../components/Table'



const HomePage = () => {
  return (
    <div className='homepage-container'>
      <Navbar />
      
      <h3 className='text-center text-xl text-zinc-300'>Top Gainers and Lossers of current 4H candles</h3>
      <LiveTable />
      <h3 className='text-center text-xl text-zinc-300'>Top Gainers and Lossers of previous 4H candles</h3>
      <div className='lg:grid lg:grid-cols-2 flex flex-col'>

      <Table index='1' />
      <Table index='2' />
      <Table index='3' />
      <Table index='4' />
      </div>
    </div>
  )
}

export default HomePage
