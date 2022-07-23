const router = require('express').Router();
let GL =require('../models/gl.model');
let GL240 =require('../models/gl.model240');
let Live=require('../models/live.model')
const {liveGL}=require('../cron_functions/live')

router.route('/live').get((req,res)=>{
    Live.find()
    .then(live=>res.json(live))
    .catch(err=>res.status(400).json(err))
})
router.route('/live/update').post((req,res)=>{
    Live.updateOne({"_id": "62d41930648fbeff6a0db5b6"},
    {
        $set: {
            "live":req.body.data
        }
    }
    )
    .then(live=>res.json(live))
    .catch(err=>res.status(400).json(err))

    
})
router.route('').get((req,res)=>{
    GL.find()
    .then(gl=>res.json(gl))
    .catch(err=>res.status(400).json(err))
})
router.route('/240').get((req,res)=>{
    GL240.find()
    .then(gl=>res.json(gl))
    .catch(err=>res.status(400).json(err))
})

router.route('/add').post((req,res)=>{
    const gainer=req.body.gainer;
    const looser=req.body.looser;

    const newGL = new GL({
        gainer,
        looser
    })

    newGL.save()
    .then(()=>res.status(200).json(`Entry added successfully!!`))
    .catch(err=>res.status(400).json(err))
})
router.route('/add240').post((req,res)=>{
    const gainer=req.body.gainer;
    const looser=req.body.looser;

    const newGL240 = new GL240({
        gainer,
        looser
    })

    newGL240.save()
    .then(()=>res.status(200).json(`Entry added successfully!!`))
    .catch(err=>res.status(400).json(err))
})

module.exports = router;