import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import {baseURL} from "../utils/url"

const LiveTable2 = ({ setTicker1, setTicker2, setTicker3, setTicker4, selected }) => {
    const [render, setRender] = useState(0)
    const [data, setData] = useState([])
    const [loading, setloading] = useState('')
    const fetch = () => {

        axios.get(`http://localhost:5000/gl/live`)
        
            .then(res =>{
                 setData(res.data[0].live)
                 setloading('hidden')
                })
        // .then(res=>console.log(res.data[0].live))
    }

    useEffect(() => {


        const intervalId = setInterval(() => {

            setRender(p => p + 1)
            fetch();


        }, 5000);

        fetch()
        return () => clearInterval(intervalId);
    }, [render])

    const handleLclick = (symbol) => {
        if (selected === 1) { setTicker1(symbol) }
        else if (selected === 2) { setTicker2(symbol) }
        else if (selected === 3) { setTicker3(symbol) }
        else if (selected === 4) { setTicker4(symbol) }
    }
    return (<div className='container'>


        <div className='flex justify-center my-2' >
            <table className=' w-44 border-separate border-spacing-[2px] px-0.5 text-sm' >
                <tbody>
                    {/* {console.log(data)} */}
                    <tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className=' w-14 animate-pulse rounded-sm'></td></tr>
                    <tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr>
                    <tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr>
                    <tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr>
                    <tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr>

                    {data.sort((a, b) => b.change - a.change).slice(0, 5).map(d => {
                        return (
                            <tr className='h-6' key={d.symbol}>

                                <td className=' w-28 px-2 rounded-sm' onContextMenu={() => window.open(`https://www.binance.com/en/futures/${d.symbol}`, '_blank')} onClick={() => handleLclick(`${d.symbol}`)}>{d.symbol}</td>
                                <td className={`${(d.change > 0) ? "text-green-700  font-extrabold font-mono" : ""} rounded-sm px-2`}>{d.change}%</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <table className=' w-44 border-separate border-spacing-[2px] px-0.5 text-sm' >
                <tbody>
                <tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr>
                <tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr>
                <tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr>
                <tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr>
                <tr className={` ${loading}`}><td className='animate-pulse rounded-sm  '></td><td className='w-14 animate-pulse rounded-sm'></td></tr>
                    {data.sort((a, b) => a.change - b.change).slice(0, 5).map(d => {
                        return (
                            <tr className='h-6' key={d.symbol}>

                                <td className=' w-28 px-2 rounded-sm' onContextMenu={() => window.open(`https://www.binance.com/en/futures/${d.symbol}`, '_blank')} onClick={() => handleLclick(`${d.symbol}`)}>{d.symbol}</td>
                                <td className={`${(d.change < 0) ? "text-red-700  font-extrabold font-mono" : ""} rounded-sm px-2`}>{d.change}%</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <span className='px-4 text-xs text-zinc-600'>(Live data Auto-refresh@5sec)</span>
    </div>
    )
}

export default LiveTable2
