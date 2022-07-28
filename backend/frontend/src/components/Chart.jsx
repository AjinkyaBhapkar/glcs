import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { useState } from 'react';
import './chart.css'

const Chart = ({ ticker, setTicker, id,selected, details }) => {

    const [precision, setPrecision] = useState(2)
    const [ohlc, setohlc] = useState({ open: '0', high: '0', low: '0', close: '0' })
    const [tf, setTf] = useState('4h')
    const [grid, setGrid] = useState(true)
    const [menu, setMenu] = useState('hide')
    const [tickerInput,setTickerInput]=useState('')

    useEffect(() => {
        plot4(ticker, tf)

    }, [precision, tf, ticker, grid]);


    useEffect(() => {
        document.getElementById(details).innerHTML = `<h4>${ticker} ${tf}</h4> 
        <p class=${((ohlc.close - ohlc.open) > 0) ? 'green' : 'red'}>O:${ohlc.open} H:${ohlc.high} L:${ohlc.low} C:${ohlc.close} &nbsp; (${(((ohlc.close - ohlc.open) * 100) / ohlc.open).toFixed(2)}%) &nbsp;${(ohlc.close-ohlc.open).toFixed(precision)}</p>`

    }, [ohlc, tf, ticker])

    function plot4(tikkr, timef) {

        axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${tikkr}&contractType=PERPETUAL&interval=${timef}&limit=1500`)
            .then((k) => {
                let p = 0
                if (k.data[0][1].split('.')[1] === undefined) { p = 2 }
                else { p = k.data[0][1].split('.')[1].length }
                setPrecision(p)


                let f = k.data.map(row => {
                    let time = new Date(row[0])

                    // converting to UTC +05:30
                    time.setHours(time.getHours() + 5);
                    time.setMinutes(time.getMinutes() + 30);

                    return {
                        time: time / 1000,
                        open: parseFloat(row[1]),
                        high: parseFloat(row[2]),
                        low: parseFloat(row[3]),
                        close: parseFloat(row[4])
                    }
                });




                let chart = createChart(document.getElementById(id), {
                    width: (window.innerWidth * 0.49),
                    height: (window.innerHeight * 0.45),

                    layout: {

                        textColor: 'rgba(200, 200, 200, 0.8)',
                        backgroundColor: '#253248',
                        fontSize: 8,
                    },


                    grid: {
                        vertLines: {
                            visible: grid,
                            color: '#334158',
                        },
                        horzLines: {
                            visible: grid,
                            color: '#334158',
                        },
                    },

                    crosshair: {
                        mode: CrosshairMode.Normal,
                    },

                    rightPriceScale: {
                        borderColor: '#334158',
                    },

                    timeScale: {
                        borderColor: '#334158',
                        timeVisible: true,
                    },
                });

                let candleSeries = chart.addCandlestickSeries({
                    upColor: 'rgba(0, 246, 150, 1)',
                    downColor: 'rgba(255, 93, 92, 1)',
                    borderDownColor: 'rgba(255, 93, 92, 1)',
                    borderUpColor: 'rgba(0, 246, 150, 1)',
                    wickDownColor: 'rgba(255, 93, 92, 1)',
                    wickUpColor: 'rgba(0, 246, 150, 1)',
                });

                candleSeries.applyOptions({
                    priceFormat: {
                        type: 'price',
                        precision: precision,
                        minMove: 0.00000001,
                    },
                });

                candleSeries.setData(f)
                console.log(f)

                chart.subscribeCrosshairMove(param => {
                    if (param.time) setohlc(param.seriesPrices.get(candleSeries))
                })


                let binanceSocket = ''
                binanceSocket = new WebSocket(`wss://fstream.binance.com/ws/${tikkr.toLowerCase()}_perpetual@continuousKline_${timef}`)

                binanceSocket.onmessage = function (event) {
                    let z = JSON.parse(event.data).k
                    let dateObj = new Date(z.t);
                    // converting to UTC +05:30
                    dateObj.setHours(dateObj.getHours() + 5);
                    dateObj.setMinutes(dateObj.getMinutes() + 30);
                    

                    candleSeries.update({
                        time: dateObj / 1000,
                        open: parseFloat(z.o),
                        high: parseFloat(z.h),
                        low: parseFloat(z.l),
                        close: parseFloat(z.c)
                    })
                }
            })
            .catch(function (error) {

                console.log(error);
            })

    };

    const handleChartRclick = (e) => {
        e.preventDefault();
        setMenu('')
    }

    useEffect(() => {
        setMenu('hide')
        setTickerInput('')
    }, [grid,ticker])
    return (
        <div className='chart'>
            <div>
                <button onClick={() => setTf('1m')}>1m</button>
                <button onClick={() => setTf('3m')} >3m</button>
                <button onClick={() => setTf('5m')} >5m</button>
                <button onClick={() => setTf('15m')}>15m</button>
                <button onClick={() => setTf('1h')}>1H</button>
                <button onClick={() => setTf('4h')}>4H</button>
                <button onClick={() => setTf('1d')}>1D</button>
                <button onClick={() => setTf('1w')}>1W</button>
            </div>
            <div className='details' id={details}></div>
            <div onContextMenu={e => handleChartRclick(e)} id={id}></div>
            <div className={`menu ${menu}`}>
                <div className='menu-item'><p></p><button className='close-btn' onClick={() => setMenu('hide')}>x</button>
                </div>
                <div className='menu-item'>
                    <input type="text" placeholder={`Enter pair for Screen ${selected}`} onChange={(e)=>setTickerInput(e.target.value.toUpperCase())} value={tickerInput} />
                    <button onClick={()=>setTicker(tickerInput)}>Submit</button>
                </div>
                <div className='menu-item'><p>Grid</p> <button
                    onClick={() => (grid) ? setGrid(false) : setGrid(true)}>{(grid) ? 'Disable' : "Enable"}</button>
                </div>

            </div>
        </div>
    )
}

export default Chart
