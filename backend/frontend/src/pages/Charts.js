import React, { useState } from 'react'
import Chart from '../components/Chart'
import LiveTable from '../components/LiveTable'
import RvolTable from '../components/RvolTable'
import './chartPage.css'

const Charts = () => {
    const [ticker1, setTicker1] = useState('BTCUSDT')
    const [ticker2, setTicker2] = useState('XRPUSDT')
    const [ticker3, setTicker3] = useState('LTCUSDT')
    const [ticker4, setTicker4] = useState('ETHUSDT')
    const [selected, setSelected] = useState(1)


    const handleLclick = (symbol) => {
        if (selected === 1) { setTicker1(symbol) }
        else if (selected === 2) { setTicker2(symbol) }
        else if (selected === 3) { setTicker3(symbol) }
        else if (selected === 4) { setTicker4(symbol) }
    }

    return (<div className='charts-container'>
        <div className='charts-row'>
            <div className={(selected===1)? 'selected':''} onClick={() => setSelected(1)}><Chart ticker={ticker1} setTicker={setTicker1} id={'chart1'} selected={selected} details={'details1'} /></div>
            <div className={(selected===2)? 'selected':''} onClick={() => setSelected(2)}><Chart ticker={ticker2} setTicker={setTicker2} id={'chart2'} selected={selected} details={'details2'} /></div>

        </div>
        <div className='charts-row'>
            <div className={(selected===3)? 'selected':''} onClick={() => setSelected(3)}><Chart ticker={ticker3} setTicker={setTicker3} id={'chart3'} selected={selected} details={'details3'} /></div>
            <div className={(selected===4)? 'selected':''} onClick={() => setSelected(4)}><Chart ticker={ticker4} setTicker={setTicker4} id={'chart4'} selected={selected} details={'details4'} /></div>

        </div>
        <p className='chartPage-title'>Current 4H candle Gainer and Lossers</p>
        <LiveTable setTicker1={setTicker1} setTicker2={setTicker2} setTicker3={setTicker3} setTicker4={setTicker4} selected={selected} />
        <RvolTable tf="5"/>
        <RvolTable tf="15"/>
        <RvolTable tf="60"/>
        <RvolTable tf="240"/>
        <RvolTable tf="d"/>
    </div>
    )
}

export default Charts
