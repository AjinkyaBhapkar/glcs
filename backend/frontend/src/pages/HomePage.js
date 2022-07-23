import React from 'react'
import LiveTable from '../components/LiveTable'
import Navbar from '../components/Navbar'
import Table from '../components/Table'
import './homepage.css'

const HomePage = () => {
  return (
    <div className='homepage-container'>
      <Navbar />
      <LiveTable />
      <h3 style={{ "textAlign": "center" ,"color":'gray'}}>Top Gainers and Lossers of previous 4H candles</h3>
      <Table index='1' />
      <Table index='2' />
      <Table index='3' />
      <Table index='4' />
    </div>
  )
}

export default HomePage
