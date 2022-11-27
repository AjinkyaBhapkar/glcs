
const axios = require('axios')

const save2DB = async () => {
    const final = [];
    

    let valid_pairs = [];
    await axios.get(`https://fapi.binance.com/fapi/v1/ticker/price`)
        .then(async res => {
            valid_pairs = await res.data.filter(d => d.symbol.includes('USDT') && !d.symbol.includes('_') && !d.symbol.includes('SCUSDT') && !d.symbol.includes('TLMUSDT') && !d.symbol.includes('ICPUSDT'))

            await valid_pairs.map(d => {
                axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${d.symbol}&interval=15m&limit=2`)
                    .then(res => {
                        // final.push(change(d.symbol, res.data[1]))
                        final.push(change(d.symbol, res.data[1]))

                    })
            })


            setTimeout(() => {
                final.sort((a, b) => a.change - b.change);
                // console.log(final.slice(0,5))
                // console.log(final.slice(-5))
                axios.post(`http://localhost:5000/gl/add`,{"gainer":final.slice(-5),"looser":final.slice(0,5)})
                .then(res=>console.log(res))
                .catch(err=>console.log(err))
            }, 3000)


        })

        .catch(err => console.log(err))
}
const change = (ticker, data) => {
    const o = data[1]
    const c = data[4]
    const changeP = ((c - o) / o * 100).toFixed(2);
    return ({ 'symbol': ticker, 'change': changeP })

}

module.exports = { save2DB }