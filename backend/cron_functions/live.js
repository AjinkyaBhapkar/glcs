const axios = require('axios')
let valid_pairs = []


const liveGL = async () => {
    
    let finalData = []
    await axios.get(`https://fapi.binance.com/fapi/v1/ticker/price`)
        .then(res => {
            valid_pairs = res.data.filter(d => d.symbol.includes('USDT') && !d.symbol.includes('_') && !d.symbol.includes('SCUSDT') && !d.symbol.includes('TLMUSDT') && !d.symbol.includes('ICPUSDT'))

            valid_pairs.map(d => {
                axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${d.symbol}&interval=4h&limit=1`)
                    .then(res => {
                        const o = res.data[0][1]
                        const c = res.data[0][4]
                        const pchange = (((c - o) / o) * 100).toFixed(2)
                        // console.log(d.symbol,pchange)

                        finalData.push({ symbol: d.symbol, change: pchange })

                    })
                    .catch(err=>console.log(err))

            })
            // return finalData
            setTimeout(()=>{
                axios.post(`http://localhost:5000/gl/live/update`,{"data":finalData})
                .then(()=>console.log('live data updated'))
                .catch(err=>console.log(err))
            },2000)
        })
        .catch(err=>console.log(err))


}
module.exports = { liveGL }