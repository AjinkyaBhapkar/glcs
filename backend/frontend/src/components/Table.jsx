import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
// import { baseURL } from '../utils/url'



const Table2 = (pr) => {
  const [gainer, setGainer] = useState([])
  const [losser, setLosser] = useState([])
  const[tm,setTM]=useState('')
  const[sessn,setSessn]=useState('')
  const[prop,setProp]=useState(pr.index)
  const [loading, setloading] = useState('')


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
    axios.get(`http://localhost:5000/gl/240`)
    
    .then(res => {
      setTM(res.data[(res.data.length)-(prop)].createdAt)
      setGainer(res.data[(res.data.length)-(prop)].gainer)
      setLosser(res.data[(res.data.length)-(prop)].looser)
      setloading('hidden')
      
    })
    session()
  },[tm])

  

  return (
   
    <div className='container'>
      <div className='w-11/12 py-0.5 my-3 border-y text-zinc-400 border-slate-600 mx-auto text-sm flex justify-between'>

      <h4 className='table-date'>{tm.slice(0,10)}</h4>
      <p className='table-session'>{sessn}</p>
      <p className='table-session-time'>({tm.slice(11,19)} UTC)</p>
      </div>
      <div className='flex justify-center mb-6'>
      <table  className=' w-44 border-separate border-spacing-[2px] px-0.5 text-sm'>
        
        <tbody className=' '>
        <tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr><tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr><tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr><tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr><tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr>
          {
            gainer.sort((a,b)=>b.change-a.change).map(d => {
              return (
                <tr className='h-6' key={d.symbol} >
                  <td className=" w-28 px-2  rounded-sm "><a target="_blank" rel="noopener noreferrer" href={`https://www.binance.com/en/futures/${d.symbol}`}>{d.symbol}</a></td>
                  <td className={`${(d.change>0)?"text-green-700  font-extrabold font-mono":""} rounded-sm px-2`}>{d.change}%</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <table className=' w-44 border-separate border-spacing-[2px] px-0.5 text-sm'>
        
        <tbody>
        <tr className={` ${loading}`}><td className='animate-pulse rounded-sm '></td><td className='w-14 animate-pulse rounded-sm'></td></tr><tr className={` ${loading}`}><td className='animate-pulse rounded-sm '></td><td className='w-14 animate-pulse rounded-sm'></td></tr><tr className={` ${loading}`}><td className='animate-pulse rounded-sm '></td><td className='w-14 animate-pulse rounded-sm'></td></tr><tr className={` ${loading}`}><td className='animate-pulse rounded-sm '></td><td className='w-14 animate-pulse rounded-sm'></td></tr><tr className={` ${loading}`}><td className='animate-pulse rounded-sm '></td><td className='w-14 animate-pulse rounded-sm'></td></tr>
          {
            losser.map(d => {
              return (
                <tr className='h-6' key={d.symbol} >
                  <td className=" w-28 px-2 rounded-sm "><a target="_blank" rel="noopener noreferrer" href={`https://www.binance.com/en/futures/${d.symbol}`}>{d.symbol}</a></td>
                  <td className={`${(d.change<0)?"text-red-700  font-extrabold font-mono":""} rounded-sm px-2`}>{d.change}%</td>
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
