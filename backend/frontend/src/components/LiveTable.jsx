import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LiveTable2 = () => {
    const [render, setRender] = useState(0)
    const [data, setData] = useState([])
    const fetch = () => {

        axios.get(`https://traderstoolkit.herokuapp.com/gl/live`)
            .then(res => setData(res.data[0].live))
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

    return (<div className='table-main'>
        <h3 style={{'textAlign':'center','color':'gray'}}>Top Gainers and Lossers of current 4H candle</h3>
       
        <div className='tables-container'>
            <table>
                <tbody>
                    {/* {console.log(data)} */}

                    {data.sort((a,b)=>b.change-a.change).slice(0, 5).map(d => {
                        return (
                            <tr key={d.symbol}>
                                <td><a target="_blank" rel="noopener noreferrer" href={`https://www.binance.com/en/futures/${d.symbol}`}>{d.symbol}</a></td>
                                <td className={(d.change>0)? 'green':''}>{d.change}%</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <table>
                <tbody>
                    {data.sort((a,b)=>a.change-b.change).slice(0,5).map(d => {
                        return (
                            <tr key={d.symbol}>
                                <td><a target="_blank" rel="noopener noreferrer" href={`https://www.binance.com/en/futures/${d.symbol}`}>{d.symbol}</a></td>
                                <td className={(d.change<0)? 'red':''}>{d.change}%</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <span style={{'color':'gray'}}>(Live data Auto-refresh@5sec)</span>
        </div>
  )
}

export default LiveTable2
