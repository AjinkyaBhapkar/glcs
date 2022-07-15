import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import './table2.css'

const Table2 = (pr) => {
  const [gainer, setGainer] = useState([])
  const [losser, setLosser] = useState([])
  const[tm,setTM]=useState('')
  const[sessn,setSessn]=useState('')
  const[prop,setProp]=useState(pr.index)
  


  const session=()=>{
    if(tm.slice(11,13)==='23'){setSessn('Daily Close')}
    else if(tm.slice(11,13)==='03'){setSessn('Asian')}
    else if(tm.slice(11,13)==='07'){setSessn('London Open')}
    else if(tm.slice(11,13)==='11'){setSessn('NewYork Open')}
    else if(tm.slice(11,13)==='15'){setSessn('London Closing')}
    else if(tm.slice(11,13)==='19'){setSessn('NewYork Closing')}
    else {setSessn('Not 4h closing data ')}
  }
  useEffect(() => {
    axios.get(`https://binance--screener.herokuapp.com/gl/240`)
    .then(res => {
      setTM(res.data[(res.data.length)-(prop)].createdAt)
      setGainer(res.data[(res.data.length)-(prop)].gainer)
      setLosser(res.data[(res.data.length)-(prop)].looser)
      
    })
    session()
  },[tm])

  

  return (
   
    <div className='table-main'>
      <div className='table-header'>

      <h4 className='table-date'>{tm.slice(0,10)}</h4>
      <p className='table-session'>{sessn}</p>
      <p className='table-session-time'>({tm.slice(11,19)} UTC)</p>
      </div>
      <div className='tables-container'>
      <table id='ta'>
        
        <tbody>
          {
            gainer.sort((a,b)=>b.change-a.change).map(d => {
              return (
                <tr key={d.symbol} >
                  <td>{d.symbol}</td>
                  <td className='green'>{d.change}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <table>
        
        <tbody>
          {
            losser.map(d => {
              return (
                <tr key={d.symbol} >
                  <td>{d.symbol}</td>
                  <td className='red'>{d.change}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Table2
