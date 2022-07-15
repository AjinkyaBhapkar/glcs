import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './table.css'

const Table = (p) => {
    let g = []
    let l = []

    const [gdata, setgData] = useState([])
    const [ldata, setlData] = useState([])
    const fetch = () => {
        axios.get(`https://binance--screener.herokuapp.com/${p.prop}`)
            .then(res => {
                g = res.data.filter(d => d.change >= 0)
                g.sort((a, b) => parseFloat(b.change) - parseFloat(a.change))
                setgData(g)
                l = res.data.filter(d => d.change < 0)
                l.sort((a, b) => parseFloat(a.change) - parseFloat(b.change))
                setlData(l)
            })
    }

    useEffect(() => {
        fetch();
    }, [])

    return (
        <div className='table-container'>

            <div className='tables'>
                <table className='table'>
                    {/* <caption>Gainers</caption> */}
                    {/* <thead>
                    <tr>
                    <th>Ticker</th>
                    <th>Change</th>
                    </tr>
                    
                </thead> */}
                    <tbody>


                        {
                            gdata.map((d) => {
                                return (
                                    <tr key={d._id}>
                                        <td>{d.ticker}</td>
                                        <td className='green'>{d.change}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <table className='table'>
                    {/* <caption>Losers</caption> */}
                    {/* <thead>
                    <tr>
                    <th>Ticker</th>
                    <th>Change</th>
                    </tr>

                </thead> */}
                    <tbody>


                        {
                            ldata.map((d) => {
                                return (
                                    <tr key={d._id} >
                                        <td>{d.ticker}</td>
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

export default Table
