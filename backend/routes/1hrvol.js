const router =require("express").Router()
const {rVol, fetch}=require("../cron_functions/rVol")
const cron=require("node-cron")

let Response = []

const top1HRvol = () => {

    fetch().then(async a=>{
        let sds = await Promise.all(a.map(async t=>{   let fu= await rVol(t,'1h'); return fu  }))
        // console.log(sds)
        Response =sds.sort((b,a)=>parseFloat(a.rvol)-parseFloat(b.rvol)).slice(0,5)
    })
    .then(()=>console.log('1H RVol Updated!'))
}

cron.schedule('7 0 * * * *',top1HRvol,{ scheduled: true, timezone: "Africa/Abidjan" })

router.route("/").get((req,res)=>{


    if(Response.length ===0){
        top1HRvol()
    }
    
    res.json(Response)


})

module.exports =router;