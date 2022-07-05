import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'


const Table = () => {
    const [data, setData] = useState([])
    const fetch = () => {
        axios.get(`http://localhost:5000/gl`)
            .then(res => {
                
                setData(res.data)

            }
            )
    }

    useEffect(() => {
        fetch();
    }, [])

    return (
        <>
            <table>

                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Change</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        data.map((d) => {
                            return (
                                <tr key={d._id}>
                                    <td>{d.ticker}</td>
                                    <td>{d.change}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table
