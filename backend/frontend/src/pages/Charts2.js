import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import LiveTable from '../components/LiveTable';
import RvolTable from '../components/RvolTable';
import './chartpage2.css'


const Charts2 = () => {

    // addEventListener('resize',()=>{console.log('resized')})
    const [ticker1, setTicker1] = useState('BTCUSDT')
    const [ticker2, setTicker2] = useState('XRPUSDT')
    const [ticker3, setTicker3] = useState('BNBUSDT')
    const [ticker4, setTicker4] = useState('ETHUSDT')
    


    

    let Width = (window.innerWidth * 0.49).toFixed(0)
    let Height = (window.innerHeight * 0.5).toFixed(0)
    return (<div className='chartspage2-container'>
        <div className='chartv2-row'>
            <div>
                <AdvancedRealTimeChart
                    theme="dark"
                    height={Height}
                    width={Width}
                    symbol={`BINANCE:${ticker1}PERP`}
                    timezone={'Asia/Kolkata'}
                    // container_id={id}
                    disabled_features={['create_volume_indicator_by_default']}
                    enabled_features={['countdown', 'use_localstorage_for_settings', 'items_favoriting', 'save_chart_properties_to_local_storage']}
                    studies={['MAExp@tv-basicstudies', 'RSI@tv-basicstudies']}

                ></AdvancedRealTimeChart>
            </div>
            <div>
                <AdvancedRealTimeChart
                    theme="dark"
                    height={Height}
                    width={Width}
                    symbol={`BINANCE:${ticker2}PERP`}
                    timezone={'Asia/Kolkata'}
                    // container_id={id}
                    disabled_features={['create_volume_indicator_by_default']}
                    enabled_features={['countdown', 'use_localstorage_for_settings', 'items_favoriting', 'save_chart_properties_to_local_storage']}
                    studies={['MAExp@tv-basicstudies', 'RSI@tv-basicstudies']}

                ></AdvancedRealTimeChart>
            </div>
        </div>
        <div className='chartv2-row' style={{'marginTop':"-32px"}}>
            <div>
                <AdvancedRealTimeChart
                    theme="dark"
                    height={Height}
                    width={Width}
                    symbol={`BINANCE:${ticker3}PERP`}
                    timezone={'Asia/Kolkata'}
                    // container_id={id}
                    disabled_features={['create_volume_indicator_by_default']}
                    enabled_features={['countdown', 'use_localstorage_for_settings', 'items_favoriting', 'save_chart_properties_to_local_storage']}
                    studies={['MAExp@tv-basicstudies', 'RSI@tv-basicstudies']}

                ></AdvancedRealTimeChart>
            </div>
            <div>
                <AdvancedRealTimeChart
                    theme="dark"
                    height={Height}
                    width={Width}
                    symbol={`BINANCE:${ticker4}PERP`}
                    timezone={'Asia/Kolkata'}
                    // container_id={id}
                    disabled_features={['create_volume_indicator_by_default']}
                    enabled_features={['countdown', 'use_localstorage_for_settings', 'items_favoriting', 'save_chart_properties_to_local_storage']}
                    studies={['MAExp@tv-basicstudies', 'RSI@tv-basicstudies']}

                ></AdvancedRealTimeChart>
            </div>
        </div>
        <h3>Current 4H candle Gainers and Lossers</h3>
        <LiveTable  />
        <RvolTable tf="5"/>
        <RvolTable tf="15"/>
        <RvolTable tf="60"/>
        <RvolTable tf="240"/>
        <RvolTable  tf="d"/>
        <h2 style={{'margin':"0"}}>*set browser zoom to 67% or below for better lokking chars</h2>
    </div>
    )
}

export default Charts2
