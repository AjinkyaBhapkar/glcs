const axios = require('axios')

const fetch = async () => {


    let symbols = []
    let res = await axios.get("https://fapi.binance.com/fapi/v1/ticker/price")
    let valid_pairs = await res.data.filter(d => d.symbol.includes('USDT') && !d.symbol.includes('_') && !d.symbol.includes('SCUSDT') && !d.symbol.includes('TLMUSDT') && !d.symbol.includes('BTSUSDT'))
    // console.log(res.data)
    symbols = await Promise.all(valid_pairs.map(d => {


        return d.symbol

    }))
    


    return symbols
}



const rVol = async (data,time) => {

    let res = await axios.get('https://fapi.binance.com/fapi/v1/klines?symbol=' + data + '&interval='+time+'&limit=11')

    let avg = 0
    let total = 0
    let RVol = 0
    res.data.pop()
    let z = await res.data[9]

    res.data.forEach(x => {
        total = total + parseFloat(x[5])

    });
    avg = total / 10
    RVol = z?.[5] / avg

    const final = {
        "ticker": data,
        "rvol": RVol.toFixed(3)
    }

    return (final)
}


module.exports = { rVol, fetch }