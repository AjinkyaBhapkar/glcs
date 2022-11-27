const router = require("express").Router()
const { rVol, fetch } = require("../cron_functions/rVol")
const cron = require('node-cron')

let Response = []

const topDailyRvol = () => {

    fetch().then(async a => {
        let sds = await Promise.all(a.map(async t => { let fu = await rVol(t, '1d'); return fu }))
        // console.log(sds)
        Response = sds.sort((b, a) => parseFloat(a.rvol) - parseFloat(b.rvol)).slice(0, 5)
    })
    .then(()=>console.log('1D RVol Updated!'))
}

cron.schedule('7 0 0 * * *',topDailyRvol,{ scheduled: true, timezone: "Africa/Abidjan" })

router.route("/").get((req, res) => {
     if(Response.length ===0){
        topDailyRvol()
    }
    
    res.json(Response)
})

module.exports = router;