import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import'./live-table.css'

const LiveTable = () => {
    const [validTickers, setValidTickers] = useState([])
    const [finalData, setFinalData] = useState([])
    const [gainers, setGainers] = useState([])
    const [lossers, setLossers] = useState([])
    let data = []
    const fetch = async () => {
        await axios.get(`https://fapi.binance.com/fapi/v1/ticker/price`)
            .then(async res => {
                setValidTickers(res.data.filter(d => d.symbol.includes('USDT') && !d.symbol.includes('_')))
                validTickers.map(async d => {
                    // console.log(d.symbol)
                    await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${d.symbol}&interval=4h&limit=1`)
                        .then(async res => {
                            const o = res.data[0][1]
                            const c = res.data[0][4]
                            const pchange = (((c - o) / o) * 100).toFixed(2)
                            data.push({ "symbol": d.symbol, "change": pchange })
                             setFinalData(data)
                            // setGainers(data?.sort((a, b) => b.change - a.change).slice(0, 5))
                            // setLossers(data?.sort((a, b) => a.change - b.change).slice(0, 5))

                        })
                })
            })

    }
    // fetch()

    const [m, se] = useState(0)
    useEffect(() => {
        

        const intervalId = setInterval(() => {

            se(p => p + 1)
            fetch();

        }, 10000);

        fetch()
        return () => clearInterval(intervalId);
    }, [m])


    return (
        <div>

            <button onClick={() => se(m => m + 1)}>load live</button>
            <div className='tables-container'>
            <table>
                <tbody>
                    {console.log(data)}
                    {finalData.map(d => {
                        return (
                            <tr key={d.symbol}>
                                <td>{d.symbol}</td>
                                <td>{d.change}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <table>
                <tbody>
                    {finalData.map(d => {
                        return (
                            <tr key={d.symbol}>
                                <td>{d.symbol}</td>
                                <td>{d.change}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default LiveTable
