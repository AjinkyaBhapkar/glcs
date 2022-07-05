const router = require('express').Router();
let GL =require('../models/gl.model');

router.route('').get((req,res)=>{
    GL.find()
    .then(gl=>res.json(gl))
    .catch(err=>res.status(400).json(err))
})

router.route('/add').post((req,res)=>{
    const ticker=req.body.ticker;
    const change=req.body.change;

    const newGL = new GL({
        ticker,
        change
    })

    newGL.save()
    .then(()=>res.status(200).json(`Entry added successfully!!`))
    .catch(err=>res.status(400).json(err))
})

module.exports = router;