import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { baseURL } from '../utils/url';
const RvolTable = ({ tf }) => {

  const [resData, setResData] = useState([])
  const [loading, setloading] = useState('')


  useEffect(() => {
    axios.get("http://localhost:5000/rvol/"+tf)
    
      .then(res => {
        setResData(res.data)
        if(res.data.length !==0 ){

          setloading("hidden ")
        }
      })
      .catch(err => console.log(err));
  }, [])


  return (


    <div className=' container'>
      <h4 className=' text-center m-3 text-zinc-400'>RVol(Relative Volume) of <br/>{(tf === "d") ? "1D" : tf + "M"} time frame</h4>
      <table className=' w-60 bg-slate-200 rounded mx-auto mb-5 border-separate border-spacing-0.5'>
        <tbody className='  '>

          <tr className=' '>
            <th className=' bg-red-500 rounded-sm w-44 '>Ticker</th>
            <th className=' bg-red-500 rounded-sm  '>RVol</th>
          </tr>
          <tr className={` ${loading}`}><td className='animate-pulse rounded-sm w-44 '></td><td className='w-16 animate-pulse rounded-sm'></td></tr>
          <tr className={` ${loading}`}><td className='animate-pulse rounded-sm w-44 '></td><td className='w-16 animate-pulse rounded-sm'></td></tr>
          <tr className={` ${loading}`}><td className='animate-pulse rounded-sm w-44 '></td><td className='w-16 animate-pulse rounded-sm'></td></tr>
          <tr className={` ${loading}`}><td className='animate-pulse rounded-sm w-44 '></td><td className='w-16 animate-pulse rounded-sm'></td></tr>
          <tr className={` ${loading}`}><td className='animate-pulse rounded-sm w-44 '></td><td className='w-16 animate-pulse rounded-sm'></td></tr>

          {
            resData.map(d => {
              return (
                <tr key={d.ticker} className=' h-6 '>
                  <td className=' w-44 px-2 m-1'>{d.ticker}</td>
                  <td className={(d.rvol >= 3) ? "px-2 !bg-green-600 border rounded-sm " : "px-2 rounded-sm "}>{d.rvol}</td>
                </tr>

              )
            })
          }
        </tbody>
      </table>
    </div>


  )
}

export default RvolTable
